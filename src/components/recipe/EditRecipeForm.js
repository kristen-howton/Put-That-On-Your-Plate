import React, { useContext, useState } from "react"
import { RecipeContext } from "./RecipeProvider"

export const EditRecipeForm = ({ recipe, toggleEdit }) => {
    const { updateRecipe } = useContext(RecipeContext)

    // Separate state variable to track the recipe as it is edited
    const [updatedRecipe, setRecipe] = useState(recipe)

    /*
        When changing a state object or array, always create a new one
        and change state instead of modifying current one
    */
    const handleControlledInputChange = (event) => {
        // Create a new copy of the recipe being edited
        const newRecipe = Object.assign({}, updatedRecipe)

        // Change the property value on the copy
        newRecipe[event.target.name] = event.target.value

        // Set the copy as the new state
        setRecipe(newRecipe)
    }

    const editRecipe = () => {

        updateRecipe({
            id: updatedRecipe.id,
            name: updatedRecipe.name,
            instructions: updatedRecipe.instructions,
            userId: parseInt(localStorage.getItem("recipe_user"))

        })
            .then(toggleEdit)
    }


    return (
        <form className="recipeForm">
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Recipe name: </label>
                    <input type="text" name="name" required autoFocus className="form-control"
                        placeholder="Recipe name"
                        defaultValue={recipe.name}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="recipe">Recipe instructions: </label>
                    <input type="text" name="instructions" required className="form-control"
                        placeholder="Recipe instructions"
                        defaultValue={recipe.instructions}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>

            <button type="submit" className="btn btn-primary"
                onClick={evt => {
                    evt.preventDefault()
                    editRecipe()
                }}>
                Save Changes
            </button>
        </form>
    )
}