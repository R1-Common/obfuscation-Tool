document.getElementById("obfuscateButton").addEventListener("click", function() {
    const input = document.getElementById("input").value;
    const obfuscationType = document.getElementById("obfuscationType").value;

    let output;
    switch (obfuscationType) {
        case "random":
            output = randomObfuscate(input);
            break;
        case "reverse":
            output = reverseObfuscate(input);
            break;
        case "secure":
            output = secureObfuscate(input);
            break;
        case "max":
            output = maxObfuscate(input);
            break;
        case "advanced":
            output = advancedObfuscate(input);
            break;
        default:
            output = caesarCipherObfuscate(input, 2);  // Use Caesar Cipher with a shift of +2 by default
    }
    document.getElementById("output").value = output;
});

document.getElementById("copyButton").addEventListener("click", function() {
    const output = document.getElementById("output");
    output.select();
    document.execCommand("copy");
    alert("Copied the text: " + output.value);
});

function randomObfuscate(input) {
    return input;
}

function reverseObfuscate(input) {
    return input;
}

function secureObfuscate(input) {
    return input;
}

function maxObfuscate(input) {
    return input;
}

function advancedObfuscate(input) {
    return input;
}

function caesarCipherObfuscate(input, shift = 13) {
    return input.split('').map(char => {
        const code = char.charCodeAt(0);
        if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122)) {
            const base = (code < 97) ? 65 : 97;
            return String.fromCharCode(((code - base + shift) % 26) + base);
        }
        return char;
    }).join('');
}

function xorCipherObfuscate(input, key = 'secret') {
    return input;
}
