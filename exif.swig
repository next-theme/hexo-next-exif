<script>
function getExif(target) {
  const tags = {{ config.exif.tags | json }};
  EXIF.getData(target, function() {
    let result = [];
    for (let [key, value] of Object.entries(tags)) {
      let data = EXIF.getTag(this, key);
      if (key === 'ExposureTime' && data <= 0.25) {
        data = '1/' + parseInt(1 / data);
      }
      if (data) result.push(value.replace('{value}', data));
    }
    if (result) {
      const box = document.createElement('div');
      target.wrap(box);
      box.classList.add('exif-container');
      box.insertAdjacentHTML('beforeend', `<div class="exif-metabar"><span>${result.join(' ')}</span></div>`);
    }
  });
}

[...document.querySelectorAll('.post-body img')].forEach(element => {
  if (element.complete) getExif(element);
  // `lazyload` compatible
  element.addEventListener('load', () => {
    getExif(element);
  });
});
</script>
