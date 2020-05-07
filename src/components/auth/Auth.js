import React from "react"
import Login from "./Login"
import Register from "./Register"
import "./Auth.css"


export const Auth = ( {setActiveUser} ) => {
    return (
        <>
            <h1 className="welcome">Put that on your plate!</h1>
            <div className="authContainer">
                <Login setActiveUser={setActiveUser} />
                <Register setActiveUser={setActiveUser} />
            </div>
        </>
    )
}