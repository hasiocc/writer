import { ISettings } from '../../interface/ISettings';
import * as IOpenAI from './IOpenAI';
import { Editor } from 'tinymce';

//審核
const MODERATION_URL = "https://api.openai.com/v1/moderations";
//編輯
//const editUrl = "https://api.openai.com/v1/edits";
//完成
const COMPLETIONS_URL = "https://api.openai.com/v1/completions";
//Chat
const CHAT_URL = "https://api.openai.com/v1/chat/completions";

function formatGPT35Prompt(prompt: string[],settings:ISettings) {
  const list = [];
  const role = ["user", "assistant"];

  if(settings.globalSettings.defaultPrompt!== "") {
    list.push({"role":"system","content":settings.globalSettings.defaultPrompt+"\n"});
  }

  Object.entries(prompt).forEach(entry => {
    const [index, value] = entry;
    if ((Number(index) + 1) % 2 !== 0) {
      list.push({ "role": role[0], "content": value });
    } else {
      list.push({ "role": role[1], "content": value });
    }
  });
  return list;
}

function formatGPT3Prompt(prompt: string[],settings:ISettings):string {
  if(settings.globalSettings.defaultPrompt!== "") {
    prompt.unshift(settings.globalSettings.defaultPrompt+"##\n");
  }
  console.log(prompt);
  return prompt.join("");
}

function createSSERequest(options: IOpenAI.IRequestOptions): IOpenAI.ISSERequest {

  let url = "";
  let payload = "";
  let stop: string[] = [];

  //處理中斷詞問題
  if (options.settings.modelSettings.stopSequences.trim() === "") {
    stop = [];
  } else {
    stop = options.settings.modelSettings.stopSequences.split(" ").slice(0, 4);
  }

  if (options.mode === 'append' && options.settings.globalSettings.defaultModel === 'text-davinci-003') {

    url = COMPLETIONS_URL;
    payload = JSON.stringify({
      model: "text-davinci-003",
      prompt: formatGPT3Prompt(options.prompt,options.settings),
      stream: true,
      max_tokens: Number(options.settings.modelSettings.maximumLength),
      temperature: Number(options.settings.modelSettings.temperature),
      top_p: Number(options.settings.modelSettings.Top_P),
      stop: (stop.length > 0) ? stop : "",
      presence_penalty: Number(options.settings.modelSettings.presencePenalty),
      frequency_penalty: Number(options.settings.modelSettings.frequencyPenalty),
    });
  } else if (options.mode === 'append' && options.settings.globalSettings.defaultModel === 'gpt-3.5-turbo') {
    url = CHAT_URL;
    payload = JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: formatGPT35Prompt(options.prompt,options.settings),
      stream: true,
      max_tokens: Number(options.settings.modelSettings.maximumLength),
      temperature: Number(options.settings.modelSettings.temperature),
      top_p: Number(options.settings.modelSettings.Top_P),
      stop: (stop.length > 0) ? stop : "",
      presence_penalty: Number(options.settings.modelSettings.presencePenalty),
      frequency_penalty: Number(options.settings.modelSettings.frequencyPenalty),
    });
  }

  const request: IOpenAI.ISSERequest = {
    url: url,
    apiKey: options.apiKey,
    mode: options.mode,
    payload: payload
  }

  return request;
}

function formatModerationInfo(response: string): IOpenAI.IModerationResponse {
  const object = JSON.parse(response);
  const output: IOpenAI.IModerationResponse = {
    id: object.id,
    model: object.model,
    flagged: object.results[0].flagged,
    categories: object.results[0].categories,
    category_scores: object.results[0].category_scores
  }
  return output;
}

function getModerationErrorTagsDescription(rep: IOpenAI.IModerationResponse,editor: Editor): string[] {
  const output = [];
  Object.entries(rep.categories).forEach(entry => {
    const [key, value] = entry;
    if (key === "hate" && value === true) {
      output.push(editor.translate("仇恨"));
    }
    if (key === "hate/threatening" && value === true) {
      output.push(editor.translate("仇恨/威脅"));
    }
    if (key === "self-harm" && value === true) {
      output.push(editor.translate("自殘"));
    }
    if (key === "sexual" && value === true) {
      output.push(editor.translate("性行為"));
    }
    if (key === "sexual/minors" && value === true) {
      output.push(editor.translate("未成年性行為"));
    }
    if ((key === "violence" || key === "violence/graphic") && value === true) {
      output.push(editor.translate("暴力"));
    }
  });
  return output;
}

export {
  MODERATION_URL,
  COMPLETIONS_URL,
  CHAT_URL,
  createSSERequest,
  formatModerationInfo,
  getModerationErrorTagsDescription
}