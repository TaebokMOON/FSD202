////// 로그인 페이지 JS - login.php ////////

$(function () { /// jQB //////////////////

    // 로그인 서브밋 버튼 클릭시 DB처리 페이지 보내기 ///
    // 검사부터하기!!
    $("#sbtn").click(function (e) { //e-이벤트전달값

        // 서브밋 기본이동 막기!
        e.preventDefault();

        // 확인
        //console.log("로그인!!!");

        // 아이디요소
        let mid = $("#mid");

        // 비번요소
        let mpw = $("#mpw");

        //// 1. 아이디, 비번 중 하나라도 미입력시 메시지
        if (mid.val().trim() === "" ||
            mpw.val().trim() === "") {

            // 메시지 띄우기
            alert("아이디와 비밀번호를 모두 입력해주세요!");

        } //////// if /////////////////////

        /// 2. 통과시 로그인 처리페이지로 보내기 ////
        else {

            //alert("통과!");
            
            // AJAX로 로그인처리페이지 전송하기
            // POST방식 처리
            // $.post(전송할페이지,전송데이터,콜백함수)
            $.post(
                // 1. 전송할 페이지
                "process/loginSet.php",
                // 2. 전송데이터
                {
                    "mid": mid.val().trim(),//아이디
                    "mpw": mpw.val().trim() //비번
                },
                // 3. 콜백함수: 처리페이지에서 돌려준값 받기
                function(res){ // res - 결과값전달변수
                    
                    // 넘어온 결과값 앞뒤공백제거(혹시)
                    res = res.trim();
                    
                    // 1. 로그인성공시
                    if(res==="ok"){
                        
                        // 메시지
                        alert("환영합니다! \n메인페이지로 이동합니다!");
                        
                        // 메인페이지로 이동하기
                        location.href = "index.php";
                        
                    } //// ok ///////////
                    
                    // 2. 아이디가 없는 경우
                    else if(res==="no"){
                        
                        // 메시지
                        alert("사용가능한 아이디가 아닙니다!");
                        
                        // 아이디,비번 지우고 아이디에 포커스
                        mid.val("").focus();
                        mpw.val("");
                        
                    } ///// no ///////////
                    
                    // 3. 비밀번호 불일치
                    else if(res==="again"){
                        
                        // 메시지
                        alert("비밀번호가 일치하지 않습니다!");
                        
                        // 비번 지우고 비번에 포커스
                        mpw.val("").focus();
                        
                    } ///// again /////////
                    
                } //// 콜백함수 //////
                
            ); //////// Ajax : post ///////////
            ///////////////////////////////////
            

        } ///////// else ////////////////////


    }); ///////// click //////////////




}); ////////// jQB //////////////////////