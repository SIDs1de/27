const videos = document.querySelectorAll('video')
videos.forEach(video => {
  video.setAttribute('height', 608)
  if (window.innerWidth < 1400) {
    video.setAttribute('height', 523)
  }
  if (window.innerWidth < 1200) {
    video.setAttribute('height', 439)
  }
  if (window.innerWidth < 992) {
    video.setAttribute('height', 326)
  }
  if (window.innerWidth < 500) {
    video.setAttribute('height', 220)
  }
  if (window.innerWidth < 400) {
    video.setAttribute('height', 180)
  }

})

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    videojs(document.querySelector('.video-js', {
      language: 'ru'
    }))

    const cams = document.querySelectorAll('main .row button.btn-success');
    const groups = document.querySelectorAll('.camera-group');


    groups[0].style.display = 'block'

    cams.forEach(cam => {
      cam.addEventListener('click', (e) => {
        const num = e.target.dataset.cam

        groups.forEach(i => {
          i.style.display = 'none'
        })

        groups[num - 1].style.display = 'block'
        groups[num - 1].querySelector('video').play()
      })
    })

    const btnDraws = document.querySelectorAll('.draw');

    btnDraws.forEach(btnDraw => {
      btnDraw.addEventListener('click', (e) => {
        const num = btnDraw.dataset.draw
        var canvas = document.createElement('canvas')
        canvas.width = 1920;
        canvas.height = 1080;
        var ctx = canvas.getContext('2d');

        const video = groups[num - 1].querySelector('video');

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        var dataURI = canvas.toDataURL('image/jpeg'); // can also use 'image/png'

        const myImage = groups[num - 1].querySelector('.my-img');
        const download = groups[num - 1].querySelector('.download');

        myImage.src = dataURI;
        download.href = dataURI;
      })
    })
  }, 100)

})

