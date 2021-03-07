////// 디스커버리 메인 JS - main.js /////

$(function () {

    // 슬라이드
    let sld = $('.slide')

    // 드래그 설정
    sld.draggable({
        axis: 'x' // x축 고정
    })

    //////////////////////////////////////////////////////////
    // 배너 슬라이드 기능구현 //
    // 대상 : .slide
    // 기능 : 슬라이드를 드래그하여 슬라이드를 넘긴다!
    // 이벤트 드래그가 끝난시점에 대한 이벤트처리
    // 1) dragstop - 드래그 멈췄을때
    // 2) touchend - 터치 스크린에서 터치가 끝났을때
    // [ 드래그 기능 구현하기 ]
    // 1. 드래그가 끝난시첨에서 각 배너의 width값을 10% 기준해서 left 값치 -100%이므로 
    // 2. -110%보다 작으면 슬라이드를 왼쪾으로 애니메이션이동
    // 3. -90%선트보다 크면 슬라이드를 오른쪾으로 애니메이션이동
    // 4. -110%와 -90%범위 사이이면 원래위치인 -100%로 복귀
    // 유의사항) 실제 left값을 구하면 px단위이므로  기준값을 화면크기의 px로 변환하여 계산한다

    /////////////////////////////////////////////////////////////////////////////
    // 이벤트 구현
    // 대상 : .slide (sld변수)
    // 사용 메서드 : on(이벤트명, 함수)
    // 알아야할 값은?? 윈도우 크기(100%를 계산함), 현제 슬라이드 left값

    // 윈도우 사이즈(left값의 기본단위임!!!)
    let win = $(window).width();

    // 슬라이드 left값
    let sleft;

    // 배너커버
    let prot = $('.prot');

    // 배너순번(블릿순번)
    let bseq = 0;
    
    // 만약 화면 크기가 중간에 변경될경우 window 크기 재할당
    $(window).resize(function(){
        
        console.log('리사이즈!');
        
        // 윈도우 크기 재설정
        win = $(window).width()
        
    })///// resize /////


    ////////////////////////////////////////////////////////////////
    // 드래그 이벤트 함수
    sld.on('dragstop touchend', function () {

        // console.log('드래그끝!');
        
        // 자동 슬라이드 지우기!!!
        clearAuto()

        // 광드래그 막기용 커버
        prot.show()

        // 1. 슬라이드 left이동 변경값 체크!!!!
        sleft = $(this).offset().left;
        // offset().left현제 선택요소의 left 값을 리턴 !!!
        console.log('left:' + sleft);

        // 2. left값이 -110%보다 작으면 왼쪾으로 이동하기
        // -win*1.1은 윈도우폭 만큼 나가있는 px크기의 110%확장
        if (sleft < -win * 1.1) {

            // 왼쪾 이동 애니메이션 : -200%이동과 동일
            $(this).stop().animate({

                left: -win * 2 + 'px'

            }, 1500, 'easeOutCubic', function () { // 함수 애니후

                // 이동후에 앞에 두개의 슬라이드가 있으므로 하나를 뒤로 이동시킨후 left값을 다시 -100%로 변경!!! 처음과 똑같은 상태로 만들어 준다!!
                $(this).append($('li', this).first()).css({
                    left: -win + 'px'
                }) ///// css /////

                // 광드래그 커버제거
                prot.hide()

            }) ///// anmate후 함수 /////

            // 배너블릿 순번 증가
            bseq++
            if (bseq === 6) bseq = 0 // 한계수

        } ///// if /////

        // 3. left값이 -90%보다 크면 오른쪾으로 이동하기 
        else if (sleft > -win * 0.9) {

            // 오른쪽이동 애니메이션 : 0%이동
            $(this).stop().animate({

                left: '0px'

            }, 1500, 'easeOutCubic', function () { // 애니메이션후 함수

                // 이동 후 앞에 아무것도 없으므로  맨뒤에 li를 맨 앞으로 이동후left값을 -100%로 변경!!!처음과 같은 상태로 만들어 준다!!!!
                $(this).prepend($('li', this).last()).css({
                    left: -win + 'px'
                }) ///// css /////

                // 광드래그 커버제거
                prot.hide()

                // 배너블릿 순번 감소
                bseq--
                if (bseq === -1) bseq = 5 // 한계수

            }) ///// animate 후 함수

        } ///// else if /////

        // 4. 범위에 들지 않은 경우 (-100%~-90%) 제자리로 돌아가기
        else {

            $(this).stop().animate({

                left: -win * 2 + 'px'

            }, 400, 'easeOutCubic', function () {

                // 광드래그 커버제거
                prot.hide()

            }) ///// animate 후 함수

        } ///// else /////

        // 블릿 해당순번 li에 class "on" 넣기
        $('.indic li').eq(bseq).addClass('on')
            .siblings().removeClass('on')

    }) ///// dragstop touchend /////
    //////////////////////////////////////////////////////////////

    /*/////////////////////////////////////////////////////////
        함수명 : autoSlide
        기능 : 슬라이드 자동넘기기
    */ /////////////////////////////////////////////////////////
    let autoSlide = function () {
        
        // 광드래그 막기용 커버
        prot.show();

        // 슬라이드 왼쪽이동하기 (드래그이동 if문과 동일)
        // 왼쪾 이동 애니메이션 : -200%이동과 동일
        sld.animate({

            left: -win * 2 + 'px'

        }, 1500, 'easeOutCubic', function () { // 함수 애니후

            // 이동후에 앞에 두개의 슬라이드가 있으므로 하나를 뒤로 이동시킨후 left값을 다시 -100%로 변경!!! 처음과 똑같은 상태로 만들어 준다!!
            $(this).append($('li', this).first()).css({
                left: -win + 'px'
            }) ///// css /////

            // 광드래그 커버제거
            prot.hide()

        }) ///// anmate후 함수 /////

        // 배너블릿 순번 증가
        bseq++
        if (bseq === 6) bseq = 0 // 한계수
        // 광드래그 커버제거
        prot.hide()
        // 블릿 해당순번 li에 class "on" 넣기
        $('.indic li').eq(bseq).addClass('on')
            .siblings().removeClass('on')

    } ///// autoSlide /////

    let autoI // 인터발용 변수
    
    /*///////////////////////////////////////////////////////////////////////
        함수명 : autoCall
        기능 : 메인슬라이드 배너 넘기기 자동호출
    *////////////////////////////////////////////////////////////////////////
    let autoCall = function(){
        
        autoI = setInterval(autoSlide, 4000)
        
    }///// autoCall /////
    
    // 슬라이드 자동넘김 최초호출!!!!
    autoCall()
    
    // 타임 아웃용 변수
    let autoT
    
    /*/////////////////////////////////////////////////////////////////
        함수  
        // 타임 아웃용 변수명 : clearAuto
        let 기능 : 메인배너autoT 슬라이드 자동호출 지우기 -> 일정시간후 자동넘김 재호출
        어디서 호출 : 직접 드래그시 호출!!!
        
    *//////////////////////////////////////////////////////////////////
    let clearAuto = function(){
    
        // 잉ㄴ터발 지우기
        clearInterval(autoI)
        
        // 타임아웃 지우기
        clearTimeout(autoT)
        
        // 매번 재호출 셋팅!
        autoT = setTimeout(autoCall, 4000)// 4초후에 자동넘김 재호출
        
    }///// clearAuto /////
    


}) //// jQB //////////////////////////////////
//////////////////////////////////////////////
