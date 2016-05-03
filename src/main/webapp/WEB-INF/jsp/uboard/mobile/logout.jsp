<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!Doctype html>
<head>
<script >
	function next()
		{location = "${pageContext.request.contextPath}/index.jsp";}
	</script>
	<title>UBoard-Logout</title>
	<meta charset='UTF-8' />
	<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/mobile/css/common.css" />
	<script type="text/javascript" src="${pageContext.request.contextPath}/mobile/js/jquery-1.11.3.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/mobile/js/common.js"></script>
	<meta name="apple-mobile-web-app-capable" content="yes" />
    <meta names="apple-mobile-web-app-status-bar-style" content="black-translucent" />
</head>
<body onLoad="setTimeout('next()', 1000)">
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
						 
						<fieldset class="field-login">
						<div>
								<h1>이용해 주셔서 감사합니다.<p>Log-in Page 로 이동합니다.</h1>
						</div>
						</fieldset>
			
					</div>
					
				</div>
			</div>
		</div>
	</section>
</body>
</html>
