import { Editor } from 'tinymce';


const open = (editor: Editor,setApiKeyCallBack:(editor: Editor,api_key:string)=>void): void => {
  editor.windowManager.open({
    title: editor.translate('OpenAI Api Key 設定'),
    body: {
      type: 'panel',
      items: [
        {
          type: 'input',
          name: 'apiKey',
          inputMode: 'text',
          label: editor.translate('請填入OpenAI Api Key'),
          maximized: true
        },
        {
          type: 'htmlpanel',
          html: '<div style="color:red;font-size: 12px">' + editor.translate("OpenAI API Key設定說明描述") + '</div>'
        }
      ]
    },
    initialData: {
      apiKey: ""
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
      setApiKeyCallBack(editor,data.apiKey.trim());
      dialogApi.close();
    }
  });
};

export {
  open
}