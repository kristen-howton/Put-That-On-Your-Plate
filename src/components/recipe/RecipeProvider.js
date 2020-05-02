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

    const addRecipe = recipe => {
        return fetch("http://localhost:8088/recipes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(recipe)
        })
            .then(getRecipes)
    }

    const deleteRecipe = recipeID => {
        return fetch(`http://localhost:8088/recipes/${recipeID}`, {
            method: "DELETE"
        })
            .then(getRecipes)
    }

    const updateRecipe = recipe => {
        return fetch(`http://localhost:8088/recipes/${recipe.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(recipe)
        })
            .then(getRecipes)
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
            recipes, addRecipe, deleteRecipe, updateRecipe
        }}>
            {props.children}
        </RecipeContext.Provider>
    )
}