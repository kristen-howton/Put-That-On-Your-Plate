import React, { useState, useEffect } from "react"

/*
    The context is imported and used by individual components
    that need data
*/
export const RecipeContext = React.createContext()

/*
 This component establishes what data can be used.
 */
export const RecipeProvider = (props) => {
    const [recipes, setRecipes] = useState([])

    const getRecipes = () => {
        return fetch("http://localhost:8088/recipes")
            .then(res => res.json())
            .then(setRecipes)
    }

    /*
        Load all recipes when the component is mounted. Ensure that
        an empty array is the second argument to avoid infinite loop.
    */
    useEffect(() => {
        getRecipes()
    }, [])

    useEffect(() => {
        console.log("****  RECIPE APPLICATION STATE CHANGED  ****")
    }, [recipes])

    return (
        <RecipeContext.Provider value={{
            recipes
        }}>
            {props.children}
        </RecipeContext.Provider>
    )
}