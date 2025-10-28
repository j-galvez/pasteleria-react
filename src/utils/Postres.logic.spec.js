// 📦 src/utils/Postres.logic.spec.js
// ==========================================================
// Pruebas unitarias Jasmine para Postres.logic.js
// ==========================================================

describe('PostresLogic.agregarPostreAlCarrito', function () {
  let agregarAlCarritoMock;

  beforeEach(function () {
    // Se crea un mock de la función del hook
    agregarAlCarritoMock = jasmine.createSpy('agregarAlCarrito');
  });

  // ✅ Caso 1: Parámetros válidos
  it('debería agregar correctamente el postre cuando los parámetros son válidos', function () {
    const resultado = window.PostresLogic.agregarPostreAlCarrito(
      agregarAlCarritoMock,
      'Brownie Sin Gluten',
      4000
    );

    expect(agregarAlCarritoMock).toHaveBeenCalledWith('Brownie Sin Gluten', 4000);
    expect(resultado).toContain('✅ Brownie Sin Gluten agregado al carrito');
  });

  // ⚠ Caso 2: agregarAlCarrito inválido
  it('debería retornar un error si agregarAlCarrito no es una función', function () {
    const resultado = window.PostresLogic.agregarPostreAlCarrito(
      null,
      'Tiramisú Clásico',
      5500
    );
    expect(resultado).toBe('Error: agregarAlCarrito no es una función válida.');
  });

  // ⚠ Caso 3: nombre inválido
  it('debería retornar un error si el nombre está vacío o no es string', function () {
    const resultado = window.PostresLogic.agregarPostreAlCarrito(
      agregarAlCarritoMock,
      '',
      5000
    );
    expect(resultado).toBe('Error: nombre inválido.');
  });

  // ⚠ Caso 4: precio inválido
  it('debería retornar un error si el precio es menor o igual a cero o no numérico', function () {
    const resultado = window.PostresLogic.agregarPostreAlCarrito(
      agregarAlCarritoMock,
      'Empanada de Manzana',
      -100
    );
    expect(resultado).toBe('Error: precio inválido.');
  });
});
