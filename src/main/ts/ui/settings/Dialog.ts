import { Editor } from 'tinymce';
import * as Settings from '../../api/Setting';
import { SettingEntity } from '../../entities/SettingEntity';

function setSettings(isDefault = false) {
  let settings;
  if (isDefault === false) {
    settings = Settings.get();
  } else {
    settings = Settings.getDefaultSettings();
  }


  const data = {

    //一般設定
    allowCloseAuditTips: settings.globalSettings.allowCloseAuditTips,
    allowHighlight: settings.globalSettings.allowHighlight,
    textBackgroundColor: settings.globalSettings.textBackgroundColor,
    textCnToTw: settings.globalSettings.textCnToTw,
    defaultPrompt: settings.globalSettings.defaultPrompt,
    selectSaveMode: settings.globalSettings.selectSaveMode,
    defaultModel: settings.globalSettings.defaultModel,
    connectTimeOut: settings.globalSettings.connectTimeOut,


    //模型設定
    temperature: settings.modelSettings.temperature,
    maximumLength: settings.modelSettings.maximumLength,
    maxPromptLength: settings.modelSettings.maxPromptLength,
    Top_P: settings.modelSettings.Top_P,
    frequencyPenalty: settings.modelSettings.frequencyPenalty,
    presencePenalty: settings.modelSettings.presencePenalty,
    allowBestPrompt: settings.modelSettings.allowBestPrompt,
    bestPromptCount: settings.modelSettings.bestPromptCount,
    stopSequences: settings.modelSettings.stopSequences,

    //insert模式設定
    allowInsertMode: settings.InsertModel.allowInsertMode,
    allowUseModelSettings: settings.InsertModel.allowUseModelSettings,
    insert_mode_temperature: settings.InsertModel.temperature,
    insert_mode_maximumLength: settings.InsertModel.maximumLength,
    insert_mode_maxPromptLength: settings.InsertModel.maxPromptLength,
    insert_mode_Top_P: settings.InsertModel.Top_P,
    insert_mode_frequencyPenalty: settings.InsertModel.frequencyPenalty,
    insert_mode_presencePenalty: settings.InsertModel.presencePenalty,
    insert_mode_allowBestPrompt: settings.InsertModel.allowBestPrompt,
    insert_mode_bestPromptCount: settings.InsertModel.bestPromptCount,

    //edit 模式
    allowEditMode: settings.EditModel.allowEditMode,
    allowEditUseModelSettings: settings.EditModel.allowEditUseModelSettings,
    edit_mode_temperature: settings.EditModel.temperature,
    edit_mode_Top_P: settings.InsertModel.Top_P

  }
  return data;
}



