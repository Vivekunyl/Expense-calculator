import React,{useEffect, useState} from 'react'
import {useHistory } from 'react-router-dom';

const Dashboard = () => {
    const history = useHistory();
    const [userData, setuserData] = useState({});
    const callDashboard = async () => {
        try{
            const res = await fetch('/dashboard',{
                method:'GET',
                headers:{
                    Accept: 'application/json',
                    'Content-type': 'application/json'
                },
                credentials:'include'
            });

            const data = await res.json();
            console.log(data);
            setuserData(data);

            if(!res.status === 200){
                const error = new Error(res.error);
                throw error;
            }
        }catch(err){
            console.log(err);
            history.push('/Login');
        }
    }

    useEffect(() => {
       callDashboard();
    }, [])

    return (
        <>
            <div className="dashboard">
                <form method="GET"  className="dashboardForm">
                    <div className="UserInfo">
                        <div className="infoSection">
                            <label  className="infoName">Name:</label>
                            <p>{userData.name}</p>
                        </div>
                        <div className="infoSection">
                            <label  className="infoName">Mobile Number:</label>
                            <p>{userData.phone}</p>
                        </div>
                        <div className="infoSection">
                            <label  className="infoName">Work:</label>
                            <p>{userData.work}</p>
                        </div>
                        <div className="infoSection">
                            <label  className="infoName">Email:</label>
                            <p>{userData.email}</p>
                        </div>
                    </div>
                    <hr />
                </form>
            </div>
        </>
    )
}

export default Dashboard
