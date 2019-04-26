var theInt = null;
var curclicked = 0;
var inow=0;
var news=$(".abox_it");
$(document).ready(function(){
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
		  var index=$("#slide>a>img").index();	
		   clearInterval(theInt);
		})
		
		
		
		$("#slide>a>img").each(function(ii){
			$(this).mouseleave(function(){				
			play(ii);			
			})						
		})
	
	  $("#this_a img").mouseover(function(){		  
		  clearInterval(theInt);		  		  
	  })
	  
	  $("#this_a img").mouseleave(function(){  
	  });


      /*执行公告自动翻滚*/
           //announce();	  
		 	
		 
			
		/* 	$(".announcebox>div").each(function(){
				$(this).find(".announcelist li").hover(function(){				
				clearInterval(auton);						
			},function(){				
				  auton=setInterval('announce(".abox_it")',1000);			
			})
				
				
				
			})
			 */
			 
			  // auton=setInterval('announce(".abox_it")',1000);
	 	  /*  $('.ab1 .announcelist li').hover(function(){				
			     clearInterval(auton);
			},function(){					
				  auton=setInterval('announce(".ab1")',1000);			
			});
			 $('.ab2 .announcelist li').hover(function(){				
				clearInterval(auton);						
			},function(){				
				  auton=setInterval('announce(".ab2")',1000);			
			})
			 $('.ab3 .announcelist li').hover(function(){				
				clearInterval(auton);						
			},function(){				
				  auton=setInterval('announce(".ab3")',1000);			
			}) */
		
			timer1=setInterval('announce(".ab1")',1500);
			$(".ab1 .announcelist li").hover(function(){
			clearInterval(timer1)},function(){
　　          timer1=setInterval('announce(".ab1")',1500);
　　        })　
    
	   timer2=setInterval('announce(".ab2")',1500);
			$(".ab2 .announcelist li").hover(function(){
			clearInterval(timer2)},function(){
　　          timer2=setInterval('announce(".ab2")',1500);
　　        })　

          timer3=setInterval('announce(".ab3")',1500);
			$(".ab3 .announcelist li").hover(function(){
			clearInterval(timer3)},function(){
　　          timer3=setInterval('announce(".ab3")',1500);
　　        })　
	
	
	
	
	/*下拉网站列表*/
	var webdl=$(".webs");
	var weblist=$(".webs dd");
	webdl.hover(function(){
		weblist.stop(true,true).slideDown(300);
	},function(){
		weblist.stop(true,true).slideUp(300);
		
	})
	
});

/*banner轮播*/
play = function(i){
	clearInterval(theInt);
	if( typeof i != 'undefined' )
	curclicked = i;
		//$('#this_pic').fadeOut(0).fadeIn(500).attr('src',$('#pic_list img').eq(i).attr('src'));
		$('#this_a').attr('href',$('#pic_list img').eq(i).parents('a').attr('href'));
			var src=$('#pic_list img').eq(i).attr('src');
		//alert(src);
		$('#this_a').attr('style',"background-image:url("+src+")");
		
		//$('#this_a').css('background','red'));
		//var src = document.getElementById()
		//$('#this_a').attr('title',$('#pic_list img').eq(i).parents('a').attr('title'));
		
		$('#pic_list img').eq(i).parents('li').nextAll('li').find('img').animate({top:18,opacity:0.6},500);
		$('#pic_list img').eq(i).parents('li').prevAll('li').find('img').animate({top:18,opacity:0.6},500);
		$('#pic_list img').eq(i).animate({top:0},500).css('opacity','1');
	theInt = setInterval(function (){
		i++;
		if (i > $('#pic_list img').length - 1) {i = 0};
		//$('#this_pic').fadeOut(0).fadeIn(500).attr('src',$('#pic_list img').eq(i).attr('src'));
		$('#this_a').attr('href',$('#pic_list img').eq(i).parents('a').attr('href'));
		var src=$('#pic_list img').eq(i).attr('src');
		//alert(src);
		$('#this_a').attr('style',"background-image:url("+src+")");
//$('#this_a').css('background','green');
		//$('#this_a').attr('title',$('#pic_list img').eq(i).parents('a').attr('title'));
		
		$('#pic_list img').eq(i).parents('li').nextAll('li').find('img').animate({top:18,opacity:0.6},500);
		$('#pic_list img').eq(i).parents('li').prevAll('li').find('img').animate({top:18,opacity:0.6},500);
		$('#pic_list img').eq(i).animate({top:0},500).css('opacity','1');
	},3000)
}




/*首页公告自动翻滚*/

 announce =function (obj){

	    $(obj).find("ul:first").animate({
                marginTop:"-30px"
        },500,function(){
                $(this).css({marginTop:"0px"}).find("li:first").appendTo(this);
        });
  }












