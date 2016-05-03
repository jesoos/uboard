<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="s" uri="http://www.springframework.org/security/tags" %>

<!Doctype html>
<html lang="ko">
<head>
	<title>UBoard</title>
	<meta charset='UTF-8' />
	<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/mobile/css/common.css" />
	<script src="${pageContext.request.contextPath}/mobile/js/jquery-1.11.3.min.js"></script>
	<script src="${pageContext.request.contextPath}/mobile/js/common.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/oauthApi.js"></script>
<!-- 	<meta name="apple-mobile-web-app-capable" content="yes" /> -->
<!--     <meta names="apple-mobile-web-app-status-bar-style" content="black-translucent" /> -->
<%-- 	<link rel="apple-touch-icon" href="${pageContext.request.contextPath}/img/icon_180.png"> --%>
<%-- 	<link rel="shortcut icon" href="${pageContext.request.contextPath}/img/icon_180.png"> --%>

<%-- 	<link rel="apple-touch-icon-precomposed"  href="${pageContext.request.contextPath}/img/iOS_02.png" /> --%>
<%-- 	<link rel="apple-touch-icon-precomposed" sizes="114x114" href="${pageContext.request.contextPath}/img/iOS_02.png" /> --%>
<%-- 	<link rel="shortcut icon" type="image/x-icon" href="${pageContext.request.contextPath}/img/Android_02.png"> --%>
	
	<!--  favicon favilite -->
    <link rel="shortcut icon" href="${pageContext.request.contextPath}/img/icon_180.png">
    <link rel="shortcut icon" type="image/x-icon" href="${pageContext.request.contextPath}/img/Android_02.png">
	<link rel="apple-touch-icon-precomposed" href="${pageContext.request.contextPath}/img/iOS_02.png" />
	<link rel="apple-touch-icon-precomposed" sizes="72x72" href="${pageContext.request.contextPath}/img/iOS_02.png" />
	<link rel="apple-touch-icon-precomposed" sizes="120x120" href="${pageContext.request.contextPath}/img/apple-touch-icon-120x120.png" />
	<link rel="apple-touch-icon-precomposed" sizes="180x180" href="${pageContext.request.contextPath}/img/apple-touch-icon-180x180.png" />
	<!--  //favicon favilite -->
	
</head>
<body>
<form id="loginfrm" name="loginfrm" action="<c:url value='/mobile/spring_login'/>" method="post">
	<section class="wrap1">
		<!-- 타이틀 -->
		<header class="header">
			<div class="box-header2">
				<h1 class="tit-h1"><img src="${pageContext.request.contextPath}/mobile/img/tit_header.png" alt=""></h1>
			</div>
		</header>
		<!-- //타이틀 -->
		<div class="wrap-con1">
			<div class="wrap-login">
				<div class="box-login">
					<div class="box-login-1">
						<h2 class="tit-lock"><img src="${pageContext.request.contextPath}/mobile/img/lock.png" alt=""></h2>
						<fieldset class="field-login">
							<legend class="screen-out">로그인</legend>
							<div>
								<input type="text" name="loginid" id="loginid" class="inp-id" placeholder="ID를 입력해주세요" style="display:none;">
								<input type="password" name="loginpwd" id="loginpwd" class="inp-pw" placeholder="password" style="display:none;">
								<div style="display:none;">
									<input type="checkbox" id="remember_me" name="_spring_security_remember_me"/>Remember me
								</div>
							</div>
							<c:if test="${not empty param.fail}">
					        <div>
					                <font color="red">
<%-- 					                <p>로그인 오류 : ${sessionScope["SPRING_SECURITY_LAST_EXCEPTION"].message}</p> --%>
					                <p>로그인 오류 : 사용자 등록 여부를 확인 바랍니다.</p>
					                </font>
					                <c:remove scope="session" var="SPRING_SECURITY_LAST_EXCEPTION"/>
							</div>
					    	</c:if>						
<!-- 							<div class="box-chk"> -->
<!-- 								<input type="checkbox" name="idSaveCheck" id="idSaveCheck"><label for="idSaveCheck" class="inp-chk">ID 저장</label> -->
<!-- 							</div> -->
						</fieldset>
					</div>
<!-- 					<div class="box-btn-login"> -->
<!-- 						<button class="btn-login">Log-in</button> -->
<!-- 					</div> -->
					<div class="box-btn-login" align="center">
<%-- 						<a href="javascript:alert('Comming Soon');"><img class="btn-google-login" src="${pageContext.request.contextPath}/img/btn_google_signin_dark_normal_web.png" alt="Sign in with Google"></a> --%>
			<!-- 
			  Below we include the Login Button social plugin. This button uses
			  the JavaScript SDK to present a graphical Login button that triggers
			  the FB.login() function when clicked.
			-->
					<!-- Facebook API 호출 버튼 -->			
					<fb:login-button scope="public_profile,email" onlogin="checkLoginState();">
					</fb:login-button>
					<div id="status"></div>
					</div>
				</div>
			</div>
		</div>
	</section>
</form>
</body>
</html>
