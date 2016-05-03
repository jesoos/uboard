package com.hanwha.uboard.module.web;

import java.security.Principal;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;
import org.springmodules.validation.commons.DefaultBeanValidator;

import com.hanwha.uboard.module.service.EgovSampleService;
import com.hanwha.uboard.module.service.SampleDefaultVO;
import com.hanwha.uboard.module.service.SampleVO;
import com.hanwha.uboard.service.Partner;
import com.hanwha.uboard.service.PartnerList;

import egovframework.rte.fdl.property.EgovPropertyService;


@Controller
@SessionAttributes(types = SampleVO.class)
public class UboardAdminController {

	private static final Logger LOGGER = LoggerFactory.getLogger(UboardAdminController.class);
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
	@RequestMapping(value = "/admin/mainView.do")
	public String mainView(@ModelAttribute("searchVO") SampleDefaultVO searchVO, ModelMap model) throws Exception {
		return "/admin/mainView";
	}
	
	@RequestMapping(value = "/admin/login.do")
	public String login(@RequestParam Map<String, Object> paramMap, ModelMap model) throws Throwable{
		return "/admin/login";
		
	}
	
	@RequestMapping("/admin/loginFail.do")
	public String loginFail(@RequestParam Map<String, Object> paramMap, ModelMap model) throws Throwable{
		return "/admin/loginFail";
	}

	@RequestMapping(value = "/admin/unitRegister.do")
	public String unitRegister(@RequestParam Map<String, Object> paramMap, ModelMap model) throws Throwable{
		paramMap.get("idUnit");
		model.addAttribute("idUnit");
		return "/admin/unitRegister";
		
	}
	
	
	/**
	 * task 글을 등록한다.
	 * @param sampleVO - 등록할 정보가 담긴 VO
	 * @param searchVO - 목록 조회조건 정보가 담긴 VO
	 * @param status
	 * @return "/admin/unitRegister"
	 * @exception Exception
	 */
	@RequestMapping(value = "/admin/inserttask")
	public String taskRegister(SampleVO sampleVO,
			BindingResult bindingResult, Model model, SessionStatus status, @ModelAttribute("partnerList") PartnerList partnerList)
			throws Exception {
//		LOGGER.debug("register addTask..");
		sampleService.insertTask(sampleVO);
		sampleService.insertReport(sampleVO);
		
		/* 담당자 대표 상태 Update */
		SampleVO userVO = new SampleVO();
		userVO.setIdUser(Integer.parseInt(sampleVO.getFirstPartnerIdUser()));
		userVO.setUserCode(sampleVO.getFirstPartnerUserCode());

		userVO.setUserStateCode(sampleVO.getFirstPartnerStateCode());
		userVO.setUserStateFrom(sampleVO.getFirstPartnerStateFrom()); 
		userVO.setUserStateTo(sampleVO.getFirstPartnerStateTo());
		userVO.setUserStateTime(sampleVO.getFirstPartnerStateTime());
		sampleService.updateUserState(userVO);
		/* //담당자 대표 상태 Update */

		/* 기존 Partner 삭제 */
//		sampleVO.setIdUnitPartner(-9999);
//		sampleService.deleteUnitPartner(sampleVO);
		/* //기존 Partner 삭제 */

		/* 담당자 대표 등록 */
		sampleVO.setUserCode(sampleVO.getFirstPartnerUserCode());
		sampleVO.setRepYn("Y");
		sampleService.insertTaskPartner(sampleVO);
		/*//담당자 대표 등록 */

		/* 선택한 Partnerlist 등록 */
		if(partnerList.getPartnerList() != null) {
			for(Partner partner : partnerList.getPartnerList()) {
				sampleVO.setUserCode(partner.getUserCode());
				sampleVO.setRepYn("N");
				sampleService.insertTaskPartner(sampleVO);
		    }
		}
		/* //선택한 Partnerlist 등록 */
		status.setComplete();
		return "/admin/unitRegister";
	}
	
