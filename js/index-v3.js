var YOP = YOP || {};
YOP.indexV3 = (function(){
	var lineStart;
	var btnStart;
	function handleEvents(){
		$("#functionIntroduction .btn-fi-item").hover(function() {
			$("#functionIntroduction .screen-info").removeClass('hide').addClass('hide');
			var num = $(this).attr('data-num');
			$(".content"+num).removeClass('hide');
		});
	}
	//滚屏控制动画
	function createAnimation(){
		if ($(window).width()<1600) {
			lineStart = 2020;
			//btnStart = 3400;
		}else{
			lineStart = 1900;
			//btnStart = 3400;
		}
		$(window).scroll(function(event) {
			var top = $(window).scrollTop();
			lineAnimation(top);
			//btnAnimation(top);
		});
	}
	//折线动画
	function lineAnimation(top){
		if (top>lineStart && top< 3000) {
			if ($("#mobileOffice .line-wrap").width() < 1056) {
				$("#mobileOffice .line-wrap").css('width', '1056px');
			};
		};
	}
	//注册按钮动画
	function btnAnimation(top){
		if (top>btnStart && top<4329) {
			if ($(".btn-border-wrap").width() < 212) {
				$(".btn-border-wrap").css('width', '212px');
				$(".btn-register").css({
					"background-color": '#55dad4',
					"color": '#fff'
				});
			};
		};
	}
	
	return {
		init : function(){
			createAnimation();
			handleEvents();
		}
	}
})();

