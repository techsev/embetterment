/*

The Betterment of Seve
By: Seve Savoie Teruel

*/

function rotate(object, degrees) {
	object.css({
		'-webkit-transform' : 'rotate('+degrees+'deg)',
		'-moz-transform' : 'rotate('+degrees+'deg)',  
		'-ms-transform' : 'rotate('+degrees+'deg)',  
		'-o-transform' : 'rotate('+degrees+'deg)',  
		'transform' : 'rotate('+degrees+'deg)',  
		'zoom' : 1
	});
}

function toggleDiv(clickSource, divName){
	if($(clickSource).siblings(divName).css('display') == 'block')
	{
		rotate($(clickSource).find('.drop-down-arrow'), 0);
	} else {
		rotate($(clickSource).find('.drop-down-arrow'), 180);
	}
	$(clickSource).siblings(divName).slideToggle("slow",function(){});
}

function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

function displayTrackingMessage(data)
{
	//Array of all the possible messages for visitor tracking.
	document.cookie = 'visitor_id=' + data.id + ';expires=Sun, 06 Nov 2022 21:43:15 GMT';
	var messages = [];
	messages['agency'] = new Array(); //
	messages['company'] = new Array();
	messages['company'][1] = '<p class="h2">Welcome ' + data.name + '</p>';
	messages['company'][2] = '<p class="h2">Welcome Back ' + data.name + '</p>';
	messages['company'][3] = '<p class="h2">Wow, ' + data.name + ' that\'s ' + data.counter+ ' times you have visited my site, I feel so popular</p>';
	messages['company'][13] = '<p class="h2">Ok ' + data.name + ', it\'s been over a dozen times ( ' + data.counter +' to be exact ) you\'ve landed here.</p>';
	messages['company'][50] = '<p class="h2">' + data.name + ', either your refresh button  is stuck down or you\'ve really visited my site ' + data.counter + ' times</p>';
	messages['company'][69] = '<p class="h2">Hehehehehehehe.... </p>';
	messages['company'][70] = '<p class="h2">' + data.name + ', either your refresh button  is stuck down or you\'ve really visited my site ' + data.counter + ' times</p>';
	messages['company'][666] = '<p class="h2"> nataS droL kraD taerG ehT oT rewoP llA</p>';
	messages['company'][667] = '<p class="h2">Um.... I mean... Nothing.</p>';


	

	var messageIndex = 0;

	for (messageIndex = data.counter; messageIndex > 0; messageIndex--) {
		if(messages[data.type][messageIndex] !== undefined)
		{	
			break;
		}
	};
	 
	var notification = $('.notification');
	notification.html(messages[data.type][messageIndex]);
	notification.show();
}

$( document ).ready(function() {
	$(".site-name").lettering();
	$(".site-name").fitText(1.5,{minFontSize: '30px'});
	$(".tag-line").fitText(3.5,{minFontSize: '12px'});
	$(".pull-down-tab").click(function(){toggleDiv(this, '.description-shrink')});
	$(".project H3").click(function(){toggleDiv(this, '.project-wrapper')});
	responsiveWords('.text-wrapper');
	var visitor_cookie_id = document.cookie.replace(/(?:(?:^|.*;\s*)visitor_id\s*\=\s*([^;]*).*$)|^.*$/, "$1");




	if(getQueryVariable('id') != false)
	{
		$.getJSON("json/?action=trackVisitor&id=" + getQueryVariable('id'),function(data){
			if(data.status = 'success')
			{
				displayTrackingMessage(data);
			}
		});
	} else if(!isNaN(Number(visitor_cookie_id)) && visitor_cookie_id != '') {

		$.getJSON("json/?action=trackVisitor&id=" + visitor_cookie_id,function(data){
			if(data.status = 'success')
			{
				displayTrackingMessage(data);
			}
		});
	} else {
		$.getJSON('http://smart-ip.net/geoip-json?callback=?',function(data){
			$.getJSON("json/?action=trackVisitor&ip=" + data.host,function(data){
				if(data.status = 'success')
				{
					displayTrackingMessage(data);
				}
			});
		});

	}

});