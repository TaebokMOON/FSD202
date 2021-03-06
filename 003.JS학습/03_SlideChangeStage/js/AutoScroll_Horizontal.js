////////////////////////////////////
////// 원 페이지 자동 스크롤 JS - 수평방향이동 ///////
////////////////////////////////////

////// 전역변수 구역 /////////////////
// 현재 페이지 번호
let pno = 0;
// 전체 페이지수(상수로 변경불가!)
const totnum = 7;
// 광스크롤 막기(0-허용,1-불허용)
let psts = 0;
///////////////////////////////////// 

$(function(){
    
    
    /*
    [ 자동스크롤 구현! ]
    
    1. 기능 : 마우스휠을 위나 아래로 작동 시킬때 
        페이지가 위나 아래로 자동으로 애니메이션되는기능
    
    2. 이벤트 : 마우스휠을 움직일떄 발생하는 이벤트??
        - mousewheel(오리지널 이벤트)
        - wheel(신규이벤트 - 벤더사의 웹표준이 아직 안됨!)
        - DOMMouseScroll (파이어폭스 전용 휠이벤트)
        -> 결론적으로 모두 한꺼번에 지원하는 이벤트가 없으므로 
            mousewheel + DOMMouseScroll 을 같이 사용할것임!!
    
    3. 마우스 휠 이벤트 함수를 연결하는 방법
        - on(이벤트명,함수)
        -> on메서드로 어떤 이벤트와도 함수를 연결할 수 있다!
            (참고로 bind(이벤트명,함수) 제이쿼리 버전 3부터 지원중단!!
    
    4. 마우스 휠 이벤트 대상 : 보통 document에 적용함
        -> 유의사항 : document, window, body 3가지 중요객체에서 기본기능 중단을 못하도록 코드가 변경되었음!! (2019년) 이것을 대상으로 해서 e.preventDefault()같은 코딩을하면 에러가 나면서 작동도 불가함!!(만약 사용하려면 body내부에 body를 대신하는 요소를 따롬나들어서 사용해야한다!!!!)
    */
    
    
       ///// 자동스크롤 구현 ////////////////
    // 이벤트를 띄어쓰기로 여러개 쓸 수 있음!
    $(document).on("mousewheel DOMMouseScroll",function(e){
        
        //e.preventDefault();<- 이걸 쓰면 에러가남!!!
        // document, body, window 객체는 막을 수 없다!
        // 여기서는 body에 overflow:hidden으로 대체함!(스크롤막기!)
        
        //// console.log("스크롤중~!");
        
        // 광스크롤 막기
        if(psts===1) return true;
        // return false하면 에러남!! 왜? document니까!! 법이 바뀜
        // return true 돌아가되 기능은 켜놓고가(스크롤되게해!!)
        // 우리는 이미 overflow: hidden으로 스크롤 막아서 상관없음
        psts=1;// 잠금!!
        setTimeout(function(){psts=0;},800)
        
        
        // 1. 마우스휠 방향 알아내기
        e = window.event || e;
        // 이벤트 전달값이 window 오리지널 이벤트가 사용가능하면
        // 사용되도록 보완코드를 작성함!
        // 변수 = 경우1 || 경우2;
        // 변수에 경우1 과 경우2 중 true(유효한것)인것이 할당됨!
        /*
        wheelDelta 라는 값을 알아야 방향을 알 수 있다!
        wheelDelta란?
        - ie, chrome 브라우저 등 공용(opera는 detail을 사용함)
        - 마우스 이벤트에 따라 발생하는 이벤트 횟수 및 방향, 이동거리
        */
        let delta = e.detail ? e.detail : e.wheelDelta;
        // 변수에 유효한 설정이 적용되어 할당됨!
        
        //// console.log("휠정보:"+delta);
        // 파이어 폭스 일때 델타값 방향 반대로 하기!!!
        // js내장함수 test()이용하여 navigator.userAgent- 현제 브라우져 정보읽어옴!!!
        // 'Firefox'라는 정보가 있으면 test()dptj  true값 리턴함!!!
        // 그래서 if문 안을 들어가서 처리함(부호 반대로)
        console.log('브라우져정보:'+navigator.userAgent);
        console.log('정보여부:'+(/Firefox/i.test(navigator.userAgent)));
        // 정규식.test(가져올값) -> 정규식에 쓴 문자 있으면 true
        if(/Firefox/i.test(navigator.userAgent)){
           delta = -delta;
        }///// if /////

        
        // 2. 마우스휠 방향에 따라 페이지 번호 증감
        if(delta<0){
            pno++;
            if(pno===totnum) pno = totnum-1; //끝번호고정
        }///// if /////
        else { // 120윗방향 스크롤 (이전페이지)
            pno--;
            if(pno < 0) pno = 0; // 첫번호 고정
        }///// else /////
        
        // console.log('페이지번호:'+pno);
        
        // 3. 이동할 페이지(.page)의 위치값 알아내기
        // -> 위차값은 클래스 순번으로 알아냄 -> pno 변수 사용!!!
        let pgpos = $('.page').eq(pno).offset().left;
        // offset().left은 현제 선택요소의 left위치값을 숫자로 리턴함!!!
        
        console.log('이동위치:'+pgpos);
        
        // 4. 실제 이동 위치로 스크롤 애니메이션 이동하기
        $('html,body').stop().animate({
            scrollLeft: pgpos + 'px',
        }, 800, "easeOutCirc")///// animate /////
        
        // 5. 메뉴변경하기 -페이지 순번과 동일함
         // GNB네비게이션 클래스 넣기
                $('.gnb li').eq(pno).addClass('on')
                    .siblings().removeClass('on')
                
                // 블릿네비게이션 클래스 넣기
                $('.bnav li').eq(pno).addClass('on')
                    .siblings().removeClass('on')
        
        
    });//////// mousewheel ///////////////////////////////
    //////////////////////////////////////////////////////
    
    
    
    
});///////// jQB ///////////////////////





















