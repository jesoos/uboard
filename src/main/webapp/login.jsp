<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="s" uri="http://www.springframework.org/security/tags"%>
<%
  /**
  * @Class Name : egovSampleList.jsp
  * @Description : Sample List 화면
  * @Modification Information
  *
  *   수정일         수정자                   수정내용
  *  -------    --------    ---------------------------
  *  2009.02.01            최초 생성
  *
  * author 실행환경 개발팀
  * since 2009.02.01
  *
  * Copyright (C) 2009 by MOPAS  All right reserved.
  */
%>
<!Doctype html>
<!-- The top of file index.html -->
<html itemscope itemtype="http://schema.org/Article" lang="ko">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:fb="http://www.facebook.com/2008/fbml">
<head>
  <!-- BEGIN Pre-requisites -->
  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script> 
  <script src="https://apis.google.com/js/client:platform.js?onload=start" async defer></script>
  <!-- END Pre-requisites -->
 	<title>UBoard</title>
	<meta charset="utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
	<meta name="google-signin-scope" content="profile email">
	<meta name="google-signin-client_id" content="189317412554-6aqqj32v97hfse86vf8qhdvhpo7c0p6i.apps.googleusercontent.com">
	<script src="https://apis.google.com/js/platform.js" async defer></script>
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/common.css" />
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery-1.8.3.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/icheck.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/common.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/oauthApi.js"></script>
	
<%-- 	<script type="text/javascript" src="${pageContext.request.contextPath}/js/angular-1.4.8.min.js"></script> --%>
<%--  	<script type="text/javascript" src="${pageContext.request.contextPath}/js/ng-module.js"></script> --%>
<%--  	<script type="text/javascript" src="${pageContext.request.contextPath}/js/ng-ctrl.js"></script> --%>
	
<!-- 	<meta name="apple-mobile-web-app-capable" content="yes" /> -->
<!--     <meta names="apple-mobile-web-app-status-bar-style" content="black-translucent" /> -->
	<!--  favicon favilite -->
    <link rel="shortcut icon" href="${pageContext.request.contextPath}/img/icon_180.png">
    <link rel="shortcut icon" type="image/x-icon" href="${pageContext.request.contextPath}/img/Android_02.png">
	<link rel="apple-touch-icon-precomposed" href="${pageContext.request.contextPath}/img/iOS_02.png" />
	<link rel="apple-touch-icon-precomposed" sizes="72x72" href="${pageContext.request.contextPath}/img/iOS_02.png" />
	<link rel="apple-touch-icon-precomposed" sizes="76x76" href="${pageContext.request.contextPath}/img/apple-touch-icon-76x76.png" />
	<link rel="apple-touch-icon-precomposed" sizes="152x152" href="${pageContext.request.contextPath}/img/apple-touch-icon-152x152.png" />
	<link rel="apple-touch-icon-precomposed" sizes="167x167" href="${pageContext.request.contextPath}/img/apple-touch-icon-167x167.png" />
	<!--  //favicon favilite -->
</head>
	<script>var ctx = "${pageContext.request.contextPath}"
			function getContextPath(){
	 		   return ctx;
			}
	</script>
<body>
<form id="loginfrm" name="loginfrm" action="<c:url value='${pageContext.request.contextPath}/j_spring_security_check'/>" method="post">
<div class="wrap1" id="wrap1">
	<div class="header">
		<h1><img src="${pageContext.request.contextPath}/img/tit_condition1.png" alt="프로젝트 추진 현황"></h1>
	</div>
	<div class="wrap-login">
		<div class="login">
			<div class="box-login-1">
				<h2 class="tit-lock"><img src="${pageContext.request.contextPath}/img/tit_member.png" alt="member login"></h2>
				<fieldset class="field-login">
					<legend class="screen-out">로그인</legend>
					<div>
						<input type="text" name="loginid" id="loginid" class="inp-id" placeholder="ID를 입력해주세요" style="display:none;">
						<input type="password" name="loginpwd" id="loginpwd" class="inp-pw" placeholder="password" style="display:none;">
						<input type="text" name="loginRedirect" value=""  style="display:none;">
						<div style="display:none;">
							<input type="checkbox" id="remember_me" name="_spring_security_remember_me"/>Remember me
						</div>
					</div>
					<c:if test="${not empty param.fail}">
			        <div>
			                <font color="red">
								<s:authentication var = "user" property="principal"/>
								${user.nickName} (${user.loginId}) 님! 안녕하세요.
<%-- 			                <p>로그인 오류 : ${sessionScope["SPRING_SECURITY_LAST_EXCEPTION"].message}</p> --%>
			                <p>로그인 오류 : 사용자 등록 여부를 확인 바랍니다.</p>
			                </font>
			                <c:remove scope="session" var="SPRING_SECURITY_LAST_EXCEPTION"/>
					</div>
					</c:if>
<!-- 					<div class="box-chk"> -->
<!-- 						<input type="checkbox" name="idSaveCheck" id="idSaveCheck"><label for="idSaveCheck" class="inp-chk">ID 저장</label> -->
<!-- 					</div> -->
					
				</fieldset>
			</div>
			<div class="box-btn-login" style="display:none;">
				<button class="btn-login">Log-in</button>
			</div>
			
			<div class="box-btn-login">
			<!-- 
			<a href="javascript:alert('Comming Soon');"><img class="btn-google-login" src="${pageContext.request.contextPath}/img/btn_google_signin_dark_normal_web@2x.png" alt="Sign in with Google"></a>
			-->
			<!-- 
			  Below we include the Login Button social plugin. This button uses
			  the JavaScript SDK to present a graphical Login button that triggers
			  the FB.login() function when clicked.
			-->
			<!-- Facebook API 호출 버튼 -->			
<!-- 			<fb:login-button scope="public_profile,email" onlogin="checkLoginState();"> -->
<!-- 			</fb:login-button> -->
			<div class="fb-login-button" data-max-rows="1" data-size="xlarge" data-show-faces="false" data-auto-logout-link="false" scope="public_profile,email" onlogin="checkLoginState();"></div>	
			<div id="status"></div>
<!-- 			<div id="fb-root"></div> -->
			</div>
			
			<!-- Google API 호출 버튼1 -->
<!-- 			<div class="g-signin2" data-onsuccess="onSignIn" data-theme="dark"></div> -->
			
			<!-- Add where you want your sign-in button to render -->
			<!-- Use an image that follows the branding guidelines in a real app -->
			<!-- Google API 호출 버튼2 -->
<!-- 			<button id="signinButton">Sign in with Google</button> -->	
		</div>
	</div>
</div>
</form>
<script>
	$(window).load(function(){
		var h = $(window).height() - 80;
		$('.wrap-login').height(h);
	});
	$('.inp-id').css('display','');
	$('.inp-pw').css('display','');
	$('.box-btn-login').css('display','');
</script>
</body>
</html>
