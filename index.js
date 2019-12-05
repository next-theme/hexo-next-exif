/* global hexo */

'use strict';

const Util = require('next-util');
const utils = new Util(hexo, __dirname);

hexo.extend.filter.register('theme_inject', injects => {

  let config = utils.defaultConfigFile('exif', 'default.yaml');
  if (!config.enable) return;

  if (!config.tags) {
    hexo.log.warn(`exif.tags can't be null.`);
    return;
  }
  injects.head.raw('exif', '<script src="https://cdn.jsdelivr.net/npm/exif-js"></script>');
  injects.bodyEnd.raw('exif', utils.getFileContent('exif.swig'));

  injects.style.push(utils.getFilePath('exif.styl'));

});
