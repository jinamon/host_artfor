import { configure, makeAutoObservable } from "mobx";
import axios from "axios";
import { axiosError } from "./common.js";
//import, 무조건 붙이면 워닝 사라지게
configure({
  enforceActions: "never",
  useProxies: "never",
});

export default class MembersStore {
  constructor() {
    //감시대상자? 재랜더링
    makeAutoObservable(this);
  }
  //this
  members = [];
  member = {
    user_name: "",
    user_email: "",
    user_address: "",
    user_phone :"",
    user_role : "",
    user_photo : "",
  };


  membersRead() {
    axios
      .get("http://192.168.0.31/app/user/userList.do")
      .then((response) => {
        console.log("Done membersRead", response);
        // this.members = response.data.members;
        this.members = response.data;
      })
      .catch((error) => {
        axiosError(error);
      });
  }

}
export const membersStore = new MembersStore();