	@RequestMapping(value = "/admin/updatetask")
	public String updateTask(SampleVO sampleVO,
			BindingResult bindingResult, Model model, SessionStatus status, @ModelAttribute("partnerList") PartnerList partnerList)
			throws Exception {
		// Server-Side Validation
//		LOGGER.debug("update idTask : " + searchVO.getIdTask());
//		beanValidator.validate(sampleVO, bindingResult);
		
		sampleService.updateTask(sampleVO);
		sampleService.updateReport(sampleVO);

		/* 담당자 대표 상태 Update */
		SampleVO userVO = new SampleVO();
		userVO.setIdUser(Integer.parseInt(sampleVO.getFirstPartnerIdUser()));
		userVO.setUserCode(sampleVO.getFirstPartnerUserCode());

		userVO.setUserStateCode(sampleVO.getFirstPartnerStateCode());
		userVO.setUserStateFrom(sampleVO.getFirstPartnerStateFrom()); 
		userVO.setUserStateTo(sampleVO.getFirstPartnerStateTo());
		userVO.setUserStateTime(sampleVO.getFirstPartnerStateTime());
		sampleService.updateUserState(userVO);
		/* //담당자 대표 상태 Update */

		/* 기존 Partner 삭제 */
		sampleVO.setIdTaskPartner(-9999);
		sampleService.deleteTaskPartner(sampleVO);
		/* //기존 Partner 삭제 */

		/* 담당자 대표 등록 */
		sampleVO.setUserCode(sampleVO.getFirstPartnerUserCode());
		sampleVO.setRepYn("Y");
		sampleService.insertTaskPartner(sampleVO);
		/*//담당자 대표 등록 */

		/* 선택한 Partnerlist 등록 */
		if(partnerList.getPartnerList() != null) {
			for(Partner partner : partnerList.getPartnerList()) {
				sampleVO.setUserCode(partner.getUserCode());
				sampleVO.setRepYn("N");
				sampleService.insertTaskPartner(sampleVO);
		    }
		}
		/* //선택한 Partnerlist 등록 */
		status.setComplete();
		return "/admin/unitRegister";
		
	}	
	
	/**
	 * user 조회한다.
	 * @param sampleVO - 조회할 정보가 담긴 VO
	 * @param searchVO - 목록 조회조건 정보가 담긴 VO
	 * @param status
	 * @return @ModelAttribute("sampleVO") - 조회한 정보
	 * @exception Exception
	 */
	@RequestMapping(value = "/admin/selectuser")
	public @ModelAttribute("sampleVO")
	SampleVO selectUser(SampleVO sampleVO, Authentication auth) throws Exception {
		if (sampleVO.getUserCode().equals("loginUserDetails")) {
			sampleVO.setUserCode(auth.getName());
			
			String vUserCode = auth.getName();
			SampleVO userVO = new SampleVO();
			userVO.setUserCode(vUserCode);
			String vUnitAuthorities = "";
			
			SampleVO selectUser = sampleService.selectUser(userVO);
			if (!selectUser.getUnitAuthorities().equals("")) {
				vUnitAuthorities = selectUser.getUnitAuthorities();
			}else{
				SampleVO selectUnitAuthorityVO = new SampleVO();
				selectUnitAuthorityVO.setUserCode(vUserCode);
				SampleVO selectUnitAuthority = sampleService.selectUnitAuthority(selectUnitAuthorityVO);
				int intUnitAuthorities = Integer.parseInt(selectUnitAuthority.getUnitAuthorities());
				vUnitAuthorities = intUnitAuthorities == 1 ? "LEADER" : (intUnitAuthorities == 2 ? "CAPTAIN" :"MEMBER") ;
			}	
			selectUser.setUnitAuthorities(vUnitAuthorities);
			return selectUser;
		}
		return sampleService.selectUser(sampleVO);
	}

	/**
	 * user 등록한다.
	 * @param sampleVO - 등록할 정보가 담긴 VO
	 * @param searchVO - 목록 조회조건 정보가 담긴 VO
	 * @param status
	 * @return "/admin/unitRegister"
	 * @exception Exception
	 */
	@RequestMapping(value = "/admin/insertuser")
	public String userRegister(SampleVO sampleVO, @ModelAttribute("searchVO") SampleDefaultVO searchVO, 
			BindingResult bindingResult, Model model, SessionStatus status)
			throws Exception {
		
		LOGGER.debug("register adduser..");	
		
		/*// Server-Side Validation
		beanValidator.validate(sampleVO, bindingResult);

		if (bindingResult.hasErrors()) {
			LOGGER.debug("register adduser hasErrors..");
			model.addAttribute("sampleVO", sampleVO);
			return "/sample/egovSampleRegister";
			//return "/admin/unitRegister";
		}
*/			
		
		//insertSample change to insertUser(sampleVO)		
		sampleService.insertUser(sampleVO);
		status.setComplete();
		return "/admin/unitRegister";
	}
	
