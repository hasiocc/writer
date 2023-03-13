import { TinyMCE } from 'tinymce';
import * as SettingsButtons from './ui/settings/Button';
import * as Commands from './api/Commands';

declare const tinymce: TinyMCE;

export default (): void => {

  tinymce.PluginManager.add('writer', (editor) => {

    SettingsButtons.register(editor);
    Commands.register(editor);

  });

  tinymce.PluginManager.requireLangPack('writer', 'zh-Hant');


};


