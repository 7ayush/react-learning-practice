import React, { useState, useEffect, useReducer, useRef, useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import AuthContext from '../../store/AuthContext';

const emailReducer = (state, action) =>{
  if(action.type ==="USER_INPUT"){
    return {value : action.val, isValid : action.val.includes('@')};
  }
  else if(action.type === "INPUT_BLUR"){
    return {value :state.value, isValid : state.value.includes('@')};
  }
  return state; 
};

const passwordReducer = (state, action) =>{
  if(action.type ==="USER_INPUT"){
    return {value : action.val, isValid : action.val.trim().length>6};
  }
  else if(action.type === "INPUT_BLUR"){
    return {value :state.value, isValid : state.value.trim().length>6};
  }
  return state; 
};


const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const ctx = useContext(AuthContext);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value : '',
    isValid : false
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value : '',
    isValid : false
  });

  const {isValid : emailIsValid} = emailState;
  const {isValid : passwordIsValid} = passwordState;

  useEffect(()=>{    
    const identifier = setTimeout(()=>{
      console.log('checking');
      setFormIsValid(
        emailIsValid && passwordIsValid
      );
    },500);
    return ()=>{
      console.log('CLEANUP');
      clearInterval(identifier);
    };
  },[emailIsValid,passwordIsValid]);



  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);    
    dispatchEmail({type:'USER_INPUT', val: event.target.value});
    setFormIsValid(
      emailState.isValid && passwordState.isValid
    );
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({type:'USER_INPUT', val:event.target.value});
    setFormIsValid(
      emailState.isValid && passwordState.isValid
    );
  };

  const validateEmailHandler = () => {
    dispatchEmail({type :'INPUT_BLUR'})
    
    setFormIsValid(
      emailState.isValid && passwordState.isValid
    );
    // setEmailIsValid(enteredEmail.includes('@'));
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({type:'INPUT_BLUR'})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if(formIsValid){
      ctx.onLogin(emailState.value, passwordState.value);
    } else if (!emailIsValid){
      emailInputRef.current.focus();
    }
    else{
      passwordInputRef.current.focus();
    }
    
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input 
          id="email" 
          label="E-Mail" 
          type="email" 
          isValid={emailIsValid} 
          value={emailState.value} 
          onChange={emailChangeHandler} 
          onBlur={validateEmailHandler}
          ref={emailInputRef}
        />
        <Input 
          id="password" 
          label="Password" 
          type="password" 
          isValid={passwordIsValid} 
          value={passwordState.value} 
          onChange={passwordChangeHandler} 
          onBlur={validatePasswordHandler}
          ref={passwordInputRef}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
