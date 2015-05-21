    var fixedPosTop = 20,  //侧栏固定时距离顶部的距离
        mainMarginBottom = 70,  
        anchorOffset = 80,
        windowHeight = $(window).height(),
        arr = [],
        ie6 = !!window.ActiveXObject && !window.XMLHttpRequest;

    function sideBarFun(){
        //由于scrollTop 和 footerToTop 可能会发生改变，所以每次都要重新求一下最新的值
        var $sideBar = $('.sub_sidebar'),
            scrollTop = $(window).scrollTop(),
            scrollLeft = $(window).scrollLeft();
            footerToTop = $('.footer').offset().top,
            headerHeight = $('.head').height(),
            sideBarHeight = $('.sub_sidebar').height(),


            len = $('.sub_sidebar_list li').length,
            anchorPos = scrollTop + fixedPosTop + anchorOffset,  //anchorPos可以理解为指针，它的位置指向浏览器窗口顶端向下（fixedPosTop + anchorOffset<这个值可以根据自己需要调节，我这里设置为100>）个像素的高度。
            auchorIndex = 1;

        if($sideBar.length){
            if(scrollTop > headerHeight){  //如果需要固定
                $sideBar.addClass('fixed');

                var gap = footerToTop - scrollTop - fixedPosTop - sideBarHeight - mainMarginBottom;

                if(gap > 0){  //.sideBar的底部在.main的底部之上
                    if(!ie6){
                        $sideBar.css('top', fixedPosTop);
                        $sideBar.css('bottom', 'auto');
                    }else{  //ie6不支持fixed的解决办法
                        var ie6ScrollTop = scrollTop + 20;
                        $sideBar.css('top', ie6ScrollTop);
                    }
                }else{    //.sideBar的底部和.main的底部重合
                    var DynamicBottom = windowHeight - (footerToTop - scrollTop) + mainMarginBottom;
                    $sideBar.css('top', 'auto');               
                    $sideBar.css('bottom', DynamicBottom);
                }
                
                //避免调整窗口时左侧栏随浏览器窗口固定
                if(scrollLeft > 0){  
                    if(!ie6){
                        scrollLeft = 0 - scrollLeft;
                        $sideBar.css('left', scrollLeft + 'px');                   
                    }
                }else{
                    $sideBar.css('left', 'auto');
                }
                //*** end

                //左侧锚点跟随 
                auchorIndex = getAnchorIndex(arr, anchorPos);
                $('[li-index=' + auchorIndex + ']').addClass('current').siblings().removeClass('current');
                var layerCurrentPos = $('.sub_sidebar_list .current').position().top;
                $('.cover_layer').css('top', layerCurrentPos);
                //*** end

            }else{  //如果不需要固定
                $sideBar.removeClass('fixed');
                $sideBar.css('top', '0px');
            }
        }
        
    }


    function fixedBackToTopPos(){
        var scrollTop = $(window).scrollTop(),
            footerToTop = $('.footer').offset().top,
            gap = footerToTop - scrollTop - windowHeight;
        if(scrollTop > 500){
            $('.back_to_top').fadeIn();

            if(gap < 0){
                var bottom = scrollTop + windowHeight - footerToTop + 110;
                $('.back_to_top').css('bottom', bottom);
            }else{
                $('.back_to_top').css('bottom', '110px');
            }

            if(ie6){  //ie6下"回到顶部"按钮固定位置，此时position: absolute;
                var showTop = scrollTop + 500;
                $('.back_to_top').css('top', showTop);
            }

        }else{
            $('.back_to_top').fadeOut();
        }

    }

    //全部显示/隐藏切换
    function toggleText(showNum, boardItemTotal){
        if(showNum === boardItemTotal){
            $('.show_all').addClass('hide').html('全部隐藏');
        }else{            
            $('.show_all').removeClass('hide').html('全部显示');
        }
    }

    function getAnchorIndex(arr, anchorPos){
        var len = arr.length,
            start = 0,
            end = len - 1,
            mid = 0;
        while(start <= end){
            mid = Math.floor((start + end) / 2);
            if( arr[mid] > anchorPos){
                end = mid - 1;
            }else{
                start = mid + 1;
            }
        }
        return start;
    }

    function setSubsideListItemAttr(){
        var children = $('.sub_sidebar_list li'),
            len = children.length;
        for(var i = 0; i < len; i++){
            var index = i + 1;
            children[i].setAttribute('li-index', index);
        }
    }

    function getOffsetTopArr(){
        var len = $('.sub_sidebar_list li').length;
        for(var i = 0; i < len; i++){
            var index = i + 1;
            arr.push($('[data-article=' + index + ']').offset().top);
        }
    }

