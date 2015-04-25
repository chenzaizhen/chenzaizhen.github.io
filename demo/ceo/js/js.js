(function($){$.fn.touchwipe=function(settings){var config={min_move_x:20,min_move_y:20,wipeLeft:function(){},wipeRight:function(){},wipeUp:function(){},wipeDown:function(){},preventDefaultEvents:true};if(settings)$.extend(config,settings);this.each(function(){var startX;var startY;var isMoving=false;function cancelTouch(){this.removeEventListener('touchmove',onTouchMove);startX=null;isMoving=false}function onTouchMove(e){if(config.preventDefaultEvents){e.preventDefault()}if(isMoving){var x=e.touches[0].pageX;var y=e.touches[0].pageY;var dx=startX-x;var dy=startY-y;if(Math.abs(dx)>=config.min_move_x){cancelTouch();if(dx>0){config.wipeLeft(e)}else{config.wipeRight(e)}}else if(Math.abs(dy)>=config.min_move_y){cancelTouch();if(dy>0){config.wipeDown(e)}else{config.wipeUp(e)}}}}function onTouchStart(e){if(e.touches.length==1){startX=e.touches[0].pageX;startY=e.touches[0].pageY;isMoving=true;this.addEventListener('touchmove',onTouchMove,false)}}if('ontouchstart'in document.documentElement){this.addEventListener('touchstart',onTouchStart,false)}});return this}})(jQuery);

