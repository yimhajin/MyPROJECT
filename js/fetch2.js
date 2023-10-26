/*############################################################
* @파일명: fetch2.js
* @작업자명: TEAM-ONE BY 정미
* @작업일자: 2023.10.22 ~
* @작업경로: json > recomm.json 객체 파일 읽기 
* @작업경로: index.html > 추천 영화 스크립트 적용 
############################################################*/

fetch("./json/recomm.json") //json파일 읽기
  .then((response) => response.json()) //json파일을 객체로 변환
  .then((json) => {
    //json파일을 객체로 출력
    let recommList = " "; //전역변수로 사용
    json.forEach((recomm) => {
      recommList += `
      <div class="carousel">
      <a class="carousel-item" href="#">
      <img src="${recomm.poster}" alt="${recomm.alt}" class="outline"/></a
      </div>
       `;
    });
    document.querySelector("#result2").innerHTML = recommList;
  })
  .catch((err) => console.log(err)); //실패(에러발생)했을때 결과
