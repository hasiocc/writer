import { Editor } from 'tinymce';
import * as Settings from '../api/Setting';
import { ISettings } from '../interface/ISettings';
import { IPreProcessing } from '../interface/IPreProcessing';

const preProcessing = (editor: Editor): IPreProcessing => {
  const settings: ISettings = Settings.get();
  const tempContent = editor.getContent();
  const selectedContent = editor.selection.getContent({ format: 'text' });
  let content = "";

  //暫存游標位置
  const bookmark = editor.selection.getBookmark(2, true);

  //這裡面的操作都不會記錄到bookmark內
  editor.undoManager.ignore(function () {
    //插入[insert]標記
    editor.insertContent("[insert]");
    //取得增加[insert]標記後的全文
    content = editor.getContent({ format: 'text' }).trim().replace(/^\s+|\s+$/g, '').trim().replace(/(^\s*)|(\s*$)/g, "");
    //將原本暫存的資料覆蓋回去
    editor.setContent(tempContent);
  });

  //將游標移到一開始的地方
  editor.selection.moveToBookmark(bookmark);

  //判斷要以什麼模式做API請求
  let mode = "append";
  if (selectedContent.trim().length > 0) {
    mode = "edit";
  } else if (content.endsWith("[insert]")) {
    content = content.slice(0, content.length - "[insert]".length);
  } else {
    mode = "insert";
  }

  return { mode: mode, content: content, settings: settings };
}

export {
  preProcessing
}