/*############################################################
* @파일명: fetch.js
* @작업자명: TEAM-ONE BY 정미
* @작업일자: 2023.10.22 ~
* @작업경로: json > topten.json 객체 파일 읽기 
* @작업경로: index.html > Top 10 영화  스크립트 적용 
############################################################*/

$(function () {
  function topTenList() {
    fetch("./json/topten.json") //json파일 읽기
      .then((response) => response.json())
      .then((json) => {
        let { topten } = json;

        if (topten.length > 0) {
          $("swiper-slide").css({ width: "400px", height: "500px" });

          $(".topten1").html(`
            <a href="#" onClick="return false;"><img src="${topten[0].src}" alt="${topten[0].alt}" value="화란" class="outline modal_button" /></a>
        `);

          $(".topten2").html(`
          <a href="#" onClick="return false;"><img src="${topten[1].src}" alt="${topten[1].alt}" value="30일" class="outline modal_button" /></a>
        `);

          $(".topten3").html(`
          <a href="#" onClick="return false;"><img src="${topten[2].src}" alt="${topten[2].alt}" value="1947 보스톤" class="outline modal_button" /></a>
        `);

          $(".topten4").html(`
          <a href="#" onClick="return false;"><img src="${topten[3].src}" alt="${topten[3].alt}" value="밀수" class="outline modal_button" /></a>
        `);

          $(".topten5").html(`
          <a href="#" onClick="return false;"><img src="${topten[4].src}" alt="${topten[4].alt}" value="바빌론" class="outline modal_button" /></a>
        `);

          $(".topten6").html(`
          <a href="#" onClick="return false;"><img src="${topten[5].src}" alt="${topten[5].alt}" value="천박사 퇴마 연구소" class="outline modal_button" /></a>
        `);

          $(".topten7").html(`
          <a href="#" onClick="return false;"><img src="${topten[6].src}" alt="${topten[6].alt}" value="라라랜드" class="outline modal_button" /></a>
        `);

          $(".topten8").html(`
          <a href="#" onClick="return false;"><img src="${topten[7].src}" alt="${topten[7].alt}" value="상겨니" class="outline modal_button" /></a>
        `);

          $(".topten9").html(`
          <a href="#" onClick="return false;"><img src="${topten[8].src}" alt="${topten[8].alt}" value="아이돌러쉬 세븐" class="outline modal_button" /></a>
        `);

          $(".topten10").html(`
        <a href="#" onClick="return false;"><img src="${topten[9].src}" alt="${topten[9].alt}" value="블루 자이언트" class="outline modal_button" /></a>
      `);
        }
      });
  }
  topTenList();
});
