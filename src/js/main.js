document.addEventListener('DOMContentLoaded', () => {

  const burger = () => {
    const burgerBtn = document.querySelector('.burger');
    const headerMenu = document.querySelector('.header__menu');
    const body = document.querySelector('.page');

    burgerBtn.addEventListener('click', () => {
      if (burgerBtn.classList.contains('_open')) {
        burgerBtn.classList.replace('_open', '_close')
      } else if (burgerBtn.classList.contains('_close')) {
        burgerBtn.classList.replace('_close', '_open')
      } else {
        burgerBtn.classList.add('_open')
      }

      headerMenu.classList.toggle('_open')
      body.classList.toggle('_fixed')
    })
  }

  const scrollLinks = () => {
    const burgerBtn = document.querySelector('.burger');
    const headerMenu = document.querySelector('.header__menu');
    const body = document.querySelector('.page');

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
        const offsetPosition = elementPosition - topOffset;

        window.scrollBy({
          top: offsetPosition,
          behavior: 'smooth'
        })
      })
    })
  }

  burger()
  scrollLinks()
})
