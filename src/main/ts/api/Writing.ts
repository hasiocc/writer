import { Editor } from 'tinymce';
import * as PreProcessing from '../api/WritingPreProcessing';
import * as Settings from '../api/Setting';
import { ISettings } from '../interface/ISettings';
import * as editPanel from '../ui/writing/EditDialog';
import * as setApiKeyPanel from '../ui/writing/setApiKeyDialog';
import * as OpenAI from '../api/OpenAI';

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

const completeCallback = (editor: Editor): void => {
  editor.mode.set('design');
  editor.insertContent("&#20;");
}

const progressCallback = (editor: Editor, mode: string, rep:string): void => {

  if (rep !== "" && Settings.get().globalSettings.allowHighlight === true) {
    const backgroundColor = Settings.get().globalSettings.textBackgroundColor;
    editor.insertContent('<font style="background-color:'+backgroundColor+';">' + rep + "</font>");
    //https://stackoverflow.com/questions/32503291/tinymce-4-insertcontent-not-behaving-correctly
    //editor.dom.add(editor.getBody(),'font', {class: 'row'},rep);
  } else {
    editor.insertContent(rep);
  }
}

const requestErrorCallback = (editor: Editor, mode: string, error: OpenAI.IError): void => {

  if (error.errorType === "moderationError") {
    editor.notificationManager.open({
      text: editor.translate(error.message),
      type: "error"
    });
  } else if (error.errorType === "moderationRequestError") {
    editor.notificationManager.open({
      text: editor.translate(error.message) + "<br/>" + error.message2,
      type: "error"
    });
  } else if (error.errorType === "ajaxError") {
    editor.notificationManager.open({
      text: editor.translate(error.message) + "<br/>" + error.openAIError.message,
      type: "error"
    });
  } else if (error.errorType === "SSEError") {
    editor.notificationManager.open({
      text: editor.translate(error.message) + "<br/>" + error.openAIError.message ,
      type: "error"
    });
  }

  editor.mode.set('design');
}


const request = (editor: Editor, mode: string, settings: ISettings, prompt: string[]): void => {

  const requestOptions: OpenAI.IRequestOptions = {
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