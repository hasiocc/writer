import { Editor } from 'tinymce';
import * as Settings from '../api/Setting';
import { ISettings } from '../interface/ISettings';
import { IPreProcessing } from '../interface/IPreProcessing';
import { encode } from '../lib/counter/Encoder';


/**
 * 新增模式的提示文處理
 * @param content
 * @param settings
 * @returns
 */
const formatContentByAppendMode = (content: string[], settings: ISettings): string[] => {
  const lastPrompt = [];
  content.every(function (value) {
    if (encode(lastPrompt.join("") + value).length <= Number(settings.modelSettings.maxPromptLength)) {
      lastPrompt.unshift(value);
      return true;
    } else {
      return false;
    }
  });
  return lastPrompt;
}

/**
 * Insert或Edit模式的提示文處理
 * @param mode
 * @param content
 * @param settings
 * @returns
 */
const formatContentByInsertOrEditMode = (mode: string, content: string[], settings: ISettings): string[] => {

  //段落總長度
  const totalLength = content.length - 1;

  //取得insert標記在提示中的位置
  let indexPosition = -1;
  content.every(function (value) {
    indexPosition += 1;
    if (value.indexOf("[insert]") !== -1) {
      return false;
    } else {
      return true;
    }
  });

  //edit模式就把[insert]拿掉
  if (mode === "edit") {
    content[indexPosition] = content[indexPosition].replace("[insert]", "");
  }

  const status = true;
  let InsertAreaTokensTotal = encode(content[indexPosition]).length;
  let lastIndex = 0;
  let firstIndex = 0;
  let step = 1;

  let maxPromptLength = 0;
  if (settings.InsertModel.allowUseModelSettings === false) {
    maxPromptLength = Number(settings.InsertModel.bestPromptCount);
  } else {
    maxPromptLength = Number(settings.modelSettings.maxPromptLength);
  }

  while (status) {
    let isEnd = false;
    let isHead = false;
    //向後算
    if ((indexPosition + step) <= totalLength) {
      const rightPromptTokens = encode(content[indexPosition + step]).length;
      if ((InsertAreaTokensTotal + rightPromptTokens) > maxPromptLength) {
        break;
      }
      InsertAreaTokensTotal += rightPromptTokens;
      lastIndex = (indexPosition + step);
    } else {
      lastIndex = totalLength;
      isEnd = true;
    }

    //向前算
    if ((indexPosition - step) >= 0) {

      const leftPromptTokens = encode(content[indexPosition - step]).length;
      if ((InsertAreaTokensTotal + leftPromptTokens) > maxPromptLength) {
        break;
      }
      InsertAreaTokensTotal += leftPromptTokens;
      firstIndex = (indexPosition - step);
    } else {
      isHead = true;
      firstIndex = 0;
    }

    if (isEnd === true && isHead == true) {
      break;
    }

    step += 1;

  }

  const slicePrompt = content.slice(firstIndex, lastIndex + 1);
  return slicePrompt.reverse();
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
    if (Settings.checkUseBestPrompt(mode) === true && countPrompt === Settings.getBestPromptCount(mode)) {
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
    if (prompt[0].endsWith("##\n") === false && Settings.checkUseBestPrompt(mode) === true) {
      prompt[0] = prompt[0] + "##\n";
    }
  }

  //根據不同模式進行文本塊的處理
  switch (mode) {
    case "append":
      preProcessing.content = formatContentByAppendMode(prompt, settings);
      break;
    case "insert":
      preProcessing.content = formatContentByInsertOrEditMode(mode, prompt, settings);
      break;
    case "edit":
      preProcessing.content = formatContentByInsertOrEditMode(mode, prompt, settings);
      break;
  }

  return preProcessing;
}

const preProcessing = (editor: Editor, settings: ISettings): IPreProcessing => {
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

  return formatContent(mode, content, settings);
}

export {
  preProcessing
}