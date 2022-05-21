/* global hexo */

'use strict';

const Util = require('@next-theme/utils');
const utils = new Util(hexo, __dirname);

hexo.extend.filter.register('theme_inject', injects => {

  const config = utils.defaultConfigFile('exif', 'default.yaml');
  if (!config.enable) return;

  injects.head.raw('exif', '<script src="https://fastly.jsdelivr.net/npm/exif-js@2/exif.min.js"></script>');
  injects.bodyEnd.raw('exif', utils.getFileContent('exif.njk'));

  injects.style.push(utils.getFilePath('exif.styl'));

});