	/**
	 * User 수정한다.
	 * @param sampleVO - 수정할 정보가 담긴 VO
	 * @param searchVO - 목록 조회조건 정보가 담긴 VO
	 * @param status
	 * @return "/admin/unitRegister"
	 * @exception Exception
	 */
	@RequestMapping(value = "/admin/updateuser")
	public String updateUser(SampleVO sampleVO, @ModelAttribute("searchVO") SampleDefaultVO searchVO, 
			BindingResult bindingResult, Model model, SessionStatus status)
			throws Exception {

		LOGGER.debug("update idUser : " + searchVO.getIdUser());

		// Server-Side Validation
//		beanValidator.validate(sampleVO, bindingResult);

//		if (bindingResult.hasErrors()) {
//			LOGGER.debug("Error");
//			model.addAttribute("sampleVO", sampleVO);
//			return "/admin/insertjson"; 
//		}

		sampleService.updateUser(sampleVO);
		status.setComplete();
		return "/admin/unitRegister";
	}	
	
	/**
	 * User 삭제한다.
	 * @param sampleVO - 삭제할 정보가 담긴 VO
	 * @param searchVO - 목록 조회조건 정보가 담긴 VO
	 * @param status
	 * @return "/admin/unitRegister"
	 * @exception Exception
	 */
	@RequestMapping("/admin/deleteuser")
	public String deleteUser(SampleVO sampleVO, @ModelAttribute("searchVO") SampleDefaultVO searchVO,
			SessionStatus status) throws Exception {
		
		LOGGER.debug("Delete idUser : " + searchVO.getIdUser());

		sampleService.deleteUser(sampleVO);
		status.setComplete();
		return "/admin/unitRegister";
	}
	
	@RequestMapping("/admin/main.do")
	public String main(@RequestParam Map<String, Object> paramMap, ModelMap model ,Principal principal) 
			throws Throwable{
		
		//로그인 후 로그인 한 아이디를  가지고 온다.
		String name = principal.getName();
		
		model.addAttribute("username", name);
		return "/admin/main";
		
	}
	
	@RequestMapping("/admin/logout.do")
	public String logout(@RequestParam Map<String, Object> paramMap, ModelMap model) throws Throwable{
		return "/admin/logout";
	}
	@RequestMapping("/admin/login_old.do")
	public String login_old(@RequestParam Map<String, Object> paramMap, ModelMap model) throws Throwable{
		return "/admin/login_old";		
	}
		
	@RequestMapping("/admin/userjson")
	public String testAjax2(@ModelAttribute("searchVO") SampleDefaultVO searchVO, ModelMap model) throws Exception {

//		searchVO.setSearchKeyword(URLDecoder.decode(searchVO.getSearchKeyword()));
						
		List<?> userList = sampleService.selectUserList(searchVO);

		model.addAttribute("userList", userList);
		

//		int totCnt = sampleService.selectSampleListTotCnt(searchVO);
//		paginationInfo.setTotalRecordCount(totCnt);
//		model.addAttribute("paginationInfo", paginationInfo);
				
		return "/admin/userjson";
	}
	
