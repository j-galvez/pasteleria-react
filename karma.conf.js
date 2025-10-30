module.exports = function (config) {
config.set({
frameworks: ['jasmine'],
files: [
'src/utils/**/*.js', // Incluye la lógica primero
'src/**/*.spec.js', // Luego los archivos de prueba
'src/utils/Login.logic.js',
'src/utils/Login.logic.spec.js',
  'node_modules/regenerator-runtime/runtime.js',
  'src/utils/Registro.logic.js',      
  'src/utils/Registro.logic.spec.js',
  'src/utils/Producto.logic.js',
  'src/utils/Producto.logic.spec.js',
  'src/utils/Ventas.logic.js',
  'src/utils/Ventas.logic.spec.js'
],
reporters: ['spec'], // Reporter legible
browsers: ['ChromeHeadless'], // Ejecuta en modo invisible
singleRun: true, // Corre una vez y termina
concurrency: Infinity
});
};