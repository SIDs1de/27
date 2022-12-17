document.addEventListener('DOMContentLoaded', () => {
  const wow = new WOW(
    {
      boxClass: 'wow',      // animated element css class (default is wow)
      animateClass: 'animated', // animation css class (default is animated)
      offset: 100,          // distance to the element when triggering the animation (default is 0)
      mobile: true,       // trigger animations on mobile devices (default is true)
      live: true,       // act on asynchronously loaded content (default is true)
      callback: function (box) {
        // the callback is fired every time an animation is started
        // the argument that is passed in is the DOM node being animated
      },
      scrollContainer: null,    // optional scroll container selector, otherwise use window,
      resetAnimation: true,     // reset animation on end (default is true)
    }
  );
  wow.init();
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
        console.log(offsetPosition)
        window.scrollBy({
          top: offsetPosition,
          behavior: 'smooth'
        })
      })
    })
  }


  const swipe = () => {
    const body = document.querySelector('body')
    const hammertime = new Hammer(body)
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
    let controller = new ScrollMagic.Controller({
      globalSceneOptions: {
        triggerHook: trHk,
      }
    })

    const slides = document.querySelectorAll(".screen")

    for (let i = 0; i < slides.length; i++) {
      if (slides[i].scrollHeight >= window.innerHeight - document.querySelector('.header').scrollHeight) {
        slides[i].classList.remove('screen_animate')
        slides[i].style.position = 'relative'
        slides[i].style.zIndex = 10
      } else {
        slides[i].style.zIndex = 1
        slides[i].classList.add('screen_animate')
      }
      if (slides[i].classList.contains('screen_animate')) {
        new ScrollMagic.Scene({
          triggerElement: slides[i]
        })
          .setPin(slides[i], { pushFollowers: false })
          // .addIndicators()
          .addTo(controller)
      }
    }

    const whiteBlocks = document.querySelectorAll('.white-block')

    whiteBlocks.forEach(block => {
      const tween_h = TweenMax.to(block, 0.5, { height: 0 })
      const controller = new ScrollMagic.Controller()
      const scene = new ScrollMagic.Scene({ triggerElement: block.closest('section'), duration: 250 })
        .setTween(tween_h)
        // .addIndicators({ name: "1 - whiteblock" }) // add indicators (requires plugin)
        .addTo(controller)
    })
  }

  const resize = () => {
    window.addEventListener('resize', () => {
      swipe()
      const slides = document.querySelectorAll(".screen_animate")
      slides.forEach(slide => {
        if (slide.scrollHeight >= window.innerHeight - document.querySelector('.header').scrollHeight) {
          window.location.reload()
        }
      })

      const slides2 = document.querySelectorAll('.screen')
      slides2.forEach(slide => {
        if (slide.scrollHeight < window.innerHeight - document.querySelector('.header').scrollHeight && !(slide.classList.contains('screen_animate'))) {
          window.location.reload()
        }
      })
      animationsOnScroll()
    })
  }

  const animationsOnHover = () => {
    const coverBtn = document.querySelector('.cover__btn')

    coverBtn.addEventListener('mouseenter', (e) => {
      const tl = gsap.timeline()
      tl
        .to(e.target, {
          transform: 'scaleX(1.2)',
          duration: 1.2,
          ease: 'elastic'
        })
        .to(e.target, {
          transform: 'scaleX(1)',
          duration: 1.2,
          ease: 'elastic'
        })
    })
  }

  const animationsOnClick = () => {
    const btns = document.querySelectorAll('button')

    btns.forEach(el => {
      el.addEventListener('click', function (e) {
        const
          size = Math.max(this.offsetWidth, this.offsetHeight),
          x = e.offsetX - size / 2,
          y = e.offsetY - size / 2,
          wave = document.createElement('span')

        // Create a new wave
        wave.className = 'wave'
        wave.style.cssText = `width:${size}px;height:${size}px;top:${y}px;left:${x}px`
        this.appendChild(wave)

        // Remove element after animation ends
        setTimeout(() => wave.remove(), 600)
      })
    })
  }

  burger()
  scrollLinks()
  swipe()
  animationsOnScroll()
  animationsOnHover()
  resize()
  animationsOnClick()
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