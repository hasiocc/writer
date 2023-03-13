import { TinyMCE } from 'tinymce';

import Plugin from '../../main/ts/Plugin';

declare let tinymce: TinyMCE;

Plugin();

tinymce.init({
  selector: 'textarea.tinymce',
  plugins: 'code writer fullscreen wordcount ',
  toolbar: 'writer ',
  language: 'zh-Hant',
  branding: false,
  promotion: false,
  menubar: 'file edit insert format table tools help',
  elementpath: false,
  setup: function(editor) {
    editor.on('init', function() {
      editor.execCommand('mceFullScreen');
    });
  },
  /*
  init_instance_callback:function(editor) {
    //document.querySelector('button.tox-statusbar__wordcount').click();
  }*/
});
