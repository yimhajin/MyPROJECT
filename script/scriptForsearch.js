$(function () {
  //  상시로 보여질 화면

  fetch("https://sinjawon.github.io/moivebox/json/goods.json")
    .then((response) => response.json())
    .then((json) => {
      let { movies } = json;
      var k = movies.length > 10 ? 10 : movies.length;
      recomendedShowed = k;
      for (let i = 0; k > i; i++) {
        var { src } = movies[i];
        var { title } = movies[i];
        var { type } = movies[i];
        var { age_grade } = movies[i];
        var movieGradeClass = gradeColor(age_grade);
        var checkfinal = CheckClass(title);
        var checkTexts = CheckText(checkfinal);
        $(".recomendeds")
          .append(`<div class="recomended"><div class="recomended_imgbox"><img src=${src} alt="${title}"></div>
        <button class="modal_button" value="${title}">i</button>                
        <button class=${checkfinal} value="${title}">${checkTexts}</button>
        <span class="movie_grade ${movieGradeClass}">${age_grade}</span>
        <span class="movie_title">${title}</span>
        <span class="movie_type">${type}</span>
        </div>`);
      }
    });
  //상시 보여질 화면 끝

  //검색바 만 클릭하면
  $("#inputBox").click(function () {
    $(".pickList").children("a").removeClass("picked");
    $(".pickList a").css("backgroundColor", "#666");
    $("#recomendList").css("display", "block");
    $(".sections").css("display", "none");
  });
  //검색바만 클릭 끝

  //----------------------------------------------------검색바 엔터 누를시 input값에 해당되는 영화 나오게
  $("#searchInput").on("keydown", function (event) {
    var inputValue;

    if (event.key === "Enter") {
      $("#searchList").empty();
      $("#searchSection").css("display", "block");
      $("#recomendList").css("display", "none");
      $("#movieSection").css("display", "none");
      $("#aniSection").css("display", "none");
      $("#dramaSection").css("display", "none");
      inputValue = $("#searchInput").val();
      console.log(inputValue);
      var inputValueViod = inputValue.split().join(); //입력값 공백제거 저장

      fetch("https://sinjawon.github.io/moivebox/json/goods.json")
        .then((response) => response.json())
        .then((json) => {
          let { movies } = json;
          let searchList = movies.filter((movie) =>
            movie.title.includes(inputValueViod)
          );
          console.log(searchList);
          $("#searchList").append(
            `<span class="sub_name">검색하신  "${inputValue}"을(를) 포함한 </span>`
          );
          for (var i = 0; searchList.length > i; i++) {
            var { src } = searchList[i];
            var { title } = searchList[i];
            var { type } = searchList[i];
            var { age_grade } = searchList[i];
            var movieGradeClass = gradeColor(age_grade);
            var checkfinal = CheckClass(title);
            var checkTexts = CheckText(checkfinal);
            $("#searchList")
              .append(`<div class="recomended"><div class="recomended_imgbox"><img src=${src} alt="${title}"></div>
              <button class="modal_button" value="${title}">i</button>                
              <button class=${checkfinal} value="${title}">${checkTexts}</button>
              <span class="movie_grade ${movieGradeClass}">${age_grade}</span>
              <span class="movie_title">${title}</span>
              <span class="movie_type">${type}</span>
              </div>`);
          }
          if (inputValue == "") {
            alert("입력한값이 없습니다");
          }
        });

      $("input").val("");
    }
  });

  //--------------------------------------------------------------------------------스크롤을 위한 변수 생성
  var recomendedShowed;
  var movieShowed;
  var aniShowed;
  var dramaShowed;
  var enterShowed;
  // 스크롤 이벤트 감지
  $(window).scroll(function () {
    if (
      $(window).scrollTop() + $(window).height() >=
      $(document).height() - 10
    ) {
      var pickList = $("a.picked");

      var title = pickList.parent(".pickList").attr("title");
      console.log(title);

      if (title === "movie") {
        //영화스크롤
        fetch("https://sinjawon.github.io/moivebox/json/goods.json")
          .then((response) => response.json())
          .then((json) => {
            let { movies } = json;
            movies = movies.filter((movie) => movie.type === "영화"); //특정 조건에 맞는것만 다시담는다

            var remain = movies.length - movieShowed;
            var showTen = remain > 10 ? 10 : remain;

            for (var i = 0; showTen > i; i++) {
              var { src } = movies[movieShowed + i];
              var { title } = movies[movieShowed + i];
              var { type } = movies[movieShowed + i];
              var { age_grade } = movies[movieShowed + i];
              var movieGradeClass = gradeColor(age_grade);
              var checkfinal = CheckClass(title);
              var checkTexts = CheckText(checkfinal);
              $("#movieSection")
                .append(`<div class="recomended"><div class="recomended_imgbox"><img src=${src} alt="${title}"></div>
                <button class="modal_button" value="${title}">i</button>                
                <button class=${checkfinal} value="${title}">${checkTexts}</button>
                <span class="movie_grade ${movieGradeClass}">${age_grade}</span>
                <span class="movie_title">${title}</span>
                <span class="movie_type">${type}</span>
                </div>`);
            }
            movieShowed += showTen; //영화담은갯수
          });
      } else if (title === "ani") {
        //애니메이션 스크롤
        fetch("https://sinjawon.github.io/moivebox/json/goods.json")
          .then((response) => response.json())
          .then((json) => {
            let { movies } = json;
            movies = movies.filter((movie) => movie.type === "애니메이션"); //특정 조건에 맞는것만 다시담는다

            var remain = movies.length - aniShowed;

            var showTen = remain > 10 ? 10 : remain;
            for (var i = 0; showTen > i; i++) {
              console.log(showTen);
              var { src } = movies[aniShowed + i];
              var { title } = movies[aniShowed + i];
              var { type } = movies[aniShowed + i];
              var { age_grade } = movies[aniShowed + i];
              var movieGradeClass = gradeColor(age_grade);
              var checkfinal = CheckClass(title);
              var checkTexts = CheckText(checkfinal);
              $("#aniSection")
                .append(`<div class="recomended"><div class="recomended_imgbox"><img src=${src} alt="${title}"></div>
                <button class="modal_button" value="${title}">i</button>                
                <button class=${checkfinal} value="${title}">${checkTexts}</button>
                <span class="movie_grade ${movieGradeClass}">${age_grade}</span>
                <span class="movie_title">${title}</span>
                <span class="movie_type">${type}</span>
                </div>`);
            }
            aniShowed += showTen;
          });
      } else if (title === "entertainment") {
        //드라마스크롤
        fetch("https://sinjawon.github.io/moivebox/json/goods.json")
          .then((response) => response.json())
          .then((json) => {
            let { movies } = json;
            movies = movies.filter((movie) => movie.type === "예능"); //특정 조건에 맞는것만 다시담는다

            var remain = movies.length - enterShowed;
            var showTen = remain > 10 ? 10 : remain;
            for (var i = 0; showTen > i; i++) {
              var { src } = movies[enterShowed + i];
              var { title } = movies[enterShowed + i];
              var { type } = movies[enterShowed + i];
              var { age_grade } = movies[enterShowed + i];
              var movieGradeClass = gradeColor(age_grade);
              var checkfinal = CheckClass(title);
              var checkTexts = CheckText(checkfinal);
              $("#entertainmentSection")
                .append(`<div class="recomended"><div class="recomended_imgbox"><img src=${src} alt="${title}"></div>
                <button class="modal_button" value="${title}">i</button>                
                <button class=${checkfinal} value="${title}">${checkTexts}</button>
                <span class="movie_grade ${movieGradeClass}">${age_grade}</span>
                <span class="movie_title">${title}</span>
                <span class="movie_type">${type}</span>
                </div>`);
            }
            enterShowed += showTen;
          });
      } else if (title === "drama") {
        //예능 스크롤
        fetch("https://sinjawon.github.io/moivebox/json/goods.json")
          .then((response) => response.json())
          .then((json) => {
            let { movies } = json;
            movies = movies.filter((movie) => movie.type === "드라마"); //특정 조건에 맞는것만 다시담는다
            console.log(movies);
            var remain = movies.length - dramaShowed;
            var showTen = remain > 10 ? 10 : remain;
            console.log(remain);
            for (var i = 0; showTen > i; i++) {
              var { src } = movies[dramaShowed + i];
              var { title } = movies[dramaShowed + i];
              var { type } = movies[dramaShowed + i];
              var { age_grade } = movies[dramaShowed + i];
              var movieGradeClass = gradeColor(age_grade);
              var checkfinal = CheckClass(title);
              var checkTexts = CheckText(checkfinal);
              $("#dramaSection").append(
                `<div class="recomended"><div class="recomended_imgbox"><img src=${src} alt="${title}"></div>
                <button class="modal_button" value="${title}">i</button>                
                <button class=${checkfinal} value="${title}">${checkTexts}</button>
                <span class="movie_grade ${movieGradeClass}">${age_grade}</span>
                <span class="movie_title">${title}</span>
                <span class="movie_type">${type}</span>
                </div>`
              );
            }
            dramaShowed += showTen;
          });
      } else {
        fetch("https://sinjawon.github.io/moivebox/json/goods.json")
          .then((response) => response.json())
          .then((json) => {
            let { movies } = json;
            var remain = movies.length - recomendedShowed;
            var showTen = remain > 10 ? 10 : remain;
            for (let i = 0; showTen > i; i++) {
              var { src } = movies[recomendedShowed + i];
              var { title } = movies[recomendedShowed + i];
              var { type } = movies[recomendedShowed + i];
              var { age_grade } = movies[recomendedShowed + i];
              var movieGradeClass = gradeColor(age_grade);
              var checkfinal = CheckClass(title);
              var checkTexts = CheckText(checkfinal);
              $(".recomendeds").append(
                `<div class="recomended"><div class="recomended_imgbox"><img src=${src} alt="${title}"></div>
                <button class="modal_button" value="${title}">i</button>                
                <button class=${checkfinal} value="${title}">${checkTexts}</button>
                <span class="movie_grade ${movieGradeClass}">${age_grade}</span>
                <span class="movie_title">${title}</span>
                <span class="movie_type">${type}</span>
                </div>`
              );
            }
            recomendedShowed += showTen;
          });
      }
    }
  });
  //스크롤 이벤트 끝

  // function A(tem, token){
  //   tem(token)
  // }

  // function B(data){
  //   console.log(data + "ABC");
  // }
  // function C(data){
  //   console.log(data + "ABCD");
  // }
  // A(C, "ABC");

  //호버 이미지 타이머
  $(document).on("mouseenter", ".recomended", function () {
    var $element = $(this); // 현재 요소
    var delay = 500; // 지연 시간
    var timeoutId = setTimeout(function () {
      $element.css({
        transformOrigin: "center center",
        transform: "scale(1.2)",
        zIndex: "99",
      });
      $element.children(".recomended_imgbox").css({
        //10-20 박스크기 추가
        height: "240",
        transformOrigin: "center center",
        position: "absolute",
        zIndex: "99",
      });
      $element.children("img").css({
        transform: "scale(0.8)",
        //10-20 박스크기 추가
        // height: "240",
        transformOrigin: "center center",
        position: "absolute",
        zIndex: "99",
      });
    }, delay);
    // 타이머 취소.
    $element.mouseleave(function () {
      clearTimeout(timeoutId);
      $element.css({
        transformOrigin: "center center",
        transform: "scale(1)",
        zIndex: "98",
      });
      $element.children(".recomended_imgbox").css({
        //10-20 박스크기 추가
        height: "350",
        transformOrigin: "center center",
        position: "absolute",
        zIndex: "99",
      });
      $element.children("img").css({
        height: "340",
        position: "absolute",
        zIndex: "99",
      });
      setTimeout(function () {
        $element.css({ zIndex: "1" });
        $element.children("img").css({
          zIndex: "2",
        });
      }, delay);
    });
  });
  //호버 이미지 타이머 끝

  //--------------------------------------------------------- 카테고리클릭이밴트 -------------------------------------------------------------

  //  버튼 클릭하고 왔을떄
  //a링크 감지하고 거기에 받은 변수 적용
  const urlParams = new URLSearchParams(window.location.search);
  const isMovieButtonClicked = urlParams.get("movieClick");

  if (isMovieButtonClicked == "movie") {
    $(".pickList").children("a").css("backgroundColor", "#666");

    $(".pickList[title='movie']")
      .children("a")
      .css("backgroundColor", "#8b0000");
    $(".pickList").children("a").removeClass("picked");
    $(".pickList[title='movie']").children("a").addClass("picked");
    $(".pickList").children("a").css("opacity", "0.5");
    $(".pickList[title='movie']").children("a").css("opacity", "1");
    movieShowed = 0;
    $("#movieSection").empty(); // 기존 내용을 지웁니다.s
    $("#movieSection").append(`<span class="sub_name">영화</span>`);
    fetch("https://sinjawon.github.io/moivebox/json/goods.json")
      .then((response) => response.json())
      .then((json) => {
        let { movies } = json;
        movies = movies.filter((movie) => movie.type === "영화"); //특정 조건에 맞는것만 다시담는다
        movieShowed = movies.length > 10 ? 10 : movies.length;
        for (var i = 0; movieShowed > i; i++) {
          var { src } = movies[i];
          var { title } = movies[i];
          var { type } = movies[i];
          var { age_grade } = movies[i];
          var movieGradeClass = gradeColor(age_grade);
          var checkfinal = CheckClass(title);
          var checkTexts = CheckText(checkfinal);
          $("#movieSection")
            .append(`<div class="recomended"><div class="recomended_imgbox"><img src=${src} alt="${title}"></div>
            <button class="modal_button" value="${title}">i</button>                
            <button class=${checkfinal} value="${title}">${checkTexts}</button>
            <span class="movie_grade ${movieGradeClass}">${age_grade}</span>
            <span class="movie_title">${title}</span>
            <span class="movie_type">${type}</span>
            </div>`);
        }
      });
    $("#movieSection").css("display", "block");
    $("#aniSection").css("display", "none");
    $("#dramaSection").css("display", "none");
    $("#searchSection").css("display", "none");
    $("#entertainmentSection").css("display", "none");
    $("#recomendList").css("display", "none");
  } else if (isMovieButtonClicked == "ani") {
    $(".pickList").children("a").css("backgroundColor", "#666");
    $(".pickList[title='ani']").children("a").css("backgroundColor", "#8b0000");
    $(".pickList").children("a").removeClass("picked");
    $(".pickList[title='ani']").children("a").addClass("picked");
    $(".pickList").children("a").css("opacity", "0.5");
    $(".pickList[title='ani']").children("a").css("opacity", "1");
    aniShowed = 0;
    $("#aniSection").empty(); // 기존 내용을 지웁니다.
    $("#aniSection").append(`<span class="sub_name">애니메이션</span>`);
    fetch("https://sinjawon.github.io/moivebox/json/goods.json")
      .then((response) => response.json())
      .then((json) => {
        let { movies } = json;
        movies = movies.filter((movie) => movie.type === "애니메이션"); //특정 조건에 맞는것만 다시담는다
        aniShowed = movies.length > 10 ? 10 : movies.length;
        for (var i = 0; aniShowed > i; i++) {
          var { src } = movies[i];
          var { title } = movies[i];
          var { type } = movies[i];
          var { age_grade } = movies[i];
          var movieGradeClass = gradeColor(age_grade);
          var checkfinal = CheckClass(title);
          var checkTexts = CheckText(checkfinal);
          $("#aniSection")
            .append(`<div class="recomended"><div class="recomended_imgbox"><img src=${src} alt="${title}"></div>
            <button class="modal_button" value="${title}">i</button>                
            <button class=${checkfinal} value="${title}">${checkTexts}</button>
            <span class="movie_grade ${movieGradeClass}">${age_grade}</span>
            <span class="movie_title">${title}</span>
            <span class="movie_type">${type}</span>
            </div>`);
        }
      });
    $("#movieSection").css("display", "none");
    $("#aniSection").css("display", "block");
    $("#dramaSection").css("display", "none");
    $("#searchSection").css("display", "none");
    $("#entertainmentSection").css("display", "none");
    $("#recomendList").css("display", "none");
  } else if (isMovieButtonClicked == "entertainment") {
    $(".pickList").children("a").css("backgroundColor", "#666");
    $(".pickList[title='entertainment']")
      .children("a")
      .css("backgroundColor", "#8b0000");
    $(".pickList").children("a").removeClass("picked");
    $(".pickList[title='entertainment']").children("a").addClass("picked");
    $(".pickList").children("a").css("opacity", "0.5");
    $(".pickList[title='entertainment']").children("a").css("opacity", "1");
    enterShowed = 0; //보여질거 일단 초기화
    $("#entertainmentSection").empty(); // 기존 내용을 지웁니다.
    $("#entertainmentSection").append(`<span class="sub_name">예능</span>`);
    fetch("https://sinjawon.github.io/moivebox/json/goods.json")
      .then((response) => response.json())
      .then((json) => {
        let { movies } = json;
        movies = movies.filter((movie) => movie.type === "예능"); //특정 조건에 맞는것만 다시담는다
        enterShowed = movies.length > 10 ? 10 : movies.length;
        for (var i = 0; enterShowed > i; i++) {
          var { src } = movies[i];
          var { title } = movies[i];
          var { type } = movies[i];
          var { age_grade } = movies[i];
          var movieGradeClass = gradeColor(age_grade);
          var checkfinal = CheckClass(title);
          var checkTexts = CheckText(checkfinal);
          $("#entertainmentSection")
            .append(`<div class="recomended"><div class="recomended_imgbox"><img src=${src} alt="${title}"></div>
            <button class="modal_button" value="${title}">i</button>                
            <button class=${checkfinal} value="${title}">${checkTexts}</button>
            <span class="movie_grade ${movieGradeClass}">${age_grade}</span>
            <span class="movie_title">${title}</span>
            <span class="movie_type">${type}</span>
            </div>`);
        }
      });
    $("#entertainmentSection").css("display", "block");
    $("#movieSection").css("display", "none");
    $("#aniSection").css("display", "none");
    $("#dramaSection").css("display", "none");
    $("#searchSection").css("display", "none");
    $("#recomendList").css("display", "none");
  } else if (isMovieButtonClicked == "drama") {
    $(".pickList").children("a").css("backgroundColor", "#666");
    $(".pickList[title='drama']")
      .children("a")
      .css("backgroundColor", "#8b0000");
    $(".pickList").children("a").removeClass("picked");
    $(".pickList[title='drama']").children("a").addClass("picked");
    $(".pickList").children("a").css("opacity", "0.5");
    $(".pickList[title='drama']").children("a").css("opacity", "1");
    dramaShowed = 0;
    $("#dramaSection").empty(); // 기존 내용을 지웁니다.
    $("#dramaSection").append(`<span class="sub_name">드라마</span>`);
    fetch("https://sinjawon.github.io/moivebox/json/goods.json")
      .then((response) => response.json())
      .then((json) => {
        let { movies } = json;
        movies = movies.filter((movie) => movie.type === "드라마"); //특정 조건에 맞는것만 다시담는다
        dramaShowed = movies.length > 10 ? 10 : movies.length;
        for (var i = 0; dramaShowed > i; i++) {
          var { src } = movies[i];
          var { title } = movies[i];
          var { type } = movies[i];
          var { age_grade } = movies[i];
          var movieGradeClass = gradeColor(age_grade);
          var checkfinal = CheckClass(title);
          var checkTexts = CheckText(checkfinal);
          $("#dramaSection")
            .append(`<div class="recomended"><div class="recomended_imgbox"><img src=${src} alt="${title}"></div>
            <button class="modal_button" value="${title}">i</button>                
            <button class=${checkfinal} value="${title}">${checkTexts}</button>
            <span class="movie_grade ${movieGradeClass}">${age_grade}</span>
            <span class="movie_title">${title}</span>
            <span class="movie_type">${type}</span>
            </div>`);
        }
      });
    $("#movieSection").css("display", "none");
    $("#aniSection").css("display", "none");
    $("#dramaSection").css("display", "block");
    $("#searchSection").css("display", "none");
    $("#entertainmentSection").css("display", "none");
    $("#recomendList").css("display", "none");
  }
  //----------------------------------------------------------------- 카테고리클릭이벤트 끝-----------------------------------------------------------------------------

  // -------------------------------19빨 15초 12노------------------------------------------
  function gradeColor(grade) {
    if (grade >= 19) {
      return "AgeRed";
    } else if (19 > grade && grade >= 15) {
      return "AgeGreen";
    } else {
      return "AgeYellow";
    }
  }
  // -----------------체크 별 클래스 함수 테스트-------------------------------------------------------

  function CheckClass(check) {
    if (localStorage.getItem("ggim")) {
      var checkggims = JSON.parse(localStorage.getItem("ggim"));
      if (checkggims.includes(check)) {
        return "ggimed_button";
      } else {
        return "ggim_button";
      }
    } else {
      return "ggim_button";
    }
  }

  function CheckText(text) {
    if (text == "ggim_button") {
      return "+";
    } else if (text == "ggimed_button") {
      return "v";
    }
  }
  //클릭
});
// function redirectToLink() {
//   window.location.href = "./search.html";
// }
