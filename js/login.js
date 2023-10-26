/*############################################################
* @파일명: login.js
* @작업자명: TEAM-ONE BY 정미
* @작업일자: 2023.10.15 ~
* @작업경로: index.html, mainsearch.html, modal.html, ggim.html, companyinfo.html, map.html, terms.html, lcinfo.html, privacy.html, sitemap.html
  > 로그인이 필요한 모든 페이지에 사용
############################################################*/

//로그인창 닫기
function login_close() {
  //닫기버튼클릭하면 로그인창 감추기
  document.getElementById("loginWrap").style.display = "none";
}
function memberLogin_show() {
  //alert("ok1");//회원로그인 입력상자들보여지는 함수
  document.getElementById("memberLogin").style.zIndex = "25";
}
function show() {
  //show함수를 작동시킬때 숨겨놓은 로그인영역을 보이게 한다
  if (log.firstChild.nodeValue == "로그아웃") {
    //로그인하고 난후 로그아웃으로 바뀌어 있는 경우 로그아웃클릭하면
    alert("로그아웃 되었습니다!");

    let login = "로그인";
    let log = document.getElementById("log");
   
    log.firstChild.nodeValue = "로그인"; //로그아웃 클릭하면 로그인으로 바꾼다
  } else if (log.firstChild.nodeValue == "로그인") {
    //로그인하지 않았을경우
    document.getElementById("loginWrap").style.display = "block";
  }
}
function login() {
  let logout = "로그아웃";
  let log = document.getElementById("log");

  //alert("로그인함수 작동");
  const member_id = "member"; //member 회원의 아이디
  var member_pw = 1234; //member 회원의 비밀번호

  var userid = document.getElementById("userId").value;
  var userpw = document.getElementById("userPw").value;

  if (userid == member_id && userpw == member_pw) {
    //아이디정보와 비밀번호정보가 모두 회원의 로그인정보와 일치할경우
    localStorage.setItem("member","1234");//10-24추가
    log.firstChild.nodeValue = "로그아웃";

    //로그인화면은 숨김처리한다
    document.getElementById("loginWrap").style.display = "none";
  } else if (userid == member_id && userpw != member_pw) {
    //아이디정보는 일치하지만 비밀번호정보가 다를경우
    alert("비밀번호가 일치하지 않습니다");
  } else if (userid != member_id) {
    //입력한 아이디에 해당하는 회원이 없는경우
    //비밀번호정보의 일치여부를 떠나서 회원아이디정보가 다르면
    //우선적으로 회원에 해당하는 아이디를 입력해야 한다
    alert("입력한 아이디에 해당하는 회원이 존재하지 않습니다");
  } else {
    //위에서 사용한 조건에 해당하지 않는 경우에 실행
    alert("아이디 또는 비밀번호가 일치하지 않습니다");
  }
}

// 10-24 추가
$(function(){
  if(localStorage.getItem("member")){
    log.firstChild.nodeValue = "로그아웃";
  }
});