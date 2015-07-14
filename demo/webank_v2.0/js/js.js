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
	
});




















