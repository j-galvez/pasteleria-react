// 📦 src/utils/Tortas.logic.spec.js
// ==========================================================
// Pruebas unitarias Jasmine para Tortas.logic.js
// ==========================================================

// Asegura que el objeto de lógica exista
describe('TortasLogic.agregarTortaAlCarrito', function () {
  let agregarAlCarritoMock;

  beforeEach(function () {
    agregarAlCarritoMock = jasmine.createSpy('agregarAlCarrito');
  });

  // ✅ Caso 1: entrada válida
  it('debería agregar la torta correctamente cuando los parámetros son válidos', function () {
    const resultado = window.TortasLogic.agregarTortaAlCarrito(
      agregarAlCarritoMock,
      'Torta Cuadrada Chocolate',
      45000
    );

    expect(agregarAlCarritoMock).toHaveBeenCalledWith('Torta Cuadrada Chocolate', 45000);
    expect(resultado).toContain('✅ Torta Cuadrada Chocolate agregada al carrito');
  });

  // ⚠ Caso 2: función inválida
  it('debería retornar error si agregarAlCarrito no es una función', function () {
    const resultado = window.TortasLogic.agregarTortaAlCarrito(
      null,
      'Torta Vainilla',
      40000
    );

    expect(resultado).toBe('Error: agregarAlCarrito no es una función válida.');
  });

  // ⚠ Caso 3: nombre inválido
  it('debería retornar error si el nombre es vacío o no es string', function () {
    const resultado = window.TortasLogic.agregarTortaAlCarrito(
      agregarAlCarritoMock,
      '',
      40000
    );

    expect(resultado).toBe('Error: nombre inválido.');
  });

  // ⚠ Caso 4: precio inválido
  it('debería retornar error si el precio no es numérico o menor a 0', function () {
    const resultado = window.TortasLogic.agregarTortaAlCarrito(
      agregarAlCarritoMock,
      'Torta Falsa',
      -500
    );

    expect(resultado).toBe('Error: precio inválido.');
  });
});
