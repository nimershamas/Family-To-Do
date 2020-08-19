import React, { useState, useEffect } from "react";
import "./homePageStyle.css";
import Card from "../cards/Card"



function MainPage(props) {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {

        const user = localStorage.getItem("user");
        const lastName = JSON.parse(user).lastName;
        const id = JSON.parse(user).firstName;


        fetch(`/api/getTasksByFamily/?lastName=${lastName}&_id=${id}`)
            .then(data => data.json())
            .then(data => setTasks(data))

    }, [])


    // console.log("aaa", tasks.tickets);
    
    return (

        <div className="mainPageWrapper">

            <div className="cards">
                {tasks && tasks.map((task, index) => {
                    return <Card key={index} task={task} />
                })}
            </div>
            
            {tasks.length > 0 && <h1 className="familyName">Welcome To Your Tasks {tasks[0].tickets[0].user.lastName}'s</h1>}


        </div>



    )
}






export default MainPage;


