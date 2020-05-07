import React, { useState } from "react"
import Auth from "./auth/Auth"
import { Dashboard } from "./Dashboard"
import { Button } from "reactstrap"

export const Recipes = () => {
    const [activeUser, setActiveUser] = useState(localStorage.getItem("recipe_user"))

    return (
        <>
            <Button onClick={() => {
                setActiveUser(null)
                localStorage.setItem("recipe_user", null)
            }}>Log Off</Button>
            {activeUser ? <Dashboard activeUser={activeUser} /> : <Auth setActiveUser={setActiveUser} />}

        </>
    )
}