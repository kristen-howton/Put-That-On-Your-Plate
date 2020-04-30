import React, { useContext, useRef } from "react"
import { RecipeContext } from "./RecipeProvider"

export const RecipeForm = () => {
    const { addRecipe } = useContext(RecipeContext)

    const name = useRef()
    const instructions = useRef()

    const constructNewRecipe = () => {
        const userId = parseInt(localStorage.getItem("recipe_user"))
        // create a new recipe object  
        // Make sure that the recipe object has the customerId and locationId foreign keys on it.
        const newRecipeObj = {
            name: name.current.value,
            instructions: instructions.current.value,
            userId: userId
        }
       
        // and save it to the API.
        addRecipe(newRecipeObj).then(RecipeForm.toggler)
    }

    return (
        <form className="recipeForm">
            <fieldset>
                <div className="form-group">
                    <label htmlFor="recipeName">Name of Recipe: </label>
                    <input
                        type="text"
                        id="recipeName"
                        ref={name}
                        required
                        autoFocus
                        className="form-control"
                        placeholder="recipe name"
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="recipeInstructions">Instructions: </label>
                    <input
                        type="text"
                        id="recipeInstructions"
                        ref={instructions}
                        required
                        autoFocus
                        className="form-control"
                        placeholder="recipe intructions"
                    />
                </div>
            </fieldset>
           
            <button type="submit"
                onClick={
                    evt => {
                        evt.preventDefault() // Prevent browser from submitting the form
                        // create the recipe function goes here
                        constructNewRecipe()
                    }
                }
                className="btn btn-primary">
                Add Recipe
            </button>
        </form>
    )
}