import { assert } from 'chai';
import * as Settings from '../../../main/ts/api/Setting';
import { SettingEntity } from '../../../main/ts/entities/SettingEntity';

function fakeSetting() {
  const dialogSetting = {
    "defaultModel": "gpt-3.5-turbo",
    "allowHighlight": true,
    "textBackgroundColor": "#BBFFFF",
    "textCnToTw": "not_mandatory",
    "defaultPrompt": "",
    "allowCloseAuditTips": false,
    "temperature": "0.7",
    "maximumLength": "250",
    "maxPromptLength": "2000",
    "stopSequences": "\\n",
    "Top_P": "1",
    "frequencyPenalty": "0.3",
    "presencePenalty": "0.02",
    "allowBestPrompt": true,
    "bestPromptCount": "1",
    "allowInsertMode": false,
    "allowUseModelSettings": true,
    "insert_mode_temperature": "0.7",
    "insert_mode_maximumLength": "250",
    "insert_mode_maxPromptLength": "2000",
    "insert_mode_stopSequences": "",
    "insert_mode_Top_P": "1",
    "insert_mode_frequencyPenalty": "0.3",
    "insert_mode_presencePenalty": "0.02",
    "insert_mode_allowBestPrompt": true,
    "insert_mode_bestPromptCount": "1",
    "allowEditMode": false,
    "allowEditUseModelSettings": true,
    "edit_mode_temperature": "0.7",
    "edit_mode_Top_P": "1"
  }
  return dialogSetting;
}