	@RequestMapping("/admin/adminuserjson")
	public String adminUserAjax(@ModelAttribute("searchVO") SampleDefaultVO searchVO, ModelMap model) throws Exception {

//		searchVO.setSearchKeyword(URLDecoder.decode(searchVO.getSearchKeyword()));
						
		List<?> adminUserList = sampleService.selectAdminUserList(searchVO);
		model.addAttribute("AdminUserList", adminUserList);
//		LOGGER.debug("adminUserList -> " + adminUserList);
				
		return "/admin/adminuserjson";
	}


	
	/**
	 * 글 등록 화면을 조회한다.
	 * @param searchVO - 목록 조회조건 정보가 담긴 VO
	 * @param model
	 * @return "/sample/egovSampleRegister"
	 * @exception Exception
	 */
//	@RequestMapping("/admin/unitRegister.do")
//	public String unitRegisterView(@ModelAttribute("searchVO") SampleDefaultVO searchVO, Model model) throws Exception {
//		model.addAttribute("sampleVO", new SampleVO());
//		return "/admin/unitRegister.do";
//	}

	
	/**
	 * 글을 등록한다.
	 * @param sampleVO - 등록할 정보가 담긴 VO
	 * @param searchVO - 목록 조회조건 정보가 담긴 VO
	 * @param status
	 * @return "forward:/sample/egovSampleList.do"
	 * @exception Exception
	 */
	@RequestMapping(value = "/admin/insertjson")
	public String insertUnit(SampleVO sampleVO,
			BindingResult bindingResult, Model model, SessionStatus status, @ModelAttribute("partnerList") PartnerList partnerList, Authentication auth)
			throws Exception {
		String vUserCode = auth.getName();
		sampleVO.setRegUser(vUserCode);
		sampleVO.setUpdatedUser(vUserCode);
		int idUnit = sampleService.insertUnit(sampleVO);
		sampleVO.setUnitCode(String.valueOf(idUnit));
		
		/* 리더 상태 Update */
		SampleVO userVO = new SampleVO();
		userVO.setIdUser(Integer.parseInt(sampleVO.getLeaderIdUser()));
		userVO.setUserCode(sampleVO.getLeaderCode());

		userVO.setUserStateCode(sampleVO.getLeaderStateCode());
		userVO.setUserStateFrom(sampleVO.getLeaderStateFrom()); 
		userVO.setUserStateTo(sampleVO.getLeaderStateTo());
		userVO.setUserStateTime(sampleVO.getLeaderStateTime());
		sampleService.updateUserState(userVO);
		/* //리더 상태 Update */
		
		/* 캡틴 상태 Update */
		userVO.setIdUser(Integer.parseInt(sampleVO.getCaptainIdUser()));
		userVO.setUserCode(sampleVO.getCaptainCode());

		userVO.setUserStateCode(sampleVO.getCaptainStateCode());
		userVO.setUserStateFrom(sampleVO.getCaptainStateFrom());
		userVO.setUserStateTo(sampleVO.getCaptainStateTo());
		userVO.setUserStateTime(sampleVO.getCaptainStateTime());
		sampleService.updateUserState(userVO);
		/* //캡틴 상태 Update */
		
		/* 기존 Partner 삭제 */
//		sampleVO.setIdUnitPartner(-9999);
//		sampleService.deleteUnitPartner(sampleVO);
		/* //기존 Partner 삭제 */
		
		/* 선택한 Partnerlist 등록 */
		if(partnerList.getPartnerList() != null) {
			for(Partner partner : partnerList.getPartnerList()) {
				sampleVO.setUserCode(partner.getUserCode());
				sampleVO.setTypeCode("M");
				sampleService.insertUnitPartner(sampleVO);
		    }
		}
		/* //선택한 Partnerlist 등록 */
		
//		LOGGER.debug("IdUnit : " + searchVO.getIdUnit());
//		System.out.println(sampleVO);
//		if (bindingResult.hasErrors()) {
//			LOGGER.debug("Error");
//			model.addAttribute("sampleVO", sampleVO);
//			return "/admin/insertjson"; 
//		}
		
		status.setComplete();
//		return "redirect:/admin/unitRegister.do?idUnit="+sampleVO.getIdUnit();
		return "/admin/unitRegister";
	}
	
