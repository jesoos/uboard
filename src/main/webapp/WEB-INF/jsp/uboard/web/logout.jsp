<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!Doctype html>
<head>
	<script >
	function next()
		{location = "${pageContext.request.contextPath}/index.jsp";}
	</script>
	<title>UBoard-Logout</title>
	<meta charset="utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/common.css" />	
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery-1.8.3.min.js"></script>		
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/icheck.min.js"></script>	
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/common.js"></script>
</head>
<body onLoad="setTimeout('next()', 2000)">
<div class="wrap1">
	<div class="header">
		<h1><img src="${pageContext.request.contextPath}/img/tit_condition1.png" alt="프로젝트 추진 현황"></h1>
	</div>
	<div class="wrap-login">
		<div class="login">
			<div class="box-login-1">
				<fieldset class="field-login">
					<legend class="screen-out">로그아웃</legend>
					<div>
								<h1>이용해 주셔서 감사합니다.<p>Log-in Page 로 이동합니다.</h1>
					</div>
					<div class="box-chk">
					</div>
	<a href="${pageContext.request.contextPath}/index.jsp">로그인</a>
				</fieldset>
			</div>
		</div>
	</div>
</div>
<script>
	$(window).load(function(){
		var h = $(window).height() - 80;
		$('.wrap-login').height(h);
	});
</script>
</body>
</html>