describe('atomic.SettingsTest', () => {

  it('測試內容產生模型選項text-davinci-003', () => {
    const dialogSetting = fakeSetting();
    dialogSetting.defaultModel = "text-davinci-003";
    const entity = new SettingEntity(dialogSetting);
    Settings.saveSetting(entity.getSettings());
    assert.equal(Settings.get().globalSettings.defaultModel, "text-davinci-003", "defaultModel=text-davinci-003");
    Settings.removeAll();
  });

  it('測試內容產生模型選項gpt-3.5-turbo', () => {
    const dialogSetting = fakeSetting();
    dialogSetting.defaultModel = "gpt-3.5-turbo";
    const entity = new SettingEntity(dialogSetting);
    Settings.saveSetting(entity.getSettings());
    assert.equal(Settings.get().globalSettings.defaultModel, "gpt-3.5-turbo", "defaultModel=gpt-3.5-turbo");
    Settings.removeAll();
  });

  it('針對產生的內容進行背景高亮區別-false', () => {
    const dialogSetting = fakeSetting();
    dialogSetting.allowHighlight = false;
    const entity = new SettingEntity(dialogSetting);
    Settings.saveSetting(entity.getSettings());
    assert.equal(Settings.get().globalSettings.allowHighlight, false, "allowHighlight=false");
    Settings.removeAll();
  });

  it('針對產生的內容進行背景高亮區別-true', () => {
    const dialogSetting = fakeSetting();
    dialogSetting.allowHighlight = true;
    const entity = new SettingEntity(dialogSetting);
    Settings.saveSetting(entity.getSettings());
    assert.equal(Settings.get().globalSettings.allowHighlight, true, "allowHighlight=true");
    Settings.removeAll();
  });

  it('高亮顏色選擇-#930000', () => {
    const dialogSetting = fakeSetting();
    dialogSetting.textBackgroundColor = "#930000";
    const entity = new SettingEntity(dialogSetting);
    Settings.saveSetting(entity.getSettings());
    assert.equal(Settings.get().globalSettings.textBackgroundColor, "#930000", "textBackgroundColor=#930000");
    Settings.removeAll();
  });

  it('內容生成強制轉成-繁體', () => {
    const dialogSetting = fakeSetting();
    dialogSetting.textCnToTw = "tw";
    const entity = new SettingEntity(dialogSetting);
    Settings.saveSetting(entity.getSettings());
    assert.equal(Settings.get().globalSettings.textCnToTw, "tw", "textCnToTw=tw");
    Settings.removeAll();
  });

  it('內容生成強制轉成-簡體', () => {
    const dialogSetting = fakeSetting();
    dialogSetting.textCnToTw = "cn";
    const entity = new SettingEntity(dialogSetting);
    Settings.saveSetting(entity.getSettings());
    assert.equal(Settings.get().globalSettings.textCnToTw, "cn", "textCnToTw=cn");
    Settings.removeAll();
  });

  it('內容生成強制轉成-不強制', () => {
    const dialogSetting = fakeSetting();
    dialogSetting.textCnToTw = "not_mandatory";
    const entity = new SettingEntity(dialogSetting);
    Settings.saveSetting(entity.getSettings());
    assert.equal(Settings.get().globalSettings.textCnToTw, "not_mandatory", "textCnToTw=not_mandatory");
    Settings.removeAll();
  });

  it('預設提示詞-ABCDEF', () => {
    const dialogSetting = fakeSetting();
    dialogSetting.defaultPrompt = "ABCDEF";
    const entity = new SettingEntity(dialogSetting);
    Settings.saveSetting(entity.getSettings());
    assert.equal(Settings.get().globalSettings.defaultPrompt, "ABCDEF", "defaultPrompt=ABCDEF");
    Settings.removeAll();
  });

  it('關閉審核提示-true', () => {
    const dialogSetting = fakeSetting();
    dialogSetting.allowCloseAuditTips = true;
    const entity = new SettingEntity(dialogSetting);
    Settings.saveSetting(entity.getSettings());
    assert.equal(Settings.get().globalSettings.allowCloseAuditTips, true, "allowCloseAuditTips=true");
    Settings.removeAll();
  });

  it('關閉審核提示-false', () => {
    const dialogSetting = fakeSetting();
    dialogSetting.allowCloseAuditTips = false;
    const entity = new SettingEntity(dialogSetting);
    Settings.saveSetting(entity.getSettings());
    assert.equal(Settings.get().globalSettings.allowCloseAuditTips, false, "allowCloseAuditTips=false");
    Settings.removeAll();
  });

  it('模型設定,溫度,正確值', () => {
    const dialogSetting = fakeSetting();
    dialogSetting.temperature = "1";
    const entity = new SettingEntity(dialogSetting);
    Settings.saveSetting(entity.getSettings());
    assert.equal(Settings.get().modelSettings.temperature, "1", "temperature=1");
    Settings.removeAll();
  });

  it('模型設定,溫度,浮點數0.7', () => {
    const dialogSetting = fakeSetting();
    dialogSetting.temperature = "0.7";
    const entity = new SettingEntity(dialogSetting);
    Settings.saveSetting(entity.getSettings());
    assert.equal(Settings.get().modelSettings.temperature, "0.7", "temperature=0.7");
    Settings.removeAll();
  });

  it('模型設定,溫度,型別錯誤TEST', () => {
    const dialogSetting = fakeSetting();
    dialogSetting.temperature = "TEST";
    let errorMessage = "";
    try {
      const entity = new SettingEntity(dialogSetting);
      Settings.saveSetting(entity.getSettings());
    } catch (e) {
      errorMessage = e.message.replace("TypeError: ", "").replace("RangeError: ", "");
    }
    assert.equal(errorMessage, "模型設定-溫度欄位必須為數值型態", "模型設定-溫度欄位必須為數值型態");
    Settings.removeAll();
  });

  it('模型設定,溫度,設定值>2', () => {
    const dialogSetting = fakeSetting();
    dialogSetting.temperature = "3";
    let errorMessage = "";
    try {
      const entity = new SettingEntity(dialogSetting);
      Settings.saveSetting(entity.getSettings());
    } catch (e) {
      errorMessage = e.message.replace("TypeError: ", "").replace("RangeError: ", "");
    }
    assert.equal(errorMessage, "模型設定-溫度欄位必須介於0~2之間的範圍", "模型設定-溫度欄位必須介於0~2之間的範圍");
    Settings.removeAll();
  });

  it('模型設定,溫度,設定值-1', () => {
    const dialogSetting = fakeSetting();
    dialogSetting.temperature = "-1";
    let errorMessage = "";
    try {
      const entity = new SettingEntity(dialogSetting);
      Settings.saveSetting(entity.getSettings());
    } catch (e) {
      errorMessage = e.message.replace("TypeError: ", "").replace("RangeError: ", "");
    }
    assert.equal(errorMessage, "模型設定-溫度欄位必須為數值型態", "模型設定-溫度欄位必須為數值型態");
    Settings.removeAll();
  });

  it('文字內容最大生成長度2000', () => {
    const dialogSetting = fakeSetting();
    dialogSetting.maximumLength = "2000";
    const entity = new SettingEntity(dialogSetting);
    Settings.saveSetting(entity.getSettings());
    assert.equal(Settings.get().modelSettings.maximumLength, "2000", "maximumLength=2000");
    Settings.removeAll();
  });

  it('文字內容最大生成長度>4000', () => {
    const dialogSetting = fakeSetting();
    dialogSetting.maximumLength = "5000";
    let errorMessage = "";
    try {
      const entity = new SettingEntity(dialogSetting);
      Settings.saveSetting(entity.getSettings());
    } catch (e) {
      errorMessage = e.message.replace("TypeError: ", "").replace("RangeError: ", "");
    }
    assert.equal(errorMessage, "模型設定-文字內容最大生成長度必須介於1~4000的範圍", "模型設定-文字內容最大生成長度必須介於1~4000的範圍");
    Settings.removeAll();
  });

  it('文字內容最大生成長度=0', () => {
    const dialogSetting = fakeSetting();
    dialogSetting.maximumLength = "0";
    let errorMessage = "";
    try {
      const entity = new SettingEntity(dialogSetting);
      Settings.saveSetting(entity.getSettings());
    } catch (e) {
      errorMessage = e.message.replace("TypeError: ", "").replace("RangeError: ", "");
    }
    assert.equal(errorMessage, "模型設定-文字內容最大生成長度必須介於1~4000的範圍", "模型設定-文字內容最大生成長度必須介於1~4000的範圍");
    Settings.removeAll();
  });

  it('文字內容最大生成長度=-1', () => {
    const dialogSetting = fakeSetting();
    dialogSetting.maximumLength = "-1";
    let errorMessage = "";
    try {
      const entity = new SettingEntity(dialogSetting);
      Settings.saveSetting(entity.getSettings());
    } catch (e) {
      errorMessage = e.message.replace("TypeError: ", "").replace("RangeError: ", "");
    }
    assert.equal(errorMessage, "模型設定-文字內容最大生成長度必須為數值型態", "模型設定-文字內容最大生成長度必須為數值型態");
    Settings.removeAll();
  });

  it('文字內容最大生成長度-型別錯誤', () => {
    const dialogSetting = fakeSetting();
    dialogSetting.maximumLength = "TEST";
    let errorMessage = "";
    try {
      const entity = new SettingEntity(dialogSetting);
      Settings.saveSetting(entity.getSettings());
    } catch (e) {
      errorMessage = e.message.replace("TypeError: ", "").replace("RangeError: ", "");
    }
    assert.equal(errorMessage, "模型設定-文字內容最大生成長度必須為數值型態", "模型設定-文字內容最大生成長度必須為數值型態");
    Settings.removeAll();
  });

  it('最大提示長度2000', () => {
    const dialogSetting = fakeSetting();
    dialogSetting.maxPromptLength = "2000";
    const entity = new SettingEntity(dialogSetting);
    Settings.saveSetting(entity.getSettings());
    assert.equal(Settings.get().modelSettings.maxPromptLength, "2000", "maxPromptLength=2000");
    Settings.removeAll();
  });

  it('最大提示長度>4000', () => {
    const dialogSetting = fakeSetting();
    dialogSetting.maxPromptLength = "5000";
    let errorMessage = "";
    try {
      const entity = new SettingEntity(dialogSetting);
      Settings.saveSetting(entity.getSettings());
    } catch (e) {
      errorMessage = e.message.replace("TypeError: ", "").replace("RangeError: ", "");
    }
    assert.equal(errorMessage, "模型設定-最大提示長度必須介於1~4000的範圍", "模型設定-最大提示長度必須介於1~4000的範圍");
    Settings.removeAll();
  });

  it('最大提示長度=0', () => {
    const dialogSetting = fakeSetting();
    dialogSetting.maxPromptLength = "0";
    let errorMessage = "";
    try {
      const entity = new SettingEntity(dialogSetting);
      Settings.saveSetting(entity.getSettings());
    } catch (e) {
      errorMessage = e.message.replace("TypeError: ", "").replace("RangeError: ", "");
    }
    assert.equal(errorMessage, "模型設定-最大提示長度必須介於1~4000的範圍", "模型設定-最大提示長度必須介於1~4000的範圍");
    Settings.removeAll();
  });

  it('最大提示長度=-1', () => {
    const dialogSetting = fakeSetting();
    dialogSetting.maxPromptLength = "-1";
    let errorMessage = "";
    try {
      const entity = new SettingEntity(dialogSetting);
      Settings.saveSetting(entity.getSettings());
    } catch (e) {
      errorMessage = e.message.replace("TypeError: ", "").replace("RangeError: ", "");
    }
    assert.equal(errorMessage, "模型設定-最大提示長度必須為數值型態", "模型設定-最大提示長度必須為數值型態");
    Settings.removeAll();
  });

  it('最大提示長度-型別錯誤', () => {
    const dialogSetting = fakeSetting();
    dialogSetting.maxPromptLength = "TEST";
    let errorMessage = "";
    try {
      const entity = new SettingEntity(dialogSetting);
      Settings.saveSetting(entity.getSettings());
    } catch (e) {
      errorMessage = e.message.replace("TypeError: ", "").replace("RangeError: ", "");
    }
    assert.equal(errorMessage, "模型設定-最大提示長度必須為數值型態", "模型設定-最大提示長度必須為數值型態");
    Settings.removeAll();
  });

  it('最大提示長度+文字內容最大生成長度>4000', () => {
    const dialogSetting = fakeSetting();
    dialogSetting.maxPromptLength = "3000";
    dialogSetting.maximumLength = "2000";
    let errorMessage = "";
    try {
      const entity = new SettingEntity(dialogSetting);
      Settings.saveSetting(entity.getSettings());
    } catch (e) {
      errorMessage = e.message.replace("TypeError: ", "").replace("RangeError: ", "");
    }
    assert.equal(errorMessage, "模型設定-文字內容最大生成長度+最大提示長度不得超過4000");
    Settings.removeAll();
  });

  it('最大提示長度+文字內容最大生成長度<4000', () => {
    const dialogSetting = fakeSetting();
    dialogSetting.maxPromptLength = "2000";
    dialogSetting.maximumLength = "1000";
    const entity = new SettingEntity(dialogSetting);
    Settings.saveSetting(entity.getSettings());
    assert.equal(dialogSetting.maxPromptLength, "2000", "maxPromptLength=2000");
    assert.equal(dialogSetting.maximumLength, "1000", "maxPromptLength=1000");
    Settings.removeAll();
  });

  it('top_p判斷', () => {
    const dialogSetting = fakeSetting();
    dialogSetting.Top_P = "3";
    const entity = new SettingEntity(dialogSetting);
    Settings.saveSetting(entity.getSettings());
    assert.equal(dialogSetting.Top_P, "3", "Top_P=3");
    Settings.removeAll();
  });

  it('top_p型態錯誤', () => {
    const dialogSetting = fakeSetting();
    dialogSetting.Top_P = "TEST";
    let errorMessage = "";
    try {
      const entity = new SettingEntity(dialogSetting);
      Settings.saveSetting(entity.getSettings());
    } catch (e) {
      errorMessage = e.message.replace("TypeError: ", "").replace("RangeError: ", "");
    }
    assert.equal(errorMessage, "模型設定-Top_P必須為數值型態");
    Settings.removeAll();
  });

  it('bestPromptCount 型態錯誤', () => {
    const dialogSetting = fakeSetting();
    dialogSetting.allowBestPrompt = true;
    dialogSetting.bestPromptCount = "TEST";
    let errorMessage = "";
    try {
      const entity = new SettingEntity(dialogSetting);
      Settings.saveSetting(entity.getSettings());
    } catch (e) {
      errorMessage = e.message.replace("TypeError: ", "").replace("RangeError: ", "");
    }
    assert.equal(errorMessage, "模型設定-提示最佳化區塊數量必須為數值型態");
    Settings.removeAll();
  });

  it('bestPromptCount 必須大於等於1', () => {
    const dialogSetting = fakeSetting();
    dialogSetting.allowBestPrompt = true;
    dialogSetting.bestPromptCount = "0";
    let errorMessage = "";
    try {
      const entity = new SettingEntity(dialogSetting);
      Settings.saveSetting(entity.getSettings());
    } catch (e) {
      errorMessage = e.message.replace("TypeError: ", "").replace("RangeError: ", "");
    }
    assert.equal(errorMessage, "模型設定-提示最佳化區塊數量必須大於0");
    Settings.removeAll();
  });

  it('allowBestPrompt = false 不檢查 bestPromptCount', () => {
    const dialogSetting = fakeSetting();
    dialogSetting.allowBestPrompt = false;
    dialogSetting.bestPromptCount = "0";
    const entity = new SettingEntity(dialogSetting);
    Settings.saveSetting(entity.getSettings());
    assert.equal(Settings.get().modelSettings.bestPromptCount, "0", "bestPromptCount=0");
    Settings.removeAll();
  });

  it('allowBestPrompt = false 不檢查 bestPromptCount', () => {
    const dialogSetting = fakeSetting();
    dialogSetting.allowBestPrompt = false;
    dialogSetting.bestPromptCount = "TEST";
    const entity = new SettingEntity(dialogSetting);
    Settings.saveSetting(entity.getSettings());
    assert.equal(Settings.get().modelSettings.bestPromptCount, "TEST", "bestPromptCount=0");
    Settings.removeAll();
  });


  //Insert 模式
  it('Insert模式,溫度,正確值', () => {
    const dialogSetting = fakeSetting();
    dialogSetting.insert_mode_temperature = "1";
    const entity = new SettingEntity(dialogSetting);
    Settings.saveSetting(entity.getSettings());
    assert.equal(Settings.get().InsertModel.temperature, "1", "temperature=1");
    Settings.removeAll();
  });

  it('Insert模式,溫度,浮點數0.7', () => {
    const dialogSetting = fakeSetting();
    dialogSetting.insert_mode_temperature = "0.7";
    const entity = new SettingEntity(dialogSetting);
    Settings.saveSetting(entity.getSettings());
    assert.equal(Settings.get().InsertModel.temperature, "0.7", "temperature=0.7");
    Settings.removeAll();
  });

  it('Insert模式,溫度,型別錯誤TEST', () => {
    const dialogSetting = fakeSetting();
    dialogSetting.allowInsertMode = true;
    dialogSetting.allowUseModelSettings = false;

    dialogSetting.insert_mode_temperature = "TEST";
    let errorMessage = "";
    try {
      const entity = new SettingEntity(dialogSetting);
      Settings.saveSetting(entity.getSettings());
    } catch (e) {
      errorMessage = e.message.replace("TypeError: ", "").replace("RangeError: ", "");
    }
    assert.equal(errorMessage, "Insert模式-溫度欄位必須為數值型態", "Insert模式-溫度欄位必須為數值型態");
    Settings.removeAll();
  });

  it('Insert模式,溫度,設定值>2', () => {
    const dialogSetting = fakeSetting();
    dialogSetting.allowInsertMode = true;
    dialogSetting.allowUseModelSettings = false;

    dialogSetting.insert_mode_temperature = "3";
    let errorMessage = "";
    try {
      const entity = new SettingEntity(dialogSetting);
      Settings.saveSetting(entity.getSettings());
    } catch (e) {
      errorMessage = e.message.replace("TypeError: ", "").replace("RangeError: ", "");
    }
    assert.equal(errorMessage, "Insert模式-溫度欄位必須介於0~2之間的範圍", "Insert模式-溫度欄位必須介於0~2之間的範圍");
    Settings.removeAll();
  });

  it('Insert模式,溫度,設定值-1', () => {
    const dialogSetting = fakeSetting();
    dialogSetting.allowInsertMode = true;
    dialogSetting.allowUseModelSettings = false;

    dialogSetting.insert_mode_temperature = "-1";
    let errorMessage = "";
    try {
      const entity = new SettingEntity(dialogSetting);
      Settings.saveSetting(entity.getSettings());
    } catch (e) {
      errorMessage = e.message.replace("TypeError: ", "").replace("RangeError: ", "");
    }
    assert.equal(errorMessage, "Insert模式-溫度欄位必須為數值型態", "Insert模式-溫度欄位必須為數值型態");
    Settings.removeAll();
  });

  it('文字內容最大生成長度2000', () => {
    const dialogSetting = fakeSetting();
    dialogSetting.allowInsertMode = true;
    dialogSetting.allowUseModelSettings = false;

    dialogSetting.insert_mode_maximumLength = "2000";
    const entity = new SettingEntity(dialogSetting);
    Settings.saveSetting(entity.getSettings());
    assert.equal(Settings.get().InsertModel.maximumLength, "2000", "maximumLength=2000");
    Settings.removeAll();
  });

  it('文字內容最大生成長度>4000', () => {
    const dialogSetting = fakeSetting();
    dialogSetting.allowInsertMode = true;
    dialogSetting.allowUseModelSettings = false;

    dialogSetting.insert_mode_maximumLength = "5000";
    let errorMessage = "";
    try {
      const entity = new SettingEntity(dialogSetting);
      Settings.saveSetting(entity.getSettings());
    } catch (e) {
      errorMessage = e.message.replace("TypeError: ", "").replace("RangeError: ", "");
    }
    assert.equal(errorMessage, "Insert模式-文字內容最大生成長度必須介於1~4000的範圍", "Insert模式-文字內容最大生成長度必須介於1~4000的範圍");
    Settings.removeAll();
  });

  it('文字內容最大生成長度=0', () => {
    const dialogSetting = fakeSetting();
    dialogSetting.allowInsertMode = true;
    dialogSetting.allowUseModelSettings = false;

    dialogSetting.insert_mode_maximumLength = "0";
    let errorMessage = "";
    try {
      const entity = new SettingEntity(dialogSetting);
      Settings.saveSetting(entity.getSettings());
    } catch (e) {
      errorMessage = e.message.replace("TypeError: ", "").replace("RangeError: ", "");
    }
    assert.equal(errorMessage, "Insert模式-文字內容最大生成長度必須介於1~4000的範圍", "Insert模式-文字內容最大生成長度必須介於1~4000的範圍");
    Settings.removeAll();
  });

  it('文字內容最大生成長度=-1', () => {
    const dialogSetting = fakeSetting();
    dialogSetting.allowInsertMode = true;
    dialogSetting.allowUseModelSettings = false;

    dialogSetting.insert_mode_maximumLength = "-1";
    let errorMessage = "";
    try {
      const entity = new SettingEntity(dialogSetting);
      Settings.saveSetting(entity.getSettings());
    } catch (e) {
      errorMessage = e.message.replace("TypeError: ", "").replace("RangeError: ", "");
    }
    assert.equal(errorMessage, "Insert模式-文字內容最大生成長度必須為數值型態", "Insert模式-文字內容最大生成長度必須為數值型態");
    Settings.removeAll();
  });

  it('文字內容最大生成長度-型別錯誤', () => {
    const dialogSetting = fakeSetting();
    dialogSetting.allowInsertMode = true;
    dialogSetting.allowUseModelSettings = false;

    dialogSetting.insert_mode_maximumLength = "TEST";
    let errorMessage = "";
    try {
      const entity = new SettingEntity(dialogSetting);
      Settings.saveSetting(entity.getSettings());
    } catch (e) {
      errorMessage = e.message.replace("TypeError: ", "").replace("RangeError: ", "");
    }
    assert.equal(errorMessage, "Insert模式-文字內容最大生成長度必須為數值型態", "Insert模式-文字內容最大生成長度必須為數值型態");
    Settings.removeAll();
  });

  it('最大提示長度2000', () => {
    const dialogSetting = fakeSetting();
    dialogSetting.allowInsertMode = true;
    dialogSetting.allowUseModelSettings = false;

    dialogSetting.insert_mode_maxPromptLength = "2000";
    const entity = new SettingEntity(dialogSetting);
    Settings.saveSetting(entity.getSettings());
    assert.equal(Settings.get().InsertModel.maxPromptLength, "2000", "maxPromptLength=2000");
    Settings.removeAll();
  });

  it('最大提示長度>4000', () => {
    const dialogSetting = fakeSetting();
    dialogSetting.allowInsertMode = true;
    dialogSetting.allowUseModelSettings = false;

    dialogSetting.insert_mode_maxPromptLength = "5000";
    let errorMessage = "";
    try {
      const entity = new SettingEntity(dialogSetting);
      Settings.saveSetting(entity.getSettings());
    } catch (e) {
      errorMessage = e.message.replace("TypeError: ", "").replace("RangeError: ", "");
    }
    assert.equal(errorMessage, "Insert模式-最大提示長度必須介於1~4000的範圍", "Insert模式-最大提示長度必須介於1~4000的範圍");
    Settings.removeAll();
  });

  it('最大提示長度=0', () => {
    const dialogSetting = fakeSetting();
    dialogSetting.allowInsertMode = true;
    dialogSetting.allowUseModelSettings = false;

    dialogSetting.insert_mode_maxPromptLength = "0";
    let errorMessage = "";
    try {
      const entity = new SettingEntity(dialogSetting);
      Settings.saveSetting(entity.getSettings());
    } catch (e) {
      errorMessage = e.message.replace("TypeError: ", "").replace("RangeError: ", "");
    }
    assert.equal(errorMessage, "Insert模式-最大提示長度必須介於1~4000的範圍", "Insert模式-最大提示長度必須介於1~4000的範圍");
    Settings.removeAll();
  });

  it('最大提示長度=-1', () => {
    const dialogSetting = fakeSetting();
    dialogSetting.allowInsertMode = true;
    dialogSetting.allowUseModelSettings = false;

    dialogSetting.insert_mode_maxPromptLength = "-1";
    let errorMessage = "";
    try {
      const entity = new SettingEntity(dialogSetting);
      Settings.saveSetting(entity.getSettings());
    } catch (e) {
      errorMessage = e.message.replace("TypeError: ", "").replace("RangeError: ", "");
    }
    assert.equal(errorMessage, "Insert模式-最大提示長度必須為數值型態", "Insert模式-最大提示長度必須為數值型態");
    Settings.removeAll();
  });

  it('最大提示長度-型別錯誤', () => {
    const dialogSetting = fakeSetting();
    dialogSetting.allowInsertMode = true;
    dialogSetting.allowUseModelSettings = false;

    dialogSetting.insert_mode_maxPromptLength = "TEST";
    let errorMessage = "";
    try {
      const entity = new SettingEntity(dialogSetting);
      Settings.saveSetting(entity.getSettings());
    } catch (e) {
      errorMessage = e.message.replace("TypeError: ", "").replace("RangeError: ", "");
    }
    assert.equal(errorMessage, "Insert模式-最大提示長度必須為數值型態", "Insert模式-最大提示長度必須為數值型態");
    Settings.removeAll();
  });

  it('最大提示長度+文字內容最大生成長度>4000', () => {
    const dialogSetting = fakeSetting();
    dialogSetting.allowInsertMode = true;
    dialogSetting.allowUseModelSettings = false;

    dialogSetting.insert_mode_maxPromptLength = "3000";
    dialogSetting.insert_mode_maximumLength = "2000";
    let errorMessage = "";
    try {
      const entity = new SettingEntity(dialogSetting);
      Settings.saveSetting(entity.getSettings());
    } catch (e) {
      errorMessage = e.message.replace("TypeError: ", "").replace("RangeError: ", "");
    }
    assert.equal(errorMessage, "Insert模式-文字內容最大生成長度+最大提示長度不得超過4000");
    Settings.removeAll();
  });

  it('最大提示長度+文字內容最大生成長度<4000', () => {
    const dialogSetting = fakeSetting();
    dialogSetting.allowInsertMode = true;
    dialogSetting.allowUseModelSettings = false;

    dialogSetting.insert_mode_maxPromptLength = "2000";
    dialogSetting.insert_mode_maximumLength = "1000";
    const entity = new SettingEntity(dialogSetting);
    Settings.saveSetting(entity.getSettings());
    assert.equal(dialogSetting.insert_mode_maxPromptLength, "2000", "maxPromptLength=2000");
    assert.equal(dialogSetting.insert_mode_maximumLength, "1000", "maxPromptLength=1000");
    Settings.removeAll();
  });

  it('top_p判斷', () => {
    const dialogSetting = fakeSetting();
    dialogSetting.allowInsertMode = true;
    dialogSetting.allowUseModelSettings = false;
    dialogSetting.insert_mode_Top_P = "3";
    const entity = new SettingEntity(dialogSetting);
    Settings.saveSetting(entity.getSettings());
    assert.equal(Settings.get().InsertModel.Top_P, "3", "Top_P=3");
    Settings.removeAll();
  });

  it('top_p型態錯誤', () => {
    const dialogSetting = fakeSetting();
    dialogSetting.allowInsertMode = true;
    dialogSetting.allowUseModelSettings = false;
    dialogSetting.insert_mode_Top_P = "TEST";
    let errorMessage = "";
    try {
      const entity = new SettingEntity(dialogSetting);
      Settings.saveSetting(entity.getSettings());
    } catch (e) {
      errorMessage = e.message.replace("TypeError: ", "").replace("RangeError: ", "");
    }
    assert.equal(errorMessage, "Insert模式-Top_P必須為數值型態");
    Settings.removeAll();
  });

  it('allowBestPrompt = false 不檢查 bestPromptCount', () => {
    const dialogSetting = fakeSetting();
    dialogSetting.insert_mode_allowBestPrompt = false;
    dialogSetting.insert_mode_bestPromptCount = "0";
    const entity = new SettingEntity(dialogSetting);
    Settings.saveSetting(entity.getSettings());
    assert.equal(Settings.get().InsertModel.bestPromptCount, "0", "bestPromptCount=0");
    Settings.removeAll();
  });

  it('allowBestPrompt = false 不檢查 bestPromptCount', () => {
    const dialogSetting = fakeSetting();
    dialogSetting.insert_mode_allowBestPrompt = false;
    dialogSetting.insert_mode_bestPromptCount = "TEST";
    const entity = new SettingEntity(dialogSetting);
    Settings.saveSetting(entity.getSettings());
    assert.equal(Settings.get().InsertModel.bestPromptCount, "TEST", "bestPromptCount=0");
    Settings.removeAll();
  });

  it('bestPromptCount 必須大於0', () => {
    const dialogSetting = fakeSetting();
    dialogSetting.allowInsertMode = true;
    dialogSetting.allowUseModelSettings = false;
    dialogSetting.insert_mode_allowBestPrompt = true;
    dialogSetting.insert_mode_bestPromptCount = "0";
    let errorMessage = "";
    try {
      const entity = new SettingEntity(dialogSetting);
      Settings.saveSetting(entity.getSettings());
    } catch (e) {
      errorMessage = e.message.replace("TypeError: ", "").replace("RangeError: ", "");
    }
    assert.equal(errorMessage, "Insert模式-提示最佳化區塊數量必須大於0");
    Settings.removeAll();
  });

  it('bestPromptCount 型態錯誤', () => {
    const dialogSetting = fakeSetting();
    dialogSetting.allowInsertMode = true;
    dialogSetting.allowUseModelSettings = false;
    dialogSetting.insert_mode_allowBestPrompt = true;
    dialogSetting.insert_mode_bestPromptCount = "TEST";
    let errorMessage = "";
    try {
      const entity = new SettingEntity(dialogSetting);
      Settings.saveSetting(entity.getSettings());
    } catch (e) {
      errorMessage = e.message.replace("TypeError: ", "").replace("RangeError: ", "");
    }
    assert.equal(errorMessage, "Insert模式-提示最佳化區塊數量必須為數值型態");
    Settings.removeAll();
  });

  it('當關閉Insert模式後，不檢查Insert模式設定', () => {
    const dialogSetting = fakeSetting();
    dialogSetting.allowInsertMode = false;
    dialogSetting.allowUseModelSettings = false;
    dialogSetting.insert_mode_temperature = "";
    dialogSetting.insert_mode_maximumLength = "";
    dialogSetting.insert_mode_maxPromptLength = "";
    dialogSetting.insert_mode_stopSequences = "";
    dialogSetting.insert_mode_Top_P = "";
    dialogSetting.insert_mode_frequencyPenalty = "";
    dialogSetting.insert_mode_presencePenalty = "";
    dialogSetting.insert_mode_bestPromptCount = "";
    const entity = new SettingEntity(dialogSetting);
    Settings.saveSetting(entity.getSettings());
    assert.equal(dialogSetting.insert_mode_temperature, "");
    assert.equal(dialogSetting.insert_mode_maximumLength, "");
    assert.equal(dialogSetting.insert_mode_maxPromptLength, "");
    assert.equal(dialogSetting.insert_mode_stopSequences, "");
    assert.equal(dialogSetting.insert_mode_Top_P, "");
    assert.equal(dialogSetting.insert_mode_frequencyPenalty, "");
    assert.equal(dialogSetting.insert_mode_presencePenalty, "");
    assert.equal(dialogSetting.insert_mode_bestPromptCount, "");
    Settings.removeAll();
  });

  it('Edit模式,溫度,正確值', () => {
    const dialogSetting = fakeSetting();
    dialogSetting.allowEditMode = true;
    dialogSetting.allowEditUseModelSettings = false;
    dialogSetting.edit_mode_temperature = "1";
    const entity = new SettingEntity(dialogSetting);
    Settings.saveSetting(entity.getSettings());
    assert.equal(Settings.get().EditModel.temperature, "1", "temperature=1");
    Settings.removeAll();
  });

  it('Edit模式,溫度,浮點數0.7', () => {
    const dialogSetting = fakeSetting();
    dialogSetting.allowEditMode = true;
    dialogSetting.allowEditUseModelSettings = false;
    dialogSetting.edit_mode_temperature = "0.7";
    const entity = new SettingEntity(dialogSetting);
    Settings.saveSetting(entity.getSettings());
    assert.equal(Settings.get().EditModel.temperature, "0.7", "temperature=0.7");
    Settings.removeAll();
  });

  it('Edit模式,溫度,型別錯誤TEST', () => {
    const dialogSetting = fakeSetting();
    dialogSetting.allowEditMode = true;
    dialogSetting.allowEditUseModelSettings = false;
    dialogSetting.edit_mode_temperature = "TEST";
    let errorMessage = "";
    try {
      const entity = new SettingEntity(dialogSetting);
      Settings.saveSetting(entity.getSettings());
    } catch (e) {
      errorMessage = e.message.replace("TypeError: ", "").replace("RangeError: ", "");
    }
    assert.equal(errorMessage, "Edit模式-溫度欄位必須為數值型態", "Edit模式-溫度欄位必須為數值型態");
    Settings.removeAll();
  });

  it('Edit模式,溫度,設定值>2', () => {
    const dialogSetting = fakeSetting();
    dialogSetting.allowEditMode = true;
    dialogSetting.allowEditUseModelSettings = false;
    dialogSetting.edit_mode_temperature = "3";
    let errorMessage = "";
    try {
      const entity = new SettingEntity(dialogSetting);
      Settings.saveSetting(entity.getSettings());
    } catch (e) {
      errorMessage = e.message.replace("TypeError: ", "").replace("RangeError: ", "");
    }
    assert.equal(errorMessage, "Edit模式-溫度欄位必須介於0~2之間的範圍", "Edit模式-溫度欄位必須介於0~2之間的範圍");
    Settings.removeAll();
  });

  it('Edit模式,溫度,設定值-1', () => {
    const dialogSetting = fakeSetting();
    dialogSetting.allowEditMode = true;
    dialogSetting.allowEditUseModelSettings = false;
    dialogSetting.edit_mode_temperature = "-1";
    let errorMessage = "";
    try {
      const entity = new SettingEntity(dialogSetting);
      Settings.saveSetting(entity.getSettings());
    } catch (e) {
      errorMessage = e.message.replace("TypeError: ", "").replace("RangeError: ", "");
    }
    assert.equal(errorMessage, "Edit模式-溫度欄位必須為數值型態", "Edit模式-溫度欄位必須為數值型態");
    Settings.removeAll();
  });

  it('top_p判斷', () => {
    const dialogSetting = fakeSetting();
    dialogSetting.allowEditMode = true;
    dialogSetting.allowEditUseModelSettings = false;
    dialogSetting.edit_mode_Top_P = "3";
    const entity = new SettingEntity(dialogSetting);
    Settings.saveSetting(entity.getSettings());
    assert.equal(Settings.get().EditModel.Top_P, "3", "Top_P=3");
    Settings.removeAll();
  });

  it('top_p型態錯誤', () => {
    const dialogSetting = fakeSetting();
    dialogSetting.allowEditMode = true;
    dialogSetting.allowEditUseModelSettings = false;
    dialogSetting.edit_mode_Top_P = "TEST";
    let errorMessage = "";
    try {
      const entity = new SettingEntity(dialogSetting);
      Settings.saveSetting(entity.getSettings());
    } catch (e) {
      errorMessage = e.message.replace("TypeError: ", "").replace("RangeError: ", "");
    }
    assert.equal(errorMessage, "Edit模式-Top_P必須為數值型態");
    Settings.removeAll();
  });

  it('當關閉Edit模式後，不檢查Edit模式設定', () => {
    const dialogSetting = fakeSetting();
    dialogSetting.allowEditMode = false;
    dialogSetting.allowEditUseModelSettings = false;
    dialogSetting.edit_mode_Top_P = "";
    dialogSetting.edit_mode_temperature = "";
    const entity = new SettingEntity(dialogSetting);
    Settings.saveSetting(entity.getSettings());
    assert.equal(dialogSetting.edit_mode_Top_P, "");
    assert.equal(dialogSetting.edit_mode_temperature, "");
    Settings.removeAll();
  });
});