$(document).ready(function() {
    // ========================       Basics:        ========================
    var allow = '0123456789abcdef',
        empty = '',
        black = '000',
        red = 'c00',
        white = 'ffffff',
        previousColours = [];

    function choice(item) {
        return item[Math.floor((Math.random()*item.length))];
    }

    function getRandomColour() {
        colour = '';
        for (var i = 0; i < 6; i++) {
            colour += choice(allow);
        }
        return colour
    }

    // ==============    The main action of the whole page:     =============
    function setColour(colour) {
        /* With each new colour it pushes it in the array,
           colours the background, puts the colour hex in the box,
           and changes the colour of each boxie one by one. */

        previousColours.shift();
        previousColours.push(currentColour);
        currentColour = colour;

        $( 'body' ).css( 'background-color', colour );
        $( '#mainInput' ).val(colour);
        $( '.boxie' ).each(function(index, element) {
            $(element).css( 'background-color', previousColours[index] );
        });

        resetInputError();
    }

    // ==================    Page styling and binding:     ==================
    // Clear the input form and place hint in its background.
    // Also let it change the colour by pressing Enter.
    $( '#mainInput' ).val(empty)
    .attr( 'placeholder', previousColours[-1] )
    .keyup(function(event) {
        if (event.keyCode == 13) {
            setColour( $(this).attr('value') );
        }
    });

    $( '#goButton' ).bind( 'click.regular', regularGoClick );

    $( '#helpButton' ).click(function(){
        $( '#helpPanel' ).slideToggle( 'slow' );
    });

    $( '#extrasButton' ).click(function(){
        $( '#extrasPanel' ).slideToggle( 'slow' );
    });

    // ====================        Go and input:        =====================
    /* Regular Go function, the first one and the only.
       It is connected much with the input, so everything related
       to input is also here. */

    function regularGoClick() {
        string = $( '#mainInput' ).val().toLowerCase();
        raiseError = isInputError(string);

        if (raiseError) {
            showInputError();
        }
        else if (string != $('body').css('background-color')) {
            setColour(string);
        }
    }
    function isInputError(string) {
        len = string.length;

        if (len != 6 && len != 3) { 
            return true;
        }
        else {
            for (i = 0; i < len; i++) {
                if (allow.indexOf(string.charAt(i)) == -1) { 
                    return true;
                }
            }
        }

        return false;
    }

    function showInputError() {
        $('#helpButton').css('color', red);
        $('body').css('background-color', white);
    }

    function resetInputError() {
        if ($('#helpButton').css('color') != black) {
            $('#helpButton').css('color', black);
        }
    }

    // =========================       Extras:       =========================
    var extras = {
        'MouseRandomColour': function() {
            $('body').bind('mousemove.MouseRandomColour', function(){
                colour = getRandomColour();
                setColour(colour);
            });
            $('#goButton').unbind('click.GoRandomColour');
            $('#goButton').attr('disabled', true);
            $('body').bind('mouseup.reset', function(){
                $('input[name=extrasRadios][value=none]').attr('checked', true);
                extrasReset();
            });
        },

        'GoRandomColour': function() {
            $( '#goButton' ).unbind( 'click.regular' );
            $( '#goButton' ).bind( 'click.GoRandomColour', function() {
                setColour(getRandomColour());
            });
        },

        'none': function() {}
    }

    // unbinding extras;
    function extrasReset() {
        $( 'body' ).unbind( 'mousemove.MouseRandomColour' );
        $( 'body' ).unbind( 'mouseup.reset' );
        $( '#goButton' ).unbind( 'click.GoRandomColour' );
        $( '#goButton' ).unbind( 'click.regular', regularGoClick );
        $( '#goButton' ).attr( 'disabled', false );

        $( '#goButton' ).bind( 'click.regular', regularGoClick );
        resetInputError();
    }

    // binding each radio to its own extra
    $('input=[name$="extrasRadios"]').change(function() {
        extrasReset();
        extras[$('input[name=extrasRadios]:checked').val()]();
    });

    // Boxies.
    var currentColour = white;

    $( '#boxiesButton' ).click(function() {
        previousColours = [];
        $( '#boxies' ).html('');

        for (i = 0; i < $( '#boxiesAmount' ).val(); i++) {
            previousColours.push( getRandomColour() );
            $( '<div/>', {
              'class': 'boxie',
              'value': i
            })
            .css( 'background-color', previousColours[i] )
            .appendTo( '#boxies' );
        }

        $(function() {
            $( '.boxie' ).click(function() {
                setColour( previousColours[$(this).attr( 'value' )] );
            });
        });
    });
});