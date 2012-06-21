/*************************************** hooks.js ***************************************************
** The main problem with Trello plugins is that if they modify the DOM structure at all, those
** modifications are lost when Trello updates itself.
**
** This plugin modifies the faces of cards,and there are actually quite a few circumstances where
** the modifcations are lost.  This script is an attempt to detect all of those circumstances, either
** by binding to Trello triggers or overriding Trello functions, and trigger custom events that can
** be used by other parts of the plugin (or other plugins).
**
** So far the generated triggers are:
**	boardReady		(board.view is defined)
**	cardsReady		(All cards are loaded)
**	cardRendered	(Trello has changed the face of the card)
*****************************************************************************************************/

var id=location.href.replace(/.*\//,'');
id=id.replace(/#/,'');
code = '(function(){';
code += 'var id=\''+id+'\';';

/************************************ Minified Code **************************************************
** This code has been minified so that it can be injected into the page and run in Trello's environment.
** I use http://jscompress.com/
******************************************************************************************************/

code += 'function modify_board(){if(!Models.Notification||!Models.Card||!Models.Board.get(id)){setTimeout(modify_board,100);return false}(function(){var a=Models.Notification.add;Models.Notification.add=function(){var b=a.apply(this,arguments);if(Models.Board.get(id))Models.Board.get(id).view.renderLists();return b}})();(function(){var a=Models.Card.add;Models.Card.add=function(){var b=a.apply(this,arguments);modify_card(arguments[0].id);return b}})();Models.Notification.bind("change",function(a){Models.Board.get(id).view.renderLists()})}function modify_card(a){var b=Models.Card.get(a);if(!b.view){setTimeout(function(){modify_card(a)},100);return}(function(){var a=b.view.render;b.view.render=function(){var c=a.apply(this,arguments);$(document).trigger("cardRendered",[b.id]);return c}})();(function(){var a=b.ready;b.ready=function(){b.view.render()}})();(function(){var a=b.update;b.update=function(){var c=a.apply(this,arguments);b.view.render();return c}})();b.view.render()}function waitBoardReady(){var a=Models.Board.get(id);if(!a||!a.view){setTimeout(waitBoardReady,100);return false}else{$(document).trigger("boardReady");waitCardsReady()}}function waitCardsReady(){var a=Models.Board.get(id);var b=true;$.each(a.listList.models,function(a,c){if(!c.view){b=false;return false}$.each(c.cardList.models,function(a,c){if(!c.view){b=false;return false}});if(!b)return false});if(b){$(document).trigger("cardsReady")}else{setTimeout(waitCardsReady,100)}}$(document).bind("cardsReady",function(){modify_board();$.each(Models.Board.get(id).listList.models,function(a,b){$.each(b.cardList.models,function(a,b){modify_card(b.id)})})});waitBoardReady()';

code += '})()';

if(document.getElementById('pluginHooks') == null){
	var script=document.createElement('script');
	script.setAttribute('id','pluginHooks');
	script.innerHTML = code;
	document.getElementsByTagName('head').item(0).appendChild(script);
	document.getElementById('pluginHooks').className = id;
} else if ( document.getElementById('pluginHooks').className != id) {
	location=location;
}

/********************************* Non-Minified Code ************************************************
** Notes:
**    all instances of \ need to be replaced with \\ 
**    the code will go between single quotes, so single quotes should be avoided within the code.
**    if a single quote can't be avoided, it needs to be escaped after minification
*****************************************************************************************************/

/*

$(document).bind('cardsReady',
	function() {
		// Prepare the Board for the plugin
		modify_board();

		// Prepare the Cards for the plugin
		$.each( Models.Board.get(id).listList.models, function(index,list) {
			$.each( list.cardList.models,function(index,card) {
				modify_card(card.id);
			});
		});
	}
);



// Override the board-level Trello functions that would normally cause the modifications to disappear.
function modify_board() {

	// If the card.view isn't ready yet, try again in 100ms
	if (!Models.Notification || !Models.Card || !Models.Board.get(id) ) {
		setTimeout(modify_board,100);
		return false;
	}

	// Cards are re-drawn when notifcations appear
	(function() {
		var proxied = Models.Notification.add
		Models.Notification.add = function() {
			var v = proxied.apply(this, arguments);
			if( Models.Board.get(id) )
			Models.Board.get(id).view.renderLists()
			return v;
		 };
	})();
	
	// Cards are re-drawn when notifcations are cleared
	(function() {
		var proxied = Models.Card.add
		Models.Card.add = function() {
			var v = proxied.apply(this, arguments);
			modify_card(arguments[0].id);
			return v;
		 };
	})();
	
	// Cards are re-drawn when notifications are cleared.  Instead of overriding a function, this one
	// can be done by binding to an event.  Binding to events is preferable whenever possible.
	Models.Notification.bind("change",function(e){
		Models.Board.get(id).view.renderLists();
	})

}

// Override the card-level Trello functions that would normally cause the modicications to disappear.
function modify_card(card_id) {
	var card = Models.Card.get(card_id);
	
	// If the card.view isn't ready yet, try again in 100ms
	if (!card.view) {
		setTimeout( function(){modify_card(card_id)},100 );
		return;
	}

	// Override card.view.render() to allow modifications to be shown on the cards.
	(function() {
		var proxied = card.view.render;
		card.view.render = function() {
			var v = proxied.apply(this, arguments);
			$(document).trigger('cardRendered',[card.id]);
			return v;
		};
	})();	
	
		
	//Disabling this one completely allows the card to keep focus even as the list is changed.
	(function() {
		var proxied = card.ready
		card.ready = function() {
			//var v = proxied.apply(this, arguments);
			card.view.render();
			//return card;
		 };
	})();
	
	(function() {
		var proxied = card.update
		card.update = function() {
			var v = proxied.apply(this, arguments);
			card.view.render();
			return v
		 };
	})();

	card.view.render();
}

// Wait for the models to be ready.
// There must be a Trello trigger or function that can be used instead of looping.
// It's just a matter of finding it...
waitBoardReady();
function waitBoardReady() {
	var i = Models.Board.get(id);
	if(!i || !i.view) {
		setTimeout(waitBoardReady, 100);
		return false;
	} else {
		$(document).trigger('boardReady');
		waitCardsReady();
	}
}
function waitCardsReady() {
	var i = Models.Board.get(id);
	var ready = true;
	
	$.each(i.listList.models,function(a,b) {
		if(!b.view) {
			ready = false;
			return false;
		}
		
		$.each(b.cardList.models,function(c,d) {
			if(!d.view) {
				ready = false;
				return false;
			}
		});
		
		if(!ready)
			return false;
	});
	
	if(ready) {
		$(document).trigger('cardsReady');
	} else {
		setTimeout(waitCardsReady, 100);
	}
}
*/

