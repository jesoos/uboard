//<!--------------------- Facebook login script start ----------------------->
  // This is called with the results from from FB.getLoginStatus().
  function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      testAPI();
      
      // get facebook accessToken(String) 
      var accessToken = response.authResponse.accessToken;
  	  console.log("accessToken: " + accessToken);
  	  $("#loginpwd").val(accessToken);
//    	$("input[name=loginpwd]").val(accessToken);
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into Facebook.';
    }
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  window.fbAsyncInit = function() {

  // Now that we've initialized the JavaScript SDK, we call 
  // FB.getLoginStatus().  This function gets the state of the
  // person visiting this page and can return one of three states to
  // the callback you provide.  They can be:
  //
  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  //
  // These three cases are handled in the callback function.

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });

  };

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    //js.src = "//connect.facebook.net/ko_KR/sdk.js#xfbml=1&version=v2.5&appId=908411719233942";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me?fields=email', function(response) {
      console.log('Successful login for: ' + response.email);
      document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.email + '!';

      // Json String Type
       //console.log(JSON.stringify(response));
       console.log(response.email);
//        $("#loginid").val(response.email + "&accessToken=" + $("#loginpwd").val());
		$("input[name=loginid]").val(response.email + "&accessToken=" + $("#loginpwd").val());
//		if(response.email == "uboard25@gmail.com") $("input[name=loginRedirect]").val("/tv");
       	$("#loginfrm").submit();
      
    });
  }

  window.fbAsyncInit = function() {
		console.log("Host -> " + location.host);
		var host = location.host;
		var local = "localhost:8080";
		var passdev = "devjesoos-gaportal.cloudsc.kr";
		var awsprd = "uboard.hanwha.co.kr";
		var awsHpd1 = "ec2-52-79-130-95.ap-northeast-2.compute.amazonaws.com";
		var awsHpd2 = "ec2-52-79-130-174.ap-northeast-2.compute.amazonaws.com";
		var awsdevpaas1 = "ec2-52-79-143-134.ap-northeast-2.compute.amazonaws.com";
		var awsdevpaas2 = "ec2-52-79-142-47.ap-northeast-2.compute.amazonaws.com";
		var awsdevpaaselb = "devpaas-vpcelb-457053867.ap-northeast-2.elb.amazonaws.com";
		
		if(host == local) {
			  FB.init({	  
				    //local-dev (http://localhost:8080)
				    appId      : '1704932223054645',
				    cookie     : true,  // enable cookies to allow the server to access
				    xfbml      : true,
				    version    : 'v2.5'
				  });
			
		} else if(host == passdev) {
				  FB.init({	  
				    //paas-dev	(http://devjesoos-gaportal.cloudsc.kr) 
				    appId      : '1706585189556015',
				    cookie     : true,  // enable cookies to allow the server to access
				    xfbml      : true,
				    version    : 'v2.5'
				  });	
		} else if(host == awsprd) {
			  FB.init({	  
				    //awsprd	(http://uboard.hanwha.co.kr) 
				    appId      : '1704424799772054',
				    cookie     : true,  // enable cookies to allow the server to access
				    xfbml      : true,
				    version    : 'v2.5'
				  });	
		} else if(host == awsHpd1) {
			  FB.init({	  
				    //awsHpd1	
				    appId      : '1715473678667166',
				    cookie     : true,  // enable cookies to allow the server to access
				    xfbml      : true,
				    version    : 'v2.5'
				  });	
		} else if(host == awsHpd2) {
			  FB.init({	  
				    //awsHpd2 
				    appId      : '1715473938667140',
				    cookie     : true,  // enable cookies to allow the server to access
				    xfbml      : true,
				    version    : 'v2.5'
				  });	
		} else if(host == awsdevpaas1) {
			  FB.init({	  
				    //awsdevpaas	 
				    appId      : '1709766319237902',
				    cookie     : true,  // enable cookies to allow the server to access
				    xfbml      : true,
				    version    : 'v2.5'
				  });	
		} else if(host == awsdevpaas2) {
			  FB.init({	  
				    //awsdevpaas2	 
				    appId      : '1715373898677144',
				    cookie     : true,  // enable cookies to allow the server to access
				    xfbml      : true,
				    version    : 'v2.5'
				  });	
		} else if(host == awsdevpaaselb) {
			  FB.init({	  
				    //awsdevpaaselb	 
				    appId      : '1714692398745294',
				    cookie     : true,  // enable cookies to allow the server to access
				    xfbml      : true,
				    version    : 'v2.5'
				  });	
		} 
		
	};
	
// (function(d, s, id){
//    var js, fjs = d.getElementsByTagName(s)[0];
//    if (d.getElementById(id)) {return;}
//    js = d.createElement(s); js.id = id;
//    js.src = "//connect.facebook.net/en_US/sdk.js";
//    fjs.parentNode.insertBefore(js, fjs);
//  }(document, 'script', 'facebook-jssdk'));

