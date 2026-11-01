import React from "react";
import Header from "../Components/Common/Header"
import { useNavigate } from "react-router-dom"
function Home(){
    const navigate = useNavigate();
 
    return (
        <React.Fragment>
            <button onClick={()=>(navigate("/admin"))}>Login</button>
        </React.Fragment>
    )
}
export default Home;