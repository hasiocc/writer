import { Editor } from 'tinymce';
import * as UISettings from '../ui/settings/Dialog';
import * as Writing from '../api/Writing';

const register = (editor: Editor): void => {

  editor.addCommand('mceAIWriterConfig', () => UISettings.open(editor));
  editor.addCommand('mceAIWriting', () => Writing.writing(editor));
};

export {
  register
};