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

import antlr.collections.List;

/**  
 * @Class Name : SampleVO.java
 * @Description : SampleVO Class
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
public class SampleVO extends SampleDefaultVO {
	
    private static final long serialVersionUID = 1L;
    
    /** 아이디 */
    private String id;
    
    /** 이름 */
    private String name;
    
    /** 내용 */
    private String description;
    
    /** 사용여부 */
    private String useYn;
    
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUseYn() {
        return useYn;
    }

    public void setUseYn(String useYn) {
        this.useYn = useYn;
    }

	/** 사용자 이름*/
	private String userName = "";
	
	/** 사용자 이메일*/
	private String userEmail = "";
	
	/** 사용자 전화번호*/
	private String userTel = "";
	
	/** 사용자 위치(외근,출장  etc)*/
	private String userStateCode = "";
	
	/** 리더 이메일*/
	private String leaderEmail = "";
	
	/** 리더 전화번호*/
	private String leaderTel = "";
	
	/** 캡틴 이메일*/
	private String captainEmail = "";
	
	/** 캡틴 전화번호*/
	private String captainTel = "";
	
	/** 리더/캡틴 상태 */
	private String leaderStateCode = "";
	private String leaderStateFrom = "";
	private String leaderStateTo = "";
	private String leaderStateTime = "";
	private String captainStateCode = "";
	private String captainStateFrom = "";
	private String captainStateTo = "";
	private String captainStateTime = "";

	/** 담당자 대표 상태 */	
	private String firstPartnerIdUser = "";
	private String firstPartnerUserCode = "";
	private String firstPartnerStateCode = "";
	private String firstPartnerStateFrom = "";
	private String firstPartnerStateTo = "";
	private String firstPartnerStateTime = "";
	/** //담당자 대표 상태 */
	
	
	public String getUserName() {
		return userName;
	}
	
	public void setUserName(String userName) {
		this.userName = userName;
	}	
	
	public String getUserEmail() {
		return userEmail;
	}
	
	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}
	
	public String getUserTel() {
		return userTel;
	}
	
	public void setUserTel(String userTel) {
		this.userTel = userTel;
	}
	
	public String getUserStateCode() {
		return userStateCode;
	}
	
	public void setUserStateCode(String userStateCode) {
		this.userStateCode = userStateCode;
	}

	public String getLeaderEmail() {
		return leaderEmail;
	}

	public void setLeaderEmail(String leaderEmail) {
		this.leaderEmail = leaderEmail;
	}

	public String getLeaderTel() {
		return leaderTel;
	}

	public void setLeaderTel(String leaderTel) {
		this.leaderTel = leaderTel;
	}

	public String getCaptainEmail() {
		return captainEmail;
	}

	public void setCaptainEmail(String captainEmail) {
		this.captainEmail = captainEmail;
	}

	public String getCaptainTel() {
		return captainTel;
	}

	public void setCaptainTel(String captainTel) {
		this.captainTel = captainTel;
	}

	private int idTaskPartner = 0;

	public int getIdTaskPartner() {
		// TODO Auto-generated method stub
		return idTaskPartner;
	}
	
	public void setIdTaskPartner(int idTaskPartner) {
		// TODO Auto-generated method stub
		this.idTaskPartner = idTaskPartner;
	}
	
	
	private String repoDate = "";
	
	private int repoDateHour = 0;
	
	private int repoDateMin = 0;
	
	private String repoUserCode = "";
	
	private String repoMembers = "";
	
	private String repoDesc = "";



	public String getRepoDate() {
		return repoDate;
	}

	public void setRepoDate(String repoDate) {
		this.repoDate = repoDate;
	}

	public int getRepoDateHour() {
		return repoDateHour;
	}

	public void setRepoDateHour(int repoDateHour) {
		this.repoDateHour = repoDateHour;
	}

	public int getRepoDateMin() {
		return repoDateMin;
	}

	public void setRepoDateMin(int repoDateMin) {
		this.repoDateMin = repoDateMin;
	}

	public String getRepoUserCode() {
		return repoUserCode;
	}

	public void setRepoUserCode(String repoUserCode) {
		this.repoUserCode = repoUserCode;
	}

	public String getRepoMembers() {
		return repoMembers;
	}

	public void setRepoMembers(String repoMembers) {
		this.repoMembers = repoMembers;
	}

	public String getRepoDesc() {
		return repoDesc;
	}

	public void setRepoDesc(String repoDesc) {
		this.repoDesc = repoDesc;
	}
	
	private int idUnitPartner = 1;
	private String typeCode = "";


	public int getIdUnitPartner() {
		return idUnitPartner;
	}

	public void setIdUnitPartner(int idUnitPartner) {
		this.idUnitPartner = idUnitPartner;
	}

	public String getTypeCode() {
		return typeCode;
	}

	public void setTypeCode(String typeCode) {
		this.typeCode = typeCode;
	}
	
	private String repYn = "N";


	public String getRepYn() {
		return repYn;
	}

	public void setRepYn(String repYn) {
		this.repYn = repYn;
	}
	
    /** 페이스북 계정 */
    private String fbID = null;
    
    /** Access Token */
    private String accessToken = null;

	public String getFbID() {
		return fbID;
	}

	public void setFbID(String fbID) {
		this.fbID = fbID;
	}

	public String getAccessToken() {
		return accessToken;
	}

	public void setAccessToken(String accessToken) {
		this.accessToken = accessToken;
	}
	private String userStateFrom;

	private String userStateTo;
	
	private String userStateTime;
	


	public String getUserStateFrom() {
		return userStateFrom;		
	}

	public void setUserStateFrom(String userStateFrom) {
		this.userStateFrom = userStateFrom;		
	}
    
	public String getUserStateTo() {
		return userStateTo;		
	}

	public void setUserStateTo(String userStateTo) {
		this.userStateTo = userStateTo;		
	}

	public String getUserStateTime() {
		return userStateTime;		
	}

	public void setUserStateTime(String userStateTime) {
		this.userStateTime = userStateTime;		
	}

	/** 확정여부 */
	private String confirmYn = "N";

	public String getConfirmYn() {
		return confirmYn;
	}

	public void setConfirmYn(String confirmYn) {
		this.confirmYn = confirmYn;
	}
	
	//자기 자신을 참조하여 리스트를 리턴하도록 한다.
	private List sampleVOList;
	public List getSampleVOList() {
		return sampleVOList;
	}

	public void setSampleVOList(List sampleVOList) {
		this.sampleVOList = sampleVOList;
	}

	public String getLeaderStateCode() {
		return leaderStateCode;
	}

	public void setLeaderStateCode(String leaderStateCode) {
		this.leaderStateCode = leaderStateCode;
	}

	public String getLeaderStateFrom() {
		return leaderStateFrom;
	}

	public void setLeaderStateFrom(String leaderStateFrom) {
		this.leaderStateFrom = leaderStateFrom;
	}

	public String getLeaderStateTo() {
		return leaderStateTo;
	}

	public void setLeaderStateTo(String leaderStateTo) {
		this.leaderStateTo = leaderStateTo;
	}

	public String getLeaderStateTime() {
		return leaderStateTime;
	}

	public void setLeaderStateTime(String leaderStateTime) {
		this.leaderStateTime = leaderStateTime;
	}

	public String getCaptainStateCode() {
		return captainStateCode;
	}

	public void setCaptainStateCode(String captainStateCode) {
		this.captainStateCode = captainStateCode;
	}

	public String getCaptainStateFrom() {
		return captainStateFrom;
	}

	public void setCaptainStateFrom(String captainStateFrom) {
		this.captainStateFrom = captainStateFrom;
	}

	public String getCaptainStateTo() {
		return captainStateTo;
	}

	public void setCaptainStateTo(String captainStateTo) {
		this.captainStateTo = captainStateTo;
	}

	public String getCaptainStateTime() {
		return captainStateTime;
	}

	public void setCaptainStateTime(String captainStateTime) {
		this.captainStateTime = captainStateTime;
	}

	public String getFirstPartnerIdUser() {
		return firstPartnerIdUser;
	}

	public void setFirstPartnerIdUser(String firstPartnerIdUser) {
		this.firstPartnerIdUser = firstPartnerIdUser;
	}

	public String getFirstPartnerUserCode() {
		return firstPartnerUserCode;
	}

	public void setFirstPartnerUserCode(String firstPartnerUserCode) {
		this.firstPartnerUserCode = firstPartnerUserCode;
	}

	public String getFirstPartnerStateCode() {
		return firstPartnerStateCode;
	}

	public void setFirstPartnerStateCode(String firstPartnerStateCode) {
		this.firstPartnerStateCode = firstPartnerStateCode;
	}

	public String getFirstPartnerStateFrom() {
		return firstPartnerStateFrom;
	}

	public void setFirstPartnerStateFrom(String firstPartnerStateFrom) {
		this.firstPartnerStateFrom = firstPartnerStateFrom;
	}

	public String getFirstPartnerStateTo() {
		return firstPartnerStateTo;
	}

	public void setFirstPartnerStateTo(String firstPartnerStateTo) {
		this.firstPartnerStateTo = firstPartnerStateTo;
	}

	public String getFirstPartnerStateTime() {
		return firstPartnerStateTime;
	}

	public void setFirstPartnerStateTime(String firstPartnerStateTime) {
		this.firstPartnerStateTime = firstPartnerStateTime;
	}
	
	/** 로그인 일시 */
	private String loginDate = "";
	
	public String getLoginDate() {
		return loginDate;
	}

	public void setLoginDate(String loginDate) {
		this.loginDate = loginDate;
	}
	
}
