import { configure, makeAutoObservable } from "mobx";
import axios from "axios";
import { axiosError } from "./common.js";
import { Route, useParams } from "react-router";
//import, 무조건 붙이면 워닝 사라지게
configure({
  enforceActions: "never",
  useProxies: "never",
});

export default class MainStore {
  constructor() {
    //감시대상자? 재랜더링
    makeAutoObservable(this);
  }
  //this//
  works = [];
  work = {
    work_no: "",
    work_title: "",
    work_img: "",
    work_content: "",
    artist_id: "",
    funding_like: "",
    funding_deadline: "",
    funding_goal: "",
    funding_now: "",
    supporters: "",
    artist_name: "",
    funding_today: "",
    funding_status: "",
    funding_startline: "",
  };

  

  worksRead() {
    axios
      .get("http://192.168.0.31/app/")
      .then((response) => {
        console.log("성공");
        console.log("Done worksRead", response);
        this.works = response.data;
        console.log("this.works>>", this.works);
      })
      .catch((error) => {
        console.log("실패");
        axiosError(error);
      });
  }

//좋아요 순 출력
  worksReadSort() {
    
    axios
      .get("http://192.168.0.31/app/sortLike")
      .then((response) => {
        console.log("성공");
        console.log("Done worksReadSort", response);
        this.works = response.data;
        console.log("this.works>>", this.works);
      })
      .catch((error) => {
        console.log("worksReadSort 실패");
        axiosError(error);
      });
  }
 
  getWork(index) {
    axios
    .get("http://192.168.0.31/app/detail/", {
    params:{
      work_no : index,
    }
    })
      .then((response) => {
        console.log("DoneDetail", response); //response가 null이 뜸...
        this.works.work_no = index;
        console.log('index>>', index);
        console.log('response.data>>', response.data);
      })
      .catch((error) => {
        axiosError(error);
        console.log('getWork실패!');
      });
  }

  likePlus(index){
    axios.get("http://192.168.0.31/app/likePlus/", {
      params: {
        work_no : index,
      }
    })
    .then((response)=>{
      console.log('likePlus axious...')
      console.log('response.data>>>>>', response.data)
    })
    .catch((error)=>{
      axiosError(error);
      console.log('likePlus실패...')
    });
  }

  likeMinus(index){
    axios.get("http://192.168.0.31/app/likeMinus/", {
      params: {
        work_no : index,
      }
    })
    .then((response)=>{
      console.log('likeMinus axious...')
    })
    .catch((error)=>{
      axiosError(error);
      console.log('likeMinus실패...')
    });
  }

  likePlusMinusUser(){
    const data = {work_no: localStorage.getItem('work_no'), user_email: localStorage.getItem('user_email')}
    console.log("likePlusMinusUser 데이터>>", data)
    axios
    .post("http://192.168.0.31/app/likePlusMinusUser/", data )
    .then((response)=>{
      console.log('likePlusMinusUser axious Success...')
      console.log('response>>', response);
      //localStorage.setItem("like_no", response.data.like_no);
    
    })
    .catch((error)=>{
      axiosError(error);
      console.log('likePlusMinusUser Fail...');
      
    });
  }

  AlarmPlusMinusUser(){
    const data = {work_no: localStorage.getItem('work_no'), user_email: localStorage.getItem('user_email')}
    console.log("AlarmPlusMinusUser 데이터>>", data)
    axios
    .post("http://192.168.0.31/app/AlarmPlusMinusUser/", data )
    .then((response)=>{
      console.log('AlarmPlusMinusUser axious Success...')
      console.log('response>>', response);
      //localStorage.setItem("like_no", response.data.like_no);
    
    })
    .catch((error)=>{
      axiosError(error);
      console.log('AlarmPlusMinusUser Fail...');
      
    });
  }

  AlarmPlus(index){
    axios.get("http://192.168.0.31/app/AlarmPlus/", {
      params: {
        work_no : index,
      }
    })
    .then((response)=>{
      console.log('AlarmPlus axious success...')
      console.log('response.data>>>>>', response.data)
    })
    .catch((error)=>{
      axiosError(error);
      console.log('AlarmPlus...')
    });
  }

  AlarmMinus(index){
    axios.get("http://192.168.0.31/app/AlarmMinus/", {
      params: {
        work_no : index,
      }
    })
    .then((response)=>{
      console.log('AlarmMinus axious success...')
    })
    .catch((error)=>{
      axiosError(error);
      console.log('AlarmMinus fail...')
    });
  }

}
export const mainStore = new MainStore();
