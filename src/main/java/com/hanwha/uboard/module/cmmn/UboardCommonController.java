package com.hanwha.uboard.module.cmmn;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;
import org.springmodules.validation.commons.DefaultBeanValidator;

import com.hanwha.uboard.module.service.EgovSampleService;
import com.hanwha.uboard.module.service.SampleDefaultVO;
import com.hanwha.uboard.module.service.SampleVO;

import egovframework.rte.fdl.property.EgovPropertyService;

@Controller
@SessionAttributes(types = SampleVO.class)
public class UboardCommonController {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(UboardCommonController.class);

	/** EgovSampleService */
	@Resource(name = "sampleService")
	private EgovSampleService sampleService;

	/** EgovPropertyService */
	@Resource(name = "propertiesService")
	protected EgovPropertyService propertiesService;

	/** Validator */
	@Resource(name = "beanValidator")
	protected DefaultBeanValidator beanValidator;

	@RequestMapping("/web/deleteNotification")
	public String deletenotification(SampleVO sampleVO, @ModelAttribute("searchVO") SampleDefaultVO searchVO,
			SessionStatus status) throws Exception {
		
		LOGGER.debug("Delete idNotification : " + searchVO.getIdNotification());

		sampleService.deleteNotification(sampleVO);
		status.setComplete();
		return "/web/deletenotification";
	}
}
