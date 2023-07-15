function advancedObfuscate(input) {
    return btoa(unescape(encodeURIComponent(input)));
}

function advancedDeobfuscate(input) {
    return decodeURIComponent(escape(atob(input)));
}

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
            output = input;
    }
    document.getElementById("output").value = output;
});

document.getElementById("deobfuscateButton").addEventListener("click", function() {
    const input = document.getElementById("input").value;
    const obfuscationType = document.getElementById("obfuscationType").value;

    let output;
    switch (obfuscationType) {
        case "advanced":
            output = advancedDeobfuscate(input);
            break;
        default:
            output = input;
    }
    document.getElementById("output").value = output;
});
