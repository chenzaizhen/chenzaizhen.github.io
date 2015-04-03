(function($){$.fn.touchwipe=function(settings){var config={min_move_x:20,min_move_y:20,wipeLeft:function(){},wipeRight:function(){},wipeUp:function(){},wipeDown:function(){},preventDefaultEvents:true};if(settings)$.extend(config,settings);this.each(function(){var startX;var startY;var isMoving=false;function cancelTouch(){this.removeEventListener('touchmove',onTouchMove);startX=null;isMoving=false}function onTouchMove(e){if(config.preventDefaultEvents){e.preventDefault()}if(isMoving){var x=e.touches[0].pageX;var y=e.touches[0].pageY;var dx=startX-x;var dy=startY-y;if(Math.abs(dx)>=config.min_move_x){cancelTouch();if(dx>0){config.wipeLeft(e)}else{config.wipeRight(e)}}else if(Math.abs(dy)>=config.min_move_y){cancelTouch();if(dy>0){config.wipeDown(e)}else{config.wipeUp(e)}}}}function onTouchStart(e){if(e.touches.length==1){startX=e.touches[0].pageX;startY=e.touches[0].pageY;isMoving=true;this.addEventListener('touchmove',onTouchMove,false)}}if('ontouchstart'in document.documentElement){this.addEventListener('touchstart',onTouchStart,false)}});return this}})(jQuery);

