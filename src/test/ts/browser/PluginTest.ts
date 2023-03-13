import { TinyAssertions, TinyHooks, TinyUiActions } from '@ephox/mcagar';

import Plugin from '../../../main/ts/Plugin';

// https://github.com/tinymce/tinymce/blob/HEAD/modules/mcagar/docs/bdd.md
describe('browser.PluginTest', () => {
  const hook = TinyHooks.bddSetup({
    plugins: 'writer',
    toolbar: 'writer',
  }, [ Plugin ]);

  it('test click on button', () => {
    const editor = hook.editor();
    TinyUiActions.clickOnToolbar(editor, "button[title='設定']");

    TinyAssertions.assertContentPresence(editor, {});

  });
});
