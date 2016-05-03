CREATE TABLE `Task` (
  `IdTask` int(11) NOT NULL AUTO_INCREMENT,
  `UnitCode` varchar(255) DEFAULT NULL,
  `TaskCode` varchar(255) DEFAULT NULL,
  `TaskName` varchar(255) DEFAULT NULL,
  `Progress` int(11) DEFAULT NULL,
  `SignalCode` varchar(255) DEFAULT NULL,
  `AlramCode` varchar(255) DEFAULT NULL,
  `IssueText` varchar(255) DEFAULT NULL,
  `FromDate` varchar(255) DEFAULT NULL,
  `ToDate` varchar(255) DEFAULT NULL,
  `RprsnttvEmplNo` varchar(45) DEFAULT NULL COMMENT '대표담당',
  PRIMARY KEY (`IdTask`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

INSERT INTO `devjesoos`.`Task` (`IdTask`, `UnitCode`, `TaskCode`, `TaskName`, `Progress`, `SignalCode`, `AlramCode`, `IssueText`, `FromDate`, `ToDate`, `RprsnttvEmplNo`) VALUES ('1', '1', '1', '핀테크 설립 WBS 작성', '50', 'Y', 'B', '이슈가 있습니다.\\n 이슈의 내용은 이것입니다.\\n처리될 수 있도록 최선을 다 하고 있습니다.', '20160125', '20160305', '최한화');
INSERT INTO `devjesoos`.`Task` (`IdTask`, `UnitCode`, `TaskCode`, `TaskName`, `Progress`, `SignalCode`, `AlramCode`, `IssueText`, `FromDate`, `ToDate`, `RprsnttvEmplNo`) VALUES ('2', '1', '1', '핀테크 설립 WBS 작성', '50', 'Y', 'B', '이슈가 있습니다.\\n 이슈의 내용은 이것입니다.\\n처리될 수 있도록 최선을 다 하고 있습니다.', '20160125', '20160305', '최한화');
INSERT INTO `devjesoos`.`Task` (`IdTask`, `UnitCode`, `TaskCode`, `TaskName`, `Progress`, `SignalCode`, `AlramCode`, `IssueText`, `FromDate`, `ToDate`, `RprsnttvEmplNo`) VALUES ('3', '2', '1', '핀테크 설립 WBS 작성', '100', 'Y', 'B', '이슈가 있습니다.\\n 이슈의 내용은 이것입니다.\\n처리될 수 있도록 최선을 다 하고 있습니다.', '20160125', '20160305', '최한화');
INSERT INTO `devjesoos`.`Task` (`IdTask`, `UnitCode`, `TaskCode`, `TaskName`, `Progress`, `SignalCode`, `AlramCode`, `IssueText`, `FromDate`, `ToDate`, `RprsnttvEmplNo`) VALUES ('4', '2', '1', '핀테크 설립 WBS 작성', '50', 'Y', 'B', '이슈가 있습니다.\\n 이슈의 내용은 이것입니다.\\n처리될 수 있도록 최선을 다 하고 있습니다.', '20160125', '20160305', '최한화');
INSERT INTO `devjesoos`.`Task` (`IdTask`, `UnitCode`, `TaskCode`, `TaskName`, `Progress`, `SignalCode`, `AlramCode`, `IssueText`, `FromDate`, `ToDate`, `RprsnttvEmplNo`) VALUES ('5', '2', '1', '핀테크 설립 WBS 작성', '50', 'Y', 'B', '이슈가 있습니다.\\n 이슈의 내용은 이것입니다.\\n처리될 수 있도록 최선을 다 하고 있습니다.', '20160125', '20160305', '최한화');
INSERT INTO `devjesoos`.`Task` (`IdTask`, `UnitCode`, `TaskCode`, `TaskName`, `Progress`, `SignalCode`, `AlramCode`, `IssueText`, `FromDate`, `ToDate`, `RprsnttvEmplNo`) VALUES ('6', '2', '1', '핀테크 설립 WBS 작성', '50', 'Y', 'B', '이슈가 있습니다.\\n 이슈의 내용은 이것입니다.\\n처리될 수 있도록 최선을 다 하고 있습니다.', '20160125', '20160305', '최한화');
INSERT INTO `devjesoos`.`Task` (`IdTask`, `UnitCode`, `TaskCode`, `TaskName`, `Progress`, `SignalCode`, `AlramCode`, `IssueText`, `FromDate`, `ToDate`, `RprsnttvEmplNo`) VALUES ('7', '3', '1', '핀테크 설립 WBS 작성', '50', 'Y', 'B', '이슈가 있습니다.\\n 이슈의 내용은 이것입니다.\\n처리될 수 있도록 최선을 다 하고 있습니다.', '20160125', '20160305', '최한화');
INSERT INTO `devjesoos`.`Task` (`IdTask`, `UnitCode`, `TaskCode`, `TaskName`, `Progress`, `SignalCode`, `AlramCode`, `IssueText`, `FromDate`, `ToDate`, `RprsnttvEmplNo`) VALUES ('8', '3', '1', '핀테크 설립 WBS 작성', '50', 'Y', 'B', '이슈가 있습니다.\\n 이슈의 내용은 이것입니다.\\n처리될 수 있도록 최선을 다 하고 있습니다.', '20160125', '20160305', '최한화');
INSERT INTO `devjesoos`.`Task` (`IdTask`, `UnitCode`, `TaskCode`, `TaskName`, `Progress`, `SignalCode`, `AlramCode`, `IssueText`, `FromDate`, `ToDate`, `RprsnttvEmplNo`) VALUES ('9', '4', '1', '핀테크 설립 WBS 작성', '50', 'Y', 'B', '이슈가 있습니다.\\n 이슈의 내용은 이것입니다.\\n처리될 수 있도록 최선을 다 하고 있습니다.', '20160125', '20150205', '최한화');
