

--권한 확인 시 사용 
SELECT
	IFNULL(a.leaderCode, 'MEMBER')
	AS UnitAuthorities
    , (UTC_DATE() + 0)
    , a.unitName
    , fromDate
    , toDate
    , count(a.leaderCode) as leaderCount
FROM Unit a
WHERE 1=1
	AND  'hyunmyung.cho31@gmail.com' IN (leaderCode,captainCode)
    AND  (UTC_DATE() + 0) between fromDate AND toDate


 
-- 이름에 DB 명칭 적용     
UPDATE User
SET
userName = CONCAT(userName, '-[개발DB]')
WHERE userCode = "jesoosg@gmail.com";


