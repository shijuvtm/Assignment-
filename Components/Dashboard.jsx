import React,{useEffect, useState} from 'react'
import axois from "axios";

function Dashboard() {
    const[userCount,setUserCount]=useState(0);
    const[fileCount,setFileCount]=useState(0);
    
    useEffect(()=>{
        async function fetchStats(){
            try{
                const response = await axois.get("http://localhost:5000/stats");
                setUserCount(response.data.userCount);
                setFileCount(response.data.fileCount);
            }catch(error){
                console.error("Error fetching data:", error);
            }
        }
        fetchStats();
    },[]);
    return (
        <div>
            <h2>Dashboard</h2>
            <p>Total Users: {userCount}</p>
            <p>Total Files Uploaded: {fileCount}</p>
        </div>
    )
  
}

export default Dashboard;
