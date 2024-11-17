/* global hexo */

'use strict';

const Util = require('@next-theme/utils');
const utils = new Util(hexo, __dirname);

hexo.extend.filter.register('theme_inject', injects => {

  const config = utils.defaultConfigFile('exif', 'default.yaml');
  if (!config.enable) return;

  injects.bodyEnd.raw('exif', `{{ next_data('exif', config.exif.template) }}
<script src="https://cdn.jsdelivr.net/npm/exifreader@4/dist/exif-reader.min.js"></script>
<script src="{{ url_for("lib/exif.js") }}"></script>`);

  injects.style.push(utils.getFilePath('exif.styl'));

});

hexo.extend.generator.register('exif', () => ({
  path: 'lib/exif.js',
  data: utils.getFileContent('exif.js')
}));
