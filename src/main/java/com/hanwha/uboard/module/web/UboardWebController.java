package com.hanwha.uboard.module.web;

import java.net.URLDecoder;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springmodules.validation.commons.DefaultBeanValidator;

import com.hanwha.uboard.module.service.EgovSampleService;
import com.hanwha.uboard.module.service.SampleDefaultVO;
import com.hanwha.uboard.module.service.SampleVO;

import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.rte.psl.dataaccess.util.EgovMap;

@Controller
@SessionAttributes(types = SampleVO.class)
public class UboardWebController {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(UboardWebController.class);

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
	@RequestMapping(value = "/web/mainView.do")
	public String mainView(@ModelAttribute("searchVO") SampleDefaultVO searchVO, ModelMap model) throws Exception {
		return "/web/mainView";
	}
	
	@RequestMapping(value = "/web/login.do")
	public String login(@RequestParam Map<String, Object> paramMap, ModelMap model) throws Throwable{
		return "/web/login";
		
	}
	
	@RequestMapping("/web/loginFail.do")
	public String loginFail(@RequestParam Map<String, Object> paramMap, ModelMap model) throws Throwable{
		return "/web/loginFail";
	}
	
	@RequestMapping("/web/main.do")
	public String main(@RequestParam Map<String, Object> paramMap, ModelMap model ,Principal principal) 
			throws Throwable{
		
		//로그인 후 로그인 한 아이디를  가지고 온다.
		String name = principal.getName();
		
		model.addAttribute("username", name);
		return "/web/main";
		
	}
	
	@RequestMapping("/web/logout.do")
	public String logout(@RequestParam Map<String, Object> paramMap, ModelMap model) throws Throwable{
		return "/web/logout";
	}
	@RequestMapping("/web/login_old.do")
	public String login_old(@RequestParam Map<String, Object> paramMap, ModelMap model) throws Throwable{
		return "/web/login_old";		
	}
	
	@SuppressWarnings("deprecation")
	@RequestMapping("/web/selectAllUnitTaskList.json")
	public String selectAllUnitTaskList(@ModelAttribute("searchVO") SampleDefaultVO searchVO, ModelMap model, Authentication auth) throws Exception {
//		Map<String, String> resultMap = new HashMap<String, String>();
//		Map<String, List<?>> resultListMap = new HashMap<String, List<?>>();
		
//		/** EgovPropertyService.sample */
//		searchVO.setPageUnit(propertiesService.getInt("pageUnit"));
//		searchVO.setPageSize(propertiesService.getInt("pageSize"));
//
//		/** pageing setting */
//		PaginationInfo paginationInfo = new PaginationInfo();
//		paginationInfo.setCurrentPageNo(searchVO.getPageIndex());
//		paginationInfo.setRecordCountPerPage(searchVO.getPageUnit());
//		paginationInfo.setPageSize(searchVO.getPageSize());
//
//		searchVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
//		searchVO.setLastIndex(paginationInfo.getLastRecordIndex());
//		searchVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());

//		UserDetailsVO vo = (UserDetailsVO) auth.getPrincipal();
//		logger.info("Welcome checkAuth! Authentication is {}.", auth);
//		logger.info("UserDetailsVO == {}.", vo);
//		LOGGER.debug("Welcome checkAuth! Authentication is {}.", auth);
//		LOGGER.debug("Authorities ==> "+ ((EgovMap) auth.getPrincipal()).get("Granted Authorities").toString());
//		LOGGER.debug("UserName ==> "+ auth.getName());
//		model.addAttribute("auth", auth );
//		model.addAttribute("vo", vo );

//		String[] str = new String(auth.getName()).split("&loginUserName=");
//		String vUserCode = str[0];
//		
	    if(auth.getName().equals("uboard25@gmail.com")) {
        	LOGGER.debug("Auth.getName : "+ auth.getName());

	        HttpServletRequest req = ((ServletRequestAttributes)RequestContextHolder.currentRequestAttributes()).getRequest();
	        String ip = req.getHeader("X-FORWARDED-FOR");
	        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
	            ip = req.getHeader("Proxy-Client-IP"); 
	        } 
	        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
	            ip = req.getHeader("WL-Proxy-Client-IP"); 
	        } 
	        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
	            ip = req.getHeader("HTTP_CLIENT_IP"); 
	        } 
	        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
	            ip = req.getHeader("HTTP_X_FORWARDED_FOR"); 
	        } 
	        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
	            ip = req.getRemoteAddr(); 
	        }
	        if (ip == null) {
	            ip = req.getRemoteAddr();
	        }
	        
			LOGGER.debug("client public Ip : " + ip);
			String clientIP = searchVO.getClientPrivateIp();
			LOGGER.debug("client private Ip : " + clientIP); 
			
			String hanwhaPrivateIP = "10.1.25.226";
