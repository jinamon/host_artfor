import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./list.css";

function G_List_practice(props) {

    // Guide 게시판 검색관련2
    const [searchKeyword, setSearchKeyword] = useState("");
    const [keyField, setKeyField] = useState("");
  
    let [제목, 제목변경] = useState([
      "아트포(artfor)는 무엇인가요?",
      "크라우드펀딩과 후원이란 무엇인가요?",
      "펀딩 수수료는 얼마인가요?",
      "지식재산권 침해 신고 가이드",
    ]);

  
    useEffect(() => {
      console.log(">>> G_list로 들어옴");

  
      axios
        .get("http://192.168.0.31/app/guide/list.do")
        .then((result) => {
          console.log("ajax 요청 성공함");
          console.log("result >>> ", result);
  
          let dataA = result.data.list2;
          console.log("dataA >>>>>>>>>>>", dataA);
          let dataACopy = [...dataA];
          props.setData(dataACopy);
          console.log("props.data >>> ", props.data)
          // setList([...dataA]);
          // console.log("list >>>>",list);
          
        })
        .catch((err) => {
          console.log("err >>> ", err);
          console.log("ajax 요청 실패함", err);
        });
    }, []);
  
    const onChange = (e) => {
      let name = e.target.name;
      let value = e.target.value;
  
      if (name === "searchKeyword") {
        setSearchKeyword(value);
      }
      if (name === "keyField") {
        setKeyField(value);
      }
    };
  
    return (
      <div className="container-guide">
        <h3 className="page-name">이용안내 게시판</h3>
        <div>
          <Link to="/guide/G_Input">
            <Button className="guide-writeBtn" variant="dark">
              글쓰기
            </Button>
          </Link>
        </div>
        <div className="searchBox">
              검색 
              <input type="text" name="searchKeyword" onChange={onChange} />
        </div>
  
        <div className="div-guide">
            <div className="div-guide-list-1">   
              <div>
              
              {
                props.data.map((d, i) => {
                  
                  return (
                    <div key={i}>
                      <Link to={`/guide/G_Detail/${d.g_no}`}><h3>{d.g_title}</h3></Link>
                      <p>{d.g_day} 발행</p>
                    </div>
                  );
                })
              }
  
              </div>
  
  
            </div>
         </div>

         </div>
    );
  }
  
  function ModalPage(props) {
    console.log("props.데이터 >>>> ", props.데이터);
       
      return (
        <div>
          {props.데이터[0].g_no}
          {props.데이터[0].g_title}
          {props.데이터[0].g_content}
          {props.데이터[0].g_writer}
        </div>
      )
        
  }


export default G_List_practice;
