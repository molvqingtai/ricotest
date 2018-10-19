window.onload = () => {
    let app = {
        navDropdown() {
            let dropdowns = document.querySelectorAll('.nav-dropdown')
            M.Dropdown.init(dropdowns, {
                hover: true,
                constrainWidth: false,
                coverTrigger: false
            })
        },
        collapsibleInit(isOpen = false) {
            let menuButton = document.querySelectorAll('.menu-button')[0]
            let itemsWrapper = document.querySelectorAll('.items-wrapper')[0]
            let collapsible = document.querySelectorAll('.collapsible')
            M.Collapsible.init(collapsible)
            menuButton.addEventListener('click', (e) => {
                if (!isOpen) {
                    itemsWrapper.style.display = 'block'
                    itemsWrapper.classList.add('fadeInDown')
                    itemsWrapper.classList.remove('fadeOutUp')
                } else {
                    itemsWrapper.classList.remove('fadeInDown')
                    itemsWrapper.classList.add('fadeOutUp')
                }
                isOpen = !isOpen
            })
        },
        elFullScreen() {
            let screenHeight = window.innerHeight + 'px'
            if (document.querySelectorAll('#banner-wrapper')[0]) {
                document.querySelectorAll('#banner-wrapper')[0].style.height = screenHeight
            }
            if (document.querySelectorAll('#pink-panel')[0]) {
                document.querySelectorAll('#pink-panel')[0].style.height = screenHeight
            }
        },
        swiperStart() {
            if (window.innerWidth >= 933) {
                new Swiper('.swiper-container', {
                    loop: true,
                    speed: 1000,
                    effect: 'fade',
                    autoplay: {
                        delay: 5000,
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                    on: {
                        init() {
                            //setTimeout解决初始化无法获取$El的bug
                            setTimeout(() => {
                                let prevEl = this.navigation.$prevEl[0]
                                let nextEl = this.navigation.$nextEl[0]

                                this.$el[0].addEventListener('mouseover', () => {
                                    prevEl.classList.add('fadeOutLeft')
                                    prevEl.classList.remove('fadeOutLeft')
                                    nextEl.classList.add('fadeOutRight')
                                    nextEl.classList.remove('fadeOutRight')
                                })
                                this.$el[0].addEventListener('mouseout', () => {
                                    prevEl.classList.remove('fadeOutLeft')
                                    prevEl.classList.add('fadeOutLeft')
                                    nextEl.classList.remove('fadeOutRight')
                                    nextEl.classList.add('fadeOutRight')
                                })
                            }, 0)
                        },
                        slideChangeTransitionStart() {
                            this.slides[this.activeIndex].lastElementChild.classList.remove('fadeInUp')
                        },
                        slideChangeTransitionEnd() {
                            this.slides[this.activeIndex].lastElementChild.classList.add('fadeInUp')
                        }
                    }
                })
            }

        },
        scrollIntoView() {

            if (window.innerWidth >= 933) {
                let html = document.documentElement
                let body = document.body
                let backToTopBtn = document.querySelectorAll('#back-to-top')[0]
                window.addEventListener('scroll', () => {
                    if (window.scrollY > 500) {
                        backToTopBtn.classList.add('scale-in')
                    } else {
                        backToTopBtn.classList.remove('scale-in')
                    }

                })
                backToTopBtn.addEventListener('click', () => {
                    let timer = window.setInterval(() => {
                        if (html.scrollTop > 0) {
                            html.scrollTop -= 50
                        } else if (body.scrollTop) {
                            body.scrollTop -= 50
                        } else {
                            window.clearInterval(timer)
                        }
                    }, 10)
                })
            }

        },
        mapInit() {
            let uluru = { lat: 31.280194, lng: 121.605482 }
            let mapEl = document.getElementById('map')
            if (mapEl) {
                let map = new google.maps.Map(mapEl, {
                    center: uluru,
                    zoom: 10
                })
                new google.maps.Marker({ position: uluru, map: map });
            }

        },

        init() {
            this.navDropdown()
            this.collapsibleInit()
            this.elFullScreen()
            this.swiperStart()
            this.scrollIntoView()
            this.mapInit()
        }
    }
    app.init()
}
