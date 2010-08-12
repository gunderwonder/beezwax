/**
 * Beezwax.Cookie
 * Store JSON encoded Javascript values easily.
 **/
Beezwax.Cookie = {
	
	COOKIE_TEMPLATE : "#{key}=#{json};expires=#{expiry};path=#{path};domain=#{domain}",
	
	// format cookie date string
	_expiryDate : function(seconds) {
		return new Date(new Date().getTime() + seconds * 1000).toGMTString();
	},
	
	/**
 	 * Beezwax.Cookie.remove(key, value[, options]) -> Object
 	 * - key (String):
 	 * - value (Object | String | Number | Array):
 	 * - options (Object | Hash):
 	 **/
	set : function(key, value, options) { with(Beezwax.Cookie) {
		options = Object.extend({
			expiry : 3600 * 365,
			path : '/',
			domain : ''
		}, options || {});
		
		document.cookie = COOKIE_TEMPLATE.interpolate({
			key : key,
			json : value != null ? window.escape(Object.toJSON(value)) : '',
			expiry : _expiryDate(options.expiry),
			path : options.path,
			domain : options.domain
		});
		return value;
	}},
	
	/**
 	 * Beezwax.Cookie.remove(key) -> Object
 	 * - key (String):
 	 **/
	remove : function(key) { with(Beezwax.Cookie) {
		var value = get(key);
		set(key, null, { expiry : -3600 });
		return value;
	}},
	
	/**
 	 * Beezwax.Cookie.get(key[, fallback]) -> Object
 	 * - key (String):
 	 * - fallback (Object):
 	 **/
	get : function(key, fallback) {
		fallback = fallback || null;
		try {
			var cookie = document.cookie.match(key + '=(.*?)(;|$)');
			return cookie ? window.unescape(cookie[1]).evalJSON() : fallback;
		} catch (e) { 
			return fallback; 
		}
	}
}
