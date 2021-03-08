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
                // 3. 콜백함수
                function(res){ // res - 결과값전달변수
                    
                    alert(res);
                    
                    
                } //// 콜백함수 //////
                
            ); //////// Ajax : post ///////////
            ///////////////////////////////////
            

        } ///////// else ////////////////////


    }); ///////// click //////////////




}); ////////// jQB //////////////////////