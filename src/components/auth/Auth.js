import React from "react"
import Login from "./Login"
import Register from "./Register"
import "./Auth.css"


export default ({setActiveUser}) => {
    return (
        <>
            <h1 className="welcome">Welcome to Recipes!</h1>
            <div className="authContainer">
                <Login setActiveUser={setActiveUser} />
                <Register setActiveUser={setActiveUser} />
            </div>
        </>
    )
}