import React, { useState } from "react"
import Auth from "./auth/Auth"
import { Dashboard } from "./Dashboard"

export const Recipes = () => {
    const [activeUser, setActiveUser] = useState(localStorage.getItem("recipe_user"))

    return (
        activeUser ? <Dashboard activeUser={activeUser} /> : <Auth setActiveUser={setActiveUser} />
    )
}