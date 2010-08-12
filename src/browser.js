/** section: beezwax browser
 * Beezwax.Window.open([url, options]) -> Window
 * - url (String): URL to open (defaults to `about:blank`)
 * - options (Object | Hash | undefined): a map of window features and the `target`, `replace` arguments
 *  
 * A nicer <a href="https://developer.mozilla.org/en/window.open">`window.open`</a> API.
 **/
Beezwax.Window = {}, Beezwax.Window.open = function(url, options) {
	
	url = url || 'about:blank';
	options = Object.extend({
		status : false,
		toolbar : false, 
		location : false,
		menubar : false,
		directories : false,
		resizable : true,
		scrollbars : true,
		dependent : true,
		centerscreen : false,
		dialog : false,
		minimizable : true,
		height : document.height,
		width : document.width,
		left : null,
		top : null,
		target : '_blank',
		replace : false
	}, options || { });

	function translate(value) {
		if (typeof value == 'boolean')
			return value == true ? 'yes' : 'no';
		return value == null ? '' : value.toString();
	}
	
	options = $H(options).collect(function(option) {
		return option.key + '=' + translate(option.value);
	}).join(',')

	return window.open(url ? url : null, name, options, options.replace);
}

/** section: beezwax browser
 * Beezwax.URL
 * Request URL convenience functions.
 **/
Beezwax.URL = {
	
	/**
	 * Beezwax.URL.GET -> Object
	 * A map of decoded key/value pairs of the current window's URL query part.
	 **/
	GET : (function() {
		var GET = {}

		window.location.search.substring(1).split('&').each(function(part) {
			var keyandvalue = part.split('=');
			GET[window.decodeURIComponent(keyandvalue[0])] = window.decodeURIComponent(keyandvalue[1]);
		});
	
		/**
		 * Beezwax.URL.GET.get(key[, nullvalue]) -> Object
		 * - key(String): the key to retrieve
		 * - nullvalue(Object | undefined): value to return if key does not exist
		 * Retrieves a URL query part value by key. Returns `nullvalue` or null
		 * if the key does not exist.
		 **/
		GET.get = function(key, nullvalue) {
			return key in GET ? GET[key] : nullvalue || null;
		}
		return GET;
	})(),
	
	/**
	 * Beezwax.URL.Hash -> Object
	 * Graceful.
	 **/
	Hash : (function() {
		var hash = window.location.hash,
			listener = null,
			responder = function() { 
				document.fire('hash:change', { hash : Beezwax.URL.Hash.toString() }); 
			};
		
		/**
		 * Beezwax.URL.Hash.observe([pollrate]) -> undefined
		 * - pollrate(Number): polling interval (ignored if `hashchange` event is supported)
		 *                    Defaults to 150 milliseconds.
		 * fires hash:change
		 * Starts listening to changes to the hash string. A global `hash:change` event
		 * is fired when the hash has changed, either by polling with a specified
		 * interval or by listening to the `hashchange` event if supported by the browser.
		 **/
		function observe(pollRate) {
			if ('onhashchange' in window) {
				Event.observe(window, 'hashchange', responder);
				return;
			}
			
			pollRate = pollRate || .15;
			hash = window.location.hash;
			if (hash) responder();			
			if (listener == null) {
				listener = new PeriodicalExecuter(function() {
					if (window.location.hash != hash) 
						responder();
					hash = window.location.hash;
				}, .15);
			}
		}
		
		/**
		 * Beezwax.URL.Hash.stopObserving() -> undefined
		 * Stop observing the hash string.
		 **/
		function stopObserving() {
			if (listener) {
				listener.stop();
				listener = null;
			} else {
				Event.stopObserving(window, 'hashchange', responder);
			}
		}
		
		return {
			observe : observe,
			stopObserving : stopObserving,
			toString : function() {
				return window.location.hash.toString().substring(1);
			}
		}
	}())
}

