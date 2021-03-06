import axios from "axios";
import { inject, observer } from "mobx-react";
import { useEffect, useState } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import { axiosError } from "../../../stores/common";

function EmailAuthModal(props){
    const { membersStore } = props;
    const { members, member } = membersStore;
    const email = props.email;

    const [auth, setAuth] = useState('');
    const [condition, setCondition] = useState();

    const sendValue = () => {
        props.middleValue(false);
    }

    const onChange = (e) => {
        const {value} = e.target;
        const onlyNumber = value.replace(/[^0-9]/g, '');
        setAuth(onlyNumber);
    };

    const onClick = (e) => {
        e.preventDefault();
        console.log("auth값은? : ", auth);

        if (auth === "") {
          setCondition(2);
          return false;
        }
    
        let auth2 = auth;
        axios.post("http://192.168.0.31/app/user/confirmNum", auth2)
        .then((response2) => {
            console.log("testNum : ", auth2);
            console.log("confirmNum post ", response2);
            const result2 = response2.data;
            console.log("result", result2);

            let emaildate = {
                user_name : member.user_name,
                user_email : email
            }

            if (result2 === 1) {
                // alert("인증 완료!");
                
                axios.post("http://192.168.0.31/app/user/emailupdate", emaildate)
                .then((response3)=>{
                    setCondition(4);
                    console.log("update통신성공", response3);
                    member.user_email = email;
                    sendValue(); 
                    localStorage.setItem('email',email);
                    alert("인증 완료! 이메일이 변경되었습니다.");
                })
                .catch((error)=>{
                    console.log("update통신 실패 ㅠㅠ");
                })
    
            } else {
               setCondition(3);
               return false;
            }

        })
        .catch((error) => {
            axiosError(error);
        });
    }
    return (
        <div>
            <form >
                <InputGroup style={{width:'40%', float:'left'}}>
                    <FormControl
                    style={{transform: "skew(-0.1deg)"}}
                    type="text"
                    spellCheck="false"
                    placeholder="인증번호 입력"
                    value={auth}
                    onChange={onChange}
                    />
                </InputGroup>
                <Button variant="dark" style={{marginLeft:'15px',  width:'120px', transform: "skew(-0.1deg)"}} onClick={onClick} >인증번호 확인</Button>
                {condition === 1
                && <></>}
                {condition === 2
                && <p style={{ marginTop:'10px', color:'red', fontSize:'13px', transform: "skew(-0.1deg)" }}>인증번호를 입력해주세요</p>
                }
                {condition === 3
                && <p style={{ marginTop:'10px', color:'red', fontSize:'13px', transform: "skew(-0.1deg)" }}>인증번호가 일치하지 않습니다.</p>
                }
                {condition === 4
                && <p style={{ marginTop:'10px', color:'blue', fontSize:'13px', transform: "skew(-0.1deg)" }}>인증 성공</p>
                }
            </form>
        </div>
    )
}

export default inject("membersStore")(observer(EmailAuthModal));