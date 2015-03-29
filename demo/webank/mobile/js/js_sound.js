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
	
	/*声音脚本 开始*/
	function sound(){
		
	var logo_slide=$(".logo_slide")[0];
	var slogan_slide=$(".slogan_slide")[0];
	var n_change=$(".n_change")[0];
	var penguin_clip=$(".penguin_clip")[0];
	
	sound_src={
		"p1": {
			"logo_slide" : "logo_slide.mp3",
			"n_change" : "n_change.mp3",
			"penguin_click" : "penguin_click.mp3",
			"slogan_slide" : "slogan_slide.mp3"
		},
		"p2": {
			"logo_slide" : "logo_slide.mp3",
			"n_change" : "n_change.mp3",
			"penguin_click" : "penguin_click.mp3",
			"slogan_slide" : "slogan_slide.mp3"
		}
	}
	
	logo_slide.src="sound/p1/logo_slide.mp3";
	
	logo_slide.addEventListener("canplaythrough", function(){
		console.log(logo_slide.duration);
		var timer=setTimeout(function(){
			logo_slide.play();
		},500);
	});
	
	slogan_slide.src="sound/p1/slogan_slide.mp3";
	
	slogan_slide.addEventListener("canplaythrough", function(){
		console.log(slogan_slide.duration);
		var timer=setTimeout(function(){
			slogan_slide.play();
		},700);
	});
	
	n_change.src="sound/p1/n_change.mp3";
	
	n_change.addEventListener("canplaythrough", function(){
		console.log(n_change.duration);
		var timer=setTimeout(function(){
			n_change.play();
		},2800);
	});
	
	penguin_clip.src="sound/p1/penguin_clip.mp3";
	
	penguin_clip.addEventListener("canplaythrough", function(){
		console.log(penguin_clip.duration);
		var timer=setTimeout(function(){
			penguin_clip.play();
		},1100);
	});
	
	}
	/*声音脚本 结束*/
	
	
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
			for(var j in img_list[i])
			img_array.push("../mobile/images/"+i+"/"+img_list[i][j]);
		}
	}
	
	var img_num=img_array.length;
	var img_loaded=0;
	
	for(var i=0;i<img_num;i++){
		var img=new Image();
		img.src=img_array[i];
		img.onload=function(){
			console.log(img_loaded);
			img_loaded++;
			if(img_num==img_loaded){
				
				pageStart();
				
			}
		}
	}
	
	function pageStart(){
		
		$(".loading_wrap").addClass("loading_hide");
		$(".con_wrap_1").addClass("wrap_show");	
		sound();
	}
	
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




















