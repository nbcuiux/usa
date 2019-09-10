$(document).ready(function () {
  $('.nav__container, .overlay').on('click', function (e) {
    $('body').toggleClass('active');
  });
});
