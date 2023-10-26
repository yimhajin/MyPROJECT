/*############################################################
* @파일명: article.js
* @작업자명: TEAM-ONE BY 정미
* @작업일자: 2023.10.22 ~
* @작업경로: index.html > 한줄짜리 전광판 효과 스크립트
############################################################*/

const para1 = document.getElementById("para1");

animate(para1);

function animate(element) {
  let elementWidth = element.offsetWidth;
  let parentWidth = element.parentElement.offsetWidth;
  let flag = 0;

  setInterval(() => {
    element.style.marginLeft = --flag + "px";

    if (elementWidth == -flag) {
      flag = parentWidth;
    }
  }, 10);
}
