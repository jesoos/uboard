/*
 * Copyright 2011 MOPAS(Ministry of Public Administration and Security).
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

import java.util.List;

import com.hanwha.uboard.module.service.SampleDefaultVO;
import com.hanwha.uboard.module.service.SampleVO;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

/**
 * sample에 관한 데이터처리 매퍼 클래스
 *
 * @author  표준프레임워크센터
 * @since 2014.01.24
 * @version 1.0
 * @see <pre>
 *  == 개정이력(Modification Information) ==
 *
 *          수정일          수정자           수정내용
 *  ----------------    ------------    ---------------------------
 *   2014.01.24        표준프레임워크센터          최초 생성
 *
 * </pre>
 */
@Mapper("sampleMapper")
public interface SampleMapper {

	/**
	 * 글을 등록한다.
	 * @param vo - 등록할 정보가 담긴 SampleVO
	 * @return 등록 결과
	 * @exception Exception
	 */
    void insertSample(SampleVO vo) throws Exception;
   

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
	 * @param searchMap - 조회할 정보가 담긴 Map
	 * @return Unit 목록
	 * @exception Exception
	 */
    List<?> selectUnitList(SampleDefaultVO searchVO) throws Exception;
    
    /**
	 * Task 목록을 조회한다.
	 * @param searchMap - 조회할 정보가 담긴 Map
	 * @return Task 목록
	 * @exception Exception
	 */
    List<?> selectTaskList(SampleDefaultVO searchVO) throws Exception;

    public String getUserPwd(String userid);

    /**
	 * User 목록을 조회한다.
	 * @param searchMap - 조회할 정보가 담긴 Map
	 * @return User 목록
	 * @exception Exception
	 */
	List<?> selectUserList(SampleDefaultVO searchVO) throws Exception;

	/**
	 * 글을 등록한다.
	 * @param vo - 등록할 정보가 담긴 SampleVO
	 * @return 등록 결과
	 * @exception Exception
	 */
    void insertUnit(SampleVO vo) throws Exception;

    /**
	 * 글을 수정한다.
	 * @param vo - 수정할 정보가 담긴 SampleVO
	 * @return void형
	 * @exception Exception
	 */
    void updateUnit(SampleVO vo) throws Exception;

    /**
	 * task 글을 등록한다.
	 * @param vo - 등록할 정보가 담긴 SampleVO
	 * @return 등록 결과
	 * @exception Exception
	 */
    void insertTask(SampleVO vo) throws Exception;
    
    /**
	 * task 글을 수정한다.
	 * @param vo - 수정할 정보가 담긴 SampleVO
	 * @return void형
	 * @exception Exception
	 */
	void updateTask(SampleVO vo) throws Exception;

    /**
	 * User 등록한다.
	 * @param vo - 등록할 정보가 담긴 SampleVO
	 * @return 등록 결과
	 * @exception Exception
	 */
	void insertUser(SampleVO vo) throws Exception;

    /**
	 * User 수정한다.
	 * @param vo - 등록할 정보가 담긴 SampleVO
	 * @return 등록 결과
	 * @exception Exception
	 */
	void updateUser(SampleVO vo) throws Exception;

    /**
	 * User 삭제한다.
	 * @param vo - 삭제할 정보가 담긴 SampleVO
	 * @return 등록 결과
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

	void insertUnitPartner(SampleVO vo) throws Exception;

	void updateUnitPartner(SampleVO vo)throws Exception;

	void deleteUnitPartner(SampleVO vo)throws Exception;

	void insertTaskPartner(SampleVO vo) throws Exception;

	void updateTaskPartner(SampleVO vo)throws Exception;

	void deleteTaskPartner(SampleVO vo)throws Exception;
/* //20160307 ----------------------------------------------------------------------------------*/	

	SampleVO selectUnitAuthority(SampleVO vo)throws Exception;

	void updateUserState(SampleVO vo) throws Exception;
	
/* Notification ----------------------------------------------------------------------------------*/
	List<?> selectNotificationList(SampleDefaultVO vo) throws Exception;

	void insertNotification(SampleVO vo) throws Exception;

	void updateNotification(SampleVO vo) throws Exception;
	
	List<?> selectDelayTaskNotiList(SampleDefaultVO vo) throws Exception;
	
	void deleteNotification(SampleVO vo) throws Exception;
/*//Notification ----------------------------------------------------------------------------------*/


			
	
}
