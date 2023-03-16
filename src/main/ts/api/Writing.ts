import { Editor } from 'tinymce';
import * as PreProcessing from '../api/WritingPreProcessing';
import * as Settings from '../api/Setting';
import { ISettings } from '../interface/ISettings';
import * as editPanel from '../ui/writing/EditDialog';

const editPanelCallBack = (content:string[],prompt:string,settings:ISettings):void => {
  console.log(content);
  console.log(prompt);
  console.log(settings);
}

const writing = (editor: Editor): void => {
  const settings: ISettings = Settings.get();
  const parameters = PreProcessing.preProcessing(editor,settings);

  console.log(parameters);
  if(parameters.mode === 'edit' && parameters.content.length > 0) {

    if(settings.EditModel.allowEditMode === true) {
      editPanel.open(editor,parameters.content,settings,editPanelCallBack);
    } else {
      editor.notificationManager.open({
        text: editor.translate("尚未開啟Edit模式，如要使用Edit模式請至設定頁面開啟此功能"),
        type: "info",
        timeout: 3000
      });
    }

  } else if (parameters.mode === 'insert' && parameters.content.length > 0) {

    if(settings.InsertModel.allowInsertMode === true) {
      // TODO: API 請求
    } else {
      editor.notificationManager.open({
        text: editor.translate("尚未開啟Insert模式，如要使用Insert模式請至設定頁面開啟此功能"),
        type: "info",
        timeout: 3000
      });
    }

  } else if (parameters.mode === 'append' && parameters.content.length > 0) {

    console.log("呼叫API");

  } else {
      editor.notificationManager.open({
      text: editor.translate("請先輸入一些文字或者在設定功能上面設定提示詞，AI才能進行敘寫!"),
      type: 'error',
      closeButton: true,
      timeout: 5000
    });
  }


  //還要判斷是否允許模式
  //假設取得的內容是空字串，則就彈出視窗告知
  /*
  if(tempContent === "") {
    editor.notificationManager.open({
      text: editor.translate("請先輸入一些文字或者在設定功能上面設定提示詞，AI才能進行敘寫!"),
      type: 'error',
      closeButton: true,
      timeout: 5000
    });
    return;
  }*/
};

export {
  writing
}