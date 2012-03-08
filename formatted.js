wait();
function wait() {
	id=location.href.replace(/.*\//,'')
	i = Models.Board.get(id);
	if(!i || !i.isReady || !i.listList.models ) {
		//console.log(id);
		setTimeout(wait, 100);
	} else {
		init();
	}
}

function init() {
	id=location.href.replace(/.*\//,'')
	i = Models.Board.get(id);
	$.each(i.listList.models,function(a,b) {
		if(!b.view) {
			//console.log('FAIL 1');
			setTimeout(init,100)
			return false;
		}
		var menu = $(b.view.el).find('.js-open-list-menu');
		//console.log(menu);
		if(menu.length == 0) {
			//console.log('FAIL 2');
		}
		menu.bind('click',function(){
			setTimeout(function(){addLink(b.cardList,$(b.view.el).find('.ui-sortable'));}, 10);
		});
	});
}


function addLink(cardList,sortable)  {
	var box =$(document).find('.pop-over .content');
	if ((box).length == 0) {
		setTimeout(function(){addLink(cardList,sortable);}, 10);
		return false;
		//console.log(box);
	}
	
	$(box).append('<br><div class="header clearfix"><span class="header-title">Sort</span></div>');
	$(box).append( $('<div></div>')
		.append( $('<ul class="pop-over-list"></ul>')
			.append ($('<li></li>')
				.append($('<a >None</a>')
					.click(function() {
						cardList.comparator = function(a){return a.get('pos') || 0};
						cardList.trigger('change:pos');
						sortable.sortable('option','disabled',false);
						$(document).find('.js-close-popover').trigger('click');
					})
				)
			)
			.append ($('<li></li>')
				.append($('<a >Due Date</a>')
					.click(function() {
						cardList.comparator = function(a){return a.attributes.badges.due};
						cardList.trigger('change:pos');
						sortable.sortable('option','disabled',true);
						$(document).find('.js-close-popover').trigger('click');
					})
				)
			)
			.append ($('<li></li>')
				.append($('<a >Number of Votes</a>')
					.click(function() {
						cardList.comparator = function(a){return -a.attributes.idMembersVoted.length};
						cardList.trigger('change:pos');
						sortable.sortable('option','disabled',true);
						$(document).find('.js-close-popover').trigger('click');
					})
				)
			)
			.append ($('<li></li>')
				.append($('<a >Last Activity</a>')
					.click(function() {
						cardList.comparator = function(a){return a.attributes.dateLastActivity};
						cardList.trigger('change:pos');
						sortable.sortable('option','disabled',true);
						$(document).find('.js-close-popover').trigger('click');
					})
				)
			)
			.append ($('<li></li>')
				.append($('<a >Card #</a>')
					.click(function() {
						cardList.comparator = function(a){return a.attributes.idShort};
						cardList.trigger('change:pos');
						sortable.sortable('option','disabled',true);
						$(document).find('.js-close-popover').trigger('click');
					})
				)
			)
		)
	);
}