const open = (editor: Editor): void => {
  editor.windowManager.open({
    title: '設定',
    body: {
      type: 'tabpanel',
      tabs: [
        {
          name: 'globalSettings',
          title: editor.translate('一般設定'),
          items: [
            {
              type: 'selectbox',
              name: 'defaultModel',
              label: editor.translate('內容產生時預設使用模型'),
              size: 1,
              items: [
                { value: 'text-davinci-003', text: 'text-davinci-003' },
                { value: 'gpt-3.5-turbo', text: 'gpt-3.5-turbo' },
              ]
            },
            {
              type: 'htmlpanel',
              html: '<div style="color:blue;font-size: 12px">' + editor.translate("內容產生時預設使用模型說明描述") + '</div>'
            },
            {
              type: 'input',
              name: 'connectTimeOut',
              inputMode: 'decimal',
              label: editor.translate('等待API響應的最長時間'),
              placeholder: editor.translate('允許類型:數字'),
            },
            {
              type: 'htmlpanel',
              html: '<div style="color:blue;font-size: 12px">' + editor.translate("等待API響應的最長時間說明描述") + '</div>'
            },
            {
              type: 'checkbox',
              name: 'allowHighlight',
              label: editor.translate('針對產生的內容進行背景高亮區別'),
            },
            {
              type: 'colorinput',
              name: 'textBackgroundColor',
              label: editor.translate('高亮顏色選擇'),
            },
            {
              type: 'htmlpanel',
              html: '<div style="color:blue; font-size: 12px">' + editor.translate("高亮顏色選擇說明描述") + '</div>'
            },
            {
              type: 'textarea',
              name: 'defaultPrompt',
              label: editor.translate('預設提示詞'),
              placeholder: '',
              maximized: false
            },
            {
              type: 'htmlpanel',
              html: '<div style="color:blue;font-size: 12px">' + editor.translate('預設提示詞說明描述') + '</div>'
            },
            {
              type: 'checkbox',
              name: 'allowCloseAuditTips',
              label: editor.translate('關閉審核提示')
            },
            {
              type: 'htmlpanel',
              html: '<div style="color:red; font-size: 12px">' + editor.translate("審核提示關閉說明描述") + '</div>'
            },
          ]
        },
        {
          name: 'modelSettings',
          title: editor.translate('模型設定'),
          items: [
            {
              type: 'input',
              name: 'temperature',
              inputMode: 'decimal',
              label: editor.translate('溫度'),
              placeholder: editor.translate('允許類型:數字(0~2)'),
            },
            {
              type: 'htmlpanel',
              html: '<div style="color:blue;font-size: 12px">' + editor.translate("溫度設定說明描述") + '</div>'
            },
            {
              type: 'input',
              name: 'maximumLength',
              inputMode: 'numeric',
              label:  editor.translate('文字內容最大生成長度'),
              placeholder: editor.translate('允許類型:數字(1~4000)')
            },
            {
              type: 'htmlpanel',
              html: '<div style="color:blue;font-size: 12px">' + editor.translate("文字內容最大生成長度說明描述") + '</div>'
            },
            {
              type: 'input',
              name: 'maxPromptLength',
              label: editor.translate('最大提示長度'),
              inputMode: 'numeric',
              placeholder: editor.translate('允許類型:數字(1~4000)')
            },
            {
              type: 'htmlpanel',
              html: '<div style="color:blue;font-size: 12px">' + editor.translate("最大提示長度說明描述") + '</div>'
            },
            {
              type: 'input',
              name: 'stopSequences',
              label: editor.translate('停用詞'),
              placeholder: editor.translate('以半形空格區分，例如:\\n stop \'\'\''),
            },
            {
              type: 'htmlpanel',
              html: '<div style="color:blue;font-size: 12px">' + editor.translate("停用詞說明描述") + '</div>'
            },
            {
              type: 'input',
              name: 'Top_P',
              label: 'Top P',
              inputMode: 'decimal',
              placeholder: editor.translate('允許類型:數字')
            },
            {
              type: 'htmlpanel',
              html: '<div style="color:blue;font-size: 12px">' + editor.translate("TopP說明描述") + '</div>'
            },
            {
              type: 'input',
              name: 'frequencyPenalty',
              label: editor.translate('頻率懲罰'),
              inputMode: 'decimal',
              placeholder: editor.translate('允許類型:數字(-2~2)')
            },
            {
              type: 'htmlpanel',
              html: '<div style="color:blue;font-size: 12px">' + editor.translate('頻率懲罰說明描述') + '</div>'
            },
            {
              type: 'input',
              name: 'presencePenalty',
              label: editor.translate('存在懲罰'),
              inputMode: 'decimal',
              placeholder: editor.translate('允許類型:數字(-2~2)')
            },
            {
              type: 'htmlpanel',
              html: '<div style="color:blue; font-size: 12px">' + editor.translate('存在懲罰說明描述') + '</div>'
            },
            {
              type: 'checkbox',
              name: 'allowBestPrompt',
              label: editor.translate('啟用最佳化上下文提示'),
            },
            {
              type: 'input',
              name: 'bestPromptCount',
              inputMode: 'numeric',
              label: editor.translate('提示最佳化區塊數量'),

            },
            {
              type: 'htmlpanel',
              html: '<div style="color:blue; font-size: 12px">' + editor.translate('提示最佳化區塊數量說明描述') + '</div>'
            },
            {
              type: 'htmlpanel',
              html: '<div style="color:red; font-size: 12px">' + editor.translate('最佳化區塊數量功能補充描述') + '</div>'
            }
          ]
        }
        , {
          name: 'insertModelSettings',
          title: editor.translate('Insert模式設定'),
          items: [
            {
              type: 'checkbox',
              name: 'allowInsertMode',
              label: editor.translate('是否啟用Insert模式'),
            },
            {
              type: 'htmlpanel',
              html: '<div style="color:red; font-size: 12px">' + editor.translate('是否啟用insert模式說明描述') + '</div>'
            },
            {
              type: 'checkbox',
              name: 'allowUseModelSettings',
              label: editor.translate('直接使用模型設定的參數'),
            },
            {
              type: 'htmlpanel',
              html: '<div style="color:blue; font-size: 12px">' + editor.translate('直接使用模型設定的參數說明描述') + '</div>'
            },
            {
              type: 'input',
              name: 'insert_mode_temperature',
              label: editor.translate('溫度'),
              inputMode: 'decimal',
              placeholder: editor.translate('允許類型:數字(0~2)'),
            },
            {
              type: 'htmlpanel',
              html: '<div style="color:blue;font-size: 12px">' + editor.translate("溫度設定說明描述") + '</div>'
            },
            {
              type: 'input',
              name: 'insert_mode_maximumLength',
              label: editor.translate('文字內容最大生成長度'),
              inputMode: 'numeric',
              placeholder: editor.translate('允許類型:數字(1~4000)')
            },
            {
              type: 'htmlpanel',
              html: '<div style="color:blue;font-size: 12px">' + editor.translate("文字內容最大生成長度說明描述") + '</div>'
            },
            {
              type: 'input',
              name: 'insert_mode_maxPromptLength',
              label: editor.translate('最大提示長度'),
              inputMode: 'numeric',
              placeholder: editor.translate('允許類型:數字(1~4000)')
            },
            {
              type: 'htmlpanel',
              html: '<div style="color:blue;font-size: 12px">' + editor.translate("最大提示長度說明描述") + '</div>'
            },
            {
              type: 'input',
              name: 'insert_mode_stopSequences',
              label: editor.translate('停用詞'),
              placeholder: editor.translate('以半形空格區分，例如:\\n stop \'\'\''),
            },
            {
              type: 'htmlpanel',
              html: '<div style="color:blue;font-size: 12px">' + editor.translate("停用詞說明描述") + '</div>'
            },
            {
              type: 'input',
              name: 'insert_mode_Top_P',
              label: 'Top P',
              inputMode: 'decimal',
              placeholder: editor.translate('允許類型:數字')
            },
            {
              type: 'htmlpanel',
              html: '<div style="color:blue;font-size: 12px">' + editor.translate("TopP說明描述") + '</div>'
            },
            {
              type: 'input',
              name: 'insert_mode_frequencyPenalty',
              label: editor.translate('頻率懲罰'),
              inputMode: 'decimal',
              placeholder: editor.translate('允許類型:數字(-2~2)')
            },
            {
              type: 'htmlpanel',
              html: '<div style="color:blue;font-size: 12px">' + editor.translate('頻率懲罰說明描述') + '</div>'
            },
            {
              type: 'input',
              name: 'insert_mode_presencePenalty',
              label: editor.translate('存在懲罰'),
              inputMode: 'decimal',
              placeholder: editor.translate('允許類型:數字(-2~2)')
            },
            {
              type: 'htmlpanel',
              html: '<div style="color:blue; font-size: 12px">' + editor.translate('存在懲罰說明描述') + '</div>'
            },
            {
              type: 'checkbox',
              name: 'insert_mode_allowBestPrompt',
              label: editor.translate('啟用最佳化上下文提示'),
            },
            {
              type: 'input',
              name: 'insert_mode_bestPromptCount',
              inputMode: 'numeric',
              label: editor.translate('提示最佳化區塊數量'),

            },
            {
              type: 'htmlpanel',
              html: '<div style="color:blue; font-size: 12px">' + editor.translate('提示最佳化區塊數量說明描述') + '</div>'
            }
          ]

        }, {
          name: 'editModelSettings',
          title: editor.translate('Edit模式設定'),
          items: [
            {
              type: 'checkbox',
              name: 'allowEditMode',
              label: editor.translate('是否啟用Edit模式'),
            },
            {
              type: 'htmlpanel',
              html: '<div style="color:blue; font-size: 12px">' + editor.translate('是否啟用Edit模式說明描述') + '</div>'
            },
            {
              type: 'checkbox',
              name: 'allowEditUseModelSettings',
              label: editor.translate('直接使用模式設定的參數'),
            },
            {
              type: 'htmlpanel',
              html: '<div style="color:blue; font-size: 12px">' + editor.translate('直接使用模型設定的參數說明描述') + '</div>'
            },
            {
              type: 'input',
              name: 'edit_mode_temperature',
              label: editor.translate('溫度'),
              inputMode: 'decimal',
              placeholder: editor.translate('允許類型:數字(0~2)'),
            },
            {
              type: 'htmlpanel',
              html: '<div style="color:blue;font-size: 12px">' + editor.translate("溫度設定說明描述") + '</div>'
            },
            {
              type: 'input',
              name: 'edit_mode_Top_P',
              label: 'Top P',
              inputMode: 'decimal',
              placeholder: editor.translate('允許類型:數字')
            },
            {
              type: 'htmlpanel',
              html: '<div style="color:blue;font-size: 12px">' + editor.translate("TopP說明描述") + '</div>'
            }
          ]
        }
      ]
    },
    initialData: setSettings(),
    onAction: function (dialogApi) {
      dialogApi.setData(setSettings(true));
    },
    onSubmit: (dialogApi) => {
      try {
        const entity = new SettingEntity(dialogApi.getData());
        Settings.saveSetting(entity.getSettings());
      } catch (err) {
        editor.notificationManager.open({
          text: editor.translate(err.message.replace("TypeError: ","").replace("RangeError: ","")),
          type: "error",
          timeout: 3000
        });
        console.log(err.message);
      }
      dialogApi.close();
    },
    buttons: [
      {
        type: 'custom',
        text: editor.translate('恢復預設值')
      },
      {
        type: 'cancel',
        text: editor.translate('取消')
      },
      {
        type: 'submit',
        text: editor.translate('保存'),
        buttonType: 'primary'
      }
    ],
  });
};

export {
  open
};