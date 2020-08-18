import React,{useState} from 'react';
import "../register/style.css";


function SignIn(props) {
const [message,setMessage]=useState("");

    const handleLogIn = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        fetch('/auth', {
            method: 'POST',
            body: JSON.stringify({ email, password }),

            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((res) => res.json())
            .then(data=>{
                if(data.message){
                    setMessage(data.message);
                }
                else {
                    console.log(data)
                    setMessage("Log In Successfully!")
                    localStorage.setItem("user",JSON.stringify(data));
                }
            })
            
    }


    return (
                 <div className="mainWrapper">
                    <div className="boxContainer">  
                        <h1 className="title">Log In</h1>

                        <form className="inputs" onSubmit={handleLogIn}>
                            <input type="email" className="input"   name="email" placeholder="Email" />

                            <input type="Password" className="input"  name="password" placeholder="Password" />
                            <input type="submit" className="Button"  value="Log In" name="ok"></input>
                        </form>
                        {message && <p className="messageFromServer">{message}</p>}
                        <p className="extraOption">No Account? Sign up here</p>


                    </div>


                </div> 



    )



}



export default SignIn;