import React,{useState} from 'react';
import './style.css';
import { Link } from 'react-router-dom';


function Register() {
    const [message,setMessage]=useState("");
    const registerUser = e => {
        e.preventDefault();
        let email = e.target.email.value;
        let firstName = e.target.firstName.value;
        let lastName = e.target.lastName.value;
        let picUrl = e.target.picUrl.value;
        let password = e.target.password.value;
        
        fetch('/api/addUser', {
            method: 'POST',
            body: JSON.stringify({ userEmail:email,firstName:firstName,
                lastName:lastName,imgUrl:picUrl,password }),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res => res.json())
            .then(data => {
              if(data.successful === true){
                   setMessage("register completed successfuly!");
              }else{
                setMessage("Email already exists, try another" )
              }
            })
    };
    return (
        <div className="mainWrapper">
        <div className='boxContainer'>
            <h1 className='title'>Register</h1>
            <form className="inputs" onSubmit={registerUser}>
                <input type="text" name="email" placeholder="email" className="input"/><br></br>
                <input type="text" name="firstName" placeholder="First Name" className="input"/><br></br>
                <input type="text" name="lastName" placeholder="Last Name" className="input"/><br></br>
                <input type="text" name="picUrl" placeholder="Personal img Url" className="input"/><br></br>
                <input type="text" name="password" placeholder="password" className="input"/><br></br>
                <input type="submit" className="Button" />
                <p className="extraOption">Already have an account <Link to="/"> Sign In </Link></p>            
            </form>
           {message && <div className="response">{message}</div>}
        </div>
        </div>
    )
}

export default Register;