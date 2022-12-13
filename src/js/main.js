document.addEventListener('DOMContentLoaded', () => {
  const openCloseMenu = (burgerBtn, headerMenu, body) => {
    if (!headerMenu.classList.contains('_open')) {
      gsap.from(".header__item-link", {
        y: -80,
        opacity: 0,
        duration: .3,
        stagger: 0.15,
      })
    }
    if (burgerBtn.classList.contains('_open')) {
      burgerBtn.classList.replace('_open', '_close')
    } else if (burgerBtn.classList.contains('_close')) {
      burgerBtn.classList.replace('_close', '_open')
    } else {
      burgerBtn.classList.add('_open')
    }

    headerMenu.classList.toggle('_open')
    body.classList.toggle('_fixed')
  }

  const burger = () => {
    const burgerBtn = document.querySelector('.burger')
    const headerMenu = document.querySelector('.header__menu')
    const body = document.querySelector('.page')

    burgerBtn.addEventListener('click', () => {
      openCloseMenu(burgerBtn, headerMenu, body)
    })
  }

  const scrollLinks = () => {
    const burgerBtn = document.querySelector('.burger')
    const headerMenu = document.querySelector('.header__menu')
    const body = document.querySelector('.page')

    document.querySelectorAll('a[href^="#"').forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault()

        headerMenu.classList.remove('_open')
        body.classList.remove('_fixed')
        if (burgerBtn.classList.contains('_open')) {
          burgerBtn.classList.replace('_open', '_close')
        }

        const href = this.getAttribute('href').substring(1)

        const scrollTarget = document.getElementById(href)

        const topOffset = 70
        const elementPosition = scrollTarget.getBoundingClientRect().top
        const offsetPosition = elementPosition - topOffset

        window.scrollBy({
          top: offsetPosition,
          behavior: 'smooth'
        })
      })
    })
  }


  const swipe = () => {
    const body = document.querySelector('body')
    var hammertime = new Hammer(body)
    hammertime.on('swipe', function (e) {
      if (e.direction == 2) {
        if (window.innerWidth <= 820) {
          const burgerBtn = document.querySelector('.burger')
          const headerMenu = document.querySelector('.header__menu')
          const body = document.querySelector('.page')

          if (!headerMenu.classList.contains('_open')) {
            gsap.from(".header__item-link", {
              y: -80,
              opacity: 0,
              duration: .3,
              stagger: 0.15,
            })
          }

          if (burgerBtn.classList.contains('_close')) {
            burgerBtn.classList.replace('_close', '_open')
          } else {
            burgerBtn.classList.add('_open')
          }

          headerMenu.classList.add('_open')
          body.classList.add('_fixed')

        }
      } else if (e.direction == 4) {
        if (window.innerWidth <= 820) {
          const burgerBtn = document.querySelector('.burger')
          const headerMenu = document.querySelector('.header__menu')
          const body = document.querySelector('.page')

          if (burgerBtn.classList.contains('_open')) {
            burgerBtn.classList.replace('_open', '_close')
          }

          headerMenu.classList.replace('_open', '_close')
          body.classList.remove('_fixed')
        }
      }
    })
  }

  const animationsOnScroll = () => {
    const trHk = document.querySelector('.header').scrollHeight / window.innerHeight
    var controller = new ScrollMagic.Controller({
      globalSceneOptions: {
        triggerHook: trHk,
      }
    });

    var slides = document.querySelectorAll(".screen");

    for (let i = 0; i < slides.length; i++) {
      if (slides[i].scrollHeight >= window.innerHeight - document.querySelector('.header').scrollHeight) {
        slides[i].classList.remove('screen')
        slides[i].style.position = 'relative'
        slides[i].style.zIndex = 10
        continue
      }
      new ScrollMagic.Scene({
        triggerElement: slides[i]
      })
        .setPin(slides[i], { pushFollowers: false })
        .addIndicators()
        .addTo(controller);
    }
  }

  burger()
  scrollLinks()
  swipe()
  animationsOnScroll()
  window.addEventListener('resize', swipe)
  
  // var controller = new ScrollMagic.Controller()
  // var scene = new ScrollMagic.Scene({ triggerElement: ".main__new", duration: 400 })
  //   .setPin(".new__img")
  //   .addIndicators({ name: "1 - add a class" }) // add indicators (requires plugin)
  //   .addTo(controller)
})

window.addEventListener('load', () => {
  gsap.to('.loader', {
    opacity: 0,
    display: 'none',
    duration: .2
  })
  const page = document.querySelector('.page')
  page.classList.remove('_locked')
})