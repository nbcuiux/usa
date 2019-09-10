$('div.additional-trigger').click(function() {
  $(this).toggleClass('active');
  $(this).find('div.additionalShow').toggle();
});

$('div.cycle-trigger').click(function() {
  $(this).toggleClass('active');
  $(this).find('div.additionalShow').toggle();
});

$(document).ready(function () {
  $('.cycle-post').on('click', function (e) {
    $(this).find('.post-content').addClass('more');
  });
});

$(document).ready(function () {
  $('.nav__container, .overlay').on('click', function (e) {
    $('body').toggleClass('active');
  });
});
