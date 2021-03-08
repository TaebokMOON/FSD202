// 아이템 페이지 JS - item.js ////

// get방식으로 넘어온 파라미터 처리하기!
var pm = location.href;
console.log(pm);
// location.href 의 두얼굴~~~
// 1. 이퀄 왼쪽에 쓰면 오른쪽 url값으로 페이지이동
// 2. 이퀄 오른쪽에 쓰면 브라우저 url값을 가져옴!


// url가공전 물음표가 있는지 확인하여 없으면 돌려보낸다!
// indexOf(문자열) -> 찾는 문자열의 순번을 리턴함!
// 만약 찾는 문자열이 없으면 -1을 리턴함!!!!
console.log("문자열 찾기:" + pm.indexOf("?"));
if (pm.indexOf("?") === -1) {
    alert("비정상적인 접근입니다!");
    location.href = "index.php";
} ////// if //////////////////////


// url문자값 가공처리하기 /////

// 1. ?(물음표)를 기준으로 잘라서 뒤의 배열값을 사용한다!
pm = pm.split("?")[1];
// 물음표 뒤쪽 값은 배열번호 1번이다!
console.log("물음표로 잘라 뒤에것:" + pm);

// 2. =(이퀄)로 자르고 뒤엣것!
pm = pm.split("=")[1];
// 이퀄 뒤쪽 값은 배열번호 1번이다!
console.log("이퀄로 잘라 뒤에것:" + pm);

//3. 한글문자깨짐 방지하여 보낸것 다시 한글로 바꾸기!
// escape로 변환된 문자를 unescape로 복원한다
pm = unescape(pm);
console.log("한글복원:" + pm);


////////////////////////////////////////////
// 파라미터로 넘어온 아이템 명으로 페이지 셋팅값을
// 객체로 셋팅한다!

// pm값이 "디바이스"/"패션" 일 경우 처리
if (pm === "디바이스") pm = "스마트폰";
else if (pm === "패션") pm = "가방";
// 카테고리 명은 첫번째 아이템으로 셋팅되도록함!

// 아이템객체 ///
var item = {
    "스마트폰": {
        "아이콘": "ico1",
        "제목": "아이폰6플러스",
        "이미지": "iphone6.png",
        "설명": "iPhone 6s 및 iPhone 6s Plus는 32GB 또는 128GB 저장 용량으로 구입할 수 있습니다. \"GB\"는 기가바이트를 의미하며, 기가바이트가 클수록 앱, 게임, 사진, HD 동영상, 음악, 영화 등을 비롯한 다양한 콘텐츠를 더 많이 저장할 수 있습니다. 저장해야 할 사진이나 음악이 많거나 앱을 많이 다운로드하는 경우에는 용량이 큰 iPhone을 구입하는 것이 좋습니다. 반대로 앱을 많이 다운로드하지 않거나 사진 또는 동영상을 촬영하지 않는다면 용량이 작은 iPhone이 적당할 수 있습니다."
        // 쌍따옴표 안에 쌍따옴표쓰는 방법
        // 내부의 쌍따옴표앞에 역슬래쉬(\)=원(￦)표시문자를 쓴다
        // 역슬래쉬뒤의 문자는 특수문자처리하여 표시됨!
        // 코딩시 역슬래쉬(\)=원(￦)표시문자 표시가 달라지는 이유는
        // 글자체에 따라서 달라짐!
    },
    "태블릿PC": {
        "아이콘": "ico2",
        "제목": "아이패드2",
        "이미지": "ipad2.png",
        "설명": "아이패드 1세대에 비해 두께가 13.4 mm에서 8.8 mm로 더 얇아지고, 중량도 Wi-Fi 모델 기준으로 680 g에서 600 g으로 많이 가벼워졌으며, 3G 모델의 경우 중량 차이가 훨씬 더 크다. 기본 연산 속도 및 배터리 성능도 강화되었고 디스플레이 해상도는 그대로지만 더 밝아졌다. 특히 카메라의 부재가 아쉬움을 샀던 1세대에 비해 HD급 캠코더 기능을 지원하는 후면 카메라도 탑재되었다."
    },
    "노트북": {
        "아이콘": "ico3",
        "제목": "맥북에어",
        "이미지": "macbook.png",
        "설명": "스티브 잡스가 2008년 1월 열린 애플 키노트에서 서류봉투에서 꺼내면서 처음으로 공개되었다. 자칭 '세계에서 가장 얇은 노트북'[2] 맥북에어보다 얇고 가벼운 노트북들이 널린 2016년도에도 얇은 노트북하면 맥북에어를 떠올릴 정도로 얇은 노트북의 대명사라고 할 수 있다.1~3세대까지는 비싸고 확장성이 떨어진다는 것이 가장 큰 단점으로 지적되었다. 맥북 에어 발표 당시 키노트에 뜬 $1799를 아직도 기억하는 사람들이 많을 것이다."
    },
    "가방": {
        "아이콘": "ico4",
        "제목": "가방",
        "이미지": "bag.png",
        "설명": "여성과 남성 의류, 핸드백, 지갑, 생횔용품, 신발, 보석, 시계, 선글라스, 향수와 화장품, 아동 의류를 만드는 이탈리아의 명품 브랜드이다. 루이비통에 밀린 콩라인. 남성 가방도 구찌가 짱이다!!!!!"
    },
    "시계": {
        "아이콘": "ico5",
        "제목": "시계",
        "이미지": "watch.png",
        "설명": "시계 매니아들 사이에서의 평가는 롤렉스미만잡으로 치는 상위의 매니아 사이에서는 낮은 등급의 시계 취급을 받지만 보통의 매니아들은 한번씩은 다들 거쳐가거나 주력으로 사용하는 사람도 많다. 사면 다들 이쁘다고 하지 왜샀느냐고 하지는 않는다. 사면 호구라고 호구호이어라는 말도 있지만 사실 온라인에서 호구소리 안듣는 브랜드도 없고 막상 200~300만원대 시계 추천을 구할경우 결국 추천받는건 태그호이어 몰표이다."
    },
    "구두": {
        "아이콘": "ico6",
        "제목": "구두",
        "이미지": "shoes.png",
        "설명": "기원은 유럽 쪽이나, 현대적 구두의 등장 기원은 불분명하다.[3] 다만 가죽을 주 재료로 만드는 신발이기 때문에 역사가 오래 되었을 가능성이 높다. 한반도에 구두가 처음 전파된 계기는 1880년대 경으로, 외국에 다녀온 사람들이 구두를 신고 들어온 것이 그 시초로 여겨진다. '구두'라는 말의 어원은 분명치 않으며(아래서술 참고), 1900년도에 한반도에도 구두 생산 공장이 들어서면서 본격적으로 구두 공급이 시작되었다."
    }
}; //// item객체 /////////////////

