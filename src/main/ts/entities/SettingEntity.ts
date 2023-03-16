import { ISettings } from "../interface/ISettings";
import { getDefaultSettings } from "../api/Setting";

class SettingEntity {

  private dialogSetting: ISettings = getDefaultSettings();

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  constructor(data) {
    this.convertSettings(data);
  }

  //正則檢查數字
  private isNumber(num) {
    return /^[0-9]+.?[0-9]*$/.test(num) && !isNaN(Number(num));
  }

  private convertSettings(data): void {
    try {
      console.log(data);
      this.dialogSetting.globalSettings.allowCloseAuditTips = data.allowCloseAuditTips;
      this.dialogSetting.globalSettings.allowHighlight = data.allowHighlight;
      this.dialogSetting.globalSettings.textBackgroundColor = data.textBackgroundColor.trim();
      this.dialogSetting.globalSettings.textCnToTw = data.textCnToTw;
      this.dialogSetting.globalSettings.defaultPrompt = data.defaultPrompt.trim();
      this.dialogSetting.globalSettings.selectSaveMode = data.selectSaveMode;
      this.dialogSetting.globalSettings.defaultModel = data.defaultModel;

      this.dialogSetting.modelSettings.temperature = data.temperature.trim();
      this.dialogSetting.modelSettings.maximumLength = data.maximumLength.trim();
      this.dialogSetting.modelSettings.maxPromptLength = data.maxPromptLength.trim();
      this.dialogSetting.modelSettings.Top_P = data.Top_P.trim();
      this.dialogSetting.modelSettings.frequencyPenalty = data.frequencyPenalty.trim();
      this.dialogSetting.modelSettings.presencePenalty = data.presencePenalty.trim();
      this.dialogSetting.modelSettings.allowBestPrompt = data.allowBestPrompt;
      this.dialogSetting.modelSettings.bestPromptCount = data.bestPromptCount.trim();
      this.dialogSetting.modelSettings.stopSequences = data.stopSequences.trim();

      this.dialogSetting.InsertModel.allowInsertMode = data.allowInsertMode;
      this.dialogSetting.InsertModel.allowUseModelSettings = data.allowUseModelSettings;
      this.dialogSetting.InsertModel.temperature = data.insert_mode_temperature.trim();
      this.dialogSetting.InsertModel.maximumLength = data.insert_mode_maximumLength.trim();
      this.dialogSetting.InsertModel.maxPromptLength = data.insert_mode_maxPromptLength.trim();
      this.dialogSetting.InsertModel.Top_P = data.insert_mode_Top_P.trim();
      this.dialogSetting.InsertModel.frequencyPenalty = data.insert_mode_frequencyPenalty.trim();
      this.dialogSetting.InsertModel.presencePenalty = data.insert_mode_presencePenalty.trim();
      this.dialogSetting.InsertModel.allowBestPrompt = data.insert_mode_allowBestPrompt;
      this.dialogSetting.InsertModel.bestPromptCount = data.insert_mode_bestPromptCount.trim();

      this.dialogSetting.EditModel.allowEditMode = data.allowEditMode;
      this.dialogSetting.EditModel.allowEditUseModelSettings = data.allowEditUseModelSettings;
      this.dialogSetting.EditModel.temperature = data.edit_mode_temperature.trim();
      this.dialogSetting.EditModel.Top_P = data.edit_mode_Top_P.trim();


      //驗證欄位(模型設定)
      if (!this.isNumber(data.temperature.trim())) {
        throw new TypeError("模型設定-溫度欄位必須為數值型態");
      }
      if (!this.isNumber(data.maximumLength.trim())) {
        throw new TypeError("模型設定-文字內容最大生成長度必須為數值型態");
      }
      if (!this.isNumber(data.maxPromptLength.trim())) {
        throw new TypeError("模型設定-最大提示長度必須為數值型態");
      }
      if (!this.isNumber(data.Top_P.trim())) {
        throw new TypeError("模型設定-Top_P必須為數值型態");
      }
      if (!this.isNumber(data.frequencyPenalty.trim())) {
        throw new TypeError("模型設定-頻率懲罰必須為數值型態");
      }
      if (!this.isNumber(data.presencePenalty.trim())) {
        throw new TypeError("模型設定-存在懲罰必須為數值型態");
      }
      if (!this.isNumber(data.bestPromptCount.trim()) && data.allowBestPrompt === true) {
        throw new TypeError("模型設定-提示最佳化區塊數量必須為數值型態");
      }
      if (Number(data.temperature.trim()) < 0 || Number(data.temperature.trim()) > 2) {
        throw new RangeError("模型設定-溫度欄位必須介於0~2之間的範圍");
      }
      if (Number(data.maximumLength) < 1 || Number(data.maximumLength) > 4000) {
        throw new RangeError("模型設定-文字內容最大生成長度必須介於1~4000的範圍");
      }
      if (Number(data.maxPromptLength) < 1 || Number(data.maxPromptLength) > 4000) {
        throw new RangeError("模型設定-最大提示長度必須介於1~4000的範圍");
      }
      if ((parseInt(data.maximumLength) + parseInt(data.maxPromptLength)) > 4000) {
        throw new RangeError("模型設定-文字內容最大生成長度+最大提示長度不得超過4000");
      }
      if (Number(data.frequencyPenalty.trim()) < -2 || Number(data.frequencyPenalty.trim()) > 2) {
        throw new RangeError("模型設定-頻率懲罰必須介於-2~2的範圍");
      }
      if (Number(data.presencePenalty.trim()) < -2 || Number(data.presencePenalty.trim()) > 2) {
        throw new RangeError("模型設定-存在懲罰必須介於-2~2的範圍");
      }
      if (Number(data.bestPromptCount.trim()) < 1 && data.allowBestPrompt === true) {
        throw new RangeError("模型設定-提示最佳化區塊數量必須大於0");
      }



      //Insert模式
      if (data.allowInsertMode === true && data.allowUseModelSettings === false) {
        if (!this.isNumber(data.insert_mode_temperature.trim())) {
          throw new TypeError("Insert模式-溫度欄位必須為數值型態");
        }
        if (!this.isNumber(data.insert_mode_maximumLength.trim())) {
          throw new TypeError("Insert模式-文字內容最大生成長度必須為數值型態");
        }
        if (!this.isNumber(data.insert_mode_maxPromptLength.trim())) {
          throw new TypeError("Insert模式-最大提示長度必須為數值型態");
        }
        if (!this.isNumber(data.insert_mode_Top_P.trim())) {
          throw new TypeError("Insert模式-Top_P必須為數值型態");
        }
        if (!this.isNumber(data.insert_mode_frequencyPenalty.trim())) {
          throw new TypeError("Insert模式-頻率懲罰必須為數值型態");
        }
        if (!this.isNumber(data.insert_mode_presencePenalty.trim())) {
          throw new TypeError("Insert模式-存在懲罰必須為數值型態");
        }
        if (!this.isNumber(data.insert_mode_bestPromptCount.trim()) && data.insert_mode_allowBestPrompt === true) {
          throw new TypeError("Insert模式-提示最佳化區塊數量必須為數值型態");
        }

        if (Number(data.insert_mode_temperature.trim()) < 0 || Number(data.insert_mode_temperature.trim()) > 2) {
          throw new RangeError("Insert模式-溫度欄位必須介於0~2之間的範圍");
        }
        if (Number(data.insert_mode_maximumLength) < 1 || Number(data.insert_mode_maximumLength) > 4000) {
          throw new RangeError("Insert模式-文字內容最大生成長度必須介於1~4000的範圍");
        }
        if (Number(data.insert_mode_maxPromptLength) < 1 || Number(data.insert_mode_maxPromptLength) > 4000) {
          throw new RangeError("Insert模式-最大提示長度必須介於1~4000的範圍");
        }
        if ((parseInt(data.insert_mode_maximumLength) + parseInt(data.insert_mode_maxPromptLength)) > 4000) {
          throw new RangeError("Insert模式-文字內容最大生成長度+最大提示長度不得超過4000");
        }
        if (Number(data.insert_mode_frequencyPenalty.trim()) < -2 || Number(data.insert_mode_frequencyPenalty.trim()) > 2) {
          throw new RangeError("Insert模式-頻率懲罰必須介於-2~2的範圍");
        }
        if (Number(data.insert_mode_presencePenalty.trim()) < -2 || Number(data.insert_mode_presencePenalty.trim()) > 2) {
          throw new RangeError("Insert模式-存在懲罰必須介於-2~2的範圍");
        }
        if (Number(data.insert_mode_bestPromptCount.trim()) < 1 && data.insert_mode_allowBestPrompt === true) {
          throw new RangeError("Insert模式-提示最佳化區塊數量必須大於0");
        }
      }

      //Edit模式
      if (data.allowEditMode === true && data.allowEditUseModelSettings === false) {
        if (!this.isNumber(data.edit_mode_temperature.trim())) {
          throw new TypeError("Edit模式-溫度欄位必須為數值型態");
        }
        if (!this.isNumber(data.edit_mode_Top_P.trim())) {
          throw new TypeError("Edit模式-Top_P必須為數值型態");
        }
        if (Number(data.edit_mode_temperature.trim()) < 0 || Number(data.edit_mode_temperature.trim()) > 2) {
          throw new RangeError("Edit模式-溫度欄位必須介於0~2之間的範圍");
        }
      }


    } catch (err) {

      throw SyntaxError(err);

    }
  }

  public getSettings(): ISettings {
    return this.dialogSetting;
  }
}

export {
  SettingEntity
}