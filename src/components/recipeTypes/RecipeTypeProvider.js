import React, { useState, useEffect } from "react"

/*
    The context is imported and used by individual components
    that need data
*/
export const RecipeTypeContext = React.createContext()

/*
    This component establishes what data can be used.
 */
export const RecipeTypeProvider = props => {
    const [recipeTypes, setRecipeTypes] = useState([])

    const getRecipeTypes = () => {
        return fetch("http://localhost:8088/recipeTypes")
            .then(res => res.json())
            .then(setRecipeTypes)
    }

    const addRecipeType = recipe => {
        return fetch("http://localhost:8088/recipeTypes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(recipe)
        })
            .then(getRecipeTypes)
    }

    /*
        Load all recipes when the component is mounted. Ensure that
        an empty array is the second argument to avoid infinite loop.
    */
    useEffect(() => {
        getRecipeTypes()
    }, [])

    return (
        <RecipeTypeContext.Provider value={{
            recipeTypes, addRecipeType
        }}>
            {props.children}
        </RecipeTypeContext.Provider>
    )
}