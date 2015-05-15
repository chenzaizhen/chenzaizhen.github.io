(function($){$.fn.touchwipe=function(settings){var config={min_move_x:20,min_move_y:20,wipeLeft:function(){},wipeRight:function(){},wipeUp:function(){},wipeDown:function(){},preventDefaultEvents:true};if(settings)$.extend(config,settings);this.each(function(){var startX;var startY;var isMoving=false;function cancelTouch(){this.removeEventListener('touchmove',onTouchMove);startX=null;isMoving=false}function onTouchMove(e){if(config.preventDefaultEvents){e.preventDefault()}if(isMoving){var x=e.touches[0].pageX;var y=e.touches[0].pageY;var dx=startX-x;var dy=startY-y;if(Math.abs(dx)>=config.min_move_x){cancelTouch();if(dx>0){config.wipeLeft(e)}else{config.wipeRight(e)}}else if(Math.abs(dy)>=config.min_move_y){cancelTouch();if(dy>0){config.wipeDown(e)}else{config.wipeUp(e)}}}}function onTouchStart(e){if(e.touches.length==1){startX=e.touches[0].pageX;startY=e.touches[0].pageY;isMoving=true;this.addEventListener('touchmove',onTouchMove,false)}}if('ontouchstart'in document.documentElement){this.addEventListener('touchstart',onTouchStart,false)}});return this}})(jQuery);

$(document).ready(function(){
	
	/*翻页标识*/
	var page_index=1;//当前在哪个页面
	var page_total=7;
	var moving=1;
	
	
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
		
	}
	
	function wipe_left(){
		
	}
	
	$(".page_arrow").bind("click",function(){
		wipe_down();
	});
	
	function wipe_up(){
		if(moving!=1){//当页面在切换时候，禁止滑屏
			
			if(page_index<=1){
				return ;
			};
			
			$(".con_wrap_"+page_index).addClass("wrap_hide");
			$(".con_wrap_"+(page_index-1)).addClass("wrap_show").addClass("zindex_hook");
			
			var timer=setTimeout(function(){
				$(".con_wrap_"+(page_index+1)).removeClass("wrap_show")
				$(".con_wrap_"+page_index).removeClass("wrap_hide").removeClass("zindex_hook");

				moving=0;
			},300);
			
			
			moving=1;
			page_index--;	
			//console.log(page_index);

		}
	}
	
	function wipe_down(){
		if(moving!=1){
			
			if(page_index>=page_total){
				return ;
			};
			if(page_index==1){
				audio_array[0].play();
			}
			
			$(".con_wrap_"+page_index).addClass("wrap_hide");
			$(".con_wrap_"+(page_index+1)).addClass("wrap_show").addClass("zindex_hook");
			
			var timer=setTimeout(function(){
				$(".con_wrap_"+(page_index-1)).removeClass("wrap_show");
				$(".con_wrap_"+page_index).removeClass("wrap_hide").removeClass("zindex_hook");
				moving=0;
				
				//console.log(page_index);
			},300);
			
		
			moving=1;
			page_index++;	
		}
	}
	
	/*loading*/
	
	var img_list={
		"images":{
			"img_1":"bg_1.jpg",
			"img_2":"bg_2.jpg",
			"img_3":"bg_3.jpg",
			"img_4":"bg_4.jpg",
			"img_5":"bg_5.jpg",
			"img_6":"bg_6.jpg",
			"img_7":"bg_7.jpg",
			"img_8":"page_1.png",
			"img_9":"page_2.png",
			"img_10":"page_3.png",
			"img_11":"page_4.png",
			"img_12":"page_5.png",
			"img_13":"page_6.png",
			"img_14":"page_7.png",
			"img_15":"page_2_cage.png",
			"img_16":"page_5_rain.png",
			"img_17":"page_6_person.png",
			"img_18":"page_7_person.png"
		}
	};
	
	//console.log(img_list.cover);
	var img_array=[];
	
	//获得图片的地址
	for(var i in img_list){
		if(typeof(img_list[i])=="object"){
			for(var j in img_list[i]){
				img_array.push("../../"+i+"/promote_images/page_2/"+img_list[i][j]);
			}
		}
	}
	
	var img_num=img_array.length;
	var img_loaded=0;
	
	for(var i=0;i<img_num;i++){
		var img=new Image();
		img.src=img_array[i];
		img.onload=function(){
			
			img_loaded++;
			if(img_num==img_loaded){
				
				loadSound(); 
				//pageStart(); //载完图片，直接进入首页，音频自己慢慢载，载完自动播放
			}
		}
	}
	
	function pageStart(){
		
		$(".loading_wrap").addClass("loading_hide");
		$(".con_wrap_1").addClass("wrap_show");
		var timer=setTimeout(function(){
			$(".loading_wrap").hide();
			$(".con_wrap_1").removeClass("wrap_hide");
			moving=0;
		},300);
	}
	
	function load_ready(){
		//$(".loading_wrap").addClass("load_ready");
		audio_array[0].play();
		audio_array[0].loop=true;
		pageStart();
	}
	
/*	$(".load_ready_area").click(function(){
		audio_array[0].play();
		audio_array[0].loop=true;
		pageStart();
	});*/
	
	/*声音脚本 开始*/
		
	//音频标签存放数组
	var audio_array=[];
	
	function loadSound(){
		
		var audio_num=0;
		
		//获得json中图片的地址
							
		var audio = document.createElement("audio");
		audio.src = "../../media/promote_media/page_2/music.mp3";//地址
		audio.className="bg_music";
		
		audio_array.push(audio);
		$(".audio_wrap").append(audio);
		
		audio_array[0].load();
		audio_array[0].addEventListener("canplaythrough", function(){

			load_ready();

		});
		
	}
	
	var play=1;
	$(".music_control").click(function(){
		if(play==1){
			
			$(".btn_play").hide();
			$(".btn_stop").show();
			audio_array[0].pause();
			play=0;
			
		}else{
			
			$(".btn_stop").hide();
			$(".btn_play").show();
			audio_array[0].play()
			play=1;
			
		}
	});
	
	/*声音脚本 结束*/
	
	
	
	/*loading*/
	
	
	
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




















