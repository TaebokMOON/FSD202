(function( $ ) {

    $.fn.scrollReveal = function() {

        //get viewport size
        var windowHeight = $(window).height(),// 윈도우 높이값
            windowWidth = $(window).width(), // 윈도우 가로값(예비용)
            initialScroll = $(window).scrollTop(),// 스크롤 위치값
            items = $('.js-reveal'),// 등장액션 대상 클래스 요소
            items2 = $('.js-reveal2'), //확장샘플
            items3 = $('.js-reveal3'), //확장샘플
            scroll;// 이동시 스크롤 위치값

        //hide anything not in the viewport
        // 윈도우 높이값보다 클떄(즉, 화면에서 보이지 않는 경우)
        // 초기화 클래스 주기 (숨기고 위치이동한 클래스)
        // each() 메서드로 선택된 모든 클래스 대상요소를 돌아준다
        items.each(function(){
            if($(this).offset().top >= windowHeight){
                $(this).addClass('js-reveal--hidden');
            }
        });///// each /////
        
        //확장샘플
        items2.each(function(){
            if($(this).offset().top >= windowHeight){
                $(this).addClass('js-reveal2--hidden');
            }
        });///// each /////
        
        //확장샘플
        items3.each(function(){
            if($(this).offset().top >= windowHeight){
                $(this).addClass('js-reveal3--hidden');
            }
        });///// each /////
        
        
        // 등장위치를 조정하는 값(화면 높이에서 뺼값)
        let gap = 100;
        
        

        //on scroll
        // 실제 스크롤 이벤트가 발생하는 처리
        $(window).scroll(function (event) {
            //get the current scroll position
            scroll = $(window).scrollTop();
            //show anything that is now in view (scroll + windowHeight)
            // 대상요소를 돌면서 위치값이 화면아래에서 위로 올라올떄 숨김 클래스를 제거해서 등장액션을 보여준다!!!!!!!!
            // 등장위치를 조금 조정하기 위해 gap만큼 뺴준다!!!
            items.each( function(){
                if($(this).offset().top <= (scroll + windowHeight+gap)){
                    $(this).removeClass('js-reveal--hidden');
                }
            });///// each /////
            
            // 확장샘플
            items2.each( function(){
                if($(this).offset().top <= (scroll + windowHeight+gap)){
                    $(this).removeClass('js-reveal2--hidden');
                }
            });///// each /////
            
            // 확장샘플
            items3.each( function(){
                if($(this).offset().top <= (scroll + windowHeight+gap)){
                    $(this).removeClass('js-reveal3--hidden');
                }
            });///// each /////
            
        });///// 스크롤메서드 /////

        return this;
    };
}( jQuery ));
