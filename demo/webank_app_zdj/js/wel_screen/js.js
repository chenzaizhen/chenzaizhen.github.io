(function($){$.fn.touchwipe=function(settings){var config={min_move_x:20,min_move_y:20,wipeLeft:function(){},wipeRight:function(){},wipeUp:function(){},wipeDown:function(){},preventDefaultEvents:true};if(settings)$.extend(config,settings);this.each(function(){var startX;var startY;var isMoving=false;function cancelTouch(){this.removeEventListener('touchmove',onTouchMove);startX=null;isMoving=false}function onTouchMove(e){if(config.preventDefaultEvents){e.preventDefault()}if(isMoving){var x=e.touches[0].pageX;var y=e.touches[0].pageY;var dx=startX-x;var dy=startY-y;if(Math.abs(dx)>=config.min_move_x){cancelTouch();if(dx>0){config.wipeLeft(e)}else{config.wipeRight(e)}}else if(Math.abs(dy)>=config.min_move_y){cancelTouch();if(dy>0){config.wipeDown(e)}else{config.wipeUp(e)}}}}function onTouchStart(e){if(e.touches.length==1){startX=e.touches[0].pageX;startY=e.touches[0].pageY;isMoving=true;this.addEventListener('touchmove',onTouchMove,false)}}if('ontouchstart'in document.documentElement){this.addEventListener('touchstart',onTouchStart,false)}});return this}})(jQuery);

$(document).ready(function(){
	
	/*翻页标识*/
	var page_index=1;//当前在哪个页面
	var moving=1;
	var first_load=1;
	var timer_time=1300;
	
	
	//触摸触发事件
	$("body").touchwipe({
		wipeDown: function() {
			wipe_down();
		 },
		 wipeUp: function() { 
			wipe_up();
		 },
		 wipeLeft: function() {
			wipe_right();
		 },
		 wipeRight: function() { 
		 	wipe_left();
		 },
		min_move_x: 80,
		min_move_y: 80,
		preventDefaultEvents: true
	});
	
	function wipe_right(){
		if(moving!=1){
			if(page_index>=2&&page_index<=4){
				
				$(".con_wrap_"+page_index).addClass("wrap_hide");
				//$(".con_wrap_"+(page_index+1)).addClass("wrap_show");
				if(first_load==1){
					$(".first_load").removeClass("first_load");
					first_load=0;
				}
				
				var timer=setTimeout(function(){
					
					$(".con_wrap_"+(page_index-1)).removeClass("wrap_show");
					$(".con_wrap_"+page_index).addClass("wrap_show").removeClass("wrap_prepare");
					
					//console.log(page_index);
					
					if(page_index==5){
						$(".pager_wrap").fadeOut();
					}else{
						
					}
					$(".pager_list li").removeClass("current");
					$(".pager_list li:nth-child("+(page_index-1)+")").addClass("current");
						
					moving=0;
					
				},timer_time);
				
				moving=1;
				page_index++;	
				
			}
			else{
				
			}
		}
	}
	
	function wipe_left(){
		if(moving!=1){//当页面在切换时候，禁止滑屏
			if(page_index<=5&&page_index>=3){
				
				
				$(".con_wrap_"+page_index).addClass("wrap_hide");
				
				/*var timer=setTimeout(function(){
					moving=0;
				},300);*/
				
				if(page_index==5){
					timer_time=600;
				}else{
					timer_time=1300;
				}	
				
				var timer=setTimeout(function(){
					
					$(".con_wrap_"+(page_index+1)).addClass("wrap_prepare").removeClass("wrap_show").removeClass("wrap_hide");
					$(".con_wrap_"+(page_index)).addClass("wrap_show").removeClass("wrap_hide");
					
					//console.log(page_index);
					
					if(page_index==4){
						$(".pager_wrap").fadeIn();
					}else{
						
					}
					$(".pager_list li").removeClass("current");
					$(".pager_list li:nth-child("+(page_index-1)+")").addClass("current");
					
					moving=0;
					
				},timer_time);
				
				
				moving=1;
				page_index--;	
				
			}
			else{
				
			}
		}
	}
	
	function wipe_up(){
		
	}
	
	function wipe_down(){
		
	}
	
	
	var timer=setTimeout(function(){
		
		$(".con_wrap_1").addClass("cover_hide");
		
		var timer_2=setTimeout(function(){
			
			$(".con_wrap_1").removeClass("wrap_show");
			$(".con_wrap_2").addClass("wrap_show").addClass("first_load").removeClass("wrap_prepare");
			$(".pager_wrap").fadeIn();
			page_index=2;
			moving=0;
			
		},300);
		
	},300);//3000
	
	
	
	/* 安卓版本兼容 */
	var brower = {
		versions:function(){
			var u = window.navigator.userAgent;
			var num ;
			if(u.indexOf('Trident') > -1){
			//IE
				return "IE";
			}else if(u.indexOf('Presto') > -1){
			//opera
				return "Opera";
			}else if(u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1){
			//firefox
				return "Firefox";
			}else if(u.indexOf('AppleWebKit' && u.indexOf('Safari') > -1) > -1){
			//苹果、谷歌内核
				if(u.indexOf('Chrome') > -1){
				//chrome
					return "Chrome";
				}else if(u.indexOf('OPR')){
				//webkit Opera
					return "Opera_webkit"
				}else{
				//Safari
					return "Safari";
				}
			}else if(u.indexOf('Mobile') > -1){
			//移动端
				if(!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
				//ios
					if(u.indexOf('iPhone') > -1){
					//iphone
						return "iPhone"
					}else if(u.indexOf('iPod') > -1){
					//ipod
						return "iPod"
					}else if(u.indexOf('iPad') > -1){
					//ipad
						return "iPad"
					}
				}else if(u.indexOf('Android') > -1 || u.indexOf('Linux') > -1){
				//android
					num = u.substr(u.indexOf('Android') + 8, 3);
					return {"type":"Android", "version": num};
				}else if(u.indexOf('BB10') > -1 ){
				//黑莓bb10系统
					return "BB10";
				}else if(u.indexOf('IEMobile')){
				//windows phone
					return "Windows Phone"
				}
			}
		}
    }
	
	
});




















