import React from 'react';
import './style.css';

function Register() {

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
                    document.getElementById("response").innerText="you have been register successfuly"
              }else{
                document.getElementById("response").innerText="user exist try another userEmail" 
              }
            })
    };
    return (
        <div className="mainWrapper">
        <div className='boxContainer'>
            <h1 className='title'>Register</h1>
            <form className="inputs" onSubmit={registerUser}>
                <input type="text" name="email" placeholder="email" className="input"/><br></br>
                <input type="text" name="firstName" placeholder="name" className="input"/><br></br>
                <input type="text" name="lastName" placeholder="name" className="input"/><br></br>
                <input type="text" name="picUrl" placeholder="pic Url" className="input"/><br></br>
                <input type="text" name="password" placeholder="password" className="input"/><br></br>
                <input type="submit" className="Button" />            
            </form>
            <div id="response">jgigi</div>
        </div>
        </div>
    )
}

export default Register;