/* beezwax.js -- Prototype and Scripty 2 extension library
 * Øystein Riiser Gundersen <oysteinrg@gmail.com>
 */
var Beezwax = { 
	
	/**
	 * Beezwax.namespace(namespace) -> undefined
	 * Define a namespace.
	 *  http://perfectionkills.com/namespacing-made-easy/
	 **/
	namespace : function(namespace) {
		namespace.split('.').inject(window, function(parent, child) {
			return parent[child] = parent[child] || {};
		});
	}
}

//= require "extensions"
//= require "string"
//= require "cookie"
//= require "element"
//= require "utilities"
//= require "ajax"
//= require "behaviors"
