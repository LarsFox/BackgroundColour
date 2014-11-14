var body = document.getElementsByTagName('body')[0],
    boxie = document.getElementById('boxie'),
    inputForm = document.getElementById('inputForm'),
    goButton = document.getElementById('goButton'),
    helpButton = document.getElementById('helpButton'),
    extrasRadios = document.getElementsByName('extrasRadios');

var allow = '0123456789abcdef',
    //hash = '#', // Tumblr needs hash. Somewhy. Add in boxie and body
    black = '000',
    red = 'c00',
    white = 'ffffff';

function choice(item) {
    return item[Math.floor((Math.random()*item.length))];
}

function getRandomColour() {
    colour = '';
    for (i = 0; i < 6; i++) {
        colour += choice(allow);
    }
    return colour
}

// Set random colour at page start.
var previousColour = getRandomColour(),
    currentColour = white;

inputForm.value = ''; // Mozilla remembers the last input
inputForm.placeholder = previousColour;
boxie.style.backgroundColor = previousColour;

function setColour(colour) {
    previousColour = currentColour;
    currentColour = colour;

    boxie.style.backgroundColor = previousColour;
    body.style.backgroundColor = colour;
    inputForm.value = colour;

    resetInputError();
}

// If Error in input:
function checkInputError(string) {
    len = string.length;

    if (len != 6 && len != 3) {
        return true;
    }
    else {
        for (i = 0; i < len; i++) {
            symbol = string.charAt(i);
            if (allow.indexOf(symbol) == -1) {
                return true;
            }
        }
    }

    return false;
}

function showInputError() {
    helpButton.style.color = red;
    body.style.backgroundColor = white;
}

function resetInputError() {
    if (helpButton.style.color != black) {
        helpButton.style.color = black;
    }
}

// Go button usual function:
function processInput() {
    string = inputForm.value.toLowerCase();
    raiseError = checkInputError(string);

    if (raiseError) {
        showInputError();
    }
    else if (string != body.style.backgroundColor) {
        setColour(string);
    }
}

goButton.onclick = processInput;

boxie.onclick = function() {
    setColour(previousColour);
}

// Extras:
var extras = {
    'MouseRandomColour': function() {
        body.onmousemove = function() {
            colour = getRandomColour();
            setColour(colour);
        }
        goButton.disabled = true;
    },
    'GoRandomColour': function() {
        goButton.onclick = function() {
            setColour(getRandomColour());
        }
        goButton.style.fontWeight = 'bold';
    },
    'none': function() {}
}

// unbinding everything
function extrasReset() {
    body.onmousemove = null;

    goButton.onclick = processInput;
    goButton.disabled = false;
    goButton.style.fontWeight = 'normal';

    resetInputError();
}

// binding each radio with its extra
for (var i = 0; i < extrasRadios.length; i++) {
    extrasRadios[i].onchange = function() {
        extrasReset();
        extras[this.value]();
    }
}
