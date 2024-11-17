(function() {
  async function getExif(element) {
    const template = CONFIG.exif;
    const tags = await ExifReader.load(element.src);
    let result = template;
    for (let [key, value] of Object.entries(tags)) {
      if (key === 'ApertureValue') {
        value.description = Number(value.description).toFixed(1);
      }
      if (key === 'FocalLength') {
        if (tags.FocalLengthIn35mmFilm) {
          value.description = tags.FocalLengthIn35mmFilm.description;
        }
      }
      result = result.replace(`{${key}}`, value.description);
    }
    if (result !== template) {
      const box = document.createElement('div');
      element.wrap(box);
      box.classList.add('exif-container');
      box.insertAdjacentHTML('beforeend', `<div class="exif-metabar"><span>${result}</span></div>`);
    }
  }

  function getAllExif() {
    [...document.querySelectorAll('.post-body img')].forEach(element => {
      if (element.complete) getExif(element);
      // `lazyload` compatible
      element.addEventListener('load', () => {
        getExif(element);
      });
    });
  }

  getAllExif();

  document.addEventListener('pjax:success', () => {
    getAllExif();
  });
})();
