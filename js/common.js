var globalAuthToken;

if (!(_config.cognito.userPoolId 
    && _config.cognito.userPoolClientId 
    && _config.cognito.region)) {
    alert('noCognitoMessage!!!');
}
var poolData = {
    UserPoolId: _config.cognito.userPoolId,
    ClientId: _config.cognito.userPoolClientId
};
var userPool;

(function onload($) {

    $(function onDocReady() {

        var _gf = {
            preLoad: function(){

                userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

                if (typeof AWSCognito !== 'undefined') {
                    AWSCognito.config.region = _config.cognito.region;
                }

                /* 로그인 여부 확인 [S].. */
                var cognitoUser = userPool.getCurrentUser();
                if (cognitoUser) {
                    cognitoUser.getSession(function sessionCallback(err, session) {
                        if (err) {
                            alert(err);
                        } else if (!session.isValid()) {
                            alert('session is not Valid');
                        } else {
                            globalAuthToken = session.getIdToken().getJwtToken();
                        }

                        _gf.postLoad();
                    });
                } else {
                    _gf.postLoad();
                }
                /* 로그인 여부 확인 [E].. */
                
            },
            postLoad: function(){

                // logout버튼 이벤트 바인드
                $("#btn_logout").on('click', function(e) {
                    userPool.getCurrentUser().signOut();
                    //alert("You have been signed out.");
                    window.location = "login.html";
                });

                _thisPage.onload();

            },
        };

        _gf.preLoad();

    });

}(jQuery));