	@RequestMapping(value = "/admin/updatejson")
	public String updateUnit(SampleVO sampleVO,
			BindingResult bindingResult, Model model, SessionStatus status, @ModelAttribute("partnerList") PartnerList partnerList, Authentication auth)
			throws Exception {
		String vUserCode = auth.getName();
		sampleVO.setUpdatedUser(vUserCode);
		sampleService.updateUnit(sampleVO);
		
		/* 리더 상태 Update */
		SampleVO userVO = new SampleVO();
		userVO.setIdUser(Integer.parseInt(sampleVO.getLeaderIdUser()));
		userVO.setUserCode(sampleVO.getLeaderCode());

		userVO.setUserStateCode(sampleVO.getLeaderStateCode());
		userVO.setUserStateFrom(sampleVO.getLeaderStateFrom()); 
		userVO.setUserStateTo(sampleVO.getLeaderStateTo());
		userVO.setUserStateTime(sampleVO.getLeaderStateTime());
		sampleService.updateUserState(userVO);
		/* //리더 상태 Update */
		
		/* 캡틴 상태 Update */
		userVO.setIdUser(Integer.parseInt(sampleVO.getCaptainIdUser()));
		userVO.setUserCode(sampleVO.getCaptainCode());

		userVO.setUserStateCode(sampleVO.getCaptainStateCode());
		userVO.setUserStateFrom(sampleVO.getCaptainStateFrom());
		userVO.setUserStateTo(sampleVO.getCaptainStateTo());
		userVO.setUserStateTime(sampleVO.getCaptainStateTime());
		sampleService.updateUserState(userVO);
		/* //캡틴 상태 Update */
		
		/* 기존 Partner 삭제 */
		sampleVO.setIdUnitPartner(-9999);
		sampleService.deleteUnitPartner(sampleVO);
		/* //기존 Partner 삭제 */
		
		/* 선택한 Partnerlist 등록 */
		if(partnerList.getPartnerList() != null) {
			for(Partner partner : partnerList.getPartnerList()) {
				sampleVO.setUserCode(partner.getUserCode());
				sampleVO.setTypeCode("M");
				sampleService.insertUnitPartner(sampleVO);
		    }
		}
		/* 선택한 Partnerlist 등록 */
		
//		LOGGER.debug("IdUnit : " + searchVO.getIdUnit());
		System.out.println(sampleVO);
//		if (bindingResult.hasErrors()) {
//			LOGGER.debug("Error");
//			model.addAttribute("sampleVO", sampleVO);
//			return "/admin/insertjson"; 
//		}
		status.setComplete();
		return "/admin/unitRegister";
	}
	
	/**
	 * Report 조회한다.
	 * @param sampleVO - 조회할 정보가 담긴 VO
	 * @param searchVO - 목록 조회조건 정보가 담긴 VO
	 * @param status
	 * @return @ModelAttribute("sampleVO") - 조회한 정보
	 * @exception Exception
	 */
	@RequestMapping(value = "/admin/selectreport")
	public @ModelAttribute("sampleVO")
	SampleVO selectReport(SampleVO sampleVO, @ModelAttribute("searchVO") SampleDefaultVO searchVO) throws Exception {
		return sampleService.selectReport(sampleVO);
	}
	
	/**
	 * Report 등록한다.
	 * @param sampleVO - 등록할 정보가 담긴 VO
	 * @param searchVO - 목록 조회조건 정보가 담긴 VO
	 * @param status
	 * @return "/admin/unitRegister"
	 * @exception Exception
	 */
	@RequestMapping(value = "/admin/insertreport")
	public String reportRegister(SampleVO sampleVO, @ModelAttribute("searchVO") SampleDefaultVO searchVO, 
			BindingResult bindingResult, Model model, SessionStatus status)
			throws Exception {
		
		LOGGER.debug("register addReport..");	
		
		/*// Server-Side Validation
		beanValidator.validate(sampleVO, bindingResult);

		if (bindingResult.hasErrors()) {
			LOGGER.debug("register addReport hasErrors..");
			model.addAttribute("sampleVO", sampleVO);
			return "/sample/egovSampleRegister";
			//return "/admin/unitRegister";
		}
		*/	
		
		sampleService.insertReport(sampleVO);
		status.setComplete();
		return "/admin/unitRegister";
	}

	/**
	 * Report 수정한다.
	 * @param sampleVO - 수정할 정보가 담긴 VO
	 * @param searchVO - 목록 조회조건 정보가 담긴 VO
	 * @param status
	 * @return "/admin/unitRegister"
	 * @exception Exception
	 */
	@RequestMapping(value = "/admin/updatereport")
	public String updateReport(SampleVO sampleVO, @ModelAttribute("searchVO") SampleDefaultVO searchVO, 
			BindingResult bindingResult, Model model, SessionStatus status)
			throws Exception {

		LOGGER.debug("update idReport : " + searchVO.getIdReport());

		// Server-Side Validation
		beanValidator.validate(sampleVO, bindingResult);

//		if (bindingResult.hasErrors()) {
//			LOGGER.debug("Error");
//			model.addAttribute("sampleVO", sampleVO);
//			return "/admin/insertjson"; 
//		}

		sampleService.updateReport(sampleVO);
		status.setComplete();
		return "/admin/unitRegister";
	}	
	
