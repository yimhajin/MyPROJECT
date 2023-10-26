$(function () {
  var mapContainer = document.getElementById("map"), // 지도를 표시할 div
    mapOption = {
      center: new kakao.maps.LatLng(37.65752615267155, 127.0615853369236), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    };

  // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
  var map = new kakao.maps.Map(mapContainer, mapOption);

  // 마커가 표시될 위치입니다
  var markerPosition = new kakao.maps.LatLng(37.65752615267155, 127.0615853369236);

  // 마커를 생성합니다
  var marker = new kakao.maps.Marker({
    position: markerPosition,
  });

  // 마커가 지도 위에 표시되도록 설정합니다
  marker.setMap(map);

  // 아래 코드는 지도 위의 마커를 제거하는 코드입니다
  // marker.setMap(null);

  // 마커를 클릭했을 때 마커 위에 표시할 인포윈도우를 생성합니다
  var iwContent = '<div><a href="./index.html"><img src="../images/logo.png" alt="logo" class="markk""/></a><span class="mapBranch">시네플렉스 노원점</span></div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
    iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

  // 인포윈도우를 생성합니다
  var infowindow = new kakao.maps.InfoWindow({
    content: iwContent,
    removable: iwRemoveable,
  });

  // 마커에 클릭이벤트를 등록합니다
  kakao.maps.event.addListener(marker, "click", function () {
    // 마커 위에 인포윈도우를 표시합니다
    infowindow.open(map, marker);
  });
});
