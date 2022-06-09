import React from 'react';
import {useNavigate} from "react-router-dom";
import {signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "./firebase";


const Login = (props) => {


  const checkemail = ()=> {
    let email =/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    if (_email.current.value.match(email)) {
      return checkpw();
    } else {
      alert("Invalid email address")
      return false;
    }
  };

  const checkpw = ()=> {
    let password = /^[a-zA-Z0-9!@#$%^&*]{8,16}$/;
    if (_pw.current.value.match(password)) {
      return login();
    } else {
      alert("Password: between 8-16 characters")
      navigate('/join')
      return false
    }
  };

  const login = async()=> {
    const user = await signInWithEmailAndPassword(auth, _email.current.value, _pw.current.value)
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage, errorCode);
      alert(errorMessage);
      navigate('/login');
    });  
    console.log(user);
    navigate('/');
    alert("You have successfully signed in!")
  }

  const navigate = useNavigate();

  const _email = React.useRef(null);
  const _pw = React.useRef(null);


  return (
    <div className="containersm">
      <div className="form_wrapper topmg100">
          <label className='boldtext'>Email</label>
          <input type="text" ref={_email}></input>
          <label className='boldtext'>PW</label>
          <input type="password" ref={_pw}></input>
      </div>
         <div className='btn lg-btn boldtext' onClick={()=>{
           checkemail()
           }}>Login</div>
         <p className="primary-color">if you are not a member</p>
         <div className='btn lg-btn boldtext' onClick={()=>{
           navigate('/join')
           }}>Join</div>
    </div>
  )
}

export default Login;
