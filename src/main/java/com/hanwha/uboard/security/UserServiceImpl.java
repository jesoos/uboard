package com.hanwha.uboard.security;

import java.util.Arrays;
import java.util.Collection;
import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.hanwha.uboard.module.service.EgovSampleService;
import com.hanwha.uboard.module.service.SampleVO;
import com.hanwha.uboard.module.web.UboardAdminController;
import com.restfb.*;
import com.restfb.DefaultFacebookClient;
import com.restfb.FacebookClient;
import com.restfb.Version;

import egovframework.rte.fdl.cmmn.exception.EgovBizException;

public class UserServiceImpl implements UserDetailsService {
	/** EgovSampleService */
	@Resource(name = "sampleService")
	private EgovSampleService sampleService;
	public static Version FB_VERSION = Version.VERSION_2_5;

	private static final Logger LOGGER = LoggerFactory.getLogger(UboardAdminController.class);	
	
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		LOGGER.debug("UserServiceImpl loadUserByUsername (Start) ----------------------------------------- ");
		
		String data = username;
		String[] str = new String(data).split("&accessToken=");
		
		String inputUserCode = str[0];
		String inputAccessToken = 1 < str.length ? str[1] : "";
		String vFbID = "";
		
		LOGGER.debug("inputUserCode : " + inputUserCode);
		LOGGER.debug("inputAccessToken : " + inputAccessToken);
		
		SampleVO searchVO = new SampleVO();
		SampleVO selectUser = null;
		try {
			// hanwha TV 전용 계정 예외처리 
			if(inputUserCode.equals("uboard25@gmail.com")) {
//				if(inputUserCode.equals("uboard25@gmail.com")  && inputAccessToken.equals(selectUser.getAccessToken())) {
				// Client 에서 FB 로그인 후 받은 AccessToken 과 
				// DB 에 저장된 AccessToken 이 같은 경우에는 FB 에 다시 다녀오지 않기 때문에 FB API 에서 오류가 발생이됨 (FB API 로 확인할 필요 없이 id/pass 확인하는 방식으로 처리하기 위함)
			}else if (inputAccessToken.equals("")) {
				// Remember Me 로 들어올 경우 (&accessToken 은 없음, FB API 로 확인할 필요 없이 id/pass 확인하는 방식으로 처리하기 위함)
			}else{
				FacebookClient facebookClient = new DefaultFacebookClient(inputAccessToken, FB_VERSION);
				com.restfb.types.User fbUser = facebookClient.fetchObject("me", com.restfb.types.User.class, Parameter.with("fields", "email"));
	
				LOGGER.debug("FaceBook id :" + fbUser.getId());
				LOGGER.debug("FaceBook email:" + fbUser.getEmail());
				inputUserCode = fbUser.getEmail();
				vFbID = fbUser.getId();
			}

			// Server 에서 FB API 를 통해 받은 FaceBook email 사용 (그외에는 예외처리)
			searchVO.setUserCode(inputUserCode);
			selectUser = sampleService.selectUser(searchVO);
			
			if(vFbID != "") {
				selectUser.setFbID(vFbID);	
			}
			
			if(inputAccessToken != "") {
				selectUser.setAccessToken(inputAccessToken);
			}
			selectUser.setLoginDate("NOW");
			sampleService.updateUser(selectUser);
		} catch (EgovBizException e) { // 없으면 에러가 발생이 되고 로그인이 안됨 
			LOGGER.error("Facebook 로그인 계정이 등록되어있지 않습니다.");
			e.getMessageParameters();
			
		} catch (Exception e) {  // 없으면 에러가 발생이 되지만 로그인은 됨  
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
				
//		LOGGER.debug("searchVO : " + searchVO);
		LOGGER.debug("selectUser.getUserName() : " + selectUser.getUserName());
//		LOGGER.debug("selectUser.getUserEmail() : " + selectUser.getUserEmail());
//		LOGGER.debug("selectUser.getAccessToken() : " + selectUser.getAccessToken());
//		LOGGER.debug("selectUser. : " + selectUser);
		
//		String UserName = selectUser.getUserName();
		String UserName = inputUserCode;
		String AccessToken = selectUser.getAccessToken();
		
		GrantedAuthority a[] = {(GrantedAuthority) new SimpleGrantedAuthority("ROLE_USER") , (GrantedAuthority) new SimpleGrantedAuthority(inputUserCode)};
		
		Collection<GrantedAuthority> authorities = Arrays
//				.asList((GrantedAuthority) new SimpleGrantedAuthority("ROLE_USER"));
		.asList(a);
//		authorities.add((GrantedAuthority) new SimpleGrantedAuthority("ROLE_USER"));
//		UserDetails userDetails = new User("spring", "framework", true, false, false, false, authorities);
		LOGGER.debug("UserDetails-username : " + UserName);
		LOGGER.debug("UserDetails-password : " + AccessToken);
		UserDetails userDetails = new User(UserName, AccessToken, true, true, true, true, authorities);
		LOGGER.debug("UserServiceImpl loadUserByUsername (End) ----------------------------------------- ");		
		return userDetails;
	}
}