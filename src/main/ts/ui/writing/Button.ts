import { Editor } from 'tinymce';

const register = (editor: Editor): void => {

  const onAction = () => editor.execCommand('mceAIWriting');
  editor.ui.registry.addButton('writing', {
    tooltip: editor.translate('撰寫'),
    icon: 'arrow-right',
    onAction
  });

}

export {
  register
};