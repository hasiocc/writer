import { TinyMCE } from 'tinymce';

import Plugin from '../../main/ts/Plugin';

declare let tinymce: TinyMCE;

Plugin();

tinymce.init({
  selector: 'textarea.tinymce',
  plugins: 'code writer writing fullscreen wordcount preview importcss searchreplace autolink directionality visualblocks visualchars image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists help charmap emoticons',
  toolbar: 'writer| writing |undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | preview save print | insertfile image media template link anchor codesample | ltr rtl',
  language: 'zh-Hant',
  branding: false,
  promotion: false,
  menubar: 'file edit insert format tools table help',
  elementpath: false,
  setup: function(editor) {
    editor.on('init', function() {
      editor.execCommand('mceFullScreen');
    });
  },

  init_instance_callback:function(editor) {
    document.querySelector('button.tox-statusbar__wordcount').click();
  }
});
