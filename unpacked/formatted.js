wait();
function wait() {
	var i = Models.Board.get(id);
	if(!i || !i.isReady || !i.listList.models || i.listList.models.length == 0) {
		//console.log(id);
		setTimeout(wait, 100);
	} else {
		init();
	}
}

function init() {
	var i = Models.Board.get(id);
	$.each(i.listList.models,function(a,b) {
		if(!b.view) {
			//console.log('FAIL 1');
			setTimeout(init,100)
			return false;
		}
		var menu = $(b.view.el).find('.js-open-list-menu');
		//console.log(b);
		if(menu.length == 0) {
			//console.log('FAIL 2');
		}
		menu.bind('click',function(){
			setTimeout(function(){addLink(b.cardList,$(b.view.el).find('.ui-sortable'));}, 10);
		});
	});
}

function disableReOrder(e) {
	$(e.delegateTarget).sortable('cancel');
}

function addLink(cardList,sortable)  {
	var box =$(document).find('.pop-over .content');
	if (box.length == 0) {
		setTimeout(function(){addLink(cardList,sortable);}, 10);
		return false;
	}
	
	/*
	*** This portion of the plugin would add a List Action to save the sorted card positions within Trello.
	*** It has been commented out because of performance and server abuse issues, especially with large lists.

	$(box).append( $('<div></div>')
		.append( $('<ul class="pop-over-list"></ul>')
			.append ($('<li></li>')
				.append($('<a >Save Card Positions</a>')
					.click(function() {
						var positions = new Array();
						$.each(cardList.models, function(index,card) {
							positions[positions.length]=card.attributes.pos;
						});
						positions.sort(function(a,b){return a-b;})

						for(var i=0;i<cardList.models.length;i++) {
							if(cardList.models[i].attributes.pos != positions[i]) {
								cardList.models[i].set('pos',positions[i]);
								cardList.models[i].save();
								console.log(cardList.models[i])
							}
						}

						$(document).find('.js-close-popover').trigger('click');						
					})
				)
			)
		)
	);
	
	*/
	
	$(box).append('<br><div class="header clearfix"><span class="header-title">Sort</span></div>');
	$(box).append( $('<div></div>')
		.append( $('<ul class="pop-over-list"></ul>')
			.append ($('<li></li>')
				.append($('<a >None</a>')
					.click(function() {
						cardList.comparator = function(a){return a.get('pos') || 0};
						cardList.trigger('change:pos');
						sortable.unbind('sortstop',disableReOrder)
						$(document).find('.js-close-popover').trigger('click');
					})
				)
			)
			.append ($('<li></li>')
				.append($('<a >Due Date</a>')
					.click(function() {
						cardList.comparator = function(a){return a.attributes.badges.due || 'Z'};
						cardList.trigger('change:pos');
						sortable.bind('sortstop',disableReOrder)
						$(document).find('.js-close-popover').trigger('click');
					})
				)
			)
			.append ($('<li></li>')
				.append($('<a >Number of Votes</a>')
					.click(function() {
						cardList.comparator = function(a){return -a.attributes.idMembersVoted.length};
						cardList.trigger('change:pos');
						sortable.bind('sortstop',disableReOrder)
						$(document).find('.js-close-popover').trigger('click');
					})
				)
			)
			.append ($('<li></li>')
				.append($('<a >Last Activity</a>')
					.click(function() {
						cardList.comparator = function(a){return a.attributes.dateLastActivity};
						cardList.trigger('change:pos');
						sortable.bind('sortstop',disableReOrder)
						$(document).find('.js-close-popover').trigger('click');
					})
				)
			)
			.append ($('<li></li>')
				.append($('<a >Card #</a>')
					.click(function() {
						cardList.comparator = function(a){return a.attributes.idShort};
						cardList.trigger('change:pos');
						sortable.bind('sortstop',disableReOrder)
						$(document).find('.js-close-popover').trigger('click');
					})
				)
			)
		)
	);
}
