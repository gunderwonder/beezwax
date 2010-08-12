/**
 * Beezwax.load(scriptURL[, callback])
 *  - scriptURL (String): script file to load
 *  - callback (Function): function to call when script has loaded
 * Loads a `<script>` with a specified URL asynchronously
 **/
Beezwax.load = (function() {
	var loadedScripts = [];
	return function load(scriptURL, callback) {
		callback = callback || Function.EMPTY;
		if (loadedScripts.include(scriptURL)) {
			if (callback) callback();
			return Beezwax;
		}
		var script = $E('script', { src : scriptURL, async : 'async' })	;
		if (callback) {
			script.observe(script.readyState ? 'readystatechange' : 'load',
				script.readyState ? function() {
					if (['loaded', 'complete'].include(script.readyState)) {
    	            	script.stopObserving('readystatechange');
    	            	callback();
					}
				} : callback
			);
    	}
		$(document.head).insert(script);
		loadedScripts.push(scriptURL);
	};
})();

/**
 * Beezwax.JSONP(url, callback)
 **/
Beezwax.JSONP = function(url, callback, options) {
	var responder = Beezwax.symbol(),
		options = Object.extend({ responder : 'callback' }, options || {}),
		url = url + (!url.include('?') ? '?' : '&') + options.responder + '=' + responder;
	window[responder] = function(data) { 
		callback(data);
		delete window[responder];
	};
}