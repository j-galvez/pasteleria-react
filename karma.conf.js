module.exports = function (config) {
config.set({
frameworks: ['jasmine'],
files: [
'src/utils/**/*.js', // Incluye la lógica primero
'src/**/*.spec.js', // Luego los archivos de prueba
'src/utils/Login.logic.js',
'src/utils/Login.logic.spec.js'


],
reporters: ['spec'], // Reporter legible
browsers: ['ChromeHeadless'], // Ejecuta en modo invisible
singleRun: true, // Corre una vez y termina
concurrency: Infinity
});
};