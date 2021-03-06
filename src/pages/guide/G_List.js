import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import G_Detail from "./G_Detail";
import "./list.css";
import { FcOnlineSupport } from "react-icons/fc";
import { GoSearch } from "react-icons/go";
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ListTabs from "./ListTabs";


function List(props) {

  // 운영자만 글쓰기 가능
  const token = localStorage.getItem('token');
  const user_name = localStorage.getItem('name');

  console.log('토큰 : ', token);
  console.log('유저 권한 : ', user_name);

  //Tab 관련
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Guide 게시판 검색관련
  const [searchKeyword, setSearchKeyword] = useState("");
  const [keyField, setKeyField] = useState("");

  useEffect(() => {


    axios
      .get("http://192.168.0.31/app/guide/list.do")
      .then((result) => {
        let dataA = result.data.list2;
        let dataACopy = [...dataA];
        props.setData(dataACopy);
      })
      .catch((err) => {
      });
  }, []);

  return (
    <div className="container-guide">
      <Link to="/guide/G_List">
      <h3 className="page-name">
        <FcOnlineSupport size='40' style={{ marginRight: '5px' }}/>
        artfor 헬프센터
        <FcOnlineSupport size='40' style={{ marginLeft: '5px' }}/>
      </h3>
      </Link>

      <div style={{ fontSize : '14px', color : '#a8a8a8', marginBottom: '30px' }}>궁금한 점을 검색해보세요!</div>

<div style={{ borderBottom : '1px solid #e8e8e8', marginBottom : '30px' }}>
      <div style={{borderBottom:'1px solid #e8e8e8', borderTop:'1px solid #e8e8e8', paddingTop: '10px'}}>
        <div className="tab-box">
          <AntTabs value={value} onChange={handleChange} aria-label="ant example">
            <AntTab label="전체"/>
            <AntTab label="아트포 일반"/>
            <AntTab label="후원자 질문"/>
            <AntTab label="프로젝트 올리기"/>
            <AntTab label="시작하고 알리기"/>
          </AntTabs>
        </div>
      </div>

      <br />
      <br />
      <ListTabs value={value} setValue={setValue} data={props.data} setData={props.setData} 
      searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword} 
      keyField={keyField} setKeyField={setKeyField} />
</div>
        {
          (user_name == '관리자' && token)
          ? <div>
          <Link to="/guide/G_Input">
            <Button className="guide-writeBtn" variant="dark">
              글쓰기
            </Button>
          </Link>
          </div>
          : <div></div>
        }
        
      </div>
  );
}

// Tab styled componentff
const AntTabs = styled(Tabs)({
  // borderBottom: '1px solid #e8e8e8',
  '& .MuiTabs-indicator': {
    backgroundColor: '#323232',
  },
});

const AntTab = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => ({
  textTransform: 'none',
  minWidth: 200,
  [theme.breakpoints.up('sm')]: {
    minWidth: 200,
  },
  fontWeight: theme.typography.fontWeightRegular,
  marginRight: theme.spacing(1),
  color: '#a0a0a0',
  fontSize: '20px',
  fontFamily: [
    '"NanumSquareB"',
  ].join(','),
  '&:hover': {
    color: '#323232',
    fontFamily: "NanumSquareEB",
    opacity: 1,
  },
  '&.Mui-selected': {
    color: '#323232',
    fontFamily: "NanumSquareEB",
    fontWeight: theme.typography.fontWeightMedium,
  },
  '&.Mui-focusVisible': {
    backgroundColor: '#d1eaff',
  },
}));

export default List;