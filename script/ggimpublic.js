/////////////////////////////////////////////////////////공통으로 찜목록 담기
$(function () {
  $(document).on("click keypress", ".ggim_button", function () {
    var ggimed = $(this).attr("value");

    var cfirm_result = confirm(ggimed + "을(를) 찜목록에서 추가하시겠습니까?");
    if (cfirm_result === true) {
      if (localStorage.getItem("ggim")) {
        ggims = JSON.parse(localStorage.getItem("ggim"));
        // console.log(ggims);
        if (ggims.find((e) => e === ggimed)) {
          return alert("이미 찜목록에 있습니다");
        } else {
          ggims.push(ggimed);
          localStorage.setItem("ggim", JSON.stringify(ggims));
        }
      } else {
        var ggims = [];
        ggims.push(ggimed);
        localStorage.setItem("ggim", JSON.stringify(ggims));
      }

      alert(ggimed + "이(가) 찜목록에 담겼습니다");
      location.reload();
    } else {
      alert("취소하셨습니다");
    }
  });

  //찜된것 적용함수
  $(document).on("click keypress", ".ggimed_button", function () {
    var ggimed = $(this).attr("value");
    var cfirm_result = confirm(ggimed + "을(를) 찜목록에서 지우시겠습니까?");
    console.log(cfirm_result);

    if (cfirm_result === true) {
      var jggim = JSON.parse(localStorage.getItem("ggim"));
      var filter_jggim = jggim.filter((e) => e !== ggimed);
      localStorage.setItem("ggim", JSON.stringify(filter_jggim));
      alert(ggimed + "이(가) 삭제되었습니다");

      location.reload();
    } else {
      alert("취소하셨습니다");
    }
  });

  //////////////////////////////////////////////////공통으로 찜목로 담기
});