(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
//   js.src = "//connect.facebook.net/ko_KR/sdk.js#xfbml=1&version=v2.5&appId=1704932223054645";
  js.src = "//connect.facebook.net/ko_KR/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

//<!--------------------- Facebook login script end ----------------------->

/* $(document).ready(function (){

    $("#loginbtn").click(function(){
        if($("#loginid").val() == ""){
            alert("로그인 아이디를 입력해주세요");
            $("#loginid").focus();
        }else if($("#loginpwd").val() == ""){
            alert("로그인 비밀번호를 입력해주세요");
            $("#loginpwd").focus();
        }else{

            $("#loginfrm").attr("action", "<c:url value='${pageContext.request.contextPath}/j_spring_security_check'/>");
            $("#loginfrm").submit();
        }
    });

}); */

//<!--------------------- google login script start ----------------------->
function onSignIn(googleUser) {
		/*
	  var profile = googleUser.getBasicProfile();
	  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
	  console.log('Name: ' + profile.getName());
	  console.log('Image URL: ' + profile.getImageUrl());
	  console.log('Email: ' + profile.getEmail());
	  */

	  //auth2 is initialized with gapi.auth2.init() and a user is signed in.
 	  gapi.load('auth2', function() {
  	  //auth2 = gapi.auth2.getAuthInstance({
  		  auth2 = gapi.auth2.init({
  	    client_id: '189317412554-6aqqj32v97hfse86vf8qhdvhpo7c0p6i.apps.googleusercontent.com',
  	    fetch_basic_profile: true,
  	    scope: 'profile'
  	  });

  	  // Sign the user in, and then retrieve their ID. 
  	  auth2.signIn().then(function() {
  	    console.log(auth2.currentUser.get().getId());
  	  }); 
  	});

	  
	  if (auth2.isSignedIn.get()) {
	    var profile = auth2.currentUser.get().getBasicProfile();
	    console.log('auth2_ID: ' + profile.getId());
	    console.log('auth2_Name: ' + profile.getName());
	    console.log('auth2_Image URL: ' + profile.getImageUrl());
	    console.log('auth2_Email: ' + profile.getEmail());
	  }
		  

	  // get id_token
	  var id_token = googleUser.getAuthResponse().id_token;
// 	  var access_token = gapi.auth.getToken();
		
	  console.log('id_token -> ' + id_token);
// 	  var access_token = googleUser.getAuthResponse().access_token;
//  	  console.log('access_token -> ' + access_token);
//  	 console.log('googleUser -> ' + googleUser);
//  	 alert(googleUser);
	  
	  // send the ID token to server with an HTTPS POST request:
	  var xhr = new XMLHttpRequest();
	  //xhr.open('POST', '${pageContext.request.contextPath}/web/tokeninfo', true);
	  xhr.open('POST', 'https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=' + id_token);
	  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	  xhr.onload = function() {
	    //서버 응답이 정상
	    if(xhr.status == 200) {
	    	console.log('ResponseFromServer: ' + xhr.responseText);
	    	//document.getElementById('status').innerHTML = xhr.responseText;
	    }
	  };
	  xhr.send('idtoken=' + id_token);  
}

  $('#signinButton').click(function() {
    // signInCallback defined in step 6.
      auth2.grantOfflineAccess({'redirect_uri': '${pageContext.request.contextPath}/web/oauth2callback'}).then(signInCallback);
//    auth2.grantOfflineAccess({'redirect_uri': 'postmessage'}).then(signInCallback);
// 	  alert("${pageContext.request.contextPath}/web/oauth2callback");	  
  });
    function start() {
      gapi.load('auth2', function() {
          //auth2 = gapi.auth2.init({
          auth2 = gapi.auth2.getAuthInstance({
          client_id: '189317412554-6aqqj32v97hfse86vf8qhdvhpo7c0p6i.apps.googleusercontent.com',
          // Scopes to request in addition to 'profile' and 'email'
          //fetch_basic_profile: true,
          scope: 'profile'
        });
        	
      }); 
    }
    
    function signInCallback(authResult) {
    	
    	if (authResult['code']) {
    		console.log(authResult);
    		
//     		var access_token = gapi.auth.getToken().accessToken;
//     		alert("access_token");
//     		console.log(access_token);
    		
        // Hide the sign-in button now that the user is authorized, for example:
        $('#signinButton').attr('style', 'display: none');

        // Send the code to the server
        $.ajax({
          type: 'POST',
          
          url: 'http://example.com/storeauthcode',
          //url: '${pageContext.request.contextPath}/web/oauth2callback',
          //url: 'http://localhost:8080/web/oauth2callback',
          //url: '${pageContext.request.contextPath}/j_spring_security_check',
          contentType: 'application/octet-stream; charset=utf-8',
          success: function(result) {
            // Handle or verify the server response.
            alert("signInCallback OUT result!");
            console.log('success : '+ result);
          },
          processData: false,
          data: authResult['code']
        });
      } else if (authResult['error']) {
    	  // There was an error.
    	  console.log('There was an error: ' + authResult['error']);
      }
    } 
//<!--------------------- google login script end ----------------------->