/*
 * Copyright 2008-2009 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.hanwha.uboard.module.service.impl;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.hanwha.uboard.module.service.EgovSampleService;
import com.hanwha.uboard.module.service.SampleDefaultVO;
import com.hanwha.uboard.module.service.SampleVO;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.fdl.idgnr.EgovIdGnrService;

/**
 * @Class Name : EgovSampleServiceImpl.java
 * @Description : Sample Business Implement Class
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2009.03.16           최초생성
 *
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see
 *
 *  Copyright (C) by MOPAS All right reserved.
 */

@Service("sampleService")
public class EgovSampleServiceImpl extends EgovAbstractServiceImpl implements EgovSampleService {

	private static final Logger LOGGER = LoggerFactory.getLogger(EgovSampleServiceImpl.class);

	/** SampleDAO */
	// TODO mybatis 사용
    @Resource(name="sampleMapper")
	private SampleMapper sampleDAO;

    /** ID Generation */
    @Resource(name="egovIdGnrService")
    private EgovIdGnrService egovIdGnrService;

	/**
	 * 글을 등록한다.
	 * @param vo - 등록할 정보가 담긴 SampleVO
	 * @return 등록 결과
	 * @exception Exception
	 */
    public String insertSample(SampleVO vo) throws Exception {
    	LOGGER.debug(vo.toString());

    	/** ID Generation Service */
    	String id = egovIdGnrService.getNextStringId();
    	vo.setId(id);
    	LOGGER.debug(vo.toString());

    	sampleDAO.insertSample(vo);
        return id;
    }
    
	@Override
	public int insertTask(SampleVO vo) throws Exception {
    	LOGGER.debug(vo.toString());

    	/** ID Generation Service */
    	
//    	int idTask = egovIdGnrService.getNextIntegerId();
//    	vo.setIdTask(idTask);
//    	LOGGER.debug(vo.toString());
    	 
		sampleDAO.insertTask(vo);
//		return idTask;
		return 0;
	}

    /**
	 * 글을 수정한다.
	 * @param vo - 수정할 정보가 담긴 SampleVO
	 * @return void형
	 * @exception Exception
	 */
    public void updateSample(SampleVO vo) throws Exception {
        sampleDAO.updateSample(vo);
    }

    /**
	 * 글을 삭제한다.
	 * @param vo - 삭제할 정보가 담긴 SampleVO
	 * @return void형
	 * @exception Exception
	 */
    public void deleteSample(SampleVO vo) throws Exception {
        sampleDAO.deleteSample(vo);
    }

    /**
	 * 글을 조회한다.
	 * @param vo - 조회할 정보가 담긴 SampleVO
	 * @return 조회한 글
	 * @exception Exception
	 */
    public SampleVO selectSample(SampleVO vo) throws Exception {
        SampleVO resultVO = sampleDAO.selectSample(vo);
        if (resultVO == null)
            throw processException("info.nodata.msg");
        return resultVO;
    }

    /**
	 * 글 목록을 조회한다.
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
    public List<?> selectSampleList(SampleDefaultVO searchVO) throws Exception {
        return sampleDAO.selectSampleList(searchVO);
    }

    /**
	 * 글 총 갯수를 조회한다.
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 총 갯수
	 * @exception
	 */
    public int selectSampleListTotCnt(SampleDefaultVO searchVO) {
		return sampleDAO.selectSampleListTotCnt(searchVO);
	}

    /**
	 * Unit 목록을 조회한다.
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return Unit 목록
	 * @exception Exception
	 */
    public List<?> selectUnitList(SampleDefaultVO searchVO) throws Exception {
        return sampleDAO.selectUnitList(searchVO);
    }

    
    /**
	 * Task 목록을 조회한다.
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return Task 목록
	 * @exception Exception
	 */
    public List<?> selectTaskList(SampleDefaultVO searchVO) throws Exception {
        return sampleDAO.selectTaskList(searchVO);
    }
	@Override
	public UserDetails loadUserByUsername(String username)
			throws UsernameNotFoundException {
		
		//로그인 아이디로 패스워드를 가지고 오다.
		String userPwd = sampleDAO.getUserPwd(username);
		
		//"ROLE_USER" 란 이름으로 권한을 설정한다. 
		Collection<SimpleGrantedAuthority> roles = new ArrayList<SimpleGrantedAuthority>(); 
		roles.add(new SimpleGrantedAuthority("ROLE_USER"));
	 
		//로그인 정보를 리한다
		UserDetails user = new User(username, userPwd, roles);	
		return user;
	}

	@Override
	public List<?> selectUserList(SampleDefaultVO searchVO) throws Exception {
		// TODO Auto-generated method stub
		return sampleDAO.selectUserList(searchVO);
	}

	/**
	 * 글을 등록한다.
	 * @param vo - 등록할 정보가 담긴 SampleVO
	 * @return 등록 결과
	 * @exception Exception
	 */
//    public String insertUnit(SampleVO vo) throws Exception {
    	public int insertUnit(SampleVO vo) throws Exception {
    	LOGGER.debug(vo.toString());

    	/** ID Generation Service */
    	int idUnit = egovIdGnrService.getNextIntegerId();
    	vo.setIdUnit(idUnit);
//    	LOGGER.debug(vo.toString());

    	sampleDAO.insertUnit(vo);
        return idUnit;
    }

        /**
    	 * 글을 수정한다.
    	 * @param vo - 수정할 정보가 담긴 SampleVO
    	 * @return void형
    	 * @exception Exception
    	 */
        public void updateUnit(SampleVO vo) throws Exception {
            sampleDAO.updateUnit(vo);
        }

        /**
    	 * task 글을 수정한다.
    	 * @param vo - 수정할 정보가 담긴 SampleVO
    	 * @return void형
    	 * @exception Exception
    	 */
		@Override
		public void updateTask(SampleVO vo) throws Exception {
			sampleDAO.updateTask(vo);
		}

		@Override
		public int insertUser(SampleVO vo) throws Exception {
			// TODO Auto-generated method stub
//			LOGGER.debug(vo.toString());

	    	/** ID Generation Service */
	    	
//	    	int idUser = egovIdGnrService.getNextIntegerId();
//	    	vo.setIdUser(idUser);
//	    	LOGGER.debug(vo.toString());
	    	 
			sampleDAO.insertUser(vo);
//			return idUser;
			return 0;
		}

		@Override
		public void updateUser(SampleVO vo) throws Exception {
			sampleDAO.updateUser(vo);
		
		}

		@Override
		public void deleteUser(SampleVO vo) throws Exception {
			sampleDAO.deleteUser(vo);
			
		}

		@Override
		public SampleVO selectUser(SampleVO vo) throws Exception {
			SampleVO resultVO = sampleDAO.selectUser(vo);
	        if (resultVO == null)
	            throw processException("info.nodata.msg");
	        return resultVO;
		}

		@Override
		public List<?> selectAdminUserList(SampleDefaultVO vo) throws Exception {
			return sampleDAO.selectAdminUserList(vo);
		}

		@Override
		public void insertReport(SampleVO vo) throws Exception {
			sampleDAO.insertReport(vo);
			
		}

		@Override
		public void updateReport(SampleVO vo) throws Exception {
			sampleDAO.updateReport(vo);
			
		}

		@Override
		public void deleteReport(SampleVO vo) throws Exception {
			sampleDAO.deleteReport(vo);
			
		}

		@Override
		public List<?> selectAdminReportList(SampleDefaultVO vo) throws Exception {
			// TODO Auto-generated method stub
			return sampleDAO.selectAdminReportList(vo);
		}

		@Override
		public SampleVO selectReport(SampleVO vo) throws Exception {
			SampleVO resultVO = sampleDAO.selectReport(vo);
	        if (resultVO == null)
	            throw processException("info.nodata.msg");
	        return resultVO;
		}

		
/* 20160307 담당자 관련 추가 ----------------------------------------------------------------------------------*/		
		@Override
		public List<?> selectUnitPartnerUserList(SampleDefaultVO vo) throws Exception {
			// TODO Auto-generated method stub
			return sampleDAO.selectUnitPartnerUserList(vo);
		}
		
		@Override
		public int insertUnitPartner(SampleVO vo) throws Exception {
			// TODO Auto-generated method stub
//			LOGGER.debug(vo.toString());
	    	/** ID Generation Service */
//	    	int idUnitPartner = egovIdGnrService.getNextIntegerId();
//	    	vo.setIdUnitPartner(idUnitPartner);
//	    	LOGGER.debug(vo.toString());

	    	sampleDAO.insertUnitPartner(vo);
	        return 0;			
		}
		
		@Override
		public void updateUnitPartner(SampleVO vo) throws Exception {
			sampleDAO.updateUnitPartner(vo);
			
		}

		@Override
		public void deleteUnitPartner(SampleVO vo) throws Exception {
			sampleDAO.deleteUnitPartner(vo);
			
		}

		@Override
		public int insertTaskPartner(SampleVO vo) throws Exception {
			// TODO Auto-generated method stub
//			LOGGER.debug(vo.toString());			
	    	/** ID Generation Service */
//	    	int idTaskPartner = egovIdGnrService.getNextIntegerId();
//	    	vo.setIdTaskPartner(idTaskPartner);
//	    	LOGGER.debug(vo.toString());

	    	sampleDAO.insertTaskPartner(vo);
	        return 0;			
		}

		@Override
		public void updateTaskPartner(SampleVO vo) throws Exception {
			sampleDAO.updateTaskPartner(vo);
		}

		@Override
		public void deleteTaskPartner(SampleVO vo) throws Exception {
			sampleDAO.deleteTaskPartner(vo);
			
		}		

/* //20160307 ----------------------------------------------------------------------------------*/
		@Override
		public SampleVO selectUnitAuthority(SampleVO vo) throws Exception {
			SampleVO resultVO = sampleDAO.selectUnitAuthority(vo);
	        if (resultVO == null)
	            throw processException("info.nodata.msg");
	        return resultVO;
		}
		
		@Override
		public void updateUserState(SampleVO vo) throws Exception {
			sampleDAO.updateUserState(vo);
		
		}

/* Notification ----------------------------------------------------------------------------------*/
		@Override
		public List<?> selectNotificationList(SampleDefaultVO vo) throws Exception {
			return sampleDAO.selectNotificationList(vo);
		}

		
		@Override
		public int insertNotification(SampleVO vo) throws Exception {
	    	 
			sampleDAO.insertNotification(vo);
			return 0;
		}

		@Override
		public void updateNotification(SampleVO vo) throws Exception {
			sampleDAO.updateNotification(vo);
		}
		
		@Override
		public List<?> selectDelayTaskNotiList(SampleDefaultVO vo) throws Exception {
			return sampleDAO.selectDelayTaskNotiList(vo);
		}
		
		@Override
		public void deleteNotification(SampleVO vo) throws Exception {
			sampleDAO.deleteNotification(vo);
		}		
		
/*//Notification ----------------------------------------------------------------------------------*/		
		
}
