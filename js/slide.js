/*############################################################
* @파일명: slide.js
* @작업자명: TEAM-ONE BY 하진
* @작업일자: 2023.10.11 ~
* @작업경로: 전체 페이지 header 영역 / 주목 할 만한 한국 콘텐츠 슬라이드 이벤트 스크립트
############################################################*/

$(function () {
  const btns = document.querySelectorAll(".nav-btn");
  const slides = document.querySelectorAll(".video-slide");
  const contents = document.querySelectorAll(".content");

  let isMuted = new Array(slides.length).fill(true); // 각 슬라이드의 음소거 상태를 추적하는 배열

  contents.forEach((content, i) => {
    const soundBtn = document.createElement("button"); // 소리를 켜고 끄는 버튼 생성
    soundBtn.style.width = "55px";
    soundBtn.style.height = "55px";
    soundBtn.style.marginLeft = "10px";
    soundBtn.style.border = "none";
    soundBtn.style.borderRadius = "25.5px"; // 테두리 둥글게 처리
    soundBtn.style.backgroundColor = "white"; // 배경색 설정
    soundBtn.style.color = "black"; // 글자색 설정
    soundBtn.style.alignItems = "center"; // 세로 중앙 정렬
    soundBtn.style.justifyContent = "center"; // 가로 중앙 정렬

    soundBtn.innerHTML = isMuted[i] ? '<img src="./images/off.png" alt="소리 켜기" width="25px" height="25px" style="vertical-align: middle;">' : '<img src="./images/on.png" alt="소리 끄기" width="25px" height="25px" style="vertical-align: middle;">';
    content.appendChild(soundBtn); // 컨텐츠에 버튼 추가

    // 소리 켜기/끄기 버튼 클릭 이벤트
    soundBtn.addEventListener("click", () => {
      isMuted[i] = !isMuted[i]; // 해당 슬라이드의 음소거 상태 토글
      slides[i].muted = isMuted[i]; // 해당 비디오의 음소거 상태 변경
      // 버튼의 이미지 변경
      soundBtn.innerHTML = isMuted[i] ? '<img src="./images/off.png" alt="소리 켜기" width="25px" height="25px" style="vertical-align: middle;">' : '<img src="./images/on.png" alt="소리 끄기" width="25px" height="25px" style="vertical-align: middle;">';
    });
  });

  let silderNav = function (manual) {
    btns.forEach((btn) => {
      btn.classList.remove("active");
    });
    slides.forEach((slide) => {
      slide.classList.remove("active");
      slide.muted = true; // 비active 상태인 영상은 muted 상태로 설정
      slide.pause(); // 비active 상태인 영상은 일시정지
    });
    contents.forEach((content) => {
      content.classList.remove("active");
    });
    btns[manual].classList.add("active");
    slides[manual].classList.add("active");
    slides[manual].muted = isMuted[manual]; // active 상태가 된 영상의 음소거 상태 설정
    slides[manual].play(); // active 상태가 된 영상 재생
    contents[manual].classList.add("active");

    // active 상태가 된 버튼의 이미지를 해당 슬라이드의 음소거 상태에 따라 설정
    contents[manual].querySelector("button").innerHTML = isMuted[manual] ? '<img src="./images/off.png" alt="소리 켜기" width="25px" height="25px" style="vertical-align: middle;">' : '<img src="./images/on.png" alt="소리 끄기" width="25px" height="25px" style="vertical-align: middle;">';
  };

  btns.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      silderNav(i);
    });
  });

  window.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    header.classList.toggle("sticky", window.scrollY > 0);

    // 스크롤이 내려갈 때 배경색 변경
    if (window.scrollY > 0) {
      header.style.backgroundColor = "#181811"; // 원하는 색상으로 변경
    } else {
      header.style.backgroundColor = "transparent";
    }
  });

  /** 주목 할 만한 한국 콘텐츠 슬라이드 이벤트 스크립트 **/
  const swiperEl = document.querySelector("swiper-container");
  const swiper = swiperEl.swiper;

  var appendNumber = 4;
  var prependNumber = 1;
  // 10-19 자동 슬라이드, 호버시 정지 기능 추가 BY HJ
  swiper.params.autoplay = {
    delay: 5000, // 5초마다 슬라이드.
    disableOnInteraction: false,
  };
  swiper.autoplay.start();

  // 마우스 호버 이벤트를 추가
  swiperEl.addEventListener("mouseenter", () => {
    swiper.autoplay.stop(); // 마우스 호버시 슬라이드 스탑
  });
  swiperEl.addEventListener("mouseleave", () => {
    swiper.autoplay.start(); // 마우스가 슬라이드를 벗어났을 시, 다시 재생
  });
  // 10-19 자동 슬라이드, 호버시 정지 기능 끝
  document.querySelector(".prepend-2-slides").addEventListener("click", function (e) {
    e.preventDefault();
    swiper.prependSlide(["<swiper-slide>Slide " + --prependNumber + "</swiper-slide>", "<swiper-slide>Slide " + --prependNumber + "</swiper-slide>"]);
  });
  document.querySelector(".prepend-slide").addEventListener("click", function (e) {
    e.preventDefault();
    swiper.prependSlide("<swiper-slide>Slide " + --prependNumber + "</swiper-slide>");
  });
  document.querySelector(".append-slide").addEventListener("click", function (e) {
    e.preventDefault();
    swiper.appendSlide("<swiper-slide>Slide " + ++appendNumber + "</swiper-slide>");
  });
  document.querySelector(".append-2-slides").addEventListener("click", function (e) {
    e.preventDefault();
    swiper.appendSlide(["<swiper-slide>Slide " + ++appendNumber + "</swiper-slide>", "<swiper-slide>Slide " + ++appendNumber + "</swiper-slide>"]);
  });
});
