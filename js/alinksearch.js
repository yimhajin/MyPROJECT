/*############################################################
* @파일명: alinksearch.js
* @작업자명: TEAM-ONE BY 제원
* @작업일자: 2023.10.20 ~
* @작업경로: 전체 페이지 header 영역
############################################################*/

$(function () {
  $("#movieButton").click(function () {
    // 영화 버튼 클릭 시 검색 페이지로 이동하도록 함
    window.location.href = "./search.html?moviecClick=true";
  });
});
