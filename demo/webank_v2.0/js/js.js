$(document).ready(function(){
	
	
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
	var w_h=1;
	var f_top_start=1;
	var f_top_end=1;
	
	function resetSize(){
		w_h=$(window).height();
		$(".con_wrap_3 .txt").css({
			"height":w_h+"px"
		});
		$(".con_wrap_3 .phone").css({
			"height":w_h+"px"
		});
		f_top_start=$(".txt_1").offset().top;
		f_top_end=$(".txt_3").offset().top;
	}
	
	resetSize();
	
	$(window).resize(function(){
		resetSize();
	});
	
	
	$(".wrap").scroll(function(){
		
		
			var s_top=$(".wrap").scrollTop();
			
			if(s_top>=0&&s_top<w_h){
				$(".con_wrap_1").css({
					"margin-bottom":s_top*-1+"px"
				});
				$(".con_wrap_1").css({
					"margin-top":s_top+"px"
				});
			}
			
			if(s_top>f_top_start&&s_top<f_top_end){
				
				$(".phone").addClass("phone_fix_top").removeClass("phone_fix_bottom");
				
				if(s_top<f_top_start+w_h){
					$(".phone").addClass("phone_1").removeClass("phone_2").removeClass("phone_3");
				}else if(s_top>f_top_start+w_h&&s_top<(f_top_start+w_h*2)){
					$(".phone").addClass("phone_2").removeClass("phone_1").removeClass("phone_3");
				}
				
				
			}else if(s_top<=f_top_start){
				$(".phone").removeClass("phone_fix_top");
			}else if(s_top>=f_top_end){
				$(".phone").removeClass("phone_fix_top").addClass("phone_fix_bottom");
				if(s_top>(f_top_start+w_h*2)){
					$(".phone").addClass("phone_3").removeClass("phone_1").removeClass("phone_2");
				}
			}
	});
	//console.log($(".txt_1").offset().top);
	
	/*$(window).scroll(function(){
		
		console.log("123");
	});*/
	
	var mouse_ori_x=0;
	var mouse_ori_y=0;
	var mouse_move_x=0;
	var mouse_move_y=0;
	var distance_x=0;
	var distance_x_pre=0;
	var dragging=0;
	var $loan_wrap=$(".loan_wrap");
	var $app_wrap=$(".app_wrap");
	var loan_width_pre=$($loan_wrap).width();
	var app_width_pre=$($app_wrap).width();
	
	
	function slideInit(){
		$(".loan_container").css({
			"left": loan_width_pre-500+"px"
		});
		$(".app_container").css({
			"right": app_width_pre-500+"px"
		});
	}
	
	slideInit();
	
	
	
	
	
	
	var i=0;
	
	$(document).mousedown(function(eve_d){
		//console.log("fuck_down");
		
		mouse_ori_x=eve_d.clientX;
		mouse_ori_y=eve_d.clientY;
		
		//console.log(eve_d.target.className);
		
		if(eve_d.target.className=="arrow_area_outter"){
			dragging=1;
			$(".arrow_area_outter").addClass("dragging");//添加类名触发按下效果
		}
		
		//console.log(mouse_ori_x+" "+mouse_ori_y);
		
		$(document).mousemove(function(eve_m){
			
			if(dragging==1){
				mouse_move_x=eve_m.clientX;
				mouse_move_y=eve_m.clientY;
				distance_x=mouse_move_x-mouse_ori_x;
				
				distance_x=distance_x+distance_x_pre;
				
				if(distance_x>=300){
					distance_x=300;
				}
				else if(distance_x<=-300){
					distance_x=-300;
				}
				
				if(distance_x>0){
					$(".arrow_area_outter").addClass("dragging_right").removeClass("dragging_left");
				}else{
					$(".arrow_area_outter").addClass("dragging_left").removeClass("dragging_right");
				}
				
				//console.log(mouse_move_x+" "+mouse_move_y);
				
				$(".separate_wrap").css({
					"-webkit-transform":"translate("+distance_x+"px,0px)"
				});
				/*
				// 拖动150px会越过屏幕
				if(distance_x>0&&distance_x<=150){
					$(".loan_wrap .bg_color").css({
						"opacity": 1-(Math.floor(distance_x/150*1000))/1000
					});
				}else if(distance_x>-150&&distance_x<=0){
					$(".app_wrap .bg_color").css({
						"opacity": 1+(Math.floor(distance_x/150*1000))/1000
					});
				}*/
				
				if(distance_x>=0){
					
					resetNegative();
					EffectFadeInOut($(".loan_wrap .bg_color"),0,150,distance_x,0);
					EffectFadeInOut($(".app_wrap .detail_info .title"),50,100,distance_x,0);
					EffectFadeInOut($(".app_wrap .detail_info .logo_tips"),50,170,distance_x,0);
					EffectFadeInOut($(".app_wrap .detail_info .qr_code_area"),50,240,distance_x,0);
					EffectFadeInOut($(".loan_bg"),0,300,distance_x,1);
					
					EffectTranslate($(".app_wrap .detail_info .logo_pic"),50,240,distance_x,0,0,90,25);
					EffectTranslate($(".app_wrap .detail_info .logo_name"),50,240,distance_x,0,0,90,15);
					
					EffectColor($(".loan_wrap .detail_info .title"),0,300,distance_x,"#666","#fff");
					EffectColor($(".loan_wrap .detail_info .logo_tips"),0,300,distance_x,"#666","#fff");
					EffectColor($(".loan_wrap .detail_info .logo_name"),0,300,distance_x,"#666","#fff");
					EffectColor($(".loan_wrap .detail_info .scan_tips"),0,300,distance_x,"#666","#fff");
					EffectColor($(".product_info"),0,300,distance_x,"#8d8d8d","#fff");
					
				}else{
					
					resetPositive();
					EffectFadeInOut($(".app_wrap .bg_color"),0,-150,distance_x,0);
					EffectFadeInOut($(".loan_wrap .detail_info .title"),-50,-100,distance_x,0);
					EffectFadeInOut($(".loan_wrap .detail_info .logo_tips"),-50,-170,distance_x,0);
					EffectFadeInOut($(".loan_wrap .detail_info .qr_code_area"),-50,-240,distance_x,0);
					EffectFadeInOut($(".loan_bg"),0,-300,distance_x,1);
					
					EffectTranslate($(".loan_wrap .detail_info .logo_pic"),-50,-240,distance_x,0,0,-90,25);
					EffectTranslate($(".loan_wrap .detail_info .logo_name"),-50,-240,distance_x,0,0,-90,15);
					
					EffectColor($(".loan_wrap .detail_info .logo_name"),0,-300,distance_x,"#666","#fff");
					
				}
				
				//console.log("distance: "+distance_x);
				//复位，防止快速移动，导致鼠标监听不及时
				function resetNegative(){
					$(".app_wrap .bg_color").attr("style","");
					$(".loan_wrap .detail_info .title").attr("style","");
					$(".loan_wrap .detail_info .logo_tips").attr("style","");
					$(".loan_wrap .detail_info .qr_code_area").attr("style","");
					$(".loan_wrap .detail_info .logo_pic").attr("style","");
					$(".loan_wrap .detail_info .logo_name").attr("style","");
				}
				
				function resetPositive(){
					$(".loan_wrap .bg_color").attr("style","");
					$(".app_wrap .detail_info .title").attr("style","");
					$(".app_wrap .detail_info .logo_tips").attr("style","");
					$(".app_wrap .detail_info .qr_code_area").attr("style","");
					$(".app_wrap .detail_info .logo_pic").attr("style","");
					$(".app_wrap .detail_info .logo_name").attr("style","");
				}
				
				function EffectFadeInOut(elem,dis_start,dis_end,distance_x,direction){
					//console.log(direction)
					if(direction==0){
						if(distance_x>=0){
							if(distance_x>dis_start&&distance_x<=dis_end){
								
								var num=1-(Math.floor((distance_x-dis_start)/Math.abs(dis_end-dis_start)*1000))/1000;
								$(elem).css({
									"opacity": num
								});
								
							}else if(distance_x<=dis_start){
							
								$(elem).css({
									"opacity": 1
								});
								
							}else if(distance_x>dis_end){
								
								$(elem).css({
									"opacity": 0
								});
								
							}
							
						}else{
							if(distance_x>dis_end&&distance_x<=dis_start){
								
								var num=1-(Math.floor(Math.abs(distance_x-dis_start)/Math.abs(dis_end-dis_start)*1000))/1000;
								$(elem).css({
									"opacity": num
								});
								
							}else if(distance_x>dis_start){
								
								$(elem).css({
									"opacity": 1
								});
								
							}else if(distance_x<=dis_end){
								
								$(elem).css({
									"opacity": 0
								});
								
							}
						}	
					}else{
						if(distance_x>=0){
							if(distance_x>dis_start&&distance_x<=dis_end){
								
								var num=(Math.floor((distance_x-dis_start)/Math.abs(dis_end-dis_start)*1000))/1000;
								$(elem).css({
									"opacity": num
								});
								
							}else if(distance_x<=dis_start){
								
								$(elem).css({
									"opacity": 0
								});
								
							}else if(distance_x>dis_end){
								
								$(elem).css({
									"opacity": 1
								});
								
							}
							
						}else{
							if(distance_x>dis_end&&distance_x<=dis_start){
								
								var num=(Math.floor(Math.abs(distance_x-dis_start)/Math.abs(dis_end-dis_start)*1000))/1000;
								$(elem).css({
									"opacity": num
								});
								
							}else if(distance_x>dis_start){
								
								$(elem).css({
									"opacity": 0
								});
								
							}else if(distance_x<=dis_end){
								
								$(elem).css({
									"opacity": 1
								});
								
							}
						}
					}
				}
				
				function EffectTranslate(elem,dis_start,dis_end,distance_x,t_s_x,t_s_y,t_e_x,t_e_y){//translate_start_x translate_end_x 
					if(distance_x>=0){
						
						if(distance_x>dis_start&&distance_x<=dis_end){
							
							var param=(Math.floor((distance_x-dis_start)/Math.abs(dis_end-dis_start)*1000))/1000;
							var num1=param*(t_e_x-t_s_x);
							var num2=param*(t_e_y-t_s_y);
							
							$(elem).css({
								"-webkit-transform": "translate("+num1+"px,"+num2+"px)"
							});
							//.app_wrap .detail_info .logo_pic
						}else if(distance_x<=dis_start){
							
							$(elem).css({
								"-webkit-transform": "translate("+t_s_x+"px,"+t_s_y+"px)"
							});
							
						}else if(distance_x>dis_end){
							
							$(elem).css({
								"-webkit-transform": "translate("+t_e_x+"px,"+t_e_y+"px)"
							});
							
						}
						
					}else{
						
						if(distance_x>dis_end&&distance_x<=dis_start){
							
							var param=(Math.floor(Math.abs(distance_x-dis_start)/Math.abs(dis_end-dis_start)*1000))/1000;
							var num1=param*(t_e_x-t_s_x);
							var num2=param*(t_e_y-t_s_y);
							
							$(elem).css({
								"-webkit-transform": "translate("+num1+"px,"+num2+"px)"
							});
							
						}else if(distance_x>dis_start){
							
							$(elem).css({
								"-webkit-transform": "translate("+t_s_x+"px,"+t_s_y+"px)"
							});
							
						}else if(distance_x<=dis_end){
							
							$(elem).css({
								"-webkit-transform": "translate("+t_e_x+"px,"+t_e_y+"px)"
							});
							
						}
						
					}
				}
				
				function EffectColor(elem,dis_start,dis_end,distance_x,color_start,color_end){//translate_start_x translate_end_x 
					
					$(elem).css({
						"-webkit-transition":"color 0.3s linear"
					});
					
					if(distance_x>=0){
						
						if(distance_x>dis_start&&distance_x<=dis_end){
							
							var param=(Math.floor((distance_x-dis_start)/Math.abs(dis_end-dis_start)*1000))/1000;
							if(param>=0.6){
								$(elem).css({
									"color": color_end
								});
							}else{
								$(elem).css({
									"color": color_start
								});
							}
							
						}else if(distance_x<=dis_start){
							
							$(elem).css({
								"color": color_start
							});
							
						}else if(distance_x>dis_end){
							
							$(elem).css({
								"color": color_end
							});
							
						}
						
					}else{
						
						if(distance_x>dis_end&&distance_x<=dis_start){
							
							var param=(Math.floor((distance_x-dis_start)/Math.abs(dis_end-dis_start)*1000))/1000;
							//console.log(param);
							if(param<=-0.6){
								$(elem).css({
									"color": color_end
								});
							}else{
								$(elem).css({
									"color": color_start
								});
							}
							
						}else if(distance_x>dis_start){
							
							$(elem).css({
								"color": color_start
							});
							
						}else if(distance_x<=dis_end){
							
							$(elem).css({
								"color": color_end
							});
							
						}
						
					}
				}
				
				$($loan_wrap).width(loan_width_pre+distance_x);
				$($app_wrap).width(app_width_pre-distance_x);
				
				//console.log("fuck_move"+(i++));
				//console.log("width: "+loan_width_pre+" distance: "+distance_x);
				
				eve_m.stopImmediatePropagation();
			}
		});
		
		
		$(document).mouseup(function(eve_u){
			if(dragging==1){
				//console.log("fuck_up");
		/*		mouse_move_x=eve_u.clientX;
				mouse_move_y=eve_u.clientY;*/
		
				distance_x_pre=distance_x;
				
				$(".separate_wrap").css({
					"-webkit-transform":"translate("+distance_x+"px,0px)"
				});
				
				dragging=0;
				$(".arrow_area_outter").removeClass("dragging").removeClass("dragging_left").removeClass("dragging_right");//添加类名触发按下效果
				
				//console.log(distance_x);
			}
		});
		
	});
	
	
	
});




