	/**
	 * Report 삭제한다.
	 * @param sampleVO - 삭제할 정보가 담긴 VO
	 * @param searchVO - 목록 조회조건 정보가 담긴 VO
	 * @param status
	 * @return "/admin/unitRegister"
	 * @exception Exception
	 */
	@RequestMapping("/admin/deletereport")
	public String deleteReport(SampleVO sampleVO, @ModelAttribute("searchVO") SampleDefaultVO searchVO,
			SessionStatus status) throws Exception {
		
		LOGGER.debug("Delete idReport : " + searchVO.getIdReport());

		sampleService.deleteReport(sampleVO);
		status.setComplete();
		return "/admin/unitRegister";
	}
	
	@RequestMapping(value = "/admin/adminreportjson.json")
	public String adminReportAjax(@ModelAttribute("searchVO") SampleDefaultVO searchVO, ModelMap model) throws Exception {
			
		List<?> adminReportList = sampleService.selectAdminReportList(searchVO);
		model.addAttribute("AdminReportList", adminReportList);
//		LOGGER.debug("adminReportList -> " + adminReportList);
				
		return "/admin/adminreportjson.json";
	}


	/**
	 * Report 조회한다.
	 * @param sampleVO - 조회할 정보가 담긴 VO
	 * @param searchVO - 목록 조회조건 정보가 담긴 VO
	 * @param status
	 * @return @ModelAttribute("sampleVO") - 조회한 정보
	 * @exception Exception
	 */
	@RequestMapping(value = "/admin/selectUnitpartneruserList")
	public String selectUnitPartnerUserList(@ModelAttribute("searchVO") SampleDefaultVO searchVO, ModelMap model) throws Exception {
			
		List<?> selectUnitPartnerUserList = sampleService.selectUnitPartnerUserList(searchVO);
		model.addAttribute("selectUnitPartnerUserList", selectUnitPartnerUserList);
		return "/admin/selectunitpartneruserList";
	}	
	
	/**
	 * Report 등록한다.
	 * @param sampleVO - 등록할 정보가 담긴 VO
	 * @param searchVO - 목록 조회조건 정보가 담긴 VO
	 * @param status
	 * @return "/admin/unitRegister"
	 * @exception Exception
	 */
	@RequestMapping(value = "/admin/insertunitpartner")
	public String insertUnitPartner(SampleVO sampleVO, @ModelAttribute("searchVO") SampleDefaultVO searchVO, 
			BindingResult bindingResult, Model model, SessionStatus status)
			throws Exception {
		
		LOGGER.debug("register addUnitPartner..");	
		
		/*// Server-Side Validation
		beanValidator.validate(sampleVO, bindingResult);

		if (bindingResult.hasErrors()) {
			LOGGER.debug("register addReport hasErrors..");
			model.addAttribute("sampleVO", sampleVO);
			return "/sample/egovSampleRegister";
			//return "/admin/unitRegister";
		}
		*/	
		
		sampleService.insertUnitPartner(sampleVO);
		status.setComplete();
		return "/admin/unitRegister";
	}

	/**
	 * Report 수정한다.
	 * @param sampleVO - 수정할 정보가 담긴 VO
	 * @param searchVO - 목록 조회조건 정보가 담긴 VO
	 * @param status
	 * @return "/admin/unitRegister"
	 * @exception Exception
	 */
	@RequestMapping(value = "/admin/updateunitpartner")
	public String updateUnitPartner(SampleVO sampleVO, @ModelAttribute("searchVO") SampleDefaultVO searchVO, 
			BindingResult bindingResult, Model model, SessionStatus status)
			throws Exception {

		LOGGER.debug("update idReport : " + searchVO.getIdReport());

		// Server-Side Validation
//		beanValidator.validate(sampleVO, bindingResult);

//		if (bindingResult.hasErrors()) {
//			LOGGER.debug("Error");
//			model.addAttribute("sampleVO", sampleVO);
//			return "/admin/insertjson"; 
//		}

		sampleService.updateUnitPartner(sampleVO);
		status.setComplete();
		return "/admin/unitRegister";
	}	
	
