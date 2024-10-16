AOS.init({
    duration: 800,
    easing: 'slide'
});

(function($) {

    "use strict";

    $(window).stellar({
        responsive: true,
        parallaxBackgrounds: true,
        parallaxElements: true,
        horizontalScrolling: false,
        hideDistantElements: false,
        scrollProperty: 'scroll'
    });

	var fullHeight = function() {
		$('.js-fullheight').css('height', '75vh'); // Set 75% viewport height
		$(window).resize(function(){
			$('.js-fullheight').css('height', '75vh'); // Update on window resize
		});
	};
	fullHeight();
	

    // Loader
    var loader = function() {
        setTimeout(function() {
            if($('#ftco-loader').length > 0) {
                $('#ftco-loader').removeClass('show');
            }
        }, 1);
    };
    loader();

    // Scrollax
    $.Scrollax();

    // Burger Menu
    var burgerMenu = function() {
        $('body').on('click', '.js-fh5co-nav-toggle', function(event){
            event.preventDefault();
            if ($('#ftco-nav').is(':visible')) {
                $(this).removeClass('active');
            } else {
                $(this).addClass('active');
            }
        });
    };
    burgerMenu();

    // Function to handle showing and hiding sections
    var showSection = function(sectionId) {
        // Hide all sections
        $('.section').hide();

        // Show the clicked section
        $('#' + sectionId).fadeIn();
    };

	var onePageClick = function() {
		$(document).on('click', '#ftco-nav a[href^="#"]', function (event) {
			event.preventDefault();
			var href = $.attr(this, 'href').substring(1); // Get section ID without the "#"
	
			// Remove "active" class from all nav items
			$('#ftco-nav .nav-link').removeClass('active');
	
			// Add "active" class to the clicked nav item
			$(this).addClass('active');
	
			// Call the showSection function to display the correct section
			showSection(href);
	
			// Scroll to the section
			$('html, body').animate({
				scrollTop: $('#' + href).offset().top - 70
			}, 500);
		});
	};
	

    onePageClick();

    var carousel = function() {
        $('.home-slider').owlCarousel({
            loop:true,
            autoplay: true,
            margin:0,
            animateOut: 'fadeOut',
            animateIn: 'fadeIn',
            nav:false,
            autoplayHoverPause: false,
            items: 1,
            navText : ["<span class='ion-md-arrow-back'></span>","<span class='ion-chevron-right'></span>"],
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:1
                },
                1000:{
                    items:1
                }
            }
        });
    };
    carousel();

    $('nav .dropdown').hover(function(){
        var $this = $(this);
        $this.addClass('show');
        $this.find('> a').attr('aria-expanded', true);
        $this.find('.dropdown-menu').addClass('show');
    }, function(){
        var $this = $(this);
        $this.removeClass('show');
        $this.find('> a').attr('aria-expanded', false);
        $this.find('.dropdown-menu').removeClass('show');
    });

    $('#dropdown04').on('show.bs.dropdown', function () {
        console.log('show');
    });

    // Scroll
    var scrollWindow = function() {
        $(window).scroll(function(){
            var $w = $(this),
                    st = $w.scrollTop(),
                    navbar = $('.ftco_navbar'),
                    sd = $('.js-scroll-wrap');

            if (st > 150) {
                if ( !navbar.hasClass('scrolled') ) {
                    navbar.addClass('scrolled');    
                }
            } 
            if (st < 150) {
                if ( navbar.hasClass('scrolled') ) {
                    navbar.removeClass('scrolled sleep');
                }
            } 
            if ( st > 350 ) {
                if ( !navbar.hasClass('awake') ) {
                    navbar.addClass('awake');    
                }
                
                if(sd.length > 0) {
                    sd.addClass('sleep');
                }
            }
            if ( st < 350 ) {
                if ( navbar.hasClass('awake') ) {
                    navbar.removeClass('awake');
                    navbar.addClass('sleep');
                }
                if(sd.length > 0) {
                    sd.removeClass('sleep');
                }
            }
        });
    };
    scrollWindow();

    // Counter
    var counter = function() {
        $('#section-counter, .hero-wrap, .ftco-counter, .ftco-about').waypoint( function( direction ) {
            if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {
                var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',');
                $('.number').each(function(){
                    var $this = $(this),
                        num = $this.data('number');
                    $this.animateNumber(
                      {
                        number: num,
                        numberStep: comma_separator_number_step
                      }, 7000
                    );
                });
            }
        } , { offset: '95%' } );
    };
    counter();

    // Content WayPoint Animations
    var contentWayPoint = function() {
        var i = 0;
        $('.ftco-animate').waypoint( function( direction ) {
            if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {
                i++;
                $(this.element).addClass('item-animate');
                setTimeout(function(){
                    $('body .ftco-animate.item-animate').each(function(k){
                        var el = $(this);
                        setTimeout( function () {
                            var effect = el.data('animate-effect');
                            if ( effect === 'fadeIn') {
                                el.addClass('fadeIn ftco-animated');
                            } else if ( effect === 'fadeInLeft') {
                                el.addClass('fadeInLeft ftco-animated');
                            } else if ( effect === 'fadeInRight') {
                                el.addClass('fadeInRight ftco-animated');
                            } else {
                                el.addClass('fadeInUp ftco-animated');
                            }
                            el.removeClass('item-animate');
                        },  k * 50, 'easeInOutExpo' );
                    });
                }, 100);
            }
        } , { offset: '95%' } );
    };
    contentWayPoint();

    // Magnific Popup
    $('.image-popup').magnificPopup({
        type: 'image',
        closeOnContentClick: true,
        closeBtnInside: false,
        fixedContentPos: true,
        mainClass: 'mfp-no-margins mfp-with-zoom', 
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0,1] 
        },
        image: {
            verticalFit: true
        },
        zoom: {
            enabled: true,
            duration: 300 
        }
    });

    $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });

    const numStars = 750;
    const stars = [];
    
    // Create stars and add to the body
    for (let i = 0; i < numStars; i++) {
        const star = document.createElement("div");
        star.classList.add("star");
        document.body.appendChild(star);
        stars.push(star);
    
        // Randomize position of each star
        star.style.left = `${Math.random() * window.innerWidth}px`;
        star.style.top = `${Math.random() * document.body.scrollHeight}px`; // Use document height for full-page coverage
    
        // Randomize size
        const size = Math.random() * 3 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
    }
    
    // Parallax effect: Move stars slowly with mouse movement
    document.addEventListener("mousemove", (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
    
        stars.forEach((star, i) => {
            const depth = (i / numStars) * 10;
            const offsetX = x * depth - depth / 2;
            const offsetY = y * depth - depth / 2;
    
            star.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        });
    });

})(jQuery);