$(document).ready(function(){
	
	/*翻页标识*/
	var page_index=1;//当前在哪个页面
	var moving=0;
	var render_timer=1;
	var o_canvas;
	
	var renderer;
	var displacementTexture;
	var displacementFilter;
	var stage;
	var pondContainer;
	var bg;
	var count=0;
	var filtersToApply;
	var time_duration=20;
	var time_count=0;
	var param_range=5;
	var animation_stop=0;
	
	var last_count=0;
	var last_param_range=0;
	var param_vector=0;
	
	var num=1;
	var animation_time=10;
	
	//波纹pixi
	//var flag_stopAnimation=0;
	
	function canvas_create(){
	
	renderer = PIXI.autoDetectRenderer(750, 1334);
    renderer.view.style.position = "absolute"
    renderer.view.style.width = window.innerWidth + "px";
    renderer.view.style.height = window.innerHeight + "px";
    renderer.view.style.display = "block";

    // add render view to DOM
    document.body.appendChild(renderer.view);

    displacementTexture = PIXI.Texture.fromImage("images/displacement_map.jpg");
    displacementFilter = new PIXI.DisplacementFilter(displacementTexture);


    // create an new instance of a pixi stage
    stage = new PIXI.Stage(0xf4f1e7, true);
    
    pondContainer = new PIXI.DisplayObjectContainer();
    stage.addChild(pondContainer);
	

    stage.interactive = true;
    
    bg = PIXI.Sprite.fromImage("images/displacement_BG.jpg");
    pondContainer.addChild(bg);
	bg.alpha=0;
	
    var img_list=["images/drop_1.jpg","images/drop_2.jpg","images/drop_3.jpg","images/drop_4.jpg"];
	var drop_list=[];
	var x=375;
	var y=667;
   
    for(var i=0;i<img_list.length;i++){
		drop_list.push(PIXI.Sprite.fromImage(img_list[i]));
		pondContainer.addChild(drop_list[i]);
		drop_list[i].position.x=x;
		drop_list[i].position.y=y;
		drop_list[i].pivot.x=504;
		drop_list[i].pivot.y=504;
		
		drop_list[i].scale.x=0.01;
		drop_list[i].scale.y=0.01;
		drop_list[i].alpha=0;
		
		if(i==0){
			drop_list[i].alpha=1;
		}
	}
	
	var scale_counter=1;
	
	var timer_scale=setInterval(function(){
		scale_counter++;
		
		if(scale_counter>=40){
			drop_list[0].alpha-=0.03;
			if(drop_list[0].alpha<=0){
				drop_list[0].alpha=0;
			}
			
			drop_list[1].alpha+=0.04;
			if(drop_list[1].alpha>=1){
				drop_list[1].alpha=1;
			}
		}
		if(scale_counter>=90){
			drop_list[1].alpha-=0.02;
			if(drop_list[1].alpha<=0){
				drop_list[1].alpha=0;
			}
			
			drop_list[2].alpha+=0.02;
			if(drop_list[2].alpha>=1){
				drop_list[2].alpha=1;
			}
		}
		if(scale_counter>=140){
			drop_list[2].alpha-=0.02;
			if(drop_list[2].alpha<=0){
				drop_list[2].alpha=0;
			}
			
			drop_list[3].alpha+=0.02;
			if(drop_list[3].alpha>=1){
				drop_list[3].alpha=1;
			}
		}
		
		for(var number=0;number<drop_list.length;number++){
			if(drop_list[number].scale.x/*<1&&drop.scale.x>0*/){
				drop_list[number].scale.x+=0.009*(1-scale_counter/600);
				drop_list[number].scale.y+=0.009*(1-scale_counter/600);
				drop_list[number].rotation+=0.0014;
			}
		}
		
		if(scale_counter>=210){
			//clearInterval(timer_scale);
			coverFadeIn();
		}
		
	},20);
	
	function coverFadeIn(){
		drop_list[0].alpha=0;
		drop_list[1].alpha=0;
		drop_list[2].alpha=0;
		bg.alpha=1;
		
		var cover_timer=setInterval(function(){
			//console.log(drop_list[3].alpha);
			drop_list[3].alpha-=0.004;
			drop_list[3].alpha=Math.round(drop_list[3].alpha*1000)/1000;
			//bg.alpha+=0.03;
			//bg.alpha=Math.round(bg.alpha*100)/100;

			if(drop_list[3].alpha<=0){
				clearInterval(cover_timer);
				clearInterval(timer_scale);
				drop_list[3].alpha=0;
				
				pondContainer.removeChild(drop_list[0]);
				pondContainer.removeChild(drop_list[1]);
				pondContainer.removeChild(drop_list[2]);
				pondContainer.removeChild(drop_list[3]);
				
			}
		},20);
	}
	
	
    
    displacementFilter.scale.x = 12;
    displacementFilter.scale.y = 12;
    
    count = 0;
    requestAnimFrame(animate);
	
	filtersToApply = [displacementFilter];
	pondContainer.filters = filtersToApply;
	
	o_canvas=$("canvas")[0];

    //console.log(stage);
    
	
	
	}
	
	function animate() {
        
/*        count += 0.1;
        
        var blurAmount = Math.cos(count) ;
        var blurAmount2 = Math.sin(count * 0.8)  ;

    
        displacementFilter.offset.x = count * 15;
        displacementFilter.offset.y = count * 15;
		
		renderer.render(stage);*/
		//requestAnimFrame(animate);
		$(".num").html(num++);
		
		if(animation_stop==0){
		
			var param_count=1000*animation_time/time_duration;
			
			render_timer=setTimeout(function(){
				
				if(time_count<=param_count){
			
					displacementFilter.offset.x -= param_range*2/3;
					displacementFilter.offset.y -= param_range*2/3;
					renderer.render(stage);
					animate();
					
					//波纹 减速至停止
					if(param_range>=0){
						
						//console.log(param_vector+" "+param_range);
						
						if(param_vector==0){
							param_range-=0.01;
						}
						else if(param_vector==1&&param_range<=5){
							param_range+=0.02;
							if(param_range>=5){
								param_vector=0;
							}
						}
						
						param_range=Math.round(param_range*100)/100;
					}
					
					//console.log(param_range+" "+time_count);
					
					time_count++;
					
				}else{
					
					animation_stop=1;
					param_vector=1;
					param_range=0;
					last_count=count;
					last_param_range=param_range;
					
				}
				
				
				
			},time_duration);//减缓死刑
			
		}else{
			
			
		}
		
    }
	
	canvas_create();
	
	var o_canvas=$("canvas")[0];
	$(o_canvas).addClass("canvas");
	$(o_canvas).attr("id","o_canvas");
	
	var timer_cover_first=setTimeout(function(){
		$(".con_wrap_1").addClass("wrap_show");
		clearTimeout(timer_cover_first);
	},4900);
	
	
	
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
	
	function wipe_up(){
		if(page_index<=1){
			return ;
		}
		
		if(page_index==1||page_index==2||page_index==3){
			activeWave();
			if(page_index==3){
				$(".canvas").css({
					"opacity":1	
				});
			}
		} 
		
		//滑屏
		$(".con_wrap_"+page_index).addClass("wrap_prepare").removeClass("wrap_show");
		$(".con_wrap_"+(page_index-1)).addClass("wrap_show").removeClass("wrap_hide");
		page_index--;
/*		var timer=setTimeout(function(){
			
			$(".con_wrap_"+(page_index-1)).removeClass("wrap_hide");
			$(".con_wrap_"+page_index).removeClass("wrap_show");
			page_index--;
			
		},300);*/
		
	}
	
	function wipe_down(){
		if(page_index>=7){
			return ;
		}
		
		if(page_index==1){
			activeWave();
		}
		else if(page_index==2){
			$(".canvas").css({
				"opacity":0	
			});
		}
		
		//滑屏
		$(".con_wrap_"+page_index).addClass("wrap_hide");
		$(".con_wrap_"+(page_index+1)).addClass("wrap_show");
		
		var timer=setTimeout(function(){
			
			$(".con_wrap_"+(page_index+1)).removeClass("wrap_prepare");
			$(".con_wrap_"+page_index).removeClass("wrap_show");
			page_index++;
			
		},300);
		
		
	}
	
	function activeWave(){
		//触发波纹
		if(animation_stop==1){
			animation_stop=0;
			
			param_vector=1;
			param_range=last_param_range;
			time_count=-250;
			animate();
		}
	}
	
	var pop_wrap_open=0;
	$(".date_list li").click(function(e){
		if(pop_wrap_open==0){
			$(".date_list li").removeClass("details_show");
			$(this).addClass("details_show").addClass("zindex_hook");
			pop_wrap_open=1;
		}
		else{
			$(this).removeClass("details_show");
			var timer=setTimeout(function(){
				$(".date_list li").removeClass("zindex_hook");
			},200);
			pop_wrap_open=0;
		}
		
		e.preventDefault();
		e.stopPropagation(); 
	});
	
	
	$(".con_wrap_4").click(function(){
		$(".date_list li").removeClass("details_show");
		var timer=setTimeout(function(){
			$(".date_list li").removeClass("zindex_hook");
		},200);
		pop_wrap_open=0;
	});
	
	
});





































