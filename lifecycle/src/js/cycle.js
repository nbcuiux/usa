var pre = $('.pre-state');
$(window).scroll(function(){
   if($(window).scrollTop()<3200){
         pre.stop(true,true).fadeIn(300);
   } else {
         pre.stop(true,true).fadeOut(300);
   }
});

var air = $('.on-air-bg');
$(window).scroll(function(){
   if($(window).scrollTop()>3200 && $(window).scrollTop()<4000){
         air.stop(true,true).fadeIn(300);
   } else {
         air.stop(true,true).fadeOut(300);
   }
});

var post = $('.post-state');
$(window).scroll(function(){
   if($(window).scrollTop()>4000){
         post.stop(true,true).fadeIn("slow");
   } else {
         post.stop(true,true).fadeOut("slow");
   }
});