$(document).ready(function(){
	
	/*翻页标识*/
	var page_index=1;//当前在哪个页面
	var page_total=8;//总共有多少页面
	var subpage_index=1;//当前在哪个子页
	var no_wipe=0;
	var main_list=$("#tab_list_1");
	
	function setMainList(num){
		var str="";
		for(var i=1;i<=num;i++){
			if(i==1){
				str+="<li class='current'><a href='##'><i>"+i+"</i></a></li>";
			}
			else if(i==num){
				str+="<li class='last'><a href='##'><i>"+i+"</i></a></li>";
			}
			else{
				str+="<li><a href='##'><i>"+i+"</i></a></li>";
			}
		}
		$(main_list).html(str);
	}
	
	setMainList(page_total);
	
	function setMainListItem(num){
		$(main_list).children("li").removeClass("current");
		$($(main_list).children("li")[num-1]).addClass("current");
		if(page_index==8){
			$(main_list).fadeOut();
		}
		else{
			$(main_list).fadeIn();
		}
	}
	
	$(".share_we").click(function(){
		$(".share_guide_wrap").addClass("show_guide");
		$(".penguin_wrap_10_hook").css({
			"top": "-100px"
		});
		no_wipe=1;
	});
	
	$(".share_guide_wrap").click(function(){
		$(".share_guide_wrap").removeClass("show_guide");
		$(".penguin_wrap_10_hook").css({
			"top": "0px"
		});
		no_wipe=0;
	});
	
	$(".penguin_wrap_10").click(function(){
		$(".share_guide_wrap").addClass("show_guide");
		$(".penguin_wrap_10_hook").css({
			"top": "-100px"
		});
		no_wipe=1;
	});
	
	$(".cover_link_next").click(function(){
		wipe_down();
	});
	
	
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
	
	/*pc test*/
	
	//wipeLeft
	$(".hook_right").bind("click",function(){
		wipe_right();
	});
	
	//wipeRight
	$(".hook_left").bind("click",function(){
		wipe_left();
	});
	
	//wipeUp
	$(".hook_up").bind("click",function(){
		wipe_up();
	});
	
	//wipeDown
	$(".hook_down").bind("click",function(){
		wipe_down();
	});
	
	function wipe_right(){
		if(no_wipe==1){
				
		}
		else{
			if(page_index>=1&&page_index<page_total&&subpage_index==1){
				$($(".con_wrap")[page_index-1]).addClass("wrap_hide");
				$($(".con_wrap")[page_index]).addClass("wrap_show");
				no_wipe=1;
				
				var timer=setTimeout(function(){
					$($(".con_wrap")[page_index-1]).removeClass("wrap_show");
					$($(".con_wrap")[page_index]).removeClass("wrap_prepare");
					no_wipe=0;
					
					clearTimeout(timer);
					page_index++;
					if(page_index>page_total){
						page_index=page_total;
					}
					
					setMainListItem(page_index);
					
					//console.log(page_index+" "+subpage_index);
					
					console.log("当前页面: "+page_index);
					musicPlay(page_index,subpage_index);
					
				},300);
				
			}
		}
	}
	
	function wipe_left(){
		if(no_wipe==1){
				
		}
		else{
			if(page_index>=2&&page_index<=page_total&&subpage_index==1){
				$($(".con_wrap")[page_index-2]).removeClass("wrap_hide").addClass("wrap_show");
				$($(".con_wrap")[page_index-1]).removeClass("wrap_show").addClass("wrap_prepare");
				
				page_index--;
				
			}
			
			setMainListItem(page_index);
		}
		console.log("当前页面: "+page_index);
		musicPlay(page_index,subpage_index);
	}
	
	function wipe_up(){
		if(no_wipe==1){
				
		}
		else{
			if(page_index==page_total){
				var list_num=$(".details_list .details_con").length;
				if(subpage_index>=2&&subpage_index<=list_num){
					$($(".details_con")[subpage_index-2]).removeClass("wrap_before").addClass("current");
					$($(".details_con")[subpage_index-1]).removeClass("current").addClass("wrap_after");
					
					subpage_index--;
					musicPlay(page_index,subpage_index);
				}
			}
		}
	}
	
	function wipe_down(){
		if(no_wipe==1){
				
		}
		else{
			if(page_index==page_total){
				var list_num=$(".details_list .details_con").length;
				if(subpage_index>=1&&subpage_index<list_num){
					$($(".details_con")[subpage_index-1]).addClass("wrap_before").removeClass("current");
					$($(".details_con")[subpage_index]).addClass("current").removeClass("wrap_after");
					
					subpage_index++;
					musicPlay(page_index,subpage_index);
				}
			}
		}
	}
	
	/*pc test*/
	
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
	
	var system=brower.versions();
	if(system.type=="Android"){
		if(system.version==4.4){
			$("body").addClass("android_version_4_4");
		}
		else{
			$("body").addClass("android_version");
		}
	}
	
	/*loading 加载*/
	
	var img_list={
		"cover":{
			"img_1":"bg.jpg",
			"img_2":"cover_bg.png",
			"img_3":"cover_sprite.png",
			"img_4":"earth_bg.png"
		},
		"detail":{
			"img_1":"share_we_guide.png",
			"img_2":"sprite_ice_land.png",
			"img_3":"sprite_lake.png",
			"img_4":"sprite_penguin.png",
			"img_5":"sprite_title.png"
		},
		"notice":{
			"img_1":"icon_pdf.png",
			"img_2":"notice_bg.png"
		},
		"page_1":{
			"img_1":"page_1_man.png",
			"img_2":"page_1_sprite.png"
		},
		"page_2":{
			"img_1":"page_2_man.png",
			"img_2":"sprite_8.png",
			"img_3":"sprite_scene.png"
		},
		"page_3":{
			"img_1":"page_3_man.png",
			"img_2":"sprite_scene.png"
		},
		"page_4":{
			"img_1":"page_4_man.png",
			"img_2":"penguin.png",
			"img_3":"sprite_scene.png"
		},
		"page_5":{
			"img_1":"page_5_man.png",
			"img_2":"sprite_scene.png"
		},
		"page_6":{
			"img_1":"lamp_light.png",
			"img_2":"sprite_man.png",
			"img_3":"sprite_scene.png"
		},
		"page_7":{
			"img_1":"dot_line.png",
			"img_2":"ice_land.png",
			"img_3":"page_7_man.png",
			"img_4":"sprite_scene.png"
		}
	};
	
	//console.log(img_list.cover);
	var img_array=[];
	
	//获得json中图片的地址
	for(var i in img_list){
		if(typeof(img_list[i])=="object"){
			for(var j in img_list[i]){
				img_array.push("../mobile/images/"+i+"/"+img_list[i][j]);
			}
		}
	}
	
	var img_num=img_array.length;
	var img_loaded=0;
	
	for(var i=0;i<img_num;i++){
		var img=new Image();
		img.src=img_array[i];
		img.onload=function(){
			//console.log(img_loaded);
			img_loaded++;
			if(img_num==img_loaded){
				
				loadSound();
				
			}
		}
	}
	
	function pageStart(){
		
		$(".loading_wrap").addClass("loading_hide");
		$(".con_wrap_1").addClass("wrap_show");
		var timer=setTimeout(function(){
			$(".loading_wrap").hide();
		},300);
		
	}
	
	/*声音脚本 开始*/
		
	//音频标签存放数组
	var audio_array=[];
	
	function loadSound(){
	
		audio_list={
			"p1": {
				"audio_1" : "logo_slide.mp3",
				"audio_2" : "slogan_slide.mp3",
				"audio_3" : "penguin_clip.mp3",
				"audio_4" : "n_change.mp3"
			}/*,
			"p2": {
				"audio_1" : "building.mp3",
				"audio_2" : "human.mp3",
				"audio_3" : "thunder.mp3"
			},
			"p3": {
				"audio_1" : "icon.mp3",
				"audio_2" : "penguin.mp3"
			},
			"p4": {
				"audio_1" : "motor_beep.mp3",
				"audio_2" : "motor_horn.mp3"
			},
			"p5": {
				"audio_1" : "cup_clink.mp3",
				"audio_2" : "food.mp3"
			},
			"p6": {
				"audio_1" : "icon.mp3",
				"audio_2" : "snowball.mp3",
				"audio_3" : "snowball_2.mp3"
			},
			"p7": {
				"audio_1" : "decoration.mp3",
				"audio_2" : "love_bubble.mp3",
				"audio_3" : "penguin.mp3"
			},
			"p8": {
				"audio_1" : "icon.mp3",
				"audio_2" : "walking_1.mp3",
				"audio_3" : "walking_2.mp3",
				"audio_4" : "walking_3.mp3"
			},
			"p9": {
				"audio_1" : "clap.mp3",
				"audio_2" : "penguin.mp3"
			},
			"p12": {
				"audio_1" : "penguin.mp3"
			},
			"global": {
				"audio_1" : "slide.mp3"
			}*/
		}
		
		var audio_num=0;
		
		//获得json中图片的地址
							
		for(var i in audio_list){
			if(typeof(audio_list[i])=="object"){
				for(var j in audio_list[i]){
					
					audio_num++;
					
					var audio = document.createElement("audio");
/*					audio.addEventListener("canplaythrough", function(){
						audio_num--;
						if (audio_num==0){
							musicPlay(page_index,subpage_index);
							pageStart();
						}
					}, false);*/
					//console.log(audio.readyState);
					
					audio.src = "sound/"+i+"/"+audio_list[i][j];
					
					var reg=/.mp3$/gi;
					var str=audio_list[i][j];
					str=str.replace(reg,"");
					audio.className=i+"_"+str;
					
					
					audio_array.push(audio);
					$(".audio_wrap").append(audio);
					
					audioPrepare(audio_num);
				}
			}
		}
		//console.log(audio_array);
		
	}
	
	function audioPrepare(audio_num){
		var audio_array=$("audio");
		for(var i=0;i<audio_array.length;i++){
			audio_array[i].load();
			audio_array[i].addEventListener("canplaythrough", function(){
				audio_num--;
				if(audio_num==0){
					musicPlay(page_index,subpage_index);
					pageStart();
				}
			});
		}
	}
	
	
	var timer_list={
		"p1_logo_slide" : 1,
		"p1_slogan_slide" : 1,
		"p1_penguin_clip" : 1,
		"p1_n_change" : 1,
		"p2_building" : 1,
		"p2_human" : 1,
		"p2_thunder" : 1,
		"p3_icon" : 1,
		"p3_penguin" : 1,
		"p4_motor_beep" : 1,
		"p4_motor_horn" : 1,
		"p5_food" : 1,
		"p5_cup_clink" : 1,
		"p6_icon" : 1,
		"p6_snowball" : 1,
		"p6_snowball_2" : 1,
		"p7_decoration" : 1,
		"p7_love_bubble" : 1,
		"p7_penguin" : 1,
		"p8_icon" : 1,
		"p8_walking_1" : 1,
		"p8_walking_2" : 1,
		"p8_walking_3" : 1,
		"p9_penguin" : 1,
		"p9_clap" : 1,
		"p12_penguin" : 1,
		"p12_penguin_jump" : 1
	}
	
	var timer_loop_list={
		"p5_cup_clink" : 1,
		"p6_snowball" : 1,
		"p6_snowball_2" : 1,
		"p7_love_bubble" : 1,
		"p7_penguin" : 1,
		"p9_penguin" : 1,
		"p9_clap" : 1,
		"p12_penguin_jump" : 1
	}
	
	function musicPlay(page_index,subpage_index){
		/*	for(var i=0;i<audio_array.length;i++){
			audio_array[i].play();
		}*/
		musicStop();
		
		//首页
		if(page_index==1&&subpage_index==1){
			timer_list.p1_logo_slide=setTimeout(function(){
				audio_array[0].play();
			},500);
			timer_list.p1_slogan_slide=setTimeout(function(){
				audio_array[1].play();
			},700);
			timer_list.p1_penguin_clip=setTimeout(function(){
				audio_array[2].play();
			},1100);
			timer_list.p1_n_change=setTimeout(function(){
				audio_array[3].play();
			},2800);
		}
		
		if(page_index==2&&subpage_index==1){
			timer_list.p2_building=setTimeout(function(){
				//第一个建筑出现
				audio_array[4].play();
				var timer=setTimeout(function(){
					if(audio_array[4].ended){
						//第二个建筑出现
						audio_array[4].play();
					}
				},300);

			},300);
			timer_list.p2_human=setTimeout(function(){
				audio_array[5].play();
			},800);
			timer_list.p2_thunder=setTimeout(function(){
				audio_array[6].play();
				//雷声循环播放
				audio_array[6].loop=true;
				//audio_array[6].set
			},1400);
		}
		
		if(page_index==3&&subpage_index==1){
			timer_list.p3_icon=setTimeout(function(){
				audio_array[7].play();
			},300);
			timer_list.p3_penguin=setTimeout(function(){
				audio_array[8].play();
				audio_array[8].loop=true;
				var timer=setTimeout(function(){
					//icon
					audio_array[8].currentTime=0;
					audio_array[8].pause();
				},1200);
			},800);
		}
		
		if(page_index==4&&subpage_index==1){
			timer_list.p4_motor_beep=setTimeout(function(){
				audio_array[9].play();
			},300);
			timer_list.p4_motor_horn=setTimeout(function(){
				audio_array[10].play();
				audio_array[10].loop=true;
			},900);
		}
		
		if(page_index==5&&subpage_index==1){
			timer_list.p5_food=setTimeout(function(){
				audio_array[12].play();
				audio_array[12].loop=true;
				var timer=setTimeout(function(){
					audio_array[12].currentTime=0;
					audio_array[12].pause();
				},800);
			},300);
			
			//掉东西 音频复用
			timer_list.p7_decoration=setTimeout(function(){
				audio_array[16].play();
				audio_array[16].loop=true;
				var timer=setTimeout(function(){
					audio_array[16].currentTime=0;
					audio_array[16].pause();
				},700);
			},450);
			
			timer_list.p5_cup_clink=setTimeout(function(){
				audio_array[11].play();
				timer_loop_list.p5_cup_clink=setInterval(function(){
					audio_array[11].play();
					audio_array[11].volume=0.4;
				},3000);
			},1000);
		}
		
		if(page_index==6&&subpage_index==1){
			timer_list.p6_icon=setTimeout(function(){
				audio_array[13].play();
				audio_array[13].loop=true;
				var timer=setTimeout(function(){
					audio_array[13].currentTime=0;
					audio_array[13].pause();
				},700);
			},2500);
			timer_list.p6_snowball=setTimeout(function(){
				audio_array[14].play();
				timer_loop_list.p6_snowball=setInterval(function(){
					audio_array[14].play();
				},2600); 
			},1950);
			timer_list.p6_snowball_2=setTimeout(function(){
				audio_array[15].play();
				timer_loop_list.p6_snowball_2=setInterval(function(){
					audio_array[15].play();
				},2600); 
			},3050);
		}
		
		if(page_index==7&&subpage_index==1){
			timer_list.p7_decoration=setTimeout(function(){
				audio_array[16].play();
				audio_array[16].loop=true;
				var timer=setTimeout(function(){
					audio_array[16].currentTime=0;
					audio_array[16].pause();
				},700);
			},300);
			timer_list.p7_love_bubble=setTimeout(function(){
				audio_array[17].play();
				timer_loop_list.p7_love_bubble=setInterval(function(){
					audio_array[17].play();
				},5000); 
			},2900);
			timer_list.p7_penguin=setTimeout(function(){
				audio_array[18].play();
				audio_array[18].volume=0.4;
				timer_loop_list.p7_penguin=setInterval(function(){
					audio_array[18].play();
					audio_array[18].volume=0.4;
				},5000); 
			},2800);
		}
		
		if(page_index==8&&subpage_index==1){
			timer_list.p8_icon=setTimeout(function(){
				audio_array[19].play();
				audio_array[19].loop=true;
				var timer=setTimeout(function(){
					audio_array[19].currentTime=0;
					audio_array[19].pause();
				},800);
			},4000);
			timer_list.p8_walking_1=setTimeout(function(){
				audio_array[20].play();
				audio_array[20].loop=true;
				var timer=setTimeout(function(){
					audio_array[20].currentTime=0;
					audio_array[20].pause();
				},4000);
			},300);
			timer_list.p8_walking_2=setTimeout(function(){
				audio_array[21].play();
				audio_array[21].loop=true;
				audio_array[21].volume=0.4;
			},300);
			timer_list.p8_walking_3=setTimeout(function(){
				audio_array[22].play();
				audio_array[22].loop=true;
			},4150);
		}
		
		
		if(page_index==8&&subpage_index==2){
			timer_list.p9_penguin=setTimeout(function(){
				audio_array[24].play();
				timer_loop_list.p9_penguin=setInterval(function(){
					audio_array[24].play();
				},4000); 
			},1000);
			timer_list.p9_clap=setTimeout(function(){
				audio_array[23].play();
				timer_loop_list.p9_clap=setInterval(function(){
					audio_array[23].play();
				},4500); 
			},1500);
		}
		
		if(page_index==8&&subpage_index==5){
			timer_list.p12_penguin=setTimeout(function(){
				audio_array[25].play();
			},500);
			
			timer_list.p12_penguin_jump=setTimeout(function(){
				audio_array[7].play();
				timer_loop_list.p12_penguin_jump=setInterval(function(){
					audio_array[7].play();
				},1600);
			},1550);
		}
		
		//
		
	}
	
	function musicStop(){
		
		clearTimer();
		
		for(var i=0;i<audio_array.length;i++){
			//audio_array[i].pause();
			//audio_array[i].paused=false;
			audio_array[i].currentTime=0;
			audio_array[i].pause();
			
			//console.log(i+" "+audio_array[i].currentTime);
			//console.log(audio_array[i].defaultMuted);
		}
	}
	
	function clearTimer(){
		
		for(var num_1 in timer_list){
			clearTimeout(timer_list[num_1]);
		}
		
		for(var num_2 in timer_loop_list){
			clearTimeout(timer_loop_list[num_2]);
		}
	}

	
	/*声音脚本 结束*/
	
	
/*	counter = 0;
	$("img").each(function(){
	  if (this.readyState=="loaded" || this.readyState=="complete") counter++;
	});
	if (counter >= 10) alert("所有图片装载完毕！");*/
	
	/*loading 加载*/
	
	
	/*微信转发图片*/
	
	var location_str=location.href;
	var location_reg="mobile/";
	//stri.split(reg)[0]+"/images/cover/icon_webank.jpg";
	//console.log(stri.split(reg));
	//console.log(location.href);
	//console.log(location.href.split("mobile/")[0]+"mobile/"+"images/cover/icon_webank.jpg");
	
	
	var imgUrl = location_str.split(location_reg)[0]+location_reg+"images/cover/icon_webank.jpg";
	var lineLink = location.href;
	var descContent = "我们是银行？我们是互联网？We是互联网银行。";
	var shareTitle = document.title;
	var appid = '';
	
	function shareFriend() {
		WeixinJSBridge.invoke('sendAppMessage',{
			"appid": appid,
			"img_url": imgUrl,
			"img_width": "200",
			"img_height": "200",
			"link": lineLink,
			"desc": descContent,
			"title": shareTitle
		}, function(res) {
			//_report('send_msg', res.err_msg);
		})
	}
	function shareTimeline() {
		WeixinJSBridge.invoke('shareTimeline',{
			"img_url": imgUrl,
			"img_width": "200",
			"img_height": "200",
			"link": lineLink,
			"desc": descContent,
			"title": shareTitle
		}, function(res) {
			   //_report('timeline', res.err_msg);
		});
	}
	function shareWeibo() {
		WeixinJSBridge.invoke('shareWeibo',{
			"content": descContent,
			"url": lineLink,
		}, function(res) {
			//_report('weibo', res.err_msg);
		});
	}
	// 当微信内置浏览器完成内部初始化后会触发WeixinJSBridgeReady事件。
	document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
		// 发送给好友
		WeixinJSBridge.on('menu:share:appmessage', function(argv){
			shareFriend();
		});
		// 分享到朋友圈
		WeixinJSBridge.on('menu:share:timeline', function(argv){
			shareTimeline();
		});
		// 分享到微博
		WeixinJSBridge.on('menu:share:weibo', function(argv){
			shareWeibo();
		});
	}, false);
	
	
	
});




