//			String hanwhaPrivateIP = "192.168.1.36";		
	
			if(!hanwhaPrivateIP.equals(clientIP)) {

	        	LOGGER.debug("Not Matching -> PrivateIP(" + clientIP + ") is not matching hanwhaPC Ip(" + hanwhaPrivateIP +")");     	
//	        	return "redirect:/j_spring_security_logout";
	        	return "/web/selectAllUnitTaskList";
			}
		}
		
		//  권한 기능 ---------------------------------------------------------------------------------------------------------
		String vUserCode = auth.getName();
		SampleVO userVO = new SampleVO();
		userVO.setUserCode(vUserCode);
		searchVO.setUserCode(vUserCode);
		SampleVO selectUser = sampleService.selectUser(userVO);
		
		if (!selectUser.getUnitAuthorities().equals("") ) { //vUserCode.equals("admin") || vUserCode.equals("user") ) {
//			searchVO.setUnitAuthorities("POWERUSER");
			searchVO.setUnitAuthorities(selectUser.getUnitAuthorities());
		}else{
			SampleVO selectUnitAuthorityVO = new SampleVO();
			selectUnitAuthorityVO.setUserCode(vUserCode);
			SampleVO selectUnitAuthority = sampleService.selectUnitAuthority(selectUnitAuthorityVO);
//			selectUnitAuthorityVO.setFbID("user");
//			SampleVO selectUnitAuthority = sampleService.selectUser(selectUnitAuthorityVO);
			
//			LOGGER.debug("UnitAuthorities ==> "+ selectUnitAuthority.getUnitAuthorities());
			int intUnitAuthorities = Integer.parseInt(selectUnitAuthority.getUnitAuthorities());
			String userUnitAuthority = intUnitAuthorities == 1 ? "LEADER" : (intUnitAuthorities == 2 ? "CAPTAIN" :"MEMBER") ;
			searchVO.setUnitAuthorities(userUnitAuthority);
			/* 서버 중요 로그 (지우지 말 것) ----------------------------------------------------------------------------- */
			LOGGER.debug("UserCode ==> " + vUserCode + " : UnitAuthorities ==> " + searchVO.getUnitAuthorities());
			/*//서버 중요 로그 (지우지 말 것) ----------------------------------------------------------------------------- */
		}
		//  //권한 기능 ---------------------------------------------------------------------------------------------------------

		
		/* 알림기능 ------------------------------------------------------------------------------------------- */

		SampleVO notiVO = new SampleVO();
		notiVO.setUserCode(vUserCode);
		notiVO.setIdUser(userVO.getIdUser());
		notiVO.setNotiCreateDate("Y");
		notiVO.setConfirmYn("");
		List<?> selectNoti = sampleService.selectNotificationList(notiVO);
		
		if(selectNoti.size() == 0){
//			SampleVO delayTaskNotiVO = new SampleVO();
			List<?> selectDelayTaskNoti = sampleService.selectDelayTaskNotiList(notiVO);
			
			for(Object delayTaskNotiMap:selectDelayTaskNoti) {
				notiVO.setUnitCode(((EgovMap) delayTaskNotiMap).get("unitCode").toString());
				notiVO.setIdTask(Integer.parseInt(((EgovMap) delayTaskNotiMap).get("idTask").toString()));
				notiVO.setTaskCode(((EgovMap) delayTaskNotiMap).get("taskCode").toString());
				notiVO.setNotiPsitnName(((EgovMap) delayTaskNotiMap).get("notiPsitnName").toString());
				notiVO.setNotiUnitName(((EgovMap) delayTaskNotiMap).get("notiUnitName").toString());
				notiVO.setNotiTaskName(((EgovMap) delayTaskNotiMap).get("notiTaskName").toString());
				notiVO.setNotiTaskFromDate(((EgovMap) delayTaskNotiMap).get("notiTaskFromDate").toString());
				notiVO.setNotiTaskToDate(((EgovMap) delayTaskNotiMap).get("notiTaskToDate").toString());
				sampleService.insertNotification(notiVO);
			}
		}
		
		// 담당으로 있는 모든 Task 중 100%가 아닌 경우 
		// Task 담당자 이거나 Unit 담당자 인 경우
		// 담당자들 전체에게 알림
		// 오늘일자 전일의 완료되지 않은 모든 Task
		// 
		
		/*//알림기능 ------------------------------------------------------------------------------------------- */
		
		
//		LOGGER.debug("userCode ==> "+ searchVO.getUserCode());
//		LOGGER.debug("unitAuthorities ==> "+ searchVO.getUnitAuthorities());
		
		searchVO.setSearchKeyword(URLDecoder.decode(searchVO.getSearchKeyword()));
//		LOGGER.debug("SearchCondition : " + searchVO.getSearchCondition());		
//		LOGGER.debug("SearchCondition : " + searchVO.getSearchCondition());
//		LOGGER.debug("SearchKeyword : " + searchVO.getSearchKeyword());
//		LOGGER.debug("searchUseYn : " +  searchVO.getSearchUseYn());
//		LOGGER.debug("SignalCode : " + searchVO.getSignalCode());
//		LOGGER.debug("psitnCode : " + searchVO.getPsitnCode());
//		LOGGER.debug("FromDate : " + searchVO.getFromDate() + "~ ToDate : " + searchVO.getToDate());
		
		List<?> sampleList = sampleService.selectUnitList(searchVO);
		List<?> taskList = sampleService.selectTaskList(searchVO);
		List<?> userList = sampleService.selectUserList(searchVO);
			
		for(Object unitMap:sampleList) {
			String vAlramCode = "";
			String vSignalCode = "G";
			double vProgress = 0.;
			List<EgovMap> taskListMap0 = new ArrayList<EgovMap>();
			int    vUnitMaxTaskFromDate = 0;
		
			for(Object taskMap:taskList) {
//				LOGGER.debug(((EgovMap) unitMap).get("unitCode") + " " + ((EgovMap)taskMap).get("unitCode"));
				if (((EgovMap) unitMap).get("unitCode").equals(((EgovMap)taskMap).get("unitCode"))) {
					
//					LOGGER.debug("taskMap : " + taskMap);
					taskListMap0.add((EgovMap)taskMap);

					List<EgovMap> userListMap0 = new ArrayList<EgovMap>();
					for(Object userMap:userList) {
						String taskMapIdTask = String.valueOf(((EgovMap) taskMap).get("idTask"));
						String userMapIdTask = String.valueOf(((EgovMap) userMap).get("idTask"));
//						LOGGER.debug(((EgovMap) taskMap).get("unitCode") + " " + ((EgovMap)userMap).get("unitCode"));
//						LOGGER.debug(((EgovMap) taskMap).get("idTask") + " " + ((EgovMap)userMap).get("idTask") + " : " + taskMapIdTask.equals(userMapIdTask));
//						LOGGER.debug(((EgovMap) taskMap).get("taskCode") + " " + ((EgovMap)userMap).get("taskCode"));
						if(((EgovMap) taskMap).get("unitCode").equals(((EgovMap)userMap).get("unitCode"))
								&& taskMapIdTask.equals(userMapIdTask)
								&& ((EgovMap) taskMap).get("taskCode").equals(((EgovMap)userMap).get("taskCode"))) {
							// 중복 list넣치 않음
							if(!userListMap0.contains((EgovMap) userMap)) {
								userListMap0.add((EgovMap) userMap);
							}							
						}		
					}
					
					//taskMap에 리스트 멤버 넣기
//					LOGGER.debug("userListMap0 : " + userListMap0);
					((EgovMap) taskMap).put("userList", userListMap0);
					
					// ----------------------------------------------------------------------------
					switch (((EgovMap)taskMap).get("signalCode").toString().charAt(0)) {
					case 'Y':
						vSignalCode = vSignalCode.equals("R") ? "R":"Y";
						break;
					case 'R':
						vSignalCode = "R";
						break;
					default:
						break;
					}
					
					int vTaskFromDate = 0;
					
					try {
					   vTaskFromDate = Integer.parseInt(((EgovMap) taskMap).get("fromDate").toString());
					  } catch (NumberFormatException e) {

					  }
//					if(!((EgovMap) taskMap).get("fromDate").toString().equals("")
//							|| !((EgovMap) taskMap).get("fromDate").toString().equals("null")
//							|| !((EgovMap) taskMap).get("fromDate").toString().equals("Invalid Date")) {
//						vTaskFromDate = Integer.parseInt(((EgovMap) taskMap).get("fromDate").toString());
//					}
					vUnitMaxTaskFromDate = vUnitMaxTaskFromDate > vTaskFromDate ? vUnitMaxTaskFromDate : vTaskFromDate;
					vProgress += Double.parseDouble(((EgovMap) taskMap).get("progress").toString());
					if (   !((EgovMap) taskMap).get("progress").toString().equals("100")
						&& !((EgovMap) taskMap).get("alramCode").toString().equals("")) vAlramCode = ((EgovMap) taskMap).get("alramCode").toString();
					// ----------------------------------------------------------------------------					
				}
  			}
//			LOGGER.debug("taskListMap0 : " + taskListMap0);
			((EgovMap) unitMap).put("taskList", taskListMap0);

			/* Unit의 SignalCode 할당 */
			((EgovMap) unitMap).put("signalCode", vSignalCode);
			/* Unit의 progress 할당 */
			((EgovMap) unitMap).put("progress", taskListMap0.size() > 0 ? (int)(vProgress/taskListMap0.size()):0);
			/* Unit의 AlramCode 할당 */
			((EgovMap) unitMap).put("alramCode", vAlramCode);
			/* Unit의 UnitMaxTaskFromDate 할당 */
			((EgovMap) unitMap).put("unitMaxTaskFromDate", vUnitMaxTaskFromDate);
		}
//		System.out.println(sampleList);
//		LOGGER.debug("Dashboard->sampleList : " + sampleList);
		model.addAttribute("resultList", sampleList);
		

//		int totCnt = sampleService.selectSampleListTotCnt(searchVO);
//		paginationInfo.setTotalRecordCount(totCnt);
//		model.addAttribute("paginationInfo", paginationInfo);
				
		return "/web/selectAllUnitTaskList";
	}
	
	@RequestMapping("/web/userjson")
	public String testAjax2(@ModelAttribute("searchVO") SampleDefaultVO searchVO, ModelMap model) throws Exception {

//		searchVO.setSearchKeyword(URLDecoder.decode(searchVO.getSearchKeyword()));
						
		List<?> userList = sampleService.selectUserList(searchVO);

		model.addAttribute("userList", userList);
		

//		int totCnt = sampleService.selectSampleListTotCnt(searchVO);
//		paginationInfo.setTotalRecordCount(totCnt);
//		model.addAttribute("paginationInfo", paginationInfo);
				
		return "/web/userjson";
	}
	
	@RequestMapping(value = "/web/selectNotificationList")
	public String selectNotificationList(@ModelAttribute("searchVO") SampleDefaultVO searchVO, ModelMap model, Authentication auth) throws Exception {
		searchVO.setUserCode(auth.getName());
//		searchVO.setConfirmYn("N");
		List<?> resultList = sampleService.selectNotificationList(searchVO);
		model.addAttribute("NotificationList", resultList);
		return "/web/selectNotificationList.json";
	}

	
	@RequestMapping(value = "/web/updateNotification")
	public String updateNotification(SampleVO sampleVO, SessionStatus status)
			throws Exception {
		sampleService.updateNotification(sampleVO);
		status.setComplete();
		return "/web/updateNotification";
	}	
	
}
