import React,{useState, useEffect} from "react";
// import "/homePageStyle.css";


const user= localStorage.getItem("user");
const lastName=JSON.parse(user).lastName;
console.log(lastName);

function MainPage(props) {
const [tasks,setTasks] =useState([]);

useEffect(()=>{
    fetch(`/api/getTasksByFamily/?lastName=${lastName}`)
    .then (data=>data.json())
    .then (data=>setTasks(data))
},[])

console.log(tasks)
    return (
        <div>
                <h1></h1>


        </div>



    )
}






export default MainPage;


