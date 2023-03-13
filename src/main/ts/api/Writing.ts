import { Editor } from 'tinymce';
import * as PreProcessing from '../api/WritingPreProcessing';

const writing = (editor: Editor): void => {
  const parameters = PreProcessing.preProcessing(editor);
  console.log(parameters);
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