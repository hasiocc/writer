import { Editor } from 'tinymce';
import * as PreProcessing from '../api/WritingPreProcessing';
import * as Settings from '../api/Setting';
import { ISettings } from '../interface/ISettings';
import * as editPanel from '../ui/writing/EditDialog';
import * as setApiKeyPanel from '../ui/writing/setApiKeyDialog';
import * as OpenAI from './OpenAI/OpenAI';
import * as IOpenAI from './OpenAI/IOpenAI';
import * as OpenAITool from './OpenAI/OpenAITool';

let apiKey = '';

const editPanelCallBack = (editor: Editor, content: string[], prompt: string, settings: ISettings): void => {
  console.log(content);
  console.log(prompt);
  console.log(settings);
  request(editor, "edit", settings, content);
}

const setApiKeyCallBack = (editor: Editor, api_key: string): void => {
  apiKey = api_key.trim();
  if (api_key === "") {
    editor.notificationManager.open({
      text: editor.translate("尚未填入API Key"),
      type: "error",
      timeout: 3000
    });
  } else {
    apiKey = api_key.trim();
    writing(editor);
  }
}

const startCallback = (editor: Editor): void => {
  editor.mode.set("readonly");
}

const completeCallback = (editor: Editor,mode: string,settings:ISettings): void => {
  editor.mode.set('design');
  if(settings.globalSettings.allowHighlight === true) {
    editor.insertContent("&#20;");
  }

}

const progressCallback = (editor: Editor, mode: string, rep:string): void => {

  rep = rep.trim();

  if (rep !== "" && Settings.get().globalSettings.allowHighlight === true) {
    const backgroundColor = Settings.get().globalSettings.textBackgroundColor;
    editor.insertContent('<font style="background-color:'+backgroundColor+';">' + rep + "</font>");
  } else {
    editor.insertContent(rep);
  }

  //換行判斷
  if(rep === "\n") {
    editor.insertContent("<p></p>");
  }else if(rep === "。"){
    editor.insertContent("<p></p>");
  }
}

const requestErrorCallback = (editor: Editor, mode: string, error: IOpenAI.IError): void => {

  if (error.errorType === "moderationError") {

    const category = OpenAITool.getModerationErrorTagsDescription(error.moderationResponse,editor);
    editor.notificationManager.open({
      text: editor.translate(error.message) + "<br/>" + editor.translate("OpenAI的審核端點判斷內容為")+":"+category.join(","),
      type: "error"
    });
  } else if (error.errorType === "moderationRequestError") {
    editor.notificationManager.open({
      text: editor.translate(error.message) + "<br/>" + error.message2,
      type: "error"
    });
  } else if (["ajaxError","SSEError"].indexOf(error.errorType) !== -1) {
    editor.notificationManager.open({
      text: editor.translate(error.message) + "<br/>" + error.openAIError.message,
      type: "error"
    });
  } else if (["StreamTimeOutError","ajaxTimeOutError"].indexOf(error.errorType) !== -1) {
    editor.notificationManager.open({
      text: editor.translate(error.message),
      type: "error",
      timeout: 5000
    });
  }
  //ajaxTimeOutError
  editor.mode.set('design');
}


const request = (editor: Editor, mode: string, settings: ISettings, prompt: string[]): void => {

  const requestOptions: IOpenAI.IRequestOptions = {
    mode: mode,
    settings: settings,
    apiKey: apiKey,
    prompt: prompt,
    editor: editor,
    startCallback: startCallback,
    completeCallback: completeCallback,
    progressCallback: progressCallback,
    requestErrorCallback: requestErrorCallback,
  }
  OpenAI.request(requestOptions);
}

const writing = (editor: Editor): void => {

  const settings: ISettings = Settings.get();
  const parameters = PreProcessing.preProcessing(editor, settings);

  if (apiKey.trim() === "") {

    setApiKeyPanel.open(editor, setApiKeyCallBack);

  } else if (parameters.mode === 'edit' && parameters.content.length > 0) {

    if (settings.EditModel.allowEditMode === true) {
      editPanel.open(editor, parameters.content, settings, editPanelCallBack);
    } else {
      editor.notificationManager.open({
        text: editor.translate("尚未開啟Edit模式，如要使用Edit模式請至設定頁面開啟此功能"),
        type: "info",
        timeout: 3000
      });
    }

  } else if (parameters.mode === 'insert' && parameters.content.length > 0) {

    if (settings.InsertModel.allowInsertMode === true) {
      request(editor, parameters.mode, settings, parameters.content);
    } else {
      editor.notificationManager.open({
        text: editor.translate("尚未開啟Insert模式，如要使用Insert模式請至設定頁面開啟此功能"),
        type: "info",
        timeout: 3000
      });
    }

  } else if (parameters.mode === 'append' && parameters.content.length > 0) {
    request(editor, parameters.mode, settings, parameters.content);
  } else {
    editor.notificationManager.open({
      text: editor.translate("請先輸入一些文字或者在設定功能上面設定提示詞，AI才能進行敘寫!"),
      type: 'error',
      closeButton: true,
      timeout: 5000
    });
  }

};

export {
  writing
}