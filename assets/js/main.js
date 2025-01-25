"use strict";
document.addEventListener("DOMContentLoaded", function () {
  $(function ($) {

    // Navbar Toggle Button
    $('.navbar-toggle-btn').on('click', function () {
      $('.navbar-toggle-item').slideToggle(300);
      $('body').toggleClass('overflow-hidden');
      $(this).toggleClass('open');
    });

    // Dropdown Menu Handling
    $('.menu-item button').on('click', function () {
      $(this).parent().siblings().find("ul").slideUp(300); // Close other open menus
      $(this).parent().siblings().find("button").removeClass('onHovered');

      $(this).siblings("ul").slideToggle(300); // Toggle current menu
      $(this).toggleClass('onHovered');
    });

    // Handle active menu states on page load
    var curUrl = $(location).attr('href');
    var terSegments = curUrl.split("/");
    var desired_segment = terSegments[terSegments.length - 1];
    var removeGarbage = desired_segment.split(".html")[0] + ".html";
    var checkLink = $('.menu-link a[href="' + removeGarbage + '"]');
    var targetClass = checkLink.addClass('active');

    targetClass.parents('.menu-link').addClass('active-parents');
    targetClass.parents('.menu-item').addClass('active-parents');
    targetClass.parents('.menu-item').addClass('onHovered');

    // Ensure active dropdowns are visible on page load
    $('.active-parents > button').addClass('active');
    $('.active-parents > button').addClass('onHovered');
    $('.sub-menus').each(function () {
      if ($(this).parent('.menu-item').hasClass('active-parents')) {
        $(this).css("display", "block");
      }
    });

  });
});
