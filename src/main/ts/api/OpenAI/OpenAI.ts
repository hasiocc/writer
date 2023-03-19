/* eslint-disable @typescript-eslint/no-explicit-any */
import * as SSE from '../../lib/sse/sse';
import * as IOpenAI from './IOpenAI';
import * as Tool from './OpenAITool';

function ajax(config: IOpenAI.IAjaxOptions) {
  const requestAjaxResponse: IOpenAI.IRequestAjaxResponse = {
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
        const error: IOpenAI.IError = {
          errorType: "ajaxError",
          message: "API請求失敗",
          requestAjaxResponse: requestAjaxResponse,
          openAIError: (JSON.parse(requestAjaxResponse.requestAjaxResponseText).error as IOpenAI.IOpenAIError)
        }
        console.error(requestAjaxResponse.requestAjaxResponseText);
        reject(error);
      }
    }
  });
}

function moderation(options: IOpenAI.IRequestOptions) {
  const config: IOpenAI.IAjaxOptions = {
    url: Tool.MODERATION_URL,
    data: JSON.stringify({ "input": options.prompt.join("") }),
    dataType: "json",
    apiKey: options.apiKey,
    sync: true,
  }
  return ajax(config).then(
    function (response) {
      return new Promise(function (resolve, reject) {
        try {
          const rep = (response as IOpenAI.IRequestAjaxResponse);
          const moderationInfo = Tool.formatModerationInfo(rep.requestAjaxResponseText);
          if (moderationInfo.flagged === true) {
            const error: IOpenAI.IError = {
              errorType: "moderationError",
              message: "你正在試圖產生不符合OpenAI規範的內容",
              moderationResponse: moderationInfo
            }
            if (options.settings.globalSettings.allowCloseAuditTips === true) {
              resolve(response);
            } else {
              options.requestErrorCallback(options.editor, options.mode, error);
            }
          } else {
            resolve(response);
          }
        }
        catch (err) {
          const error: IOpenAI.IError = {
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

function generate(options: IOpenAI.IRequestOptions) {

  const request = Tool.createSSERequest(options);

  return new Promise(function (resolve, reject) {
    const source = SSE.SSE(request.url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + request.apiKey,
      },
      method: "POST",
      payload: request.payload
    });
    source.addEventListener("message", function (e: any) {
      if (e.data !== "[DONE]") {
        const payload = JSON.parse(e.data);
        if (options.settings.globalSettings.defaultModel === 'text-davinci-003') {
          options.progressCallback(options.editor, options.mode, payload.choices[0].text);
        } else if (options.settings.globalSettings.defaultModel === 'gpt-3.5-turbo' && typeof payload.choices[0].delta.content !== 'undefined') {
          options.progressCallback(options.editor, options.mode, payload.choices[0].delta.content);
        }
      } else {
        resolve(request);
      }
    });
    source.addEventListener('error', function (e: any) {
      const error: IOpenAI.IError = {
        errorType: "SSEError",
        message: "流式傳輸發生意外中斷",
        openAIError: (JSON.parse(e.data).error as IOpenAI.IOpenAIError)
      }
      options.requestErrorCallback(options.editor, options.mode, error);
      reject(error);
    });
    source.addEventListener("readystatechange", function (e: any) {
      if (e.readyState === 2) {
        options.completeCallback(options.editor, options.mode, options.settings);
      }
      console.log(e);
    });

    source.stream();
  });
}

function request(options: IOpenAI.IRequestOptions): void {

  options.startCallback(options.editor, options.mode);
  const Run = moderation(options);

  Run.then(() => { return generate(options) });

  Run.catch((error) => {
    options.requestErrorCallback(options.editor, options.mode, error);
  });
}

export {
  request
}
