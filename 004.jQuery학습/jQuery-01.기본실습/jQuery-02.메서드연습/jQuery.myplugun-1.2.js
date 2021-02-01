////////// 내가만든 jQuery 플러그인 ///////////////////

/*
플러그인이란??
    
- 틀정 기능을 구현하여 함수를 호출하면 쉽게  그기능을 사용할수 있도록 만들어진 외부구현소스코드
    
- 플러그인 함수 명명법
    개발언어이름.플러그인이름-버전번호.js
    에) jQuery.myplugin-1.2.js
    
- 플러그인 형식
    jQuery.fn.함수명 =  function(){
        구현코드
        return 결과; -> 필요에 따라 사용함!!!
    }
 */       
        
// 함수기능 : 배경색과 왼쪽마진, 시간값을 받아서 애니메이션 처리함!!!
jQuery.fn.myAction = function(color,ml,tt){
    // 파라미터 변수 : color-배경색,ml-왼쪽마진,tt-시간
    console.log('전달값:'+color+'/'+ml+'/'+tt);
    
    // 기능 구현하기
    $(this).animate({
        backgroundColor:color,
        marginLeft: ml + "px"
    },tt)///// animate /////
    
} ///// myAction 함수 /////
        
        
        
        
        
        
        
        