$(function(){
    
    fixedBackToTopPos();  //是否应该显示“回到顶部”的按钮

    if($('.sub_sidebar_list').length){
        var len = $('.sub_sidebar_list li').length;
        setSubsideListItemAttr(len);
        getOffsetTopArr();
        sideBarFun();  //侧栏是否应该固定
    }
    
    $(window).resize(function(){    //改变浏览器宽高的时候判断侧栏是否应该固定或调整位置
        windowHeight = $(window).height();  
        sideBarFun();
    });

    $(window).scroll(function(){  
        sideBarFun();  //判断侧栏是否应该固定
        fixedBackToTopPos();        
    });

    //左侧栏hover效果
    if($('.sub_sidebar').length){  //如果存在侧边栏
        var layerCurrentPos = $('.sub_sidebar_list li.current').position().top;
        $('.cover_layer').css('top',layerCurrentPos);  

        $('.sub_sidebar').mousemove(function(e){
            var $target = $(e.target);
            if(!$target.hasClass('cover_layer') && !$target.hasClass('sub_sidebar')){  //避免鼠标滑过cover右边蓝条的时候出现_top undefined错误。
                var $parent  = $target.parent('li');
                var _top = $parent.position().top - 1;  //最顶端有一个像素高度的border-top（不要加在ul上，要加在外层的div上，否则还是无法解决问题）,减去1（即border的高度）是为了避免鼠标滑过这一border的时候出现 undefined错误
                $('.cover_layer').css('top', _top); 
            }        
        }).mouseleave(function(e){
            $currentLi = $('.sub_sidebar_list li.current')
            layerCurrentPos = $currentLi.position().top - 1;
            $('.cover_layer').css('top', layerCurrentPos);
        }).click(function(e){
            var $target = $(e.target);
            var $parent = $target.parent('li');
            if(!$parent.hasClass('current')){
                $parent.addClass('current').siblings().removeClass('current');          
                $currentLi = $('.sub_sidebar_list li.current');
                layerCurrentPos = $currentLi.position().top;
                $('.cover_layer').css('top', layerCurrentPos);
            }
        });
    }

    //头部tab切换
    $('.menu_list li').on('click', function(){
        $(this).addClass('current').siblings().removeClass('current');
    })

    //Go to gop
    $('.back_to_top a').on('click', function(){   
        $('body,html').animate({scrollTop: 0}, 500);
    });


    //*** index.html start
    //banner tab_list切换
    $('.banner_wrap .tab_item').on('click', function(){
        var num = $(this).children().text();
        $(this).addClass('current').siblings().removeClass('current');
    })

    //右下角新闻列表tab_list切换
    $('.tab_item').on('click', function(){
        var num = $(this).children().text();
        $(this).addClass('current').siblings().removeClass('current');
        $(this).parent('.tab_list').siblings('.news_con').find('.list_'+num).addClass('current').siblings().removeClass('current');
    });
    //*** index.html end

    //*** board.html start
    var boardItemTotal = $('.board_list').children('.board_item').length,  //用于记录呈显示状态的board_item和所有的board_item的关系，如果所有的board_item呈显示状态，则“全部显示”应该自动更改为“全部隐藏”，反之亦然
        showNum = $('.board_list').children('.current').length;
    //展开/收起所有董事会成员
    $('.show_all').on('click', function(e){
        var $boardItem = $('.board_item');
        var $arrow = $('.arrow');
        if($(this).hasClass('hide')){
            $boardItem.removeClass('current');
            $(this).html('全部显示');
            showNum = 0;
            $arrow.addClass('dw_arrow').removeClass('up_arrow');
            getOffsetTopArr();
            sideBarFun();
        }else{            
            $boardItem.addClass('current');
            $(this).html('全部隐藏');
            showNum = boardItemTotal;
            $arrow.addClass('up_arrow').removeClass('dw_arrow');
            sideBarFun();
        } 
        $(this).toggleClass('hide');       
    });

    //查看每个董事会成员的明细
    $('.board_item').on('click', function(){
        var $arrow = $(this).children('.arrow');
        if($(this).hasClass('current')){
            $(this).removeClass('current');
            $arrow.addClass('dw_arrow').removeClass('up_arrow');
            showNum -= 1;
            toggleText(showNum, boardItemTotal);
        }else{
            $(this).addClass('current');
            $arrow.addClass('up_arrow').removeClass('dw_arrow');   
            showNum += 1;       
            toggleText(showNum, boardItemTotal);
        }
    });

    //*** board.html end


    //*** company.html start
    //新闻列表tab_list切换
    $('.tab_item').on('click', function(){
        var num = $(this).children().text();
        $(this).addClass('current').siblings().removeClass('current');
        $(this).parent().siblings('.news_ol_list').find('.item_'+num).addClass('current').siblings().removeClass('current');
    });

    //社会责任tab_list切换
    $('.entry_tab').on('click', function(e){
        var num = e.target.className.split(' ')[1].split('_')[1];  //取出entry_n的数字n
        $('.company_charity ' + '.cont_' + num).addClass('active').siblings().removeClass('active');
    });
    $('.company_charity .tab_item').on('click', function(e){
        var _this = $(e.target);
        var num = _this.children().text();
        _this.addClass('current').siblings().removeClass('current');
        _this.parent().siblings('.charity_list').find('.item_'+num).addClass('current').siblings().removeClass('current');
    });
    //*** company.html end
    
});