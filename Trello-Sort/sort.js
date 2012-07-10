/*************************************** sort.js ***************************************************
** Add a list action to sort the lists.
** 
** It only changes the order that cards are displayed in, not their order in Trello.
** In other words, any sorting done won't be seen by any other user.
*****************************************************************************************************/

var id=location.href.replace(/.*\//,'');
id=id.replace(/#/,'');
code = '(function(){';

code += 'var id=\''+id+'\';';

/************************************ Minified Code ************************************************
** This code has been minified so that it can be injected into the page and run in Trello's environment.
*****************************************************************************************************/

code += 'function disableReOrder(a){$(a.delegateTarget).sortable("cancel")}function indicateSort(a,b){var c=a.width();var d=a.css("max-height");if(b=="Manual"){if(a.find(".sort-type").length>0){a.attr("style","width:"+(c>211?c+14:c)+"px;");a.find(".sort-type").remove();a.find(".list-cards").css("max-height",a.find(".list-cards").css("max-height").replace(/px/,"")- -34+"px")}}else{if(a.find(".sort-type").length==0){a.attr("style","border-style:solid;border-width:7px;border-color:#ababab;width:"+(c>210?c-14:c)+"px");a.find(".list-cards").css("max-height",a.find(".list-cards").css("max-height").replace(/px/,"")-34+"px");a.find(".list-header").after($("<div></div>").addClass("sort-type").attr("style","height:20px;font-weight:bold;color:grey;text-align:center").append("Sorted by "+b).data("sorted_by",b))}else{a.find(".sort-type").text("Sorted by "+b).data("sorted_by",b)}}}function addLink(a,b){var c=$(document).find(".pop-over .content");var d="Manual";if(b.find(".sort-type").length==1)d=b.find(".sort-type").data("sorted_by");sortable=b.find(".ui-sortable");if(c.length==0){setTimeout(function(){addLink(a,sortable)},10);return false}$(c).append("<br>").append($("<div></div>").addClass("header clearfix").append($("<span></span>").addClass("header-title").text("Sort")));$(c).append($("<div></div>").append($("<ul></ul>").addClass("pop-over-list").append($("<li></li>").css("background-color",d=="Manual"?"#E2E6E9":"").append($("<a >Manual</a>").click(function(){indicateSort(b,"Manual");a.comparator=function(a){return a.get("pos")||0};a.trigger("change:pos");sortable.unbind("sortstop",disableReOrder);$(document).find(".js-close-popover").trigger("click")}))).append($("<li></li>").css("background-color",d=="Due Date"?"#E2E6E9":"").append($("<a >Due Date</a>").click(function(){indicateSort(b,"Due Date");a.comparator=function(a){return a.attributes.badges.due||"Z"};a.trigger("change:pos");sortable.bind("sortstop",disableReOrder);$(document).find(".js-close-popover").trigger("click")}))).append($("<li></li>").css("background-color",d=="Number of Votes"?"#E2E6E9":"").append($("<a >Number of Votes</a>").click(function(){indicateSort(b,"Number of Votes");a.comparator=function(a){return-a.attributes.badges.votes};a.trigger("change:pos");sortable.bind("sortstop",disableReOrder);$(document).find(".js-close-popover").trigger("click")}))).append($("<li></li>").css("background-color",d=="Title"?"#E2E6E9":"").append($("<a >Title</a>").click(function(){indicateSort(b,"Title");a.comparator=function(a){return a.attributes.name.toLowerCase()};a.trigger("change:pos");sortable.bind("sortstop",disableReOrder);$(document).find(".js-close-popover").trigger("click")}))).append($("<li></li>").css("background-color",d=="Label"?"#E2E6E9":"").append($("<a >Label</a>").click(function(){indicateSort(b,"Label");a.comparator=function(a){var b={green:0,yellow:0,orange:0,red:0,purple:0,blue:0};var c=0;if(a.attributes.labels)c=a.attributes.labels.length;for(var d=0;d<c;d++){b[a.attributes.labels[d]]=1}var e=""+c+b["green"]+b["yellow"]+b["orange"]+b["red"]+b["purple"]+b["blue"];return e*-1};a.trigger("change:pos");sortable.bind("sortstop",disableReOrder);$(document).find(".js-close-popover").trigger("click")}))).append($("<li></li>").css("background-color",d=="Last Activity"?"#E2E6E9":"").append($("<a >Last Activity</a>").click(function(){indicateSort(b,"Last Activity");a.comparator=function(a){return a.attributes.dateLastActivity};a.trigger("change:pos");sortable.bind("sortstop",disableReOrder);$(document).find(".js-close-popover").trigger("click")}))).append($("<li></li>").css("background-color",d=="Card Number"?"#E2E6E9":"").append($("<a >Card Number</a>").click(function(){indicateSort(b,"Card Number");a.comparator=function(a){return a.attributes.idShort};a.trigger("change:pos");sortable.bind("sortstop",disableReOrder);$(document).find(".js-close-popover").trigger("click")})))))}$(document).bind("cardsReady",function(){var a=Models.Board.get(id);$.each(a.listList.models,function(a,b){$(b.view.el).find(".js-open-list-menu").bind("click",function(){setTimeout(function(){addLink(b.cardList,$(b.view.el))},10)})})})';

code += '})()';


if(document.getElementById('sortPlugin') == null){
	var script=document.createElement('script');
	script.setAttribute('id','sortPlugin');
	script.innerHTML = code;
	document.getElementsByTagName('head').item(0).appendChild(script);
	document.getElementById('sortPlugin').className = id;
}

/*

$(document).bind('cardsReady', function(){
	var i = Models.Board.get(id);
	$.each(i.listList.models,function(a,b) {
		$(b.view.el).find('.js-open-list-menu').bind('click',function(){
			setTimeout(function(){addLink(b.cardList,$(b.view.el));}, 10);
		});
	});
});

function disableReOrder(e) {
	$(e.delegateTarget).sortable('cancel');
}

function indicateSort(list,sort) {
	var width = list.width();
	var maxHeight = list.css("max-height");
	
	if(sort == "Manual") {
		if(list.find(".sort-type").length > 0) {
			list.attr("style","width:"+(width>211?width+14:width)+"px;");
			list.find(".sort-type").remove();
			list.find(".list-cards").css("max-height",(list.find(".list-cards").css("max-height").replace(/px/,"") - (-34))+"px")
		}
	} else {
		if(list.find(".sort-type").length == 0) {
			list.attr("style","border-style:solid;border-width:7px;border-color:#ababab;width:"+(width>210?width-14:width)+"px");
			list.find(".list-cards").css("max-height",(list.find(".list-cards").css("max-height").replace(/px/,"") - 34)+"px")
			list.find(".list-header").after( $("<div></div>")
				.addClass("sort-type")
				.attr("style","height:20px;font-weight:bold;color:grey;text-align:center")
				.append("Sorted by "+sort)
				.data("sorted_by",sort)
			);
		} else {
			list.find(".sort-type")
			.text("Sorted by "+sort)
			.data("sorted_by",sort)
		}
	}
}

function addLink(cardList,list)  {
	var box =$(document).find('.pop-over .content');
	var sorted_by = "Manual";
	
	if( list.find(".sort-type").length == 1)
		sorted_by = list.find(".sort-type").data("sorted_by")
	
	sortable = list.find(".ui-sortable")

	if (box.length == 0) {
		setTimeout(function(){addLink(cardList,sortable);}, 10);
		return false;
	}
	
	$(box).append('<br>')
	.append( $('<div></div>')
		.addClass('header clearfix')
		.append( $('<span></span>')
			.addClass('header-title')
			.text('Sort')
		)
	);
	$(box).append( $('<div></div>')
		.append( $('<ul></ul>')
			.addClass('pop-over-list')
			.append ($('<li></li>')
				.css("background-color",(sorted_by == "Manual" ?"#E2E6E9":"") )
				.append($('<a >Manual</a>')
					.click(function() {
						indicateSort(list,"Manual");
						cardList.comparator = function(a){return a.get('pos') || 0};
						cardList.trigger('change:pos');
						sortable.unbind('sortstop',disableReOrder)
						$(document).find('.js-close-popover').trigger('click');
					})
				)
			)
			.append ($('<li></li>')
				.css("background-color",(sorted_by == "Due Date"?"#E2E6E9":"") )
				.append($('<a >Due Date</a>')
					.click(function() {
						indicateSort(list,"Due Date");
						cardList.comparator = function(a){return a.attributes.badges.due || 'Z'};
						cardList.trigger('change:pos');
						sortable.bind('sortstop',disableReOrder)
						$(document).find('.js-close-popover').trigger('click');
					})
				)
			)
			.append ($('<li></li>')
				.css("background-color",(sorted_by == "Number of Votes"?"#E2E6E9":"") )
				.append($('<a >Number of Votes</a>')
					.click(function() {
						indicateSort(list,"Number of Votes");
						cardList.comparator = function(a){return -a.attributes.badges.votes};
						cardList.trigger('change:pos');
						sortable.bind('sortstop',disableReOrder)
						$(document).find('.js-close-popover').trigger('click');
					})
				)
			)
			.append ($('<li></li>')
				.css("background-color",(sorted_by == "Title"?"#E2E6E9":"") )
				.append($('<a >Title</a>')
					.click(function() {
						indicateSort(list,"Title");
						cardList.comparator = function(a){return a.attributes.name.toLowerCase()};
						cardList.trigger('change:pos');
						sortable.bind('sortstop',disableReOrder)
						$(document).find('.js-close-popover').trigger('click');
					})
				)
			)
			.append ($('<li></li>')
				.css("background-color",(sorted_by == "Label"?"#E2E6E9":"") )
				.append($('<a >Label</a>')
					.click(function() {
						indicateSort(list,"Label");
						cardList.comparator = function(a){
							var c={"green":0,"yellow":0,"orange":0,"red":0,"purple":0,"blue":0};
							var n=0;
							if(a.attributes.labels)
								n=a.attributes.labels.length;
							for(var i=0;i<n;i++){c[a.attributes.labels[i]]=1;}
							var s = ""+n+c["green"]+c["yellow"]+c["orange"]+c["red"]+c["purple"]+c["blue"];
							return s*-1;
						};
						cardList.trigger('change:pos');
						sortable.bind('sortstop',disableReOrder)
						$(document).find('.js-close-popover').trigger('click');
					})
				)
			)
			.append ($('<li></li>')
				.css("background-color",(sorted_by == "Last Activity"?"#E2E6E9":"") )
				.append($('<a >Last Activity</a>')
					.click(function() {
						indicateSort(list,"Last Activity");
						cardList.comparator = function(a){return a.attributes.dateLastActivity};
						cardList.trigger('change:pos');
						sortable.bind('sortstop',disableReOrder)
						$(document).find('.js-close-popover').trigger('click');
					})
				)
			)
			.append ($('<li></li>')
				.css("background-color",(sorted_by == "Card Number"?"#E2E6E9":"") )
				.append($('<a >Card Number</a>')
					.click(function() {
						indicateSort(list,"Card Number");
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

*/