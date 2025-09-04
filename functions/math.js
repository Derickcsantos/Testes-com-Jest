function soma(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number'){
        throw new Error("Os parâmetros devem ser numeros");
    }
    return a + b;
}

function subtrai(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number'){
        throw new Error("Os parâmetros devem ser numeros");
    }
    return a - b;
}

function multiplica(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number'){
        throw new Error("Os parâmetros devem ser numeros");
    }
    return a * b;
}

function divide(a, b){
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error('Parâmetros devem ser números');
    }
    if (b === 0){
        throw new Error("Divisão por zero não é permitida");
    }
    return a / b;
}

module.exports = { soma, subtrai, multiplica, divide };