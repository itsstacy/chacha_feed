import React from 'react';
import {useNavigate} from "react-router-dom";
import {createUserWithEmailAndPassword } from "firebase/auth";
import {auth, db} from "./firebase";
import {collection, addDoc} from "firebase/firestore";

const Signup = (props) => {
  const navigate = useNavigate();

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
      return signup();
    } else {
      alert("Password: between 8-16 characters")
      navigate('/join')
      return false
    }
  };

  const signup = async()=> {
    const user = await createUserWithEmailAndPassword(auth, _email.current.value, _pw.current.value)
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage, errorCode);
      alert(errorMessage);
      navigate('/join');
    });

    console.log(user);
    navigate('/')
    alert("Welcome!")
    const user_doc = await addDoc(collection(db,"users"),{
      email: _email.current.value,
      password: _pw.current.value,
      username: _name.current.value,
      userimg: _img.current.value
    });
    console.log(user_doc);

  };

  const _img = React.useRef(null);
  const _email = React.useRef(null);
  const _name = React.useRef(null);
  const _pw = React.useRef(null);
  const _pw2 = React.useRef(null);

  return (
    <div className="containersm">
    <div className="form_wrapper">
       
        <label className='boldtext topmg50'>Email</label>
        <input type="text" ref={_email} placeholder="email only"></input>
        <label className='boldtext'>Name</label>
        <input type="text" ref={_name}></input>
        <label className='boldtext'>PW</label>
        <input type="password" ref={_pw} placeholder="8-16 characters"></input>
        <label className='boldtext'>PW confirm</label>
        <input type="password" ref={_pw2} placeholder="8-16 characters"></input>
    </div>
       <div className='btn lg-btn boldtext'onClick={()=>{
          checkemail()
          }}>Register</div>
  </div>

  )
}

export default Signup;