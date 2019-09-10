function imagesFunction() {
    document.getElementById("picture-pop").classList.toggle("popShow");
}

window.onclick = function(event) {
  if (!event.target.matches('.picture-button')) {

    var dropitdown = document.getElementsByClassName("picture-pop");
    var i;
    for (i = 0; i < dropitdown.length; i++) {
      var openDropitdown = dropitdown[i];
      if (openDropitdown.classList.contains('popShow')) {
        openDropitdown.classList.remove('popShow');
      }
    }
  }
}

function cleanFunction() {
    document.getElementById("clean-pop").classList.toggle("popShow");
}

window.onclick = function(event) {
  if (!event.target.matches('.clean-button')) {

    var dropitdown = document.getElementsByClassName("clean-pop");
    var i;
    for (i = 0; i < dropitdown.length; i++) {
      var openDropitdown = dropitdown[i];
      if (openDropitdown.classList.contains('popShow')) {
        openDropitdown.classList.remove('popShow');
      }
    }
  }
}

function updateFunction() {
    document.getElementById("update-pop").classList.toggle("popShow");
}

window.onclick = function(event) {
  if (!event.target.matches('.update-button')) {

    var dropitdown = document.getElementsByClassName("update-pop");
    var i;
    for (i = 0; i < dropitdown.length; i++) {
      var openDropitdown = dropitdown[i];
      if (openDropitdown.classList.contains('popShow')) {
        openDropitdown.classList.remove('popShow');
      }
    }
  }
}

$('body').on("click touchstart", "#picture-close", function(e){
   $("#picture-pop").toggleClass('popShow');
});

$('body').on("click touchstart", "#clean-close", function(e){
   $("#clean-pop").toggleClass('popShow');
});

$('body').on("click touchstart", "#update-close", function(e){
   $("#update-pop").toggleClass('popShow');
});

$('.sidebar').click( function() {
    $(".sidebar").toggleClass("hidden");
} );