YOP.slidebar = (function(){
	var len = 0;
	var list;
	var index =3;
	var imgIndex = imgIndexTemp = 3;
	var imgStartX = activeImgX = 430-150;
	var imgStartY = activeImgY = 55;
	var zIndex = 100,zIndexStep = 5;
	var imgXStep = 300-160,imgYStep = 40;
	var imgItemList;
	var imgLen = 0;
	//初始化图片
	function initImg(){
		imgItemList = $("#carousel .carousel-item");
		imgLen = imgItemList.length - 4;
		var itemIndex = -1;
		for (var i = 0; i < imgItemList.length; i++) {
			var imgItem = imgItemList.eq(i);
			if (i == imgIndex+1) {
				imgItem.css({
					left: imgStartX,
					top: imgStartY,
					zIndex: zIndex
				});
				zIndexStep = -zIndexStep;
				zIndex += zIndexStep;
			}else{
				var left = imgStartX - (imgIndex+1 - i)*imgXStep;
				var top = 0;
				if (i < imgIndex+1) {
					top = imgStartY + (imgIndex+1 - i)*imgYStep;
				}else{
					top = imgStartY - (imgIndex+1 - i)*imgYStep;
				}
				imgItem.css({
					left: left,
					top: top,
					zIndex: zIndex
				});
				zIndex += zIndexStep;
			}
			imgItem.attr('data-index', itemIndex);
			itemIndex++;
		};
	}
	//初始化sliderbar
	function initSlideBar(){
		var startX = -400;
		var slideItemList = $("#slidebar li");
		list = $("#slidebar");
		len = slideItemList.length - 4;
		var pointIndex = -1;
		for (var i = 0; i < slideItemList.length; i++) {
			var item = slideItemList.eq(i);
			var left = startX-item.width()/2;
			item.css({
				left: left+'px',
				width: (item.width()+1)+'px'
			});
			if (startX == 600) {
					//$('.ballute').text("");
					//alert("sss");
				$('.ballute').text(item.text());
				
				item.find('.slidebar-text').addClass('hide');
				item.addClass('activeItem');
				$("#carousel .carousel-item[data-index='"+pointIndex+"']").addClass("activeImg");
			};
			startX += 250;
			item.attr('data-index', pointIndex);
			pointIndex ++;
		};
	}
	//点击左右按钮
	function btnEvents(){
		var btnTimer;
		var btnInterval = 350;
		$(".btn-slide-right").click(function(){
			if ($(this).hasClass("clickfalse")) {return;};
			var that = $(this);
			$(this).addClass('clickfalse');
			btnTimer = setTimeout(function () {
		        that.removeClass('clickfalse');
		        clearTimeout(btnTimer);
		    }, btnInterval);

			imgIndex = imgIndexTemp;
			if (list.is(':animated') || imgItemList.is(':animated')) {
			    return;
			}
			slidebarAnimation(-250);
			if (imgIndex == imgLen) {
				imgIndex =  1;
				imgIndexTemp = imgIndex-1;
				setImgActive(imgXStep*(imgLen-1));
			}else{
				imgAnimationLeft(-imgXStep);
			}
			imgIndexTemp ++;
		});
		$(".btn-slide-left").click(function(){
			if ($(this).hasClass("clickfalse")) {return;};
			var that = $(this);
			$(this).addClass('clickfalse');
			btnTimer = setTimeout(function () {
		        that.removeClass('clickfalse');
		        clearTimeout(btnTimer);
		    }, btnInterval);

			imgIndex = imgIndexTemp;
			if (list.is(':animated') || imgItemList.is(':animated')) {
			    return;
			}
			slidebarAnimation(250);
			if (imgIndex == 1) {
				imgIndex = imgLen;
				imgIndexTemp = imgIndex + 1;
				setImgActive(-imgXStep*(imgLen-1));
			}else{
				imgAnimationRight(imgXStep);
			}
			imgIndexTemp --;
		});
		// 点击上方导航切换导航及下方图片
		$("#slidebar li").click(function() {
			if ($(this).parent().hasClass("clickfalse")) {return;};
			var that = $(this);
			$(this).parent().addClass('clickfalse');
			btnTimer = setTimeout(function () {
		        that.parent().removeClass('clickfalse');
		        clearTimeout(btnTimer);
		    }, btnInterval);

			if ($(this).hasClass('activeItem')) {return;};
			if (list.is(':animated') || imgItemList.is(':animated')) {
			    return;
			}
			imgIndex = imgIndexTemp;
			var targetIndex = $(this).attr('data-index');
			if (targetIndex > imgLen) {
				targetIndex =  targetIndex - imgLen;
				
			}else if (targetIndex < 1) {
				targetIndex =  imgLen - Math.abs(targetIndex);
			};
			index = parseInt(targetIndex);
			var moveStep = targetIndex - imgIndex;
			imgIndex = targetIndex;
			setActivePoint(-250*moveStep,targetIndex);
			setImgActive(-imgXStep*moveStep);
			imgIndexTemp += moveStep;
		});
	}

	function slidebarAnimation (offset) {
	    var left = parseInt(list.css('left')) + offset;
	    if (offset>0) {
	        offset = '+=' + offset;
	        var activeItemNext;
	        if (index == 1) {
	        	activeItemNext = $("#slidebar li").eq(len+1);
	        	index = len;
	        }else{
	        	activeItemNext = $(".activeItem").prev("li");
	        	index-=1;
	        }
	        $(".activeItem").find(".slidebar-text").removeClass("hide").end().removeClass("activeItem");
	        $('.ballute').text(activeItemNext.text());
	        activeItemNext.find('.slidebar-text').addClass('hide');
	        activeItemNext.addClass('activeItem');
	        $("#carousel .carousel-item").removeClass('activeImg');
	        $("#carousel .carousel-item[data-index='"+activeItemNext.attr("data-index")+"']").addClass("activeImg");
	    }else {
	        offset = '-=' + Math.abs(offset);
	        var activeItemNext;
	        if (index == len) {
	        	activeItemNext = $("#slidebar li").eq(2);
	        	index = 1;
	        }else{
	        	activeItemNext = $(".activeItem").next("li");
	        	index += 1;
	        }
	        $(".activeItem").find(".slidebar-text").removeClass("hide").end().removeClass("activeItem");
	        $('.ballute').text(activeItemNext.text());
	        activeItemNext.find('.slidebar-text').addClass('hide');
	        activeItemNext.addClass('activeItem');
	        $("#carousel .carousel-item").removeClass('activeImg');
	        $("#carousel .carousel-item[data-index='"+activeItemNext.attr("data-index")+"']").addClass("activeImg");

	    }
	    list.animate({'left': offset}, 300, function () {
	    	if (left <= -250 * (len-2)) {
	    		list.css('left', 250*2);
	    	};
	    	if (left >= 250*3) {
	    		list.css('left', -250*(len-3));
	    	};
	    });
	}
	function setActivePoint(offset,targetIndex){
		var left = parseInt(list.css('left')) + offset;
		targetIndex = parseInt(targetIndex);
		if (offset>0) {
		    offset = '+=' + offset;
		}else {
		    offset = '-=' + Math.abs(offset);
		}
		var activeItemNext=$("#slidebar li").eq(targetIndex+1);
		$(".activeItem").find(".slidebar-text").removeClass("hide").end().removeClass("activeItem");
		$('.ballute').text(activeItemNext.text());
		activeItemNext.find('.slidebar-text').addClass('hide');
		activeItemNext.addClass('activeItem');
		$("#carousel .carousel-item").removeClass('activeImg');
	    $("#carousel .carousel-item[data-index='"+activeItemNext.attr("data-index")+"']").addClass("activeImg");

		list.animate({'left': offset}, 300, function () {
			if (left <= -250 * (len-2)) {
				list.css('left', 250*2);
			};
			if (left >= 250*3) {
				list.css('left', -250*(len-3));
			};
		});
	}
	function initImg(){
		imgItemList = $("#carousel .carousel-item");
		imgLen = imgItemList.length - 4;
		var itemIndex = -1;
		for (var i = 0; i < imgItemList.length; i++) {
			var imgItem = imgItemList.eq(i);
			if (i == imgIndex+1) {
				imgItem.css({
					left: imgStartX,
					top: imgStartY,
					zIndex: zIndex
				});
				zIndexStep = -zIndexStep;
				zIndex += zIndexStep;
			}else{
				var left = imgStartX - (imgIndex+1 - i)*imgXStep;
				var top = 0;
				if (i < imgIndex+1) {
					top = imgStartY + (imgIndex+1 - i)*imgYStep;
				}else{
					top = imgStartY - (imgIndex+1 - i)*imgYStep;
				}
				imgItem.css({
					left: left,
					top: top,
					zIndex: zIndex
				});
				zIndex += zIndexStep;
			}
			imgItem.attr('data-index', itemIndex);
			itemIndex++;
		};
	}
	//图片向右动画
	function imgAnimationRight(offset){
		if (offset>0) {
		    offset = '+=' + offset;
		}
		imgItemList.animate({'left': offset}, 300, function () {
		    var thisIndex = $(this).attr("data-index");
		    if (thisIndex >= imgIndex) {
		    	var topNew = parseInt($(this).css("top"))+imgYStep;
		    	var zIndexNew = parseInt($(this).css("zIndex"))-Math.abs(zIndexStep);
		    	$(this).css({
		    		top: topNew,
		    		zIndex: zIndexNew
		    	});
		    }else{
		    	var topNew = parseInt($(this).css("top"))-imgYStep;
		    	var zIndexNew = parseInt($(this).css("zIndex"))+Math.abs(zIndexStep);
		    	$(this).css({
		    		top: topNew,
		    		zIndex: zIndexNew
		    	});
		    }
		});
	}
	//图片向左动画
	function imgAnimationLeft(offset){
		if (offset<=0) {
		    offset = '-=' + Math.abs(offset);
		}
		imgItemList.animate({'left': offset}, 300, function () {
		    var thisIndex = $(this).attr("data-index");
		    if (thisIndex > imgIndex) {
		    	var topNew = parseInt($(this).css("top"))-imgYStep;
		    	var zIndexNew = parseInt($(this).css("zIndex"))+Math.abs(zIndexStep);
		    	$(this).css({
		    		top: topNew,
		    		zIndex: zIndexNew
		    	});
		    }else{
		    	var topNew = parseInt($(this).css("top"))+imgYStep;
		    	var zIndexNew = parseInt($(this).css("zIndex"))-Math.abs(zIndexStep);
		    	$(this).css({
		    		top: topNew,
		    		zIndex: zIndexNew
		    	});
		    }
		});
	}
	//设置某个图片为active状态
	function setImgActive(offset){
		if (offset>0) {
		    offset = '+=' + offset;
		}
		else {
		    offset = '-=' + Math.abs(offset);
		}
		zIndex = 100;
		imgItemList.animate({'left': offset}, 300, function () {
		    var thisIndex = parseInt($(this).attr("data-index"));
		    if (thisIndex == imgIndex) {
				$(this).css({
					left: imgStartX,
					top: imgStartY,
					zIndex: zIndex
				});
			}else{
				var left = imgStartX - (imgIndex - thisIndex)*imgXStep;
				var top = 0;
				var itemZIndex = 0;
				if (thisIndex < imgIndex) {
					top = imgStartY + (imgIndex - thisIndex)*imgYStep;
					itemZIndex = zIndex - (imgIndex - thisIndex)*Math.abs(zIndexStep);
				}else{
					top = imgStartY - (imgIndex - thisIndex)*imgYStep;
					itemZIndex = zIndex + (imgIndex - thisIndex)*Math.abs(zIndexStep);
				}
				$(this).css({
					left: left,
					top: top,
					zIndex: itemZIndex
				});
			}
		});
	}

	var interval = 2500;
	var timer;
	function play() {
	    timer = setTimeout(function () {
	        imgIndex = imgIndexTemp;
	        if (list.is(':animated')) {
	            return;
	        }
	        slidebarAnimation(-250);
	        if (imgIndex == imgLen) {
	        	imgIndex =  1;
	        	imgIndexTemp = imgIndex-1;
	        	setImgActive(imgXStep*(imgLen-1));
	        }else{
	        	imgAnimationLeft(-imgXStep);
	        }
	        imgIndexTemp ++;


	        play();
	    }, interval);
	}
	function stop() {
	    clearTimeout(timer);
	}
	function autoPlayControl(){
		play();
		$("#slidebar,#carousel,.btn-slide-left,.btn-slide-right").hover(stop, play);
	}
	function openDetailPage(){
		$(".carousel-item").click(function(){
			if ($(this).hasClass("activeImg")) {
				var targetHref = $(this).attr("data-href");
				window.open(targetHref);
			};
		});
	}

	return {
		init: function(){
			initImg();
			initSlideBar();
			btnEvents();
			autoPlayControl();
			openDetailPage();
		}
	}
})();
$(function(){
	YOP.indexV3.init();
	YOP.slidebar.init();
});