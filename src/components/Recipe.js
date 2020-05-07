import React, { useState } from "react"
import { Auth } from "./auth/Auth"
import { Dashboard } from "./Dashboard"
import { Button } from "reactstrap"

export const Recipes = () => {
    const [activeUser, setActiveUser] = useState(localStorage.getItem("recipe_user") || "")

    if (activeUser) {
        return (
            <>
                <Button onClick={() => {
                    setActiveUser("")
                    localStorage.setItem("recipe_user", "")
                }}>Log Off</Button>
                <Dashboard activeUser={activeUser} />
            </>
        )
    } else {
        return (
            <>
                <Auth setActiveUser={setActiveUser} />
            </>
        )
    }
}