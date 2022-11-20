import React from 'react';
import {useState} from 'react';

//available characters
const UppercaseLetters = 'QWERTYUIOPASDFGHJKLZXCVBNM';
const LowercaseLetters = 'qwertyuiopasdfghjklzxcvbnm';
const IncludeNumbers= '1234567890';
const IncludeSymbols= '~!@#$%^&*()_-+={[}]\\|;:\'",<.>/?';


const Form = () => {
    const [text,setText]=useState('');//final password
    const [PasswordLength,setPasswordLength]=useState(8);

    const [UpperLetters,setUpperLetters]=useState(true);
    const [LowerLetters,setLowerLetters]=useState(true);
    const [Numbers,setNumbers]=useState(true);
    const [Symbols,setSymbols]=useState(true);

    //characters available to use in password
    let charList = '';

    if (UpperLetters) charList+=UppercaseLetters;
    if (LowerLetters) charList+=LowercaseLetters;
    if (Numbers) charList+=IncludeNumbers;
    if (Symbols) charList+=IncludeSymbols;

    let newPassword='';

    //add char from keybord to password
    let Change = (e) =>{
        setText(e.target.value);
    }

    //generate new random password and validation
    let Generate=(e)=>{
      e.preventDefault()
      if (PasswordLength < 8 || PasswordLength > 40 || (UpperLetters === false && LowerLetters === false && Numbers ===false && Symbols === false)){
        return alert('Checkboxes aren\'t checked or length is wrong (8-40)');
      }

      for(let i = 0; i<PasswordLength;i++){
        newPassword += charList.charAt(Math.random() * charList.length);
      }
      setText(newPassword);
    }

    //copy password to clipboard
    let CopyPassword=(e)=>{
      e.preventDefault();
      if (text === ''){ alert('Password does not exist')}
      else{
        let copy_area=document.querySelector('#passwordInput');
        copy_area.focus();
        copy_area.select();
        document.execCommand('copy');
        copy_area.blur()
        alert('Password copied');
    }
    }

    //one checkbox must be checked
    //(event,function){validation and change state}
    let Val = (e,f) => {
      UpperLetters+LowerLetters+Symbols+Numbers > 1 ? f(e.target.checked) : f(true)
    }


  return (
    <form>
        <span>
          <input id='passwordInput' type='text' value={text} onChange={Change}></input>
          <button onClick={CopyPassword}>Copy</button>
        </span>

        <span>
          <label htmlFor='Length'>Password length</label>
          <input id='Length' onChange={(e)=> setPasswordLength(e.target.value)} value={PasswordLength} type='number' name='Length' min='8' max='40'/>
        </span>
        <span>
          <label htmlFor='Uppercase'>Uppercase letters</label>
          <input type='checkbox' name='Capital' checked={UpperLetters} onChange={(e)=> Val(e,setUpperLetters)}/>
        </span>

        <span>
          <label htmlFor='Lowercase'>Lowercase letters</label>
          <input type='checkbox' name='Capital' checked={LowerLetters} onChange={(e)=> Val(e,setLowerLetters)}/>
        </span>

        <span>
          <label htmlFor='Numbers'>Include numbers</label>
          <input type='checkbox' name='Capital' checked={Numbers} onChange={(e)=> Val(e,setNumbers)}/>
        </span>

        <span>
          <label htmlFor='Symbols'>Include symbols</label>
          <input type='checkbox' name='Capital' checked={Symbols} onChange={(e)=> Val(e,setSymbols)}/>
        </span>

        <button onClick={Generate}>Generate password</button>

    </form>
  )
}

export default Form;