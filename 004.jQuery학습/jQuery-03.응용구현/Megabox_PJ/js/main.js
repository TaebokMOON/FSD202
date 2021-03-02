// 메가박스 메인페이지 JS - main.js

// 인터발용 전역변수
let autoI;

// 인터벌 타임아웃 전여변수
let autoT;

// 포스터 상태 전역변수
let ptsts = 1; // 1 - 허용,  0 - 불허용



//////// 로드구역 //////////////////////////////////////////
// addEventListener(이벤트명,함수) - JS내장함수
// "DOMContentLoaded" 는 
// html만 모두 로딩되면 발생하는 이벤트명
///////////////////////////////////////////////////////////
window.addEventListener('DOMContentLoaded',
    function () {

        // 로드구역확인!
        console.log('로딩완료!');

        /////////////////////////////////////////////////
        // 구현내용: 이동버튼 클릭시 이미지 이동하여 변경하기
        // 이벤트 종류: click
        // 이벤트 대상: .abtn
        // 변경 대상: .gbox, .gbox img
        /////////////////////////////////////////////////

        // 이벤트 대상
        var abtn = document.querySelectorAll('.abtn');

        // 변경 대상
        var gbox = document.querySelector('.gbox');

        ////////////////////////////////////
        // 왼쪽버튼 클릭시 함수호출(전달값0)
        abtn[0].onclick = function () {

            // 함수호출확인!
            //console.log("나,왼쪽!");

            // 자동호출지우기  (포스터 허용상태일때만 호출)
            if (ptsts) clearAuto();

            // 이미지변경함수 호출!
            chgImg(0); //전달값0

            // a태그 기본이동 막기
            return false;


        }; /////// click함수 ////////////////


        ////////////////////////////////////
        // 오른쪽버튼 클릭시 함수호출(전달값1)
        abtn[1].onclick = function () {

            // 함수호출확인!
            //console.log("나,오른쪽!");

            // 자동호출지우기(포스터 허용상태일때만 호출!)
            if (ptsts) clearAuto();

            // 이미지변경함수 호출!
            chgImg(1); //전달값1

            // a태그 기본이동 막기
            return false;


        }; /////// click함수 ////////////////



        /*/////////////////////////////////////////////////////
            함수명: chgImg
            기능: 이미지를 이동하여 이미지 순서를 변경한다!
        */ /////////////////////////////////////////////////////
        // 익명함수가 변수에 할당된 함수임!!!! ////////////////////

        // 광클금지상태변수 ///////////////
        var prot = 0; //0-허용,1-막기

        var chgImg = function (dir) { // dir - 방향(0-왼쪽,1-오른쪽)

            //console.log("광클상태값1 :" + prot);

            // 0.광클금지 ////////////////////////////////////

            // (1) if문으로 상태값 막기!
            if (prot) return false; //돌아가!
            // prot===1 이면 돌아가!

            // (2) 상태값 막기(1)로 변경
            prot = 1; //상태값 1로 변경! 잠금상태!
            //console.log("광클상태값2 :" + prot);

            // (3) 작동시간 후에 광클상태값을 0으로 풀어주기
            setTimeout(function () {
                prot = 0; //상태풀기
                //console.log("광클상태값3 :" + prot);
            }, 400);
            // setTimeout(함수,시간) - 설정시간 후 한번 함수호출!
            // 시간이 400이면 0.4초이므로 이미지가 넘어가는 
            // 트랜지션 시간인 0.4초간 광클을 막아준다!
            /////////////////////////////////////////////////


            // 1. 함수호출 및 전달값 확인
            //console.log("나야나!" + dir);

            // 2. 변경된 img리스트 읽어오기
            var ilist = gbox.querySelectorAll('img');
            // 첫번째 이미지
            var fele = ilist.item(0);
            // 마지막 이미지(끝번호는 전체길이-1)
            var lele = ilist.item(ilist.length - 1);

            // 3. 오른쪽버튼 클릭시 맨앞요소 맨뒤로 이동하기
            if (dir) { // 1이면 true
                gbox.appendChild(fele);
            } ///// if ///////////////////
            // 4. 왼쪽버튼 클릭시 맨뒤요소 맨앞으로 이동하기
            else { //insertBefore(넣을놈,넣을놈전놈)
                gbox.insertBefore(lele, fele);
            } ///// else ////////////////////


        }; ///////// chgImg 함수 ////////////////////////////////
        ///////////////////////////////////////////////////////
        /*
        [버튼을 동반한 배너형 컨텐츠에서 다루는 4가지 중요분야]
        1. 광클금지 : 
            - 버튼클릭을 빨리하여 기존 기능이 망가져 보이는 것을 막음
        2. 자동넘김 :
            - 일정시간 간격으로 배너가 넘어감
        3. 버튼클릭시 자동넘김 지우기 :
            - 사용자가 버튼을 조작하는 순간 자동넘김 기능 지우기
        4. 사용자 조작이 끝난 후 다시 자동넘기기 :
            - 버튼 마지막 클릭이 끝난 후 자동넘김 셋팅 하나만 남기기
        
        */

        /*///////////////////////////////////////////////
            함수명: autoCall
            기능: 슬라이드 넘기기함수 자동호출(인터발함수)
        */ ///////////////////////////////////////////////
        //var autoI; //인터발용변수 -> 전역변수로 상단에 선언!!!
        /////////////////////////////////////////////////
        var autoCall = function () {

            //console.log("자동호출작동!");

            autoI = setInterval(function () {
                chgImg(1); //오른쪽버튼 클릭이동과 동일함!
            }, 3000);
            //setInterval(함수,시간)
            //일정시간 간격으로 함수를 호출하는 JS내장함수

        }; /////// autoCall 함수 /////////////////////////
        ////////////////////////////////////////////////

        /// 자동넘김 최초호출(반드시 할당형익명함수 아래에서 호출!)
        autoCall();

        /*////////////////////////////////////////////////////
            함수명: clearAuto
            기능: 인터발함수를 지우고, 잠시 후 다시 자동호출셋팅하기
                이동버튼 클릭시 이 함수를 호출하여야 함!
        */ ////////////////////////////////////////////////////
        //var autoT; //타임아웃용변수 -> 전역변수로 상단에 선언
        //////////////////////////////////////////////////////
        var clearAuto = function () {

            //console.log("자동호출지우기!");

            // 인터발함수 지우기
            clearInterval(autoI);

            // 타임아웃함수 지우기(실행쓰나미방지!)
            clearTimeout(autoT);

            // 일정시간 후 자동호출함수 재호출하기!
            autoT = setTimeout(autoCall, 3000);

        }; /////////// clearAuto 함수 //////////////////////////
        //////////////////////////////////////////////////////





    }); //////////// 로드구역 ///////////////////////////////////
///////////////////////////////////////////////////////////




$(function () {

    // 동영상 요소
    let mv = $('#mv')


    // 1. 영화포스터 클릭시 영화 예고편 보여주기
    // 대상선정 : .gbox img
    $('.gbox img').click(function () {

        // 0. 포스터 자동넘김 지우기!!
        clearInterval(autoI)

        // 0. 포스터자동타임아웃 지우기!!
        clearTimeout(autoT)


        // 1-0. 중앙의 포스터가 아닌경우 중앙으로 오게하기!!!
        // 중앙인지 왼쪾인지 오른쪾인지 알아내기

        // 포스터 순번 : index() 메서드로 사용!!!!
        let pseq = $(this).index()
        console.log('포스터 순번:' + pseq);

        // pseq===1 왼쪽포스터일떄 왼쪽이동버튼 클릭
        if (pseq === 1) $('.lb').trigger('click')

        // pseq===3 오른쪽포스터일때 오른쪽이동버튼 클릭
        else if (pseq === 3) $('.rb').trigger('click')

        // pseq===0, pseq===4  양쪽 포스터 클릭방지
        else if (pseq === 0 || pseq === 4 ||
            (pseq === 2 && ptsts === 0)) return false; // 아래쪾코드 실행말고 돌아가!!!!
        // trigger(이벤트명) - 선택요소의 이벤트발생

        // 0. 포스터 상태값 변경하기!!!(위의 분기문 아래에 써야함!!!)
        ptsts = 0;
        // 이동버튼 클릭시 clearAuto함수 호출제한


        // 1-1 영화 포스터 네비 작아지게 하단이동 애니
        // 방법 : transform : scale() 사용
        // css변경으로 애니메이션을 위해 transition사용
        // 대상 : .gbox
        $('.gbox').css({
            top: '82%',
            transform: 'translate(-50%,-50%) scale(.4)',
            transition: 'all .6s ease-in-out'
        }) ///// css /////

        // 버튼 축소 이동 애니메이션
        $('.abtn').css({
            top: '82%',
            transform: 'translateY(-50%) scale(.4)',
            transition: 'all .6s ease-in-out'
        }) ///// css /////

        // 버튼위치 세부조정
        $('.lb').css({
            left: '30%'
        }) ///// css /////
        $('.rb').css({
            right: '30%'
        }) ///// css /////

        // 1-2 동영상 보이게 하고 data-mv 속성값으로 동영상 정보를 불러온다

        // 동영상 정보(data-mv:동영상파일명)
        let mi = $(this).attr('data-mv')
        console.log('동영상정보:' + mi);

        // 변경대상 : #mv -> 변수 mv에 할당!!!
        mv.attr('src', 'mv/' + mi + '.mp4').fadeIn(300)
        // 동영상 src를 변경후 서서히 나타나게함!!!!

        // 동영상 재생하기
        // 동영상이 로딩되어 준비되기전 play()명령을 내리면 에러가 발생한다!!!!
        // 내용 : DOMException: The Play() request was interrupted by a net load request.
        // play() 요청은 로드 요청에 의해 방해되었음!!!!
        // 이런 요청방해에러를 없애려면 이벤트체크를 하나해야함!!!
        // canplaythriygh 이벤트!!!
        // -> user agent가 media를 재생할수 있을때 발생함!!!
        // 따라서 이 이벤트가 발생할때 play()하면 된다!!!

        mv.on('canplaythrough', function () {
            
            // 동영상 볼륨 셋팅하기(처음볼륨조절): volume 속성
            // volume값은 0~1까지 중간 소수점표현
            $(this).get(0).volume = 0.2;//20%볼륨
            
           // 동영상 재생하기 //
            $(this).get(0).play();

        }) ///// canplaythrough /////


        // 제이쿼리에서 video태그 요소를 선택하면 미디어 요소를 위한 컬렉션으르 생성하기 때문     에  get(0)이라고 별도의 선택메서드를 써야한다!!! 
        //play()메서드는 동영상을 재상하는 기능임!!!

    }) ///// click /////

    // 2. 이동버튼 클릭시 중앙 위치한 포스터 예고편 재생하기
    // 대상 : .abtn
    // 이미지 버튼이벤트 구현이 상단에 JS로 되어있지만 별도의 기능을 위해 아래쪽에 다시 새롭게 만들어서 구현해도 전혀 문제가 없다
    $('.abtn').click(function () {

        //만약 아래로 작아진 상태가 아니면 즉, ptsts===1 이면 아래쪾코드 실행안함!!!
        if (ptsts) return false; // 돌아가!!

        console.log('중앙포스터 영화상영');

        // 중앙 포스터라면 몇번째 순번인가? 2번!!!
        // 중앙 포스터의 data-mv값을 읽어온다. 왜?? 이것이 영화파일명이니까!!!!!
        let mi = $('.gbox img').eq(2).attr('data-mv')
        // console.log('영화파일명'+mi);
        
        mv.attr('src', 'mv/' + mi + '.mp4')

        mv.on('canplaythrough', function () {

            $(this).get(0).play()

        }) ///// canplaythrough /////

    }) ///// click /////

    
    // 1. 동영상 제어버튼 숨기기/보이기
    // 컨트롤 공통 class : .ctrl
    
    let ctrl = $('.ctrl')
    
    $('#screen').hover(
        function(){//over
            ctrl.fadeIn(200)    
        },
        function(){//out
            ctrl.fadeOut(200)
    })///// hover /////
    
    // 2. 동영상 제어버튼 오버/아웃시 이미지 변경하기
    // 이벤트 대상 : .btngrp img
    // 변경원리 : 기존버튼의 src를 읽어와서 파일명의 '.png'를 '-1.png'로 변경함
    // '-1.png'가 진한 이미지임!!!
    
    // 기존파일 경로
    let csrc
    
    // hover 함수
    $('.btngrp img').hover(
        function(){//over
            csrc = $(this).attr('src').replace('.png','-1.png')
            //console.log('변경파일:'+csrc);
            $(this).attr('src',csrc)
        },
        function(){//out
            csrc = $(this).attr('src').replace('-1.png','.png')
            //console.log('변경파일:'+csrc); 
            $(this).attr('src',csrc)
    })///// hover /////
    
    // play/stop 버튼 클릭시 비디오 컨트롤하기
    // 이벤트 대상 : .btngrp img
    // 구현원리 : 재생상태이면 멈추고 멈춤상태이면 재생한다!!
    $('.btngrp img').click(function(){
        
        // 구현포인트 : 비디오가 재생상태인지 멈춤상태인지 알아내기!!!
        let paused_sts = mv.get(0).paused
        // paused 속성은 현재 비디오가 멈춤상태이면 true값을 리턴!!
        console.log('현재비디오:'+paused_sts);
        
       // 1.비디오가 멈춤상태이면 재생하기
        if(paused_sts){ 
            
            // 비디오 재생하기 : play() 메서드 사용
            mv.get(0).play();
            
            // 버튼은 반대로 진한 멈춤버튼변경!
            $(this).attr('src','images/vbt1-1.png');
            
            
        } //////// if ///////////////////
        
        // 2.비디오가 재생상태이면 멈추기
        else{ 
            
            // 비디오 멈추기 : pause() 메서드 사용!
            mv.get(0).pause();
            
            // 버튼은 반대로 진한 재생버튼변경!
            $(this).attr('src','images/vbt2-1.png');
            
            
        } //////// else //////////////////
        
    })///// click /////

    ///////////////// 음소거 /////////////////////////
    // 이벤트 대상 : .sound img
    // 구현원리 : 소리가 나는지 안나는지 상태에 따라 반대로 설정함
    //////////////////////////////////////////////////
    
    $('.sound img').click(function(){
        
        // 1. 현제 소리상태
        // 구현 포인트 : 소리안남 상태 알아내기
        let sound = mv.get(0).muted;
        // muted 속성 : 선택된 비디오 소리가 안나면 true, 나면 false
        // muted 속성에 값을 할당하면 소리안남 상태 변경
        console.log('소리는?:'+sound);
        
        // 2. muted로 소리설정하기
        // -> 형제 true/false값을 반대로 넣으면 된다!!!
        // !(not)연산자로 true면 false, false면 true로 반대변경
        mv.get(0).muted = !sound
        
        // 3. 소리상태 이미지 변경하기
        // 현제 변경된 소리 상태는 sound가 아니라 !sound
        if(!sound){
            $(this).attr('src',"images/speaker-mute_blue.png")
        }///// if /////
        else {
            $(this).attr('src',"images/speaker_blue.png")
        }///// else //////
        
    })///// click /////
    
    // 비디오 현재 진행바 기능(시간경과 표시)
    // 사용할 이벤트 : timeupdate -> 비디오 객체의 시간이 변경될떄 발생
    // on(이벤트,시간) 메서드 사용!
    mv.on('timeupdate',function(){
        
        // 구현목표 : 비디오가 재생중일때 진행바가 움직이게 한다!!
        // 구현원리 : 진행바의 진행비율을 %로 나타내야함!!!!
        // 계산법 : 현제시간 / 전체시간 * 100 -> 백분율(%)
        
        // 1. 비디오 현재진행 시간 가져오기
        let ctime = mv[0].currentTime
        //mv[0] === mv.get(0)
        // currentTime 속성 : 비디오의 현재시간
        // console.log('현재시간:'+ctime);
        
        // 2. 비디오 전체재생시간 가져오기
        let maxtime = mv[0].duration
        // duration 속성 : 비디오 전체시간
        // console.log('전체시간:'+maxtime);
        
        // 3. 진행바 변경하기
        // 현재진행시간이 0일 경우 전체시간이 안나오므로
        // if문으로 이를 막아준다!!!(부모가 0되면 안된다!!)
        // !isNaN(전체시간) -> 숫자이면 들어가!!!
        if(!isNaN(maxtime)){
            
            // 우리가 구하고자  하는 것은 백분율(%)이다
            // 계산식 : 현재시간/ 전체시간 *100
            //        = ctime / maxtime * 100
            
            // 퍼센트 진행율
            let percent = ctime / maxtime * 100
            console.log('진행율:'+percent);
            
            // 진행바의 width를 %값으로 변경!!
            
        }///// if /////
        
        
    })///// timeupdate /////
    

    // GNB a요소 클릭시 스크롤 애니메이션 하기
    // a요소에 href='#아이디명'하면 바로이동은 가능  그러나 스크롤 애니메이션은 되지 않  // 는다!!!!! 제이쿼리에서 이것을 해주자~~~~~
    // 클릭 이벤트대상 : .gnb a

    $('.gnb a,.bnav a').click(function (e) {

        e.preventDefault() // a이동 막기!!!!!

        // 클릭된 순번 알아내기(클릭된 a의 부모 li순번 알아내기)
        // 알아낸 순번을 전역페이지 번호(pno)에 넣기!!!
        pno = $(this).parent().index();
        //console.log('클릭순번:' + pno);


        // 기존  위치값 읽어오기 변경!!!!!
        // 전체 윈도우 높이값(winH)에 페이지 번호를 곱한다
        let pgpos = winH * pno;

        // 3. 스크롤 애니메이션으로 페이지 이동하기!!
        // scrollTop 속성은 세로 스크롤위치값
        // 스크롤 이동대상 : html,body
        // (범용선택용소 : 즉, 여러브라우저에서 공통사용됨!!)
        $('html, body').animate({
            scrollTop: pgpos + 'px',
        }, 800, 'easeOutCirc') ///// animate /////

        // stop() 사용하여 여러개를 클릭했을때 마지막 선택만 남아서 처리하도록 중간에 쌓    인 애니메이션 지움!!!!
        // 4. GNB메뉴에 class="on" 넣어 선택된 메뉴표시 a요소의 li에 class="on"으로    넣으면  이미 셋팅된 css의 디자인이 적용되어 라임색 윗줄의 크기가 조금 커진 디    자인이 적용된다 마우스 오버시와 동일 디자인이 유지된다!! 이것을 표시하는 이      .유는 현재 페이지가 무엇인지 표시하기 위함이다!!
        // this 나 자신에서 위로 올라가 li를 선택함!!
        // 두개의 네빗게이션을 동시에 변경하기!!!!

        // GNB네비게이션 클래스 넣기
        $('.gnb li').eq(pno).addClass('on')
            .siblings().removeClass('on')

        // 블릿네비게이션 클래스 넣기
        $('.bnav li').eq(pno).addClass('on')
            .siblings().removeClass('on')



    }) ///// click /////




}) ///// jQB ////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
