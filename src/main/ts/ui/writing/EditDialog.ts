import { Editor } from 'tinymce';
import { ISettings } from '../../interface/ISettings';

const open = (editor: Editor, content: string[],settings:ISettings, editPanelCallBack: (editor:Editor,content: string[], prompt: string,settings:ISettings) => void): void => {
  editor.windowManager.open({
    title: editor.translate('內容編輯'),
    size: 'large',
    body: {
      type: 'panel',
      items: [
        {
          type: 'textarea',
          name: 'editContent',
          label: editor.translate('選擇的內容'),
          enabled: false,
          maximized: false
        },
        {
          type: 'textarea',
          name: 'editPrompt',
          label: editor.translate('修改提示'),
          maximized: false
        },
        {
          type: 'htmlpanel',
          html: '<div style="color:blue;font-size: 12px">' + editor.translate("修改提示說明描述") + '</div>'
        }
      ]
    },
    initialData: {
      editContent: editor.selection.getContent({ format: 'text' }),
      editPrompt: ""
    },
    buttons: [
      {
        type: 'cancel',
        text: editor.translate('取消')
      },
      {
        type: 'submit',
        text: editor.translate('編輯'),
        buttonType: 'primary'
      }
    ],
    onSubmit: (dialogApi) => {
      const data = dialogApi.getData();
      editPanelCallBack(editor,content, data.editPrompt,settings);
      dialogApi.close();
    }
  });
};

export {
  open
}