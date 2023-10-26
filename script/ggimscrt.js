///찜목록만 하기
$(function () {
  function ggimpage() {
    var gs = JSON.parse(localStorage.getItem("ggim"));

    if (gs === null || gs.length == 0) {
      return $("#ggim_Wrap").append(`<div id="tung">
      <i class="fa-solid fa-cart-arrow-down" style="color: #d3d3d3;"></i>
      <span>아직 찜하신 콘텐츠가 없습니다.</span>
      </div>`);
    } else {
      fetch("https://sinjawon.github.io/moivebox/json/goods.json")
        .then((response) => response.json())
        .then((json) => {
          let { movies } = json;
          for (var i = 0; i < gs.length; i++) {
            var fetchggim = movies.find((movie) => movie.title === gs[i]);
            var { title, src, description } = fetchggim;
            $("#ggim_Wrap").append(`
          <div class="ggimList">
          <img src="${src}" alt="${title}"/>
          <h2><span class="ggim_title">${title}</span></h2>
          <span class="ggim_coment">${description}</span>
          <label for="checkList0${i}">체크박스</label><input id="checkList0${i}" title="${title}" class="checkBox" type="checkbox"/>
          <button class="ggim_del" value="${title}"><i class="fa-regular fa-trash-can"></i></button>         
        </div>        
          `);
          }
        });
    }
  }
  //상시 로드
  window.onload = ggimpage();

  //기본삭제
  $(document).on("click", ".ggim_del", function () {
    var ggim_del_val = $(this).val();
    var cfirm_result = confirm(
      ggim_del_val + "\n을(를) 찜목록에서 삭제하시겠습니까?"
    );

    if (cfirm_result === true) {
      var jggim = JSON.parse(localStorage.getItem("ggim"));
      var filter_jggim = jggim.filter((e) => e !== ggim_del_val);
      localStorage.setItem("ggim", JSON.stringify(filter_jggim));
      location.reload();
      alert(ggim_del_val + "이(가) 삭제되었습니다");
    } else {
      alert("취소하셨습니다");
    }
  });

  //체크삭제
  $("#checked_del").click(function () {
    var checkedList = [];
    checkedList = $("#ggim_Wrap input[type='checkbox']:checked")
      .map(function () {
        return $(this).attr("title");
      })
      .get(); //이거 다시써먹자 신기하네
    var cfirm_result = confirm(
      "선택된\n" + checkedList + "을(를)\n 찜목록에서 삭제하시겠습니까?"
    );

    if (cfirm_result === true) {
      if (checkedList === undefined || checkedList == "") {
        return alert("선택된것들이 없습니다");
      }

      var jggim = JSON.parse(localStorage.getItem("ggim"));

      var filter_jggim_checked = jggim.filter((e) => !checkedList.includes(e));
      localStorage.setItem("ggim", JSON.stringify(filter_jggim_checked));

      alert("선택하신 " + checkedList + "이(가) 삭제되었습니다");
      location.reload();
    } else {
      alert("취소하셨습니다");
    }
  });

  //전체선택

  let selectAll = false;
  $("#all_select").click(function () {
    selectAll = !selectAll;
    $("#ggim_Wrap input[type='checkbox']").prop("checked", selectAll);
    if (selectAll) {
      $("#all_select").text("전체해제");
    } else {
      $("#all_select").text("전체선택");
    }
  });
});
