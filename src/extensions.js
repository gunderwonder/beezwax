document.head = document.head || document.getElementsByTagName('head')[0];

Function.IDENTITY = Function.IDENTITY || function(x) { return x; };
Function.EMPTY = Function.EMPTY || function() { };

// make sure all console API functions are defined
window.console = window.console || {};
$w('log debug info warn error assert dir dirxml trace' +
' group groupEnd time timeEnd profile profileEnd count').each(function(f) {
	window.console[f] = window.console[f] || Function.EMPTY;
})
