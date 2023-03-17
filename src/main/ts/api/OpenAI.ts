import { ISettings } from '../interface/ISettings';
import { Editor } from 'tinymce';

//審核
const moderationUrl = "https://api.openai.com/v1/moderations";
//編輯
const editUrl = "https://api.openai.com/v1/edits";
//完成
const completionsUrl = "https://api.openai.com/v1/completions";
//Chat
const chatUrl = "https://api.openai.com/v1/chat/completions";

interface IRequestOptions {
  mode: string
  settings: ISettings
  apiKey: string
  prompt: string[],
  editor: Editor,
  startCallback?: (editor: Editor, mode: string) => void
  completeCallback: (editor: Editor, mode: string) => void
  progressCallback: (editor: Editor, mode: string) => void
  requestErrorCallback: (editor: Editor, mode: string, error: IError) => void

}

interface IAjaxOptions {
  url: string
  data?: string
  dataType: string
  apiKey: string
  sync: boolean
}

interface IRequestAjaxResponse {
  requestAjaxConfig: IAjaxOptions,
  requestAjaxResponseText: string,
  requestAjaxResponseStatus: number
}

interface IModerationCategories {
  "hate": boolean,
  "hate/threatening": boolean,
  "self-harm": boolean,
  "sexual": boolean,
  "sexual/minors": boolean,
  "violence": boolean,
  "violence/graphic": boolean,
}

interface IModerationResponse {
  id: string
  model: string
  flagged: boolean
  categories: IModerationCategories
}

interface IError {
  errorType: string
  message: string
  message2?: string
  moderationResponse?: IModerationResponse
  requestAjaxResponse?: IRequestAjaxResponse
  openAIError?: IOpenAIError
}

interface IOpenAIError {
  message: string
  type: string
  param: string
  code: string
}

function formatModerationInfo(response: string): IModerationResponse {
  const object = JSON.parse(response);
  const output: IModerationResponse = {
    id: object.id,
    model: object.model,
    flagged: object.results[0].flagged,
    categories: object.results[0].categories
  }
  return output;
}


function ajax(config: IAjaxOptions) {
  const requestAjaxResponse: IRequestAjaxResponse = {
    requestAjaxConfig: config,
    requestAjaxResponseText: "",
    requestAjaxResponseStatus: 200
  }

  return new Promise(function (resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", config.url, config.sync);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.setRequestHeader('Authorization', 'Bearer ' + config.apiKey);
    xhr.send(config.data);
    xhr.onload = function () {
      requestAjaxResponse.requestAjaxResponseStatus = xhr.status;
      requestAjaxResponse.requestAjaxResponseText = xhr.responseText;
      if (xhr.status == 200) {
        resolve(requestAjaxResponse);
      } else {
        const error: IError = {
          errorType: "ajaxError",
          message: "API請求失敗",
          requestAjaxResponse: requestAjaxResponse,
          openAIError: (JSON.parse(requestAjaxResponse.requestAjaxResponseText).error as IOpenAIError)
        }
        console.error(requestAjaxResponse.requestAjaxResponseText);
        reject(error);
      }
    }
  });
}

function moderation(options: IRequestOptions) {
  const config: IAjaxOptions = {
    url: moderationUrl,
    data: JSON.stringify({ "input": options.prompt.join("") }),
    dataType: "json",
    apiKey: options.apiKey,
    sync: true,
  }
  return ajax(config).then(
    function (response) {
      return new Promise(function (resolve, reject) {
        try {
          const rep = (response as IRequestAjaxResponse);
          const moderationInfo = formatModerationInfo(rep.requestAjaxResponseText);
          if (moderationInfo.flagged === true) {
            const error: IError = {
              errorType: "moderationError",
              message: "你正在試圖產生不符合OpenAI規範的內容",
              moderationResponse: moderationInfo
            }
            if (options.settings.globalSettings.allowCloseAuditTips === false) {
              reject(error);
            } else {
              options.requestErrorCallback(options.editor, options.mode, error);
            }
          } else {
            resolve(response);
          }
        }
        catch (err) {
          const error: IError = {
            errorType: "moderationRequestError",
            message: "解析審核API回傳結果失敗",
            message2: err
          }
          reject(error);
        }
      });
    }
  )
}

function request(options: IRequestOptions): void {

  options.startCallback(options.editor, options.mode);
  const Run = moderation(options);

  Run.catch((error) => {
    options.requestErrorCallback(options.editor, options.mode, error);
  });

  Run.then(() => {
    options.completeCallback(options.editor, options.mode);
  })
}

export {
  request,
  IRequestOptions,
  IError
}
