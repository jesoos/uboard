package com.hanwha.uboard.module.web;

import java.security.Principal;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springmodules.validation.commons.DefaultBeanValidator;

import com.hanwha.uboard.module.service.EgovSampleService;
import com.hanwha.uboard.module.service.SampleDefaultVO;
import com.hanwha.uboard.module.service.SampleVO;

import egovframework.rte.fdl.property.EgovPropertyService;


@Controller
@SessionAttributes(types = SampleVO.class)
public class UboardMobileController {

	/** EgovSampleService */
	@Resource(name = "sampleService")
	private EgovSampleService sampleService;

	/** EgovPropertyService */
	@Resource(name = "propertiesService")
	protected EgovPropertyService propertiesService;

	/** Validator */
	@Resource(name = "beanValidator")
	protected DefaultBeanValidator beanValidator;

	/**
	 * 글 목록을 조회한다. (pageing)
	 * @param searchVO - 조회할 정보가 담긴 SampleDefaultVO
	 * @param model
	 * @return "/sample/egovSampleList"
	 * @exception Exception
	 */
	@RequestMapping(value = "/mobile/mainView.do")
	public String mainView(@ModelAttribute("searchVO") SampleDefaultVO searchVO, ModelMap model) throws Exception {		
		return "/mobile/mainView";
	}
	
	@RequestMapping(value = "/mobile/login.do")
	public String login(@RequestParam Map<String, Object> paramMap, ModelMap model) throws Throwable{
		return "/mobile/login";
	}
	
	@RequestMapping("/mobile/loginFail.do")
	public String loginFail(@RequestParam Map<String, Object> paramMap, ModelMap model) throws Throwable{
		return "/mobile/loginFail";
	}
	
	@RequestMapping("/mobile/main.do")
	public String main(@RequestParam Map<String, Object> paramMap, ModelMap model ,Principal principal) 
			throws Throwable{
		
		//로그인 후 로그인 한 아이디를  가지고 온다.
		String name = principal.getName();
		
		model.addAttribute("username", name);
		return "/mobile/main";
		
	}
	
	@RequestMapping("/mobile/logout.do")
	public String logout(@RequestParam Map<String, Object> paramMap, ModelMap model) throws Throwable{
		return "/mobile/logout";
	}
	@RequestMapping("/mobile/login_old.do")
	public String login_old(@RequestParam Map<String, Object> paramMap, ModelMap model) throws Throwable{
		return "/mobile/login_old";		
	}
}
