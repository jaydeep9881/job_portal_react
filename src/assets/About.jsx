 import React, { useState } from 'react';
import axios from 'axios';

function About(){
    const [about,setAbout]= new useState("");
    const getAbout = async () =>{
        try{
            const res= axios.get('http://localhost:8080/about');
            setAbout((await res).data);
        }catch{
            console.error("error fetching data");
            setAbout("not found");
        }
    }
    return(
        <>
        <h1>this is about page</h1>
        <button onClick={getAbout}>get About</button>
        <p>{about}</p>
        </>
    )
}

export default About;