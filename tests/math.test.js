const { soma, subtrai, multiplica, divide } = require('../functions/math');

describe('Teste das funções matemáticas', () => {

    test('Soma de 2 + 3 deve ser igual a 5', () => {
        expect(soma(2, 3)).toBe(5);
    });

    test('Soma de números negativos', () => {
        expect(soma(-1, -2)).toBe(-3);
    });

    test('Soma deve lançar erro de parametros errados', () => {
        expect(() => soma('a', 2)).toThrow("Os parâmetros devem ser numeros");
    });

    test('Subtrai 5 - 3 e deve dar 2', () => {
        expect(subtrai(5, 3)).toBe(2);
    });

    test('subtrai números negativos', () => {
        expect(subtrai(-1, -2)).toBe(1);
    });

    test('Subtração deve retornar erro no parâmetro', () => {
        expect(() => subtrai('a', 2)).toThrow("Os parâmetros devem ser numeros");
    });

    test('Multiplica 4 x 3 deve retornar 12', () => {
        expect(multiplica(4, 3)).toBe(12);
    });

    test('Multiplica 5 por 0 e o resultado deve ser 0', () => {
        expect(multiplica(5, 0)).toBe(0);
    });

    test('Multiplicação deve retornar erro no parâmetro', () => {
        expect(() => multiplica('a', 2)).toThrow("Os parâmetros devem ser numeros");
    });

    test('Divide 9 por 3', () => {
        expect(divide(9, 3)).toBe(3);
    });

    test('Divisão por zero deve retornar erro', () => {
        expect(() => divide(9, 0)).toThrow("Divisão por zero não é permitida");
    });

    test('Divisão deve retornar erro no parâmetro', () => {
        expect(() => divide('a', 2)).toThrow("Parâmetros devem ser números");
    });
});