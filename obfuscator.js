document.getElementById("obfuscateButton").addEventListener("click", function () {
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

document.getElementById("copyButton").addEventListener("click", function () {
    const output = document.getElementById("output");
    output.select();
    document.execCommand("copy");
    alert("Copied the text: " + output.value);
});

function randomObfuscate(input) {
    return input.split('').sort(function () { return 0.5 - Math.random() }).join('');
}

function reverseObfuscate(input) {
    return input.split("").reverse().join("");
}

function secureObfuscate(input) {
    let output = '';
    for (let i = 0; i < input.length; i++) {
        output += input.charCodeAt(i).toString(16);
    }
    return output;
}

function maxObfuscate(input) {
    return secureObfuscate(reverseObfuscate(input));
}

function advancedObfuscate(input) {
    let obfuscationFunctions = [
        randomObfuscate,
        reverseObfuscate,
        secureObfuscate,
        maxObfuscate,
        unicodeEscapeObfuscate,
        hexadecimalObfuscate,
        caesarCipherObfuscate,
        xorCipherObfuscate,
    ];

    let seed = 123456789;
    const m = Math.pow(2, 32);
    const a = 1103515245;
    const c = 12345;
    const prng = () => {
        seed = (a * seed + c) % m;
        return seed / m;
    };

    const lines = input.split('\n');
    let obfuscatedLines = [];
    let variableMapping = {};
    let tempVarCount = 0;

    lines.forEach(line => {
        if (line.trim() === '') {
            obfuscatedLines.push(line);
            return;
        }

        const match = line.match(/(\w+)\s*=\s*(.+)/);
        if (match) {
            const originalVarName = match[1];
            const newVarName = 'var' + (tempVarCount++);
            variableMapping[originalVarName] = newVarName;
            line = line.replace(originalVarName, newVarName);
        }

        const randomIndex = Math.floor(prng() * obfuscationFunctions.length);
        const obfuscationFunction = obfuscationFunctions[randomIndex];
        line = obfuscationFunction(line);

        obfuscatedLines.push(line);

        // Inserting nonsense code
        const nonsenseCount = Math.floor(prng() * 3); // You can modify this number to control the number of nonsense lines added
        for (let i = 0; i < nonsenseCount; i++) {
            obfuscatedLines.push(addNonsenseCode());
        }
    });

    obfuscatedLines = obfuscatedLines.map(line => {
        Object.keys(variableMapping).forEach(oldVar => {
            const newVar = variableMapping[oldVar];
            line = line.replace(new RegExp(`\\b${oldVar}\\b`, 'g'), newVar);
        });
        return line;
    });

    return obfuscatedLines.join('\n');
}

function unicodeEscapeObfuscate(input) {
    let output = '';
    for (let i = 0; i < input.length; i++) {
        output += '\\u' + ('0000' + input.charCodeAt(i).toString(16)).slice(-4);
    }
    return output;
}

function hexadecimalObfuscate(input) {
    let output = '';
    for (let i = 0; i < input.length; i++) {
        output += ('00' + input.charCodeAt(i).toString(16)).slice(-2);
    }
    return output;
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
    const keyLength = key.length;
    return input.split('').map((char, index) => {
        const charCode = char.charCodeAt(0) ^ key.charCodeAt(index % keyLength);
        return String.fromCharCode(charCode);
    }).join('');
}

function addNonsenseCode() {
    const variableNames = ['foo', 'bar', 'baz', 'qux', 'quux', 'corge', 'grault', 'garply', 'waldo', 'fred', 'plugh', 'xyzzy', 'thud'];
    const operators = ['+', '-', '*', '/', '%', '==', '!=', '===', '!==', '&&', '||'];
    const values = [true, false, null, undefined, 0, 1, '', 'lorem ipsum', [], {}, function () { }];

    const variableName = variableNames[Math.floor(Math.random() * variableNames.length)];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    const value = JSON.stringify(values[Math.floor(Math.random() * values.length)]);

    return `var ${variableName} = ${value};\n${variableName} ${operator} ${value};`;
}
