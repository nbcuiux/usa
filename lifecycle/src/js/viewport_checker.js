/*
    Version 1.8.2
    The MIT License (MIT)

    Copyright (c) 2014 Dirk Groenen

    Permission is hereby granted, free of charge, to any person obtaining a copy of
    this software and associated documentation files (the "Software"), to deal in
    the Software without restriction, including without limitation the rights to
    use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
    the Software, and to permit persons to whom the Software is furnished to do so,
    subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.
*/

(function($){
    $.fn.viewportChecker = function(useroptions){
        // Define options and extend with user
        var options = {
            classToAdd: 'visible',
            classToRemove : 'invisible',
            offset: 100,
            repeat: false,
            invertBottomOffset: true,
            callbackFunction: function(elem, action){},
            scrollHorizontal: false
        };
        $.extend(options, useroptions);

        // Cache the given element and height of the browser
        var $elem = this,
            windowSize = {height: $(window).height(), width: $(window).width()},
            scrollElem = ((navigator.userAgent.toLowerCase().indexOf('webkit') != -1 || navigator.userAgent.toLowerCase().indexOf('windows phone') != -1) ? 'body' : 'html');//options.scrollElem;

        /*
         * Main method that checks the elements and adds or removes the class(es)
         */
        this.checkElements = function(){
            var viewportStart, viewportEnd;

            // Set some vars to check with
            if(!options.scrollHorizontal){
                viewportStart = $(scrollElem).scrollTop();
                viewportEnd = (viewportStart + windowSize.height);
            }
            else{
                viewportStart = $(scrollElem).scrollLeft();
                viewportEnd = (viewportStart + windowSize.width);
            }

            // Loop through all given dom elements
            $elem.each(function(){
                var $obj = $(this),
                    objOptions = {},
                    attrOptions = {};

                //  Get any individual attribution data
                if ($obj.data('vp-add-class'))
                    attrOptions.classToAdd = $obj.data('vp-add-class');
                if ($obj.data('vp-remove-class'))
                    attrOptions.classToRemove = $obj.data('vp-remove-class');
                if ($obj.data('vp-offset'))
                    attrOptions.offset = $obj.data('vp-offset');
                if ($obj.data('vp-repeat'))
                    attrOptions.repeat = $obj.data('vp-repeat');
                if ($obj.data('vp-scrollHorizontal'))
                    attrOptions.scrollHorizontal = $obj.data('vp-scrollHorizontal');
                if ($obj.data('vp-invertBottomOffset'))
                    attrOptions.scrollHorizontal = $obj.data('vp-invertBottomOffset');

                // Extend objOptions with data attributes and default options
                $.extend(objOptions, options);
                $.extend(objOptions, attrOptions);

                // If class already exists; quit
                if ($obj.hasClass(objOptions.classToAdd) && !objOptions.repeat){
                    return;
                }

                // Check if the offset is percentage based
                if(String(objOptions.offset).indexOf("%") > 0)
                    objOptions.offset = (parseInt(objOptions.offset) / 100) * windowSize.height;

                // define the top position of the element and include the offset which makes is appear earlier or later
                var elemStart = (!objOptions.scrollHorizontal) ? Math.round( $obj.offset().top ) + objOptions.offset : Math.round( $obj.offset().left ) + objOptions.offset,
                    elemEnd = (!objOptions.scrollHorizontal) ? elemStart + $obj.height() : elemStart + $obj.width();

                if(objOptions.invertBottomOffset)
                    elemEnd -= (objOptions.offset * 2);

                // Add class if in viewport
                if ((elemStart < viewportEnd) && (elemEnd > viewportStart)){

                    // remove class
                    $obj.removeClass(objOptions.classToRemove);

                    $obj.addClass(objOptions.classToAdd);

                    // Do the callback function. Callback wil send the jQuery object as parameter
                    objOptions.callbackFunction($obj, "add");

                // Remove class if not in viewport and repeat is true
                } else if ($obj.hasClass(objOptions.classToAdd) && (objOptions.repeat)){
                    $obj.removeClass(objOptions.classToAdd);

                    // Do the callback function.
                    objOptions.callbackFunction($obj, "remove");
                }
            });

        };

        // Select the correct events
        if( !!('ontouchstart' in window) ){
            // Touchscreen
            $(document).bind("touchmove MSPointerMove pointermove", this.checkElements);
        }
        else{
            // No touchscreen
            $(options.scrollElem ? options.scrollElem : window).bind("scroll", this.checkElements);
        }

        // Always load on window load
        $(window).bind("load", this.checkElements);

        // On resize change the height var
        $(window).resize(function(e){
            windowSize = {height: $(window).height(), width: $(window).width()};
            $elem.checkElements();
        });

        // trigger inital check if elements already visible
        this.checkElements();

        // Default jquery plugin behaviour
        return this;
    };
})(jQuery);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJ2aWV3cG9ydGNoZWNrZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLypcbiAgICBWZXJzaW9uIDEuOC4yXG4gICAgVGhlIE1JVCBMaWNlbnNlIChNSVQpXG5cbiAgICBDb3B5cmlnaHQgKGMpIDIwMTQgRGlyayBHcm9lbmVuXG5cbiAgICBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5IG9mXG4gICAgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpblxuICAgIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG9cbiAgICB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZlxuICAgIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbiAgICBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuICAgIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuICAgIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4qL1xuXG4oZnVuY3Rpb24oJCl7XG4gICAgJC5mbi52aWV3cG9ydENoZWNrZXIgPSBmdW5jdGlvbih1c2Vyb3B0aW9ucyl7XG4gICAgICAgIC8vIERlZmluZSBvcHRpb25zIGFuZCBleHRlbmQgd2l0aCB1c2VyXG4gICAgICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgICAgICAgY2xhc3NUb0FkZDogJ3Zpc2libGUnLFxuICAgICAgICAgICAgY2xhc3NUb1JlbW92ZSA6ICdpbnZpc2libGUnLFxuICAgICAgICAgICAgb2Zmc2V0OiAxMDAsXG4gICAgICAgICAgICByZXBlYXQ6IGZhbHNlLFxuICAgICAgICAgICAgaW52ZXJ0Qm90dG9tT2Zmc2V0OiB0cnVlLFxuICAgICAgICAgICAgY2FsbGJhY2tGdW5jdGlvbjogZnVuY3Rpb24oZWxlbSwgYWN0aW9uKXt9LFxuICAgICAgICAgICAgc2Nyb2xsSG9yaXpvbnRhbDogZmFsc2VcbiAgICAgICAgfTtcbiAgICAgICAgJC5leHRlbmQob3B0aW9ucywgdXNlcm9wdGlvbnMpO1xuXG4gICAgICAgIC8vIENhY2hlIHRoZSBnaXZlbiBlbGVtZW50IGFuZCBoZWlnaHQgb2YgdGhlIGJyb3dzZXJcbiAgICAgICAgdmFyICRlbGVtID0gdGhpcyxcbiAgICAgICAgICAgIHdpbmRvd1NpemUgPSB7aGVpZ2h0OiAkKHdpbmRvdykuaGVpZ2h0KCksIHdpZHRoOiAkKHdpbmRvdykud2lkdGgoKX0sXG4gICAgICAgICAgICBzY3JvbGxFbGVtID0gKChuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkuaW5kZXhPZignd2Via2l0JykgIT0gLTEgfHwgbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLmluZGV4T2YoJ3dpbmRvd3MgcGhvbmUnKSAhPSAtMSkgPyAnYm9keScgOiAnaHRtbCcpO1xuXG4gICAgICAgIC8qXG4gICAgICAgICAqIE1haW4gbWV0aG9kIHRoYXQgY2hlY2tzIHRoZSBlbGVtZW50cyBhbmQgYWRkcyBvciByZW1vdmVzIHRoZSBjbGFzcyhlcylcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuY2hlY2tFbGVtZW50cyA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgdmlld3BvcnRTdGFydCwgdmlld3BvcnRFbmQ7XG5cbiAgICAgICAgICAgIC8vIFNldCBzb21lIHZhcnMgdG8gY2hlY2sgd2l0aFxuICAgICAgICAgICAgaWYoIW9wdGlvbnMuc2Nyb2xsSG9yaXpvbnRhbCl7XG4gICAgICAgICAgICAgICAgdmlld3BvcnRTdGFydCA9ICQoc2Nyb2xsRWxlbSkuc2Nyb2xsVG9wKCk7XG4gICAgICAgICAgICAgICAgdmlld3BvcnRFbmQgPSAodmlld3BvcnRTdGFydCArIHdpbmRvd1NpemUuaGVpZ2h0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgdmlld3BvcnRTdGFydCA9ICQoc2Nyb2xsRWxlbSkuc2Nyb2xsTGVmdCgpO1xuICAgICAgICAgICAgICAgIHZpZXdwb3J0RW5kID0gKHZpZXdwb3J0U3RhcnQgKyB3aW5kb3dTaXplLndpZHRoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gTG9vcCB0aHJvdWdoIGFsbCBnaXZlbiBkb20gZWxlbWVudHNcbiAgICAgICAgICAgICRlbGVtLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICB2YXIgJG9iaiA9ICQodGhpcyksXG4gICAgICAgICAgICAgICAgICAgIG9iak9wdGlvbnMgPSB7fSxcbiAgICAgICAgICAgICAgICAgICAgYXR0ck9wdGlvbnMgPSB7fTtcblxuICAgICAgICAgICAgICAgIC8vICBHZXQgYW55IGluZGl2aWR1YWwgYXR0cmlidXRpb24gZGF0YVxuICAgICAgICAgICAgICAgIGlmICgkb2JqLmRhdGEoJ3ZwLWFkZC1jbGFzcycpKVxuICAgICAgICAgICAgICAgICAgICBhdHRyT3B0aW9ucy5jbGFzc1RvQWRkID0gJG9iai5kYXRhKCd2cC1hZGQtY2xhc3MnKTtcbiAgICAgICAgICAgICAgICBpZiAoJG9iai5kYXRhKCd2cC1yZW1vdmUtY2xhc3MnKSlcbiAgICAgICAgICAgICAgICAgICAgYXR0ck9wdGlvbnMuY2xhc3NUb1JlbW92ZSA9ICRvYmouZGF0YSgndnAtcmVtb3ZlLWNsYXNzJyk7XG4gICAgICAgICAgICAgICAgaWYgKCRvYmouZGF0YSgndnAtb2Zmc2V0JykpXG4gICAgICAgICAgICAgICAgICAgIGF0dHJPcHRpb25zLm9mZnNldCA9ICRvYmouZGF0YSgndnAtb2Zmc2V0Jyk7XG4gICAgICAgICAgICAgICAgaWYgKCRvYmouZGF0YSgndnAtcmVwZWF0JykpXG4gICAgICAgICAgICAgICAgICAgIGF0dHJPcHRpb25zLnJlcGVhdCA9ICRvYmouZGF0YSgndnAtcmVwZWF0Jyk7XG4gICAgICAgICAgICAgICAgaWYgKCRvYmouZGF0YSgndnAtc2Nyb2xsSG9yaXpvbnRhbCcpKVxuICAgICAgICAgICAgICAgICAgICBhdHRyT3B0aW9ucy5zY3JvbGxIb3Jpem9udGFsID0gJG9iai5kYXRhKCd2cC1zY3JvbGxIb3Jpem9udGFsJyk7XG4gICAgICAgICAgICAgICAgaWYgKCRvYmouZGF0YSgndnAtaW52ZXJ0Qm90dG9tT2Zmc2V0JykpXG4gICAgICAgICAgICAgICAgICAgIGF0dHJPcHRpb25zLnNjcm9sbEhvcml6b250YWwgPSAkb2JqLmRhdGEoJ3ZwLWludmVydEJvdHRvbU9mZnNldCcpO1xuXG4gICAgICAgICAgICAgICAgLy8gRXh0ZW5kIG9iak9wdGlvbnMgd2l0aCBkYXRhIGF0dHJpYnV0ZXMgYW5kIGRlZmF1bHQgb3B0aW9uc1xuICAgICAgICAgICAgICAgICQuZXh0ZW5kKG9iak9wdGlvbnMsIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgICQuZXh0ZW5kKG9iak9wdGlvbnMsIGF0dHJPcHRpb25zKTtcblxuICAgICAgICAgICAgICAgIC8vIElmIGNsYXNzIGFscmVhZHkgZXhpc3RzOyBxdWl0XG4gICAgICAgICAgICAgICAgaWYgKCRvYmouaGFzQ2xhc3Mob2JqT3B0aW9ucy5jbGFzc1RvQWRkKSAmJiAhb2JqT3B0aW9ucy5yZXBlYXQpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIG9mZnNldCBpcyBwZXJjZW50YWdlIGJhc2VkXG4gICAgICAgICAgICAgICAgaWYoU3RyaW5nKG9iak9wdGlvbnMub2Zmc2V0KS5pbmRleE9mKFwiJVwiKSA+IDApXG4gICAgICAgICAgICAgICAgICAgIG9iak9wdGlvbnMub2Zmc2V0ID0gKHBhcnNlSW50KG9iak9wdGlvbnMub2Zmc2V0KSAvIDEwMCkgKiB3aW5kb3dTaXplLmhlaWdodDtcblxuICAgICAgICAgICAgICAgIC8vIGRlZmluZSB0aGUgdG9wIHBvc2l0aW9uIG9mIHRoZSBlbGVtZW50IGFuZCBpbmNsdWRlIHRoZSBvZmZzZXQgd2hpY2ggbWFrZXMgaXMgYXBwZWFyIGVhcmxpZXIgb3IgbGF0ZXJcbiAgICAgICAgICAgICAgICB2YXIgZWxlbVN0YXJ0ID0gKCFvYmpPcHRpb25zLnNjcm9sbEhvcml6b250YWwpID8gTWF0aC5yb3VuZCggJG9iai5vZmZzZXQoKS50b3AgKSArIG9iak9wdGlvbnMub2Zmc2V0IDogTWF0aC5yb3VuZCggJG9iai5vZmZzZXQoKS5sZWZ0ICkgKyBvYmpPcHRpb25zLm9mZnNldCxcbiAgICAgICAgICAgICAgICAgICAgZWxlbUVuZCA9ICghb2JqT3B0aW9ucy5zY3JvbGxIb3Jpem9udGFsKSA/IGVsZW1TdGFydCArICRvYmouaGVpZ2h0KCkgOiBlbGVtU3RhcnQgKyAkb2JqLndpZHRoKCk7XG5cbiAgICAgICAgICAgICAgICBpZihvYmpPcHRpb25zLmludmVydEJvdHRvbU9mZnNldClcbiAgICAgICAgICAgICAgICAgICAgZWxlbUVuZCAtPSAob2JqT3B0aW9ucy5vZmZzZXQgKiAyKTtcblxuICAgICAgICAgICAgICAgIC8vIEFkZCBjbGFzcyBpZiBpbiB2aWV3cG9ydFxuICAgICAgICAgICAgICAgIGlmICgoZWxlbVN0YXJ0IDwgdmlld3BvcnRFbmQpICYmIChlbGVtRW5kID4gdmlld3BvcnRTdGFydCkpe1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBjbGFzc1xuICAgICAgICAgICAgICAgICAgICAkb2JqLnJlbW92ZUNsYXNzKG9iak9wdGlvbnMuY2xhc3NUb1JlbW92ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgJG9iai5hZGRDbGFzcyhvYmpPcHRpb25zLmNsYXNzVG9BZGQpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIERvIHRoZSBjYWxsYmFjayBmdW5jdGlvbi4gQ2FsbGJhY2sgd2lsIHNlbmQgdGhlIGpRdWVyeSBvYmplY3QgYXMgcGFyYW1ldGVyXG4gICAgICAgICAgICAgICAgICAgIG9iak9wdGlvbnMuY2FsbGJhY2tGdW5jdGlvbigkb2JqLCBcImFkZFwiKTtcblxuICAgICAgICAgICAgICAgIC8vIFJlbW92ZSBjbGFzcyBpZiBub3QgaW4gdmlld3BvcnQgYW5kIHJlcGVhdCBpcyB0cnVlXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICgkb2JqLmhhc0NsYXNzKG9iak9wdGlvbnMuY2xhc3NUb0FkZCkgJiYgKG9iak9wdGlvbnMucmVwZWF0KSl7XG4gICAgICAgICAgICAgICAgICAgICRvYmoucmVtb3ZlQ2xhc3Mob2JqT3B0aW9ucy5jbGFzc1RvQWRkKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBEbyB0aGUgY2FsbGJhY2sgZnVuY3Rpb24uXG4gICAgICAgICAgICAgICAgICAgIG9iak9wdGlvbnMuY2FsbGJhY2tGdW5jdGlvbigkb2JqLCBcInJlbW92ZVwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIFNlbGVjdCB0aGUgY29ycmVjdCBldmVudHNcbiAgICAgICAgaWYoICEhKCdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdykgKXtcbiAgICAgICAgICAgIC8vIFRvdWNoc2NyZWVuXG4gICAgICAgICAgICAkKGRvY3VtZW50KS5iaW5kKFwidG91Y2htb3ZlIE1TUG9pbnRlck1vdmUgcG9pbnRlcm1vdmVcIiwgdGhpcy5jaGVja0VsZW1lbnRzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgLy8gTm8gdG91Y2hzY3JlZW5cbiAgICAgICAgICAgICQod2luZG93KS5iaW5kKFwic2Nyb2xsXCIsIHRoaXMuY2hlY2tFbGVtZW50cyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBbHdheXMgbG9hZCBvbiB3aW5kb3cgbG9hZFxuICAgICAgICAkKHdpbmRvdykuYmluZChcImxvYWRcIiwgdGhpcy5jaGVja0VsZW1lbnRzKTtcblxuICAgICAgICAvLyBPbiByZXNpemUgY2hhbmdlIHRoZSBoZWlnaHQgdmFyXG4gICAgICAgICQod2luZG93KS5yZXNpemUoZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICB3aW5kb3dTaXplID0ge2hlaWdodDogJCh3aW5kb3cpLmhlaWdodCgpLCB3aWR0aDogJCh3aW5kb3cpLndpZHRoKCl9O1xuICAgICAgICAgICAgJGVsZW0uY2hlY2tFbGVtZW50cygpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyB0cmlnZ2VyIGluaXRhbCBjaGVjayBpZiBlbGVtZW50cyBhbHJlYWR5IHZpc2libGVcbiAgICAgICAgdGhpcy5jaGVja0VsZW1lbnRzKCk7XG5cbiAgICAgICAgLy8gRGVmYXVsdCBqcXVlcnkgcGx1Z2luIGJlaGF2aW91clxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xufSkoalF1ZXJ5KTsiXSwiZmlsZSI6InZpZXdwb3J0Y2hlY2tlci5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
