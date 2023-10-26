/*############################################################
* @파일명: carousel.js
* @작업자명: TEAM-ONE BY 정미
* @작업일자: 2023.10.22 ~
* @작업경로: index.html > 추천영화 스크립트 효과
############################################################*/

$(document).ready(function () {
  $(".carousel").carousel({
    indicators: true,
  });
  setInterval(function () {
    $(".carousel").carousel("next");
  }, 2500);
});
