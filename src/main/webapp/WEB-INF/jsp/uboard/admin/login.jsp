<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!Doctype html>
<head>
	<title>onsure</title>
	<meta charset="utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
	<link rel="stylesheet" type="text/css" href="css/common.css" />	
	<script type="text/javascript" src="js/jquery-1.8.3.min.js"></script>		
	<script type="text/javascript" src="js/icheck.min.js"></script>	
	<script type="text/javascript" src="js/common.js"></script>
</head>
<body>
<div class="wrap1">
	<div class="wrap-login">
		<div class="login">
			<h2 class="tit-lock"><img src="img/tit_member.png" alt="관리자 로그인, 한화생명"></h2>
			<div class="box-login-1">
				<fieldset class="field-login">
					<legend class="screen-out">로그인</legend>
					<div>
						<input type="text" name="" id="" class="inp-id" placeholder="사번을 입력해주세요">
						<input type="text" name="" id="" class="inp-pw" placeholder="password">
					</div>
					<div class="box-chk">
						<input type="checkbox" name="" id="save"><label for="save" class="inp-chk">ID 저장</label>
					</div>
				</fieldset>						
			</div>
			<div class="box-btn-login">
				<button class="btn-login">Log-in</button>		
			</div>
		</div>
	</div>	
</div>
<script>
	$(window).load(function(){
		var h = $(window).height();
		$('.wrap-login').height(h);
	});
</script>
</body>
</html>