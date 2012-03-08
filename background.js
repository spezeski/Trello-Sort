code = 'function addLink(a,b){var c=$(document).find(".pop-over .content");if(c.length==0){setTimeout(function(){addLink(a,b)},10);return false}$(c).append(\'<br><div class="header clearfix"><span class="header-title">Sort</span></div>\');$(c).append($("<div></div>").append($(\'<ul class="pop-over-list"></ul>\').append($("<li></li>").append($("<a >None</a>").click(function(){a.comparator=function(a){return a.get("pos")||0};a.trigger("change:pos");b.sortable("option","disabled",false);$(document).find(".js-close-popover").trigger("click")}))).append($("<li></li>").append($("<a >Due Date</a>").click(function(){a.comparator=function(a){return a.attributes.badges.due};a.trigger("change:pos");b.sortable("option","disabled",true);$(document).find(".js-close-popover").trigger("click")}))).append($("<li></li>").append($("<a >Number of Votes</a>").click(function(){a.comparator=function(a){return-a.attributes.idMembersVoted.length};a.trigger("change:pos");b.sortable("option","disabled",true);$(document).find(".js-close-popover").trigger("click")}))).append($("<li></li>").append($("<a >Last Activity</a>").click(function(){a.comparator=function(a){return a.attributes.dateLastActivity};a.trigger("change:pos");b.sortable("option","disabled",true);$(document).find(".js-close-popover").trigger("click")}))).append($("<li></li>").append($("<a >Card #</a>").click(function(){a.comparator=function(a){return a.attributes.idShort};a.trigger("change:pos");b.sortable("option","disabled",true);$(document).find(".js-close-popover").trigger("click")})))))}function init(){id=location.href.replace(/.*\\//,"");i=Models.Board.get(id);$.each(i.listList.models,function(a,b){if(!b.view){setTimeout(init,100);return false}var c=$(b.view.el).find(".js-open-list-menu");if(c.length==0){}c.bind("click",function(){setTimeout(function(){addLink(b.cardList,$(b.view.el).find(".ui-sortable"))},10)})})}function wait(){id=location.href.replace(/.*\\//,"");i=Models.Board.get(id);if(!i||!i.isReady||!i.listList.models|| i.listList.models.length == 0){setTimeout(wait,100)}else{init()}}wait()';

var id=location.href.replace(/.*\//,'');

if(document.getElementById('sortPlugin') == null){
	var script=document.createElement('script');
	script.setAttribute('id','sortPlugin');
	script.innerHTML = code;
	document.getElementsByTagName('head').item(0).appendChild(script);
	document.getElementById('sortPlugin').className = id;
} else if ( document.getElementById('sortPlugin').className != id) {
	document.getElementById('sortPlugin').className = id;
	location="javascript:wait()";
}