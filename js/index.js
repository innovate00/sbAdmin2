/*global WildRydes _config*/

var WildRydes = window.WildRydes || {};
WildRydes.map = WildRydes.map || {};

(function rideScopeWrapper($) {
    
    /* 로그인 여부 확인 [S].. */
    var authToken;
    WildRydes.authToken.then(function setAuthToken(token) {
        if (token) {
            $("#btn_logoutOpen").css('display', '');
            $("#btn_loginMove").css('display', 'none');
        } else {
            $("#btn_logoutOpen").css('display', 'none');
            $("#btn_loginMove").css('display', '');
        }
    }).catch(function handleTokenError(error) {
        alert(error);
        //window.location.href = '/login.html';
    });
    /* 로그인 여부 확인 [E].. */

    // Register click handler for #request button
    $(function onDocReady() {

        // WildRydes.authToken.then(function updateAuthMessage(token) {
        //     if (token) {
        //         //displayUpdate('You are authenticated. Click to see your <a href="#authTokenModal" data-toggle="modal">auth token</a>.');
        //         //$('.authToken').text(token);
        //         console.log('>>>>>>> token 확인 모달 생략함.');
        //     }
        // });

        // logout버튼 이벤트 바인드
        $("#btn_logout").on('click', function(e) {
            WildRydes.signOut();
            alert("You have been signed out.");
            window.location = "login.html";
        });
    });
    
}(jQuery));