///// jQB /////////////////////////////////////////
$(function () {

    console.log("코드블록");

    // 파라미터에 맞게 각 아이템을 셋팅한다!!!!

    // 대상선정:
    // 1. 아이콘 & 제목
    var tit = $(".tit");
    // 2. 이미지
    var img = $(".timg img");
    // 3. 설명
    var txt = $(".tcont");

    ////////////////////////////////////
    // 내용 셋팅하기 /////////////////////
    // 값은 item객체에서 가져온다

    // 1. 아이콘넣기 : item[pm]["아이콘"]
    tit.addClass(item[pm]["아이콘"]);
    console.log("아이콘셋팅:" + item[pm]["아이콘"]);

    // 2. 제목넣기 : item[pm]["제목"]
    tit.text(item[pm]["제목"]);

    // 3. 이미지 넣기 : item[pm]["이미지"]
    // attr(속성명,속성값) - 제이쿼리용 속성셋팅 메서드
    img.attr("src", "images/" + item[pm]["이미지"]);
    // 만약 "태블릿PC"이면 이미지 width를 70%로 조정함!
    if (pm === "태블릿PC") img.css({
        width: "70%"
    });

    // 4. 설명 넣기 : item[pm]["설명"]
    txt.text(item[pm]["설명"]);

    // 5. 이미지박스, 설명박스 등장하기!

    // 왼쪽박스에 이미지 있는 것
    var pnum;
    if (pm === "스마트폰" ||
        pm === "노트북" ||
        pm === "시계")
        pnum = 1;
    else
        pnum = 0;

    // 오른쪽박스
    var rbox = pnum ? $(".tcont") : $(".timg");
    // 왼쪽박스
    var lbox = pnum ? $(".timg") : $(".tcont");
    
    // 이퀄 오른쪽에 조건연산자(삼항연산자)를 쓰면
    // true인 경우 나오는 값을 이퀄 왼쪽의 변수에 할당한다~!
    // 조건연산자 =>  비?집:놀이동산;
    // pnum === 1 은 true 이므로 pnum만 써도 됨!

    // 위치이동 /////////
    // 오른쪽이동
    rbox.css({
        left: "50%",
        transform: "translateX(0)",
        opacity: 1,
        transition: "all .4s ease-in-out .5s"
    });
    // 왼쪽이동
    lbox.css({
        left: "0%",
        transform: "translateX(0)",
        opacity: 1,
        transition: "all .4s ease-in-out .5s"
    });


}); ///// jQB //////////////////////////////////
///////////////////////////////////////////////