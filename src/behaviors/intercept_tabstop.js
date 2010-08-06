/** section: beezwax behavior
 * class Beezwax.Behavior.InterceptTabstop < S2.UI.Behavior
 * 
 * Inserts tab character in textareas and textfields when applied.
 **/
Beezwax.Behavior.InterceptTabstop = Class.create(S2.UI.Behavior, {
	onkeydown : function(event) {
		if (event.keyCode == 9) {
			var selection = this.element.selection(),
				caret = selection.start(),
				content = this.element.getValue();	
			this.element.setValue(content.substring(0, caret) + '\t' + content.substring(caret));
			selection.moveTo(caret + 1);
			event.stop();
		}
	}
});
	
	