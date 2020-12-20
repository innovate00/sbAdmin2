/*global WildRydes _config*/

var WildRydes = window.WildRydes || {};
WildRydes.map = WildRydes.map || {};

(function rideScopeWrapper($) {
    
    /* 로그인 여부 확인 [S].. */
    var authToken;
    WildRydes.authToken.then(function setAuthToken(token) {
        if (token) {
            authToken = token;
        } else {
            window.location.href = '/login.html';
        }
    }).catch(function handleTokenError(error) {
        alert(error);
        window.location.href = '/login.html';
    });
    /* 로그인 여부 확인 [E].. */

    // Register click handler for #request button
    $(function onDocReady() {

        WildRydes.authToken.then(function updateAuthMessage(token) {
            if (token) {
                //displayUpdate('You are authenticated. Click to see your <a href="#authTokenModal" data-toggle="modal">auth token</a>.');
                //$('.authToken').text(token);
                console.log('>>>>>>> token 확인 모달 생략함.');
            }
        });

        if (!_config.api.invokeUrl) {
            $('#noApiMessage').show();
        }

        // logout버튼 이벤트 바인드
        $("#btn_logout").on('click', function(e) {
            WildRydes.signOut();
            alert("You have been signed out.");
            window.location = "login.html";
        });

        // btn_deposit_search 버튼 이벤트 바인드
        $("#btn_deposit_search").on('click', function(e) {
            FN001(e);
        });
    });

    function FN001(e) {
        e.preventDefault();
        
        $.ajax({
            method: 'POST',
            url: _config.api.invokeUrl + '/deposit',
            headers: {
                Authorization: authToken
            },
            data: JSON.stringify({
                PickupLocation: {
                    Latitude: '11',
                    Longitude: '22'
                }
            }),
            contentType: 'application/json',
            success: completeRequest,
            error: function ajaxError(jqXHR, textStatus, errorThrown) {
                console.error('Error requesting ride: ', textStatus, ', Details: ', errorThrown);
                console.error('Response: ', jqXHR.responseText);
                alert('An error occured when requesting your unicorn:\n' + jqXHR.responseText);
            }
        });
        
    }

    function completeRequest(result) {
        console.log('Response received from API: ', result);

    }

}(jQuery));
