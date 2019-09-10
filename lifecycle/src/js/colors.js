var colors = ['#71cdf4', '#fab83c', '#b3064b', '#180d0d', '#b3064b'];
var active = 0;
setInterval(function(){

    jQuery('.colors').css('background',colors[active]);
    active++;
    if (active == colors.length) active = 0;
}, 5000);
