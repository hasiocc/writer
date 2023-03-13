import { Editor } from 'tinymce';
import * as UISettings from '../ui/settings/Dialog';

const register = (editor: Editor): void => {

  editor.addCommand('mceAIWriterConfig', () => UISettings.open(editor));

};

export {
  register
};