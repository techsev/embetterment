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

$( document ).ready(function() {
	$(".site-name").lettering();
	$(".site-name").fitText(1.5,{minFontSize: '30px'});
	$(".tag-line").fitText(3.5,{minFontSize: '12px'});
	$(".pull-down-tab").click(function(){toggleDiv(this, '.description-shrink')});
	$(".project H3").click(function(){toggleDiv(this, '.project-wrapper')});
	responsiveWords('.text-wrapper');
});