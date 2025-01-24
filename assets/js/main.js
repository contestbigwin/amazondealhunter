"use strict";
document.addEventListener("DOMContentLoaded", function () {

  $(function ($) {

    // preloader
    $("#preloader").delay(300).animate({
      "opacity": "0"
    }, 500, function () {
      $("#preloader").css("display", "none");
    });

   
  
    // Sticky Header
    var fixed_top = $(".header-section");
    if ($(window).scrollTop() > 50) {
      fixed_top.addClass("animated fadeInDown header-fixed");
    }
    else {
      fixed_top.removeClass("animated fadeInDown header-fixed");
    }
    
    // window on scroll function
    $(window).on("scroll", function () {

      // Sticky Header
      if ($(window).scrollTop() > 50) {
        fixed_top.addClass("animated fadeInDown header-fixed");
      }
      else {
        fixed_top.removeClass("animated fadeInDown header-fixed");
      }

      // Odometer Init 
      let windowHeight = $(window).height();
      $('.odometer').children().each(function () {
        if ($(this).isInViewport({ "tolerance": windowHeight, "toleranceForLast": windowHeight, "debug": false })) {
          var section = $(this).closest(".counters");
          section.find(".odometer").each(function () {
            $(this).html($(this).attr("data-odometer-final"));
          });
        }
      });

    });

    // comments-area
    $('.comments-area .reply-btn').on('click', function () {
      $(this).closest(".comments-area").find("form").slideToggle();
    });

    // popular-coupons
    $('.popular-coupons .showDetails').on('click', function () {
      $(this).closest(".single-box").find(".details-area").slideToggle();
    });

    // data background
    $("[data-background]").each(function () {
      $(this).css(
        "background-image",
        "url(" + $(this).attr("data-background") + ")"
      );
    });    

    // Box Style 
    const targetBtn = document.querySelectorAll('.box-style')
    if (targetBtn) {
      targetBtn.forEach((element) => {
        element.addEventListener('mousemove', (e) => {
          const x = e.offsetX + 'px';
          const y = e.offsetY + 'px';
          element.style.setProperty('--x', x);
          element.style.setProperty('--y', y);
        })
      })
    }

    // Password Show Hide
    $('.show-hide-pass').on('click', function () {
      var passwordInput = $($(this).siblings("input"));
      if (passwordInput.attr("type") == "password") {
        passwordInput.attr("type", "text");
      } else {
        passwordInput.attr("type", "password");
      }
    });

    // magnific-popup
    $('.popup-video').magnificPopup({
      type: 'iframe'
    });

    // gridGallery
    $('.popup_img').magnificPopup({
        type:'image',
        gallery:{
            enabled: true
        }
    });
    
    // Navbar Auto Active Class 
    var curUrl = $(location).attr('href');
    var terSegments = curUrl.split("/");
    var desired_segment = terSegments[terSegments.length - 1];
    var removeGarbage = desired_segment.split(".html")[0] + ".html";
    var checkLink = $('.menu-link a[href="' + removeGarbage + '"]');
    var targetClass = checkLink.addClass('active');
    targetClass.parents('.menu-link').addClass('active-parents');
    targetClass.parents('.menu-item').addClass('active-parents');
    targetClass.parents('.menu-item').addClass('onHovered');
    $('.active-parents > button').addClass('active');
    $('.active-parents > button').addClass('onHovered');

    // navbar custom
    $('.navbar-toggle-btn').on('click', function () {
      $('.navbar-toggle-item').slideToggle(300);
      $('body').toggleClass('overflow-hidden');
      $(this).toggleClass('open');
    });
    $('.menu-item button').on('click', function () {
      $(this).parent().siblings().find("ul").slideUp(300);
      $(this).parent().siblings().find("button").removeClass('onHovered');

      $(this).siblings("ul").slideToggle(300);
      $(this).toggleClass('onHovered');
    });
    $('.sub-menus').each(function() {
      if ($(this).parent('.menu-item').hasClass('active-parents')) {
        $(this).css("display", "block");
      }
    });

    // mega Menu Window
    megaMenuWindow();
    $(window).on('resize', function() {
      megaMenuWindow();
    });
    function megaMenuWindow() {
      if ($(window).width() < 992) {
        $('.mega-sub-menu').removeClass('sub-menu');
      } else {
        $('.mega-sub-menu').addClass('sub-menu');
      }
    }

    // get value from range sliders
    const rangeSliders = document.querySelectorAll('.range-slider');
    function updateSlider(slider) {
        const minValue = slider.min;
        const maxValue = slider.max;
        const currentValue = slider.value;
        const valueSpan = slider.closest('.single-range').querySelector('.range-value');
        valueSpan.textContent = `${currentValue}`;
        slider.style.setProperty('--min', minValue);
        slider.style.setProperty('--max', maxValue);
        slider.style.setProperty('--value', currentValue);
        updateTotalValue();
    }
    function updateTotalValue() {
        let totalValue = 0;
        rangeSliders.forEach(slider => {
            totalValue += parseInt(slider.value);
        });
        const totalValueElement = document.querySelector('.total-value');
        totalValueElement.textContent = `$${totalValue}`;
    }
    rangeSliders.forEach(slider => {
        updateSlider(slider);
        slider.addEventListener('input', () => updateSlider(slider));
    });

    // Sidebar Active Page in Viewport
    let iconCapWidget = document.querySelector('.active-parents');
    if(iconCapWidget){
      iconCapWidget.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // collapse toggle 
    var bodyCollapse = $(".header-section.collapse-header");
    function toggleSidebar() {
      $('.header-section .sidebar-icon, .sidebar-wrapper .close-btn').off('click');
      $('.header-section .sidebar-icon, .sidebar-wrapper .close-btn').on('click', function () {
        bodyCollapse.toggleClass("body-collapse");
        $(".collapse-section").toggleClass("body-collapse");
      });
      if ($(window).width() > 1199) {
        bodyCollapse.addClass('body-collapse');
      } else {
        bodyCollapse.removeClass('body-collapse');
      }
    }toggleSidebar();
    $(window).on('resize', function() {
      toggleSidebar();
    });
  
    // Grid List Activator
    const $gridButton = $('.grid-list-btn .grid-active');
    const $listButton = $('.grid-list-btn .list-active');
    const $gridTemplate = $('.grid-list-template');
    function toggleView(view) {
      if (view === 'grid') {
        $gridTemplate.removeClass('active');
        $gridButton.addClass('active');
        $listButton.removeClass('active');
      } else {
        $gridTemplate.addClass('active');
        $listButton.addClass('active');
        $gridButton.removeClass('active');
      }
    }
    $gridButton.on('click', function() {
        toggleView('grid');
    });
    $listButton.on('click', function() {
        toggleView('list');
    }); toggleView('grid');

    // Current Year
    $(".currentYear").text(new Date().getFullYear());

    // sidebar-toggler
    var primarySidebar = $('.sidebar-toggler .sidebar-head');
    $('.sidebar-toggler .toggler-btn').on('click', function () {
      $(this).closest('.sidebar-head').toggleClass('active');
      if (!$('.sidebar-head').hasClass('active')) {
        setTimeout(function () {
          primarySidebar.css("height", "24px");
        }, 550);
      } else {
        primarySidebar.css("height", "100%");
      }
    });

    // sidebar-toggler
    $('.section-sidebar .right-sidebar-btn, .right-sidebar .close-btn').on('click', function () {
      $('.right-sidebar').toggleClass('active');
    });
    
    // Social Item Remove
    $('.social-hide-btn').on('click', function () {
      $(this).parents(".img-area").toggleClass('active');
      if ($('.img-area').hasClass("active")) {
        $('.active .social-hide-btn i').html("remove");
      } else {
        $('.social-hide-btn i').html("add");
      }
    });
    
  

   

    // Custom Tabs
    $(".tabLinks .nav-links").each(function () {
      var targetTab = $(this).closest(".singleTab");
      targetTab.find(".tabLinks .nav-links").each(function () {
        var navBtn = targetTab.find(".tabLinks .nav-links");
        navBtn.on('click mouseover', function () {
          navBtn.removeClass('active');
          $(this).addClass('active');
          var indexNum = $(this).closest("li").index();
          var tabContent = targetTab.find(".tabContents .tabItem");
          $(tabContent).removeClass('active');
          $(tabContent).eq(indexNum).addClass('active');
        });
      });
    });

    // tabLinks add active 
    $('.tabLinks .nav-links').on('mouseenter', function () {
      $(this).addClass('active');
      $('.tabLinks .nav-links').not(this).removeClass('active');
    });

    // copyright item copy and clone
    const copyrightElement = document.querySelector('.copyright');
    const copyrightCloneElement = document.querySelector('.copyright-clone');
    if (copyrightElement && copyrightCloneElement) {
      copyrightCloneElement.innerHTML = copyrightElement.innerHTML;
    }

    // progress-area
    let progressBars = $('.progress-area');
    let observer = new IntersectionObserver(function(progressBars) {
      progressBars.forEach(function(entry, index) {
        if (entry.isIntersecting) {
          let width = $(entry.target).find('.progress-bar').attr('aria-valuenow');
          let count = 0;
          let time = 1000 / width;
          let progressValue = $(entry.target).find('.progress-value');
          setInterval(() => {
            if (count == width) {
              clearInterval();
            } else {
              count += 1;
              $(progressValue).text(count)
            }
          }, time);
          $(entry.target).find('.progress-bar').css({"width": width + "%", "transition": "width 1s linear"});
        }else{
          $(entry.target).find('.progress-bar').css({"width": "0%", "transition": "width 1s linear"});
        }
      });
    });
    progressBars.each(function() {
      observer.observe(this);
    });
    $(window).on('unload', function() {
      observer.disconnect();
    });

    // custom Accordion
    $('.accordion-single .header-area').on('click', function () {
      if ($(this).closest(".accordion-single").hasClass("active")) {
        $(this).closest(".accordion-single").removeClass("active");
        $(this).next(".content-area").slideUp();
      } else {
        $(".accordion-single").removeClass("active");
        $(this).closest(".accordion-single").addClass("active");
        $(".content-area").not($(this).next(".content-area")).slideUp();
        $(this).next(".content-area").slideToggle();
      }
    });

    // Function to filter items
    function applyFilter(filterItem) {
      var filter = filterItem.data('filter');
      $('.filter-list .filter-links').removeClass('active');
      filterItem.find('.filter-links').addClass('active');
      var singleFilter = filterItem.closest('.singleFilter');
      var tabItem = singleFilter.find('.filterItems');
      var filterTags = filter.split(' ');
      tabItem.find('> div').removeClass('active');
      if (filter === '*') {
        tabItem.find('> div').addClass('active');
      } else {
        tabItem.find('> div').each(function() {
          var itemTags = $(this).data('tag').split(' ');
          for (var i = 0; i < filterTags.length; i++) {
            if (itemTags.includes(filterTags[i])) {
              $(this).addClass('active');
              break;
            }
          }
        });
      }
    }
    $('.filter-item.active').each(function() {
      applyFilter($(this));
      $('.filter-item.active').find('.filter-links').addClass('active');
    });
    $('.filter-list li').each(function(index) {
      $(this).on('click', function () {
        applyFilter($(this));
      });
    });

    // text limit 
    $(".text-limit").each(function() {
      var textContainer = $(this);
      var maxLength = parseInt(textContainer.attr("data-text-limit"));
      var text = textContainer.text();
      if (text.length > maxLength) {
        var truncatedText = text.substring(0, maxLength);
        var fullText = text;
        textContainer.empty();
        var textSpan = $('<span class="text-content"></span>');
        textContainer.append(textSpan);
        textSpan.text(truncatedText);
        var readMoreButton = $('<span class="read-more-button ms-1">... Read More</span>');
        textContainer.append(readMoreButton);
        textSpan.text(truncatedText);
        readMoreButton.show();
        readMoreButton.on('click', function() {
          if (textSpan.text() === truncatedText) {
            textSpan.text(fullText);
            readMoreButton.text('See less');
          } else {
            textSpan.text(truncatedText);
            readMoreButton.text('... Read More');
          }
        });
      }
    });
    
    // hover add active 
    $('.hover-active .single-item').on('mouseenter', function () {
      $(this).addClass('active');
      $('.hover-active .single-item').not(this).removeClass('active');
    });

    // Function to update the countdown for all elements
    function updateCountdown() {
      const countdownElements = document.querySelectorAll(".countdown");
      countdownElements.forEach(element => {
        const targetDateString = element.getAttribute("data-date");
        const [day, month, year] = targetDateString.split("-");
        const targetDate = new Date(`${year}-${month}-${day}T00:00:00Z`).getTime();
        const now = new Date().getTime();
        const distance = targetDate - now;
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        const formattedCountdown = `${String(hours).padStart(2, '0')} : ${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`;
        element.innerText = formattedCountdown;
        if (distance < 0) {
          element.innerText = "Countdown Finished";
        }
      });
    }
    const interval = setInterval(updateCountdown, 1000);
    updateCountdown();

    // Dropdown Active Remove
    $("section, .close-btn").on('click', function () {
      $('.single-item').removeClass('active');
    });

  });

});