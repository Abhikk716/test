document.addEventListener("DOMContentLoaded", () => {
    const bootstrap = window.bootstrap
    const lucide = window.lucide
    const $ = window.jQuery // Declare the jQuery variable

    // Existing Bootstrap Carousel for text testimonials (not changed)
    var textTestimonialsCarousel = document.querySelector("#textTestimonialsCarousel")
    if (textTestimonialsCarousel) {
        new bootstrap.Carousel(textTestimonialsCarousel, {
            interval: 7000,
            wrap: true,
        })
    }

    const animatedSections = document.querySelectorAll(".animated-section")

    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1, // Trigger when 10% of the element is visible
    }

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animate__animated")
                observer.unobserve(entry.target)
            }
        })
    }, observerOptions)

    animatedSections.forEach((section) => {
        observer.observe(section)
    })

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault()

            document.querySelector(this.getAttribute("href")).scrollIntoView({
                behavior: "smooth",
            })

            const navbarCollapse = document.getElementById("navbarNav")
            if (navbarCollapse && navbarCollapse.classList.contains("show")) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse)
                if (bsCollapse) {
                    bsCollapse.hide()
                }
            }
        })
    })

    const dropdowns = document.querySelectorAll(".navbar-nav .dropdown")
    dropdowns.forEach((dropdown) => {
        dropdown.addEventListener("mouseenter", function () {
            if (window.innerWidth >= 992) {
                const dropdownToggle = this.querySelector(".dropdown-toggle")
                const dropdownMenu = this.querySelector(".dropdown-menu")
                if (dropdownToggle && dropdownMenu) {
                    const bsDropdown = new bootstrap.Dropdown(dropdownToggle)
                    bsDropdown.show()
                }
            }
        })

        dropdown.addEventListener("mouseleave", function () {
            if (window.innerWidth >= 992) {
                const dropdownToggle = this.querySelector(".dropdown-toggle")
                const dropdownMenu = this.querySelector(".dropdown-menu")
                if (dropdownToggle && dropdownMenu) {
                    const bsDropdown = bootstrap.Dropdown.getInstance(dropdownToggle)
                    if (bsDropdown) {
                        bsDropdown.hide()
                    }
                }
            }
        })
    })

    lucide.createIcons()
})

// jQuery dependent code for Owl Carousel
// This ensures jQuery and Owl Carousel are loaded before trying to initialize
$(document).ready(() => {
    $("#heroCarousel").owlCarousel({
        items: 1, // Display one item at a time
        loop: true, // Loop the carousel
        margin: 0, // No margin between items
        autoplay: true, // Autoplay the carousel
        autoplayTimeout: 5000, // Autoplay interval
        autoplayHoverPause: true, // Pause on hover
        nav: true, // Show navigation arrows
        dots: false, // Show pagination dots
        animateOut: "animate__fadeOut", // Animate.css class for slide out
        animateIn: "animate__fadeIn", // Animate.css class for slide in
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                nav: false, // Hide nav on small screens
            },
            600: {
                items: 1,
                nav: false,
            },
            1000: {
                items: 1,
                nav: true, // Show nav on larger screens
                loop: true,
            },
        },
    })

    // New Owl Carousel for Video Testimonials
    $("#videoTestimonialsCarousel").owlCarousel({
        loop: true,
        margin: 20, // Spacing between video items
        nav: true, // No navigation arrows as per screenshot
        dots: false, // Show pagination dots
        autoplay: true,
        autoplayTimeout: 7000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1, // 1 item on extra small screens
            },
            576: {
                items: 1, // 2 items on small screens
            },
            768: {
                items: 1, // 3 items on medium screens
            },
            992: {
                items: 3, // 4 items on large screens (matching screenshot)
            },
        },
    })

    // New Owl Carousel for Bestsellers
    $("#bestsellersCarousel").owlCarousel({
        loop: true,
        margin: 20, // Spacing between product cards
        autoplayHoverPause: true, // Pause on hover
        nav: true, // Show navigation arrows
        dots: false, // Show pagination dots
        autoplay: true,
        autoplayTimeout: 6000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1,
                nav: false, // Hide nav on very small screens
            },
            576: {
                items: 1,
                nav: false,
            },
            768: {
                items: 1,
            },
            992: {
                items: 4, // Display 4 items on large screens as per screenshot
            },
        },
    })
})
