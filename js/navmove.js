$(document).ready(function(){
    var navli=$('.header_1 ul li');
	   var navul=$('.header_1 ul');
	   var mvbg=$('.header_1_move');
	   // mvbg.text($('.on').text());   //s设置默认的滑块位置文本，此物无第一个li
	   navli.mouseover(function(){
	        n =  $(this).index();
	       mvbg.css('left',""+(100*n)+"px");
	     // mvbg.text( $(this).text()); 
	   });
	   
	   
 
 });