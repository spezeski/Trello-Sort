var id=location.href.replace(/.*\//,'');
id=id.replace(/#/,'');
code = 'var id=\''+id+'\';';

code += 'function addLink(a,b){var c=$(document).find(".pop-over .content");if(c.length==0){setTimeout(function(){addLink(a,b)},10);return false}$(c).append(\'<br><div class="header clearfix"><span class="header-title">Sort</span></div>\');$(c).append($("<div></div>").append($(\'<ul class="pop-over-list"></ul>\').append($("<li></li>").append($("<a >None</a>").click(function(){a.comparator=function(a){return a.get("pos")||0};a.trigger("change:pos");b.unbind("sortstop",disableReOrder);$(document).find(".js-close-popover").trigger("click")}))).append($("<li></li>").append($("<a >Due Date</a>").click(function(){a.comparator=function(a){return a.attributes.badges.due||"Z"};a.trigger("change:pos");b.bind("sortstop",disableReOrder);$(document).find(".js-close-popover").trigger("click")}))).append($("<li></li>").append($("<a >Number of Votes</a>").click(function(){a.comparator=function(a){return-a.attributes.idMembersVoted.length};a.trigger("change:pos");b.bind("sortstop",disableReOrder);$(document).find(".js-close-popover").trigger("click")}))).append($("<li></li>").append($("<a >Last Activity</a>").click(function(){a.comparator=function(a){return a.attributes.dateLastActivity};a.trigger("change:pos");b.bind("sortstop",disableReOrder);$(document).find(".js-close-popover").trigger("click")}))).append($("<li></li>").append($("<a >Card #</a>").click(function(){a.comparator=function(a){return a.attributes.idShort};a.trigger("change:pos");b.bind("sortstop",disableReOrder);$(document).find(".js-close-popover").trigger("click")})))))}function disableReOrder(a){$(a.delegateTarget).sortable("cancel")}function init(){var a=Models.Board.get(id);$.each(a.listList.models,function(a,b){if(!b.view){setTimeout(init,100);return false}var c=$(b.view.el).find(".js-open-list-menu");if(c.length==0){}c.bind("click",function(){setTimeout(function(){addLink(b.cardList,$(b.view.el).find(".ui-sortable"))},10)})})}function wait(){var a=Models.Board.get(id);if(!a||!a.isReady||!a.listList.models||a.listList.models.length==0){setTimeout(wait,100)}else{init()}}wait()';

if(document.getElementById('sortPlugin') == null){
	var script=document.createElement('script');
	script.setAttribute('id','sortPlugin');
	script.innerHTML = code;
	document.getElementsByTagName('head').item(0).appendChild(script);
	document.getElementById('sortPlugin').className = id;
} else if ( document.getElementById('sortPlugin').className != id) {
	document.getElementById('sortPlugin').className = id;
	location="javascript:id='"+id+"';wait();";
}