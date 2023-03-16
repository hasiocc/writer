import { Editor } from 'tinymce';

const register = (editor: Editor): void => {

  const onAction = () => editor.execCommand('mceAIWriterConfig');
  editor.ui.registry.addButton('writer', {
    tooltip: editor.translate('設定'),
    icon: 'preferences',
    onAction
  });

}

export {
  register
};