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

import java.io.Serializable;

import org.apache.commons.lang.builder.ToStringBuilder;

/**
 * @Class Name : SampleDefaultVO.java
 * @Description : SampleDefaultVO Class
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
public class SampleDefaultVO implements Serializable {

	/**
	 *  serialVersion UID
	 */
	private static final long serialVersionUID = -858838578081269359L;

	/** 검색조건 */
    private String searchCondition = "";

    /** 검색Keyword */
    private String searchKeyword = "";

    /** 검색사용여부 */
    private String searchUseYn = "";

    /** 현재페이지 */
    private int pageIndex = 1;

    /** 페이지갯수 */
    private int pageUnit = 10;

    /** 페이지사이즈 */
    private int pageSize = 10;

    /** firstIndex */
    private int firstIndex = 1;

    /** lastIndex */
    private int lastIndex = 1;

    /** recordCountPerPage */
    private int recordCountPerPage = 10;


	public int getFirstIndex() {
		return firstIndex;
	}

	public void setFirstIndex(int firstIndex) {
		this.firstIndex = firstIndex;
	}

	public int getLastIndex() {
		return lastIndex;
	}

	public void setLastIndex(int lastIndex) {
		this.lastIndex = lastIndex;
	}

	public int getRecordCountPerPage() {
		return recordCountPerPage;
	}

	public void setRecordCountPerPage(int recordCountPerPage) {
		this.recordCountPerPage = recordCountPerPage;
	}

	public String getSearchCondition() {
        return searchCondition;
    }

    public void setSearchCondition(String searchCondition) {
        this.searchCondition = searchCondition;
    }

    public String getSearchKeyword() {
        return searchKeyword;
    }

    public void setSearchKeyword(String searchKeyword) {
        this.searchKeyword = searchKeyword;
    }

    public String getSearchUseYn() {
        return searchUseYn;
    }

    public void setSearchUseYn(String searchUseYn) {
        this.searchUseYn = searchUseYn;
    }

    public int getPageIndex() {
        return pageIndex;
    }

    public void setPageIndex(int pageIndex) {
        this.pageIndex = pageIndex;
    }

    public int getPageUnit() {
        return pageUnit;
    }

    public void setPageUnit(int pageUnit) {
        this.pageUnit = pageUnit;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public String toString() {
        return ToStringBuilder.reflectionToString(this);
    }


	/** idUnit */
    private int idUnit = 0;

    /** 소속코드 */ 
    private String psitnCode = "";

    /** 소속명 */
    private String psitnName = "";

    /** Unit 코드 */
    private String unitCode = "";

    /** Unit 명 */
    private String unitName = "";

    /** 진척률 */
    private int progress = 0;

    /** 상태 */
    private String signalCode = "all";

    /** 상태 */
    private String alramCode = "";
   
    /** 리더 */
    private String leader = "";

    /** 캡틴 */
    private String captain = "";

    /** 시작일자 */
    private String fromDate = "";
    
    /** 종료일자 */
    private String toDate = "";
    
    /** 리더코드 (페이스북계정) */
    private String leaderCode = "";
    
    /** 캡틴코드 (페이스북계정)*/
    private String captainCode = "";
    
    /** 수정된날짜 */
    private String updatedDate = "";
    
	public int getIdUnit() {
		return idUnit;
	}

	/** 리더아이디 (idUser) */
	private String leaderIdUser = "";
	
	/** 캡틴아이디 (idUser) */
	private String captainIdUser = "";
	
	/** Unit Max Task From Date (정렬을 위함) */
	private String unitMaxTaskFromDate = "";
	
	public String getLeaderIdUser() {
		return leaderIdUser;
	}

	public void setLeaderIdUser(String leaderIdUser) {
		this.leaderIdUser = leaderIdUser;
	}

	public String getCaptainIdUser() {
		return captainIdUser;
	}

	public void setCaptainIdUser(String captainIdUser) {
		this.captainIdUser = captainIdUser;
	}

	public String getUnitMaxTaskFromDate() {
		return unitMaxTaskFromDate;
	}

	public void setUnitMaxTaskFromDate(String unitMaxTaskFromDate) {
		this.unitMaxTaskFromDate = unitMaxTaskFromDate;
	}

	public void setIdUnit(int idUnit) {
		this.idUnit = idUnit;
	}

	public String getPsitnCode() {
		return psitnCode;
	}

	public void setPsitnCode(String psitnCode) {
		this.psitnCode = psitnCode;
	}

	public String getPsitnName() {
		return psitnName;
	}

	public void setPsitnName(String psitnName) {
		this.psitnName = psitnName;
	}

	public String getUnitCode() {
		return unitCode;
	}

	public void setUnitCode(String unitCode) {
		this.unitCode = unitCode;
	}

	public String getUnitName() {
		return unitName;
	}

	public void setUnitName(String unitName) {
		this.unitName = unitName;
	}

	public int getProgress() {
		return progress;
	}

	public void setProgress(int progress) {
		this.progress = progress;
	}

	public String getSignalCode() {
		return signalCode;
	}

	public void setSignalCode(String signalCode) {
		this.signalCode = signalCode;
	}

	public String getAlramCode() {
		return alramCode;
	}

	public void setAlramCode(String alramCode) {
		this.alramCode = alramCode;
	}

	
	public String getLeader() {
		return leader;
	}

	public void setLeader(String leader) {
		this.leader = leader;
	}

	public String getCaptain() {
		return captain;
	}

	public void setCaptain(String captain) {
		this.captain = captain;
	}

	public String getFromDate() {
		return fromDate;
	}

	public void setFromDate(String fromDate) {
		this.fromDate = fromDate;
	}

	public String getToDate() {
		return toDate;
	}

	public void setToDate(String toDate) {
		this.toDate = toDate;
	}

	public String getLeaderCode() {
		return leaderCode;
	}
	
	public void setLeaderCode(String leaderCode) {
		this.leaderCode = leaderCode;
	}
    
	public String getCaptainCode() {
		return captainCode;
	}
	
	public void setCaptainCode(String captainCode) {
		this.captainCode = captainCode;
	}

	public String getUpdatedDate() {
		return updatedDate;
	}

	public void setUpdatedDate(String updatedDate) {
		this.updatedDate = updatedDate;
	}

	
	/** Task id */
    private int idTask = 0;

    /** Task 코드 */
    private String taskCode = "";

    /** Task 명 */
    private String taskName = "";
    
    /** 대표담당 */
    private String rprsnttvEmplNo = "";

    /** issueText */
    private String issueText = "";
    
    public int getIdTask() {
		return idTask;
	}

	public void setIdTask(int idTask) {
		this.idTask = idTask;
	}


	public String getTaskCode() {
		return taskCode;
	}

	public void setTaskCode(String taskCode) {
		this.taskCode = taskCode;
	}

	public String getTaskName() {
		return taskName;
	}

	public void setTaskName(String taskName) {
		this.taskName = taskName;
	}

	public String getRprsnttvEmplNo() {
		return rprsnttvEmplNo;
	}

	public void setRprsnttvEmplNo(String rprsnttvEmplNo) {
		this.rprsnttvEmplNo = rprsnttvEmplNo;
	}

	public String getIssueText() {
		return issueText;
	}

	public void setIssueText(String issueText) {
		this.issueText = issueText;
	}

	/** Unit 권한 */
	private String unitAuthorities = "";
 
	public String getUnitAuthorities() {
		return unitAuthorities;
	}

	public void setUnitAuthorities(String unitAuthorities) {
		this.unitAuthorities = unitAuthorities;
	}

    /** 사용자 사번 */
	private String userCode = "";

	public String getUserCode() {
		return userCode;
	}
	
	public void setUserCode(String userCode) {
		this.userCode = userCode;
	}

	private int idReport = 0;
	
	public int getIdReport() {
		return idReport;
	}

	public void setIdReport(int idReport) {
		this.idReport = idReport;
	}
	
	/** User 코드 */
	private int idUser = 0;  

	public int getIdUser() {
		return idUser;
	}
	
	public void setIdUser(int idUser) {
		this.idUser = idUser;
	}
	
	/** clientPrivateIp 코드 */
	private String clientPrivateIp = "";
	
	public String getClientPrivateIp() {
		return clientPrivateIp;
	}
	
	public void setClientPrivateIp(String clientPrivateIp) {
		this.clientPrivateIp = clientPrivateIp;
	}

	/* Notification ----------------------------------------------------------------------------------*/
	private int idNotification = 0;
//    private int idUser = 0;
//    private String userCode = "";
//    private String unitCode = "";
//    private int idTask = 0;
//    private String taskCode = "";
    private String confirmYn = "";
//    private String updatedDate = "";
    private String notiDesc = "";
    private String notiPsitnName  = "";
    private String notiUnitName  = "";
    private String notiTaskName  = "";
    private String notiTaskFromDate  = "";
    private String notiTaskToDate  = "";
    private String notiCreateDate = "";
	/*//Notification ----------------------------------------------------------------------------------*/


	public int getIdNotification() {
		return idNotification;
	}

	public void setIdNotification(int idNotification) {
		this.idNotification = idNotification;
	}

	public String getConfirmYn() {
		return confirmYn;
	}

	public void setConfirmYn(String confirmYn) {
		this.confirmYn = confirmYn;
	}

	public String getNotiDesc() {
		return notiDesc;
	}

	public void setNotiDesc(String notiDesc) {
		this.notiDesc = notiDesc;
	}

	public String getNotiPsitnName() {
		return notiPsitnName;
	}

	public void setNotiPsitnName(String notiPsitnName) {
		this.notiPsitnName = notiPsitnName;
	}

	public String getNotiUnitName() {
		return notiUnitName;
	}

	public void setNotiUnitName(String notiUnitName) {
		this.notiUnitName = notiUnitName;
	}

	public String getNotiTaskName() {
		return notiTaskName;
	}

	public void setNotiTaskName(String notiTaskName) {
		this.notiTaskName = notiTaskName;
	}

	public String getNotiTaskFromDate() {
		return notiTaskFromDate;
	}

	public void setNotiTaskFromDate(String notiTaskFromDate) {
		this.notiTaskFromDate = notiTaskFromDate;
	}

	public String getNotiTaskToDate() {
		return notiTaskToDate;
	}

	public void setNotiTaskToDate(String notiTaskToDate) {
		this.notiTaskToDate = notiTaskToDate;
	}

	public String getNotiCreateDate() {
		return notiCreateDate;
	}

	public void setNotiCreateDate(String notiCreateDate) {
		this.notiCreateDate = notiCreateDate;
	}

	
    /** 등록자 */
    private String regUser = "";
    public String getRegUser() {
        return regUser;
    }

    public void setRegUser(String regUser) {
        this.regUser = regUser;
    }    
    /** 등록일시 */
    private String regDate = "";

    /** 수정자 */
    private String updatedUser = "";
	public String getRegDate() {
		return regDate;
	}

	public void setRegDate(String regDate) {
		this.regDate = regDate;
	}

	public String getUpdatedUser() {
		return updatedUser;
	}

	public void setUpdatedUser(String updatedUser) {
		this.updatedUser = updatedUser;
	}

	/** 노출여부 */
	private String showYn = "Y";


	public String getShowYn() {
		return showYn;
	}

	public void setShowYn(String showYn) {
		this.showYn = showYn;
	}
}
