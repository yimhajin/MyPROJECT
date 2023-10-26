$(function () {
  $(document).on("click", ".modal_close", function () {
    //닫기버튼 클릭하면 모달 감추기
    $("#modal_bg").css("display", "none");
  });
  $(document).on("click", "#bg", function () {
    //닫기버튼 클릭하면 모달 감추기
    $("#modal_bg").css("display", "none");
  });

  $(document).on("click keypress", ".modal_button", function () {
    $("info_list button").css("backgroundColor", "#666");

    $("info_list button")
      .filter(function () {
        return $(this).val() === "1";
      })
      .css("background-color", "#8b0000");

    $("#movieRoundList_wrap").css("display", "block");
    $("#ipb").css("display", "none");
    $("#rel_contents").css("display", "none");
    var modalTitleVal = $(this).attr("value");

    fetch("https://sinjawon.github.io/moivebox/json/goods.json")
      .then((response) => response.json())
      .then((json) => {
        let { movies } = json;
        var modalMovies = movies.find((movie) => movie.title === modalTitleVal);

        var {
          title,
          type,
          age_grade,
          src,
          m_src,
          h_src,
          duration,
          description,
          Ep,
          age_grade,
          ContentIntroduction,
        } = modalMovies;
        $("#modal_bg").css("display", "block");
        commentSubject = title; //여기서 변수 저장시키쟈
        var movieGradeClass = gradeColor(age_grade);
        $("#modaled_info").html(`
        <iframe src="${m_src}"></iframe>
        <div class="info_div"> 
          <p><span>${title}</span></p>
          <p><span>${type}</span></p>
          <p><span class="${movieGradeClass}">${age_grade}</span></p>
          <p><span>${duration}</span></p>
          <p><span>${ContentIntroduction}</span></p>
          <p class="modal_dsr"><span >${description}</span></p>
        </div>       
        `);

        //회차 별 나열 보여주기

        if (Number(Ep) >= 1) {
          $("#movieRoundList_wrap").html("");
          for (var i = 0; Number(Ep) > i; i++) {
            var sangyoungTime = RandomNumber();

            $("#movieRoundList_wrap").append(`
            <div class="movieRoundList">
            <a href="./video/movieRoundList.mp4" class="movie-link">
              <div class="movieRoundList2">
                  <img src="${src}" alt="${title}"/>
                  <p class="movieRound_Ep"><span>${i + 1}화</span></p>
                  <p class="movieRound_Ep2"><span>${i + 1}</span></p>
                  <p class="movieRound_dec"><span>${description}</span></p>
                  <p class="movieRound_sangyoung"><span>상영시간 : ${sangyoungTime}분</span></p>
              </div>
              </a>
            </div>
            `);
          }
        } else {
          $("#movieRoundList_wrap").html("");
          $("#movieRoundList_wrap").append(`
          <p id="NoRound">
          <i class="fa-regular fa-face-grin-tears" style="color: #d3d3d3; ;"></i>
          <span >회차가 없습니다 ㅠㅠ</span>
        </p>
        
          `);
        }

        // 코맨트 업데이트
        loadCommentsFromLocalStorage(title);

        //관련 콘텐츠 업데이트---------------------------------------------

        var modalMoviesType = movies.filter(
          (movie) => movie.type === type && movie.title !== title
        ); //추가 해당되는 컨텐츠는 빼버림
        modalMoviesType = shuffleArray(modalMoviesType);
        $("#rel_contents").html("");
        $("#rel_contents").append(
          `<p><span>${title} 와(과) 관련된 콘텐츠</span></p>`
        );
        for (var i = 0; 6 > i; i++) {
          var movieGradeClass = gradeColor(modalMoviesType[i].age_grade);
          var checkfinal = CheckClass(modalMoviesType[i].title);
          var checkTexts = CheckText(checkfinal);
          // 관련콘텐츠 콘텐츠스 s하나차이
          $("#rel_contents").append(`
          <div class="rel_content"> 
            <p class="main-image"><img src="${modalMoviesType[i].src}" class="modal_rel_img"></img></p>
            <p><span class="tit">${modalMoviesType[i].title}</span></p>
            <p><span class="ty">${modalMoviesType[i].type}</span></p>
            <p><span class="ag ${movieGradeClass}">${modalMoviesType[i].age_grade}</span></p> 
            <button class=${checkfinal} value="${modalMoviesType[i].title}">${checkTexts}</button> 
            <button  class="modal_button" value="${modalMoviesType[i].title}">i</button> 
          <div>  
            
            `);
        }
      });
  });

  // 모달색션 버튼
  $("#info_list_wrap button").click(function () {
    var buttonVal = $(this).val();
    $("#info_list_wrap button").css("backgroundColor", "#666");
    $(".modal_section").css("display", "none");
    if (buttonVal == 1) {
      $("#movieRoundList_wrap").css("display", "block");
      $("#m_bt01").css("backgroundColor", "#8b0000");
    } else if (buttonVal == 2) {
      $("#ipb").css("display", "block");
      $("#m_bt02").css("backgroundColor", "#8b0000");
    } else if (buttonVal == 3) {
      $("#rel_contents").css("display", "block");
      $("#m_bt03").css("backgroundColor", "#8b0000");
    }
  });
  //모달 색션 버튼 x

  //////////////////////////////////////////////////// 코맨트 입력 저장 스크립트///////////////////////////////////

  var commentInput = document.getElementById("commentInput");
  commentInput.addEventListener("keypress", addComment);

  var ipBtn = document.querySelector(".ipBtn");
  ipBtn.addEventListener("click", addComment);

  var commentSubject; //이거로 코멘트 활용하자 제발

  function addComment(event) {
    if (
      event.type === "click" ||
      (event.type === "keypress" && event.key === "Enter")
    ) {
      var commentInput = document.getElementById("commentInput");
      var commentText = commentInput.value.trim();

      if (commentText !== "") {
        var commentSection = document.getElementById("commentSection");
        var commentContainer = document.createElement("div");
        var comment = document.createElement("p");
        comment.innerText = commentText;

        commentContainer.classList.add("commentContainer");
        commentContainer.appendChild(comment);

        commentSection.appendChild(commentContainer);

        commentInput.value = "";

        saveCommentToLocalStorage(commentSubject, commentText);

        commentSection.scrollTop = commentSection.scrollHeight;
      }
    }
  }

  var commentInput = document.getElementById("commentInput");
  commentInput.addEventListener("keypress", addComment);

  var ipBtn = document.querySelector(".ipBtn");
  ipBtn.addEventListener("click", addComment);

  // 코멘트 저장
  //특정 주제에 해당하는 스토리지가 있을경우
  //코맨트값을 넣어준다
  //없을 경우 특정 주제 속성을 만들어서
  // 코맨트값을 넣어준다
  //commentSubject 이게 진짜 중요하다
  function saveCommentToLocalStorage(subject, comment) {
    if (localStorage.getItem(subject)) {
      var existingComments = JSON.parse(localStorage.getItem(subject));

      existingComments.comments.push(comment);

      localStorage.setItem(subject, JSON.stringify(existingComments));
    } else {
      localStorage.setItem(subject, JSON.stringify({ comments: [] }));
      var existingComments = JSON.parse(localStorage.getItem(subject));
      existingComments.comments.push(comment);
      localStorage.setItem(subject, JSON.stringify(existingComments));
    }
  }

  function loadCommentsFromLocalStorage(commentSubject) {
    var commentSection = document.getElementById("commentSection");
    commentSection.innerHTML = "";
    if (localStorage.getItem(commentSubject)) {
      var commentInfo = [];
      commentInfo = JSON.parse(localStorage.getItem(commentSubject));
      var commentsArray = commentInfo.comments;

      if (commentsArray.length >= 1) {
        for (var i = 0; commentsArray.length > i; i++) {
          var commentContainer = document.createElement("div");
          var comment = document.createElement("p");
          comment.innerText = commentsArray[i];
          commentContainer.classList.add("commentContainer");
          commentContainer.appendChild(comment);
          commentSection.appendChild(commentContainer);
        }
      } else {
        var commentContainer = document.createElement("div");
        var comment = document.createElement("p");
        comment.innerText = "감상평이 없습니다";
        //
        commentContainer.appendChild(comment);
        commentSection.appendChild(commentContainer);
      }
    } else {
      commentSection.innerHTML = `<i class="fa-regular fa-comments" style="color: #d3d3d3;"></i>`;
    }
  }

  //로컬에 저장된 해당 주제의 코멘트 업데이트
  //변수때문에 다 적용후에 여기서 적용시켜야 하나보다
  // $(document).ready(function () {
  //   loadCommentsFromLocalStorage();
  // });
  //////////////////////////////////////////////////// 코맨트 입력 저장 스크립트 끝/////////////////////////////

  // 랜덤숫자 만들어보쟝
  function RandomNumber() {
    // 40에서 60 사이의 랜덤 숫자 생성
    var randomNumber = Math.floor(Math.random() * (60 - 40 + 1)) + 40;
    return randomNumber;
  }

  // 배열섞는 함수
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // ES6의 배열 구조 분해를 사용하여 값 교환
    }
    return array;
  }
  // 배열섞는 함수

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
  // -------------------------------------------------------------------------

  // -----------------체크 별 클래스 함수 추가 테스트-------------------------------------------------------

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
});