	/**
	 * Report 삭제한다.
	 * @param sampleVO - 삭제할 정보가 담긴 VO
	 * @param searchVO - 목록 조회조건 정보가 담긴 VO
	 * @param status
	 * @return "/admin/unitRegister"
	 * @exception Exception
	 */
	@RequestMapping("/admin/deleteunitpartner")
	public String deleteUnitPartner(SampleVO sampleVO, @ModelAttribute("searchVO") SampleDefaultVO searchVO,
			SessionStatus status) throws Exception {
		
		LOGGER.debug("Delete idUnitPartner : " + sampleVO.getIdUnitPartner());

		sampleService.deleteUnitPartner(sampleVO);
		status.setComplete();
		return "/admin/unitRegister";
	}

	/**
	 * Report 등록한다.
	 * @param sampleVO - 등록할 정보가 담긴 VO
	 * @param searchVO - 목록 조회조건 정보가 담긴 VO
	 * @param status
	 * @return "/admin/unitRegister"
	 * @exception Exception
	 */
	@RequestMapping(value = "/admin/inserttaskpartner")
	public String insertTaskPartner(SampleVO sampleVO, @ModelAttribute("searchVO") SampleDefaultVO searchVO,
			BindingResult bindingResult, Model model, SessionStatus status)
			throws Exception {
		
		LOGGER.debug("register addTaskPartner..");	
		
		/*// Server-Side Validation
		beanValidator.validate(sampleVO, bindingResult);

		if (bindingResult.hasErrors()) {
			LOGGER.debug("register addReport hasErrors..");
			model.addAttribute("sampleVO", sampleVO);
			return "/sample/egovSampleRegister";
			//return "/admin/unitRegister";
		}
		*/	
		
		sampleService.insertTaskPartner(sampleVO);
		status.setComplete();
		return "/admin/unitRegister";
	}
	
	/**
	 * Report 수정한다.
	 * @param sampleVO - 수정할 정보가 담긴 VO
	 * @param searchVO - 목록 조회조건 정보가 담긴 VO
	 * @param status
	 * @return "/admin/unitRegister"
	 * @exception Exception
	 */
	@RequestMapping(value = "/admin/updatetaskpartner")
	public String updateTaskPartner(SampleVO sampleVO, @ModelAttribute("searchVO") SampleDefaultVO searchVO, 
			BindingResult bindingResult, Model model, SessionStatus status)
			throws Exception {

		LOGGER.debug("update idReport : " + searchVO.getIdReport());

		// Server-Side Validation
		beanValidator.validate(sampleVO, bindingResult);

//		if (bindingResult.hasErrors()) {
//			LOGGER.debug("Error");
//			model.addAttribute("sampleVO", sampleVO);
//			return "/admin/insertjson"; 
//		}

		sampleService.updateTaskPartner(sampleVO);
		status.setComplete();
		return "/admin/unitRegister";
	}	
	
	/**
	 * Report 삭제한다.
	 * @param sampleVO - 삭제할 정보가 담긴 VO
	 * @param searchVO - 목록 조회조건 정보가 담긴 VO
	 * @param status
	 * @return "/admin/unitRegister"
	 * @exception Exception
	 */
	@RequestMapping("/admin/deletetaskpartner")
	public String deleteTaskPartner(SampleVO sampleVO, @ModelAttribute("searchVO") SampleDefaultVO searchVO,
			SessionStatus status) throws Exception {
		
		LOGGER.debug("Delete idReport : " + searchVO.getIdReport());

		sampleService.deleteTaskPartner(sampleVO);
		status.setComplete();
		return "/admin/unitRegister";
	}

	@RequestMapping(value = "/admin/insertuserlist")
	public String insertuserlist(SampleVO sampleVO,
			BindingResult bindingResult, Model model, SessionStatus status, @ModelAttribute("partnerList") PartnerList partnerList)
			throws Exception {
		
		/* 초기에 저장시 상태를 재실로 */

		/* 사용자 신규 등록 */
		if(partnerList.getPartnerList() != null) {
			for(Partner partner : partnerList.getPartnerList()) {
				sampleVO.setUserName(partner.getUserName());
				sampleVO.setUserCode(partner.getUserCode());
				sampleVO.setUserEmail(partner.getUserEmail());
				sampleVO.setUserTel(partner.getUserTel());
				sampleVO.setUserStateCode("state1");
				sampleService.insertUser(sampleVO);
		    }
		}
		/* //사용자 신규 등록 */
		
		status.setComplete();
		return "/admin/unitRegister";
	}
}
