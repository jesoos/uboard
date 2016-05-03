package com.hanwha.uboard.module.web;

import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springmodules.validation.commons.DefaultBeanValidator;

import com.hanwha.uboard.module.service.EgovSampleService;
import com.hanwha.uboard.module.service.SampleVO;

import egovframework.rte.fdl.property.EgovPropertyService;


@Controller
@SessionAttributes(types = SampleVO.class)
public class UboardTVController {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(UboardTVController.class);

	/** EgovSampleService */
	@Resource(name = "sampleService")
	private EgovSampleService sampleService;

	/** EgovPropertyService */
	@Resource(name = "propertiesService")
	protected EgovPropertyService propertiesService;

	/** Validator */
	@Resource(name = "beanValidator")
	protected DefaultBeanValidator beanValidator;

	@RequestMapping("/tv")
	public String tv1(@RequestParam Map<String, Object> paramMap, ModelMap model) throws Throwable{
		LOGGER.debug("tv Start ");
		return "redirect:/tv/mainViewB1.do";
	}
		
	@RequestMapping("/tv/mainViewB1.do")
	public String mainViewB1(@RequestParam Map<String, Object> paramMap, ModelMap model) throws Throwable{
		return "/tv/mainViewB1";
	}

	@RequestMapping("/tv/mainViewB2.do")
	public String mainViewB2(@RequestParam Map<String, Object> paramMap, ModelMap model) throws Throwable{
		return "/tv/mainViewB2";
	}
	@RequestMapping("/tv/mainViewB3.do")
	public String mainViewB3(@RequestParam Map<String, Object> paramMap, ModelMap model) throws Throwable{
		return "/tv/mainViewB3";
	}
	@RequestMapping("/tv/mainViewB4.do")
	public String mainViewB4(@RequestParam Map<String, Object> paramMap, ModelMap model) throws Throwable{
		return "/tv/mainViewB4";
	}
}
