$(document).ready(function(){

    $('#helpButton').click(function(){
        $('#helpPanel').slideToggle('slow');
    });

    $('#extrasButton').click(function(){
        $('#extrasPanel').slideToggle('slow');
    });

    $('#inputForm').keyup(function(event) {
        if (event.keyCode == 13) {
            $('body').css('background-color', $('#inputForm').val());
        }
    });
});