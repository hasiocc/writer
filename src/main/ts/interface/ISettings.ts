interface ItextDavinci003Settings {
  temperature: string,
  maximumLength: string,
  maxPromptLength: string,
  stopSequences: string,
  Top_P: string,
  frequencyPenalty: string,
  presencePenalty: string,
  allowBestPrompt: boolean,
  bestPromptCount: string,
}

interface Igpt35turboSettings {
  temperature: string,
  maximumLength: string,
  maxPromptLength: string,
  Top_P: string,
  stopSequences: string,
  frequencyPenalty: string,
  presencePenalty: string,
}


interface IModelSettings extends ItextDavinci003Settings, Igpt35turboSettings {
}

interface IInsertModel extends ItextDavinci003Settings {
  allowInsertMode: boolean,
  allowUseModelSettings: boolean
}

interface IEditModel {
  allowEditMode: boolean,
  allowEditUseModelSettings: boolean,
  temperature: string,
  Top_P: string
}

interface ISettings {
  globalSettings: {
    allowCloseAuditTips: boolean,
    allowHighlight: boolean,
    textBackgroundColor: string,
    textCnToTw: string,
    defaultPrompt: string,
    selectSaveMode: string,
    defaultModel: string,
  },
  modelSettings: IModelSettings
  InsertModel: IInsertModel,
  EditModel: IEditModel
}

export {
  ItextDavinci003Settings,
  Igpt35turboSettings,
  IModelSettings,
  IEditModel,
  ISettings
}