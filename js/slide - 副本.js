var theInt = null;
var curclicked = 0;
var inow=0;
$(function(){
	$('#transparence').css('opacity','0.4');
	$('#pic_list img').css({'opacity':'0.6'});
	$('#pic_list img:eq(0)').css({'top':'0','opacity':'1'});
	$('#pic_list a').click(function(){return false});
	play(0);
	$('#pic_list img').mouseover(function(){
		if($('#this_pic').attr('src') == $(this).attr('src')) return;
		play($('#pic_list img').index($(this)));
	});
	
	$("#slide>a>img").mouseover(function(){
		//alert("sss");
		
		var index=$("#slide>a>img").index();
		//alert(index);
		clearInterval(theInt);
		})
		
		
		/* $("#slide>a>img").mouseleave(function(){
			var ii=$(this).index();
		//alert("sss");
	    t(2);
		}) */
		$("#slide>a>img").each(function(ii){
			$(this).mouseleave(function(){				
				play(ii);			
			})						
		})
	
	  $("#this_a img").mouseover(function(){		  
		  clearInterval(theInt);		  		  
	  })
	  
	  $("#this_a img").mouseleave(function(){
		  
		   
		  
	  })
	
	
		
});

play = function(i){
	clearInterval(theInt);
	if( typeof i != 'undefined' )
	curclicked = i;
		//$('#this_pic').fadeOut(0).fadeIn(500).attr('src',$('#pic_list img').eq(i).attr('src'));
		$('#this_a').attr('href',$('#pic_list img').eq(i).parents('a').attr('href'));
		//$('#this_a').attr('title',$('#pic_list img').eq(i).parents('a').attr('title'));
		
		$('#pic_list img').eq(i).parents('li').nextAll('li').find('img').animate({top:18,opacity:0.6},500);
		$('#pic_list img').eq(i).parents('li').prevAll('li').find('img').animate({top:18,opacity:0.6},500);
		$('#pic_list img').eq(i).animate({top:0},500).css('opacity','1');
	theInt = setInterval(function (){
		i++;
		if (i > $('#pic_list img').length - 1) {i = 0};
		$('#this_pic').fadeOut(0).fadeIn(500).attr('src',$('#pic_list img').eq(i).attr('src'));
		$('#this_a').attr('href',$('#pic_list img').eq(i).parents('a').attr('href'));
		//$('#this_a').attr('title',$('#pic_list img').eq(i).parents('a').attr('title'));
		
		$('#pic_list img').eq(i).parents('li').nextAll('li').find('img').animate({top:18,opacity:0.6},500);
		$('#pic_list img').eq(i).parents('li').prevAll('li').find('img').animate({top:18,opacity:0.6},500);
		$('#pic_list img').eq(i).animate({top:0},500).css('opacity','1');
	},3000)
}














