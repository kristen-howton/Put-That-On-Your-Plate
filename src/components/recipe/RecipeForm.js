import React, { useContext, useRef, useState } from "react"
import { RecipeContext } from "./RecipeProvider"
import { RecipeType } from "../recipeTypes/RecipeTypeDropdown.js"

export const RecipeForm = () => {
    const [recipeType, setRecipeType] = useState("0")
    const { addRecipe } = useContext(RecipeContext)

    const name = useRef()
    const instructions = useRef()

    const constructNewRecipe = () => {
        const userId = parseInt(localStorage.getItem("recipe_user"))
        const recipeTypeId = parseInt(recipeType)
        // create a new recipe object  

        const newRecipeObj = {
            name: name.current.value,
            instructions: instructions.current.value,
            recipeTypeId: recipeTypeId,
            isFavorite: false,
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
                        placeholder="recipe instructions"
                    />
                </div>
            </fieldset>

            <RecipeType setRecipeType={setRecipeType}/> 
           
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