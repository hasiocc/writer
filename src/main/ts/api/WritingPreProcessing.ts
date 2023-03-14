import { Editor } from 'tinymce';
import * as Settings from '../api/Setting';
import { ISettings } from '../interface/ISettings';
import { IPreProcessing } from '../interface/IPreProcessing';


const formatContentByAppendMode = (content: string[], settings: ISettings, isLineBreak: boolean): string[] => {

  console.log(content);

  return content;
}

const formatContent = (mode: string, content: string, settings: ISettings): IPreProcessing => {

  const preProcessing = { mode: mode, content: [], settings: settings };

  if (content === "") {
    return preProcessing;
  }

  //確認末尾是否有換行符
  const isLineBreak = content.endsWith("\n");

  //根據換行符號做分割，取得每一個文本塊的array
  const splitContent = content.trim().replace(/^(\r\n|\n|\r|\t| )+/gm, "").split("\n");

  //提示塊建立
  const prompt = [];
  let countPrompt = 0;
  splitContent.forEach(function (value) {
    countPrompt += 1;
    if (settings.modelSettings.allowBestPrompt === true && countPrompt == Number(settings.modelSettings.bestPromptCount) && settings.globalSettings.defaultModel === 'text-davinci-003') {
      prompt.unshift(value + "\n" + "##" + "\n");
      countPrompt = 0;
    } else {
      prompt.unshift(value + "\n");
    }
  });

  //末尾斷行處理
  if (isLineBreak === false) {
    prompt[0] = prompt[0].replace("\n", "").replace("##\n", "");
  } else {
    if (prompt[0].endsWith("##\n") === false && settings.modelSettings.allowBestPrompt === true && settings.globalSettings.defaultModel === 'text-davinci-003') {
      prompt[0] = prompt[0] + "##\n";
    }
  }

  //根據不同模式進行文本塊的處理
  switch (mode) {
    case "append": {
      preProcessing.content = formatContentByAppendMode(prompt, settings, isLineBreak);
    }
  }

  return preProcessing;
}

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
    content = content.replace("[insert]", "");

  } else if (content.endsWith("[insert]")) {

    content = content.slice(0, content.length - "[insert]".length);

  } else {

    mode = "insert";

  }

  return formatContent(mode, content, settings);
}

export {
  preProcessing
}