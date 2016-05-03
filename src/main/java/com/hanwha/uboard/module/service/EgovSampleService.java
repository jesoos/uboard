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
package com.hanwha.uboard.module.service;

import java.util.List;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

/**
 * @Class Name : EgovSampleService.java
 * @Description : EgovSampleService Class
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
public interface EgovSampleService {

	/**
	 * 글을 등록한다.
	 * @param vo - 등록할 정보가 담긴 SampleVO
	 * @return 등록 결과
	 * @exception Exception
	 */
    String insertSample(SampleVO vo) throws Exception;
    
	/**
	 * 글을 수정한다.
	 * @param vo - 수정할 정보가 담긴 SampleVO
	 * @return void형
	 * @exception Exception
	 */
    void updateSample(SampleVO vo) throws Exception;

    /**
	 * 글을 삭제한다.
	 * @param vo - 삭제할 정보가 담긴 SampleVO
	 * @return void형
	 * @exception Exception
	 */
    void deleteSample(SampleVO vo) throws Exception;

    /**
	 * 글을 조회한다.
	 * @param vo - 조회할 정보가 담긴 SampleVO
	 * @return 조회한 글
	 * @exception Exception
	 */
    SampleVO selectSample(SampleVO vo) throws Exception;

    /**
	 * 글 목록을 조회한다.
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
    List<?> selectSampleList(SampleDefaultVO searchVO) throws Exception;

    /**
	 * 글 총 갯수를 조회한다.
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 총 갯수
	 * @exception
	 */
    int selectSampleListTotCnt(SampleDefaultVO searchVO);

    /**
	 * Unit 목록을 조회한다.
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return Unit 목록
	 * @exception Exception
	 */
    List<?> selectUnitList(SampleDefaultVO searchVO) throws Exception;

    /**
	 * Task 목록을 조회한다.
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return Task 목록
	 * @exception Exception
	 */
    List<?> selectTaskList(SampleDefaultVO searchVO) throws Exception;
    
    /**
	 * User 목록을 조회한다.
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return User 목록
	 * @exception Exception
	 */

    List<?> selectUserList(SampleDefaultVO searchVO) throws Exception;

    
	public UserDetails loadUserByUsername(String username)
			throws UsernameNotFoundException;

	/**
	 * Unit 을 등록한다.
	 * @param vo - 등록할 정보가 담긴 SampleVO
	 * @return 등록 결과
	 * @exception Exception
	 */
    int insertUnit(SampleVO vo) throws Exception;

    /**
	 * 글을 수정한다.
	 * @param vo - 수정할 정보가 담긴 SampleVO
	 * @return void형
	 * @exception Exception
	 */
    void updateUnit(SampleVO vo) throws Exception;

    /**
	 * Task를 등록한다.
	 * @param vo - 등록할 정보가 담긴 SampleVO
	 * @return 등록 결과
	 * @exception Exception
	 */
	int insertTask(SampleVO vo) throws Exception;;

    /**
	 * Task 글을 수정한다.
	 * @param vo - 수정할 정보가 담긴 SampleVO
	 * @return void형
	 * @exception Exception
	 */
	void updateTask(SampleVO vo) throws Exception;

	/**
	 * User를 등록한다.
	 * @param vo - 등록할 정보가 담긴 SampleVO
	 * @return 등록 결과
	 * @exception Exception
	 */
	int insertUser(SampleVO vo) throws Exception;

    /**
	 * User 정보 수정한다.
	 * @param vo - 수정할 정보가 담긴 SampleVO
	 * @return void형
	 * @exception Exception
	 */
	void updateUser(SampleVO vo) throws Exception;

	/**
	 * User 정보 삭제한다.
	 * @param vo - 삭제할 정보가 담긴 SampleVO
	 * @return void형
	 * @exception Exception
	 */
	void deleteUser(SampleVO vo) throws Exception;

	SampleVO selectUser(SampleVO vo) throws Exception;

	List<?> selectAdminUserList(SampleDefaultVO vo) throws Exception;

	void insertReport(SampleVO vo) throws Exception;

	void updateReport(SampleVO vo)throws Exception;

	void deleteReport(SampleVO vo)throws Exception;

	List<?> selectAdminReportList(SampleDefaultVO vo)throws Exception;

	SampleVO selectReport(SampleVO vo)throws Exception;

	/* 20160307 담당자 관련 추가 ----------------------------------------------------------------------------------*/
	List<?> selectUnitPartnerUserList(SampleDefaultVO vo) throws Exception;

	int insertUnitPartner(SampleVO vo) throws Exception;

	void updateUnitPartner(SampleVO vo)throws Exception;

	void deleteUnitPartner(SampleVO vo)throws Exception;

	int insertTaskPartner(SampleVO vo) throws Exception;

	void updateTaskPartner(SampleVO vo)throws Exception;

	void deleteTaskPartner(SampleVO vo)throws Exception;
/* //20160307 ----------------------------------------------------------------------------------*/

	SampleVO selectUnitAuthority(SampleVO selectUnitAuthorityVO) throws Exception;
	
	void updateUserState(SampleVO vo) throws Exception;
	
/* Notification ----------------------------------------------------------------------------------*/
	public List<?> selectNotificationList(SampleDefaultVO vo) throws Exception;
	
	public int insertNotification(SampleVO vo) throws Exception;

	public void updateNotification(SampleVO vo) throws Exception;
	
	public List<?> selectDelayTaskNotiList(SampleDefaultVO vo) throws Exception;

	void deleteNotification(SampleVO sampleVO) throws Exception;
	
/*//Notification ----------------------------------------------------------------------------------*/		
	
}
