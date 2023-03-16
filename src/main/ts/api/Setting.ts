import * as LocalStorage from "../storage/LocalStorage";
import * as Settings from "../interface/ISettings";

const defaultSettings = {
  globalSettings: {
    allowCloseAuditTips: false,
    allowHighlight: true,
    textBackgroundColor: "#BBFFFF",
    textCnToTw: "not_mandatory",
    defaultPrompt: "",
    selectSaveMode: "localStorage",
    defaultModel: "gpt-3.5-turbo",
  },
  modelSettings: {
    temperature: "0.7",
    maximumLength: "250",
    maxPromptLength: "2000",
    stopSequences: "\\n",
    Top_P: "1",
    frequencyPenalty: "0.3",
    presencePenalty: "0.02",
    allowBestPrompt: true,
    bestPromptCount: "1",
  },
  InsertModel: {
    allowInsertMode: false,
    allowUseModelSettings: true,
    temperature: "0.7",
    maximumLength: "250",
    maxPromptLength: "2000",
    stopSequences: "\\n",
    Top_P: "1",
    frequencyPenalty: "0.3",
    presencePenalty: "0.02",
    allowBestPrompt: true,
    bestPromptCount: "1",
  },
  EditModel: {
    allowEditMode: false,
    allowEditUseModelSettings: true,
    temperature: "0.7",
    Top_P: "1"
  }
}

function get(): Settings.ISettings {
  let settings = defaultSettings;
  try {
    if (LocalStorage.hasData() === true) {
      const data = LocalStorage.get();
      settings = JSON.parse(data);
    }
  } catch (err) {
    console.error("取得設定檔時發生錯誤", err);
  }
  return settings;
}

function getDefaultSettings(): Settings.ISettings {
  return defaultSettings;
}

function saveSetting(setting: Settings.ISettings): void {
  LocalStorage.save(JSON.stringify(setting));
}

function removeAll(): void {
  LocalStorage.removeAll();
}

function getBestPromptCount(mode: string): number {
  let output = 1;
  if (checkUseBestPrompt(mode) === true) {
    const setting = get();
    switch (mode) {
      case "append":
        output = Number(setting.modelSettings.bestPromptCount);
        break;
      case "insert":
        if (setting.InsertModel.allowUseModelSettings === false) {
          output = Number(setting.InsertModel.bestPromptCount);
        } else {
          output = Number(setting.modelSettings.bestPromptCount);
        }
    }
  }
  return output;
}

function checkUseBestPrompt(mode: string): boolean {
  let status = false;
  const setting = get();
  switch (mode) {
    case "append":
      status = (setting.globalSettings.defaultModel === 'text-davinci-003' && setting.modelSettings.allowBestPrompt === true);
      break;
    case "insert":
      if (setting.InsertModel.allowUseModelSettings === false) {
        status = setting.InsertModel.allowBestPrompt;
      } else {
        status = setting.modelSettings.allowBestPrompt;
      }
      break;
    //edit模式不用處理
  }
  return status;
}

export {
  get,
  getDefaultSettings,
  saveSetting,
  removeAll,
  checkUseBestPrompt,
  getBestPromptCount
}