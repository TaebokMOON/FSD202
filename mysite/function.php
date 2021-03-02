<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>PHP의 함수와 변수의 범위</title>
</head>
<body>
    <?php
    
    /*
    [ 함수(function) ] - 실행코드 저장공간
    
    - 형식 :
    
    function 함수명(전달변수) {
        ..... 코드 .....
            return 값 또는 변수;
    }
    
    - 함수 키워드 function은 대소문자 구분이 없다!!!!
        또한 함수명도 대소문자 구분이 없다!!! 왜? 모른다.....
        -> 이것이 JS와 다른점!!!!!
    예) function === Function === funCtIon === ...
        (주의사항 : 반면에 PHP의 변수는 대소문자를 철저히 구분한다!!!)
    */
    
    /*
    [ 변수와 번위에 따른 종류 ]
    
    1. 지역변수 : local variable
        - 함수 내부나 분기문(if문 같은것) 내부 등에 포함영역에서만 사용할수있는 변수
        
    2. 전역변수 : global variable
        - 함수 내부에서 외부의 변수를 전역변수로 등록하여 쓸수있는 변수 
        - 전역변수의 생성법은 global 키워드를 사용한다!!!
        - 주의 : 전역변수 재할당(값변경)은 global키워드를 사용한곳에서만 할수있다!!!
        - 전역변수화한 한수에서 호출시 전역변수로 사용한 변수는 다른 함수에서 전역변수로 사용   할수 없다~~~~~
    
    3. 정적변수 : static valiable
        - 함수 내부에서만 static 키워드로 변수를 선언하여 사용하면 함수 호출이 종료되어도 사   라지지 않고 값이 유지되는 변수임! (단, 지역변수처럼 함수 내부에서만 접근이 가능함!)
    */
    
    
    
    
    
    
    // 국적변수
    $nation = ", 국적은 한국인";
    // JS에서 함수 바깥쪽에 만든 변수가 전역변수였음 그러나.....
    // PHP는 아니다!!!!!!!!!!!!!!!!!!!!!!!
    
    // 함수1
    function askStar($nm){ // $nm - 이름을 받는 전달변수
        
        // 작품명 변수
        $work;
        
        // 전역변수로 $nation을 등록한다
        global $nation;
        
        if($nm === "공유"){
            $work = "도깨비";
        }///// if /////
        elseif($nm === "김수현"){
            $work = "해품달";
        }///// elseif /////
        else {
            $work = "누구셔?";
        }///// else /////
        
        // 함수 리턴
        return $work.$nation;
        
    }///// asdStar /////
    
    
    // 함수2
    function askFirm($nm) { // $nm - 이름받는 전달변수
        
        // 회사명 변수
        $firm;
        
        // 전역변수로 $nation을 등록한다
        global $nation;
        
        // 국적변수 변경
        $nation = ", 국적은 태국인";
        
        if($nm === "공유"){
            $firm = "매니지먼트 숲";
        }///// if /////
        elseif($nm === "김수현"){
            $firm = "키이스트";
        }///// elseif /////
        else{
            $firm = "모르겠네";
        }///// else /////
        
        // 함수의 리턴
        return $firm.$nation;
        
    }///// askFirn /////
    
    // 함수3
    function addAge(){
        
        static $age = 40;
        // static은 정적변수
        // 정적변수는  처음에 등록한 값을 기억하여 이르르 변경할 경우 기존값을 기억하여 사용    할수 있다!!!!
        // JS에서 함수 바깥쪽의 전역변수로 구현했던것과 유사한 용법
        
        echo "<h1> 공유가 나이를 먹는다 : ".$age."세</h1>";
        $age++;
    }
    
    
    
    
    // 함수를 호출하여 화면에 찎어보기
    // 함수 호출시 함수명은 대소문자 구분안함!!!!
    
    echo "<h1>공유의 대표작은??".askSTAR("공유")."</h1>";
    echo "<h1>공유의 소속사는??".askfirm("공유")."</h1>";
    
    // 전역변수 $nation의 값을 변경한 후 아래쪾 호출에서 모두 변경되어있음.. 
    // 기것은 전역변수가 맞다...
    
    echo "<h1>김수현의 대표작은??".askSTAR("김수현")."</h1>";
    echo "<h1>김수현의 소속사는??".askfirm("김수현")."</h1>";
    
    $nation = ",국적은 미국인";
    // 함수 내부 영역이 아니므로 일반적인 변수값 변경이 가능함!!
    
    echo "<h1>정우성의 대표작은??".askSTAR("정우성")."</h1>";
    echo "<h1>정우성의 소속사는??".askfirm("정우성")."</h1>";
    
    // 공유 나이먹기
    addAge();
    addAge();
    addAge();
    addAge();
    
    
    
    ?>
</body>
</html>