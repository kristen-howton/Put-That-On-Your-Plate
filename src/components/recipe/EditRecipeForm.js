import React, { useContext, useState } from "react"
import { RecipeContext } from "./RecipeProvider"
import { RecipeType } from "../recipeTypes/RecipeTypeDropdown.js"
import { Button, Input, FormGroup, Label } from "reactstrap"

export const EditRecipeForm = ({ recipe, toggleEdit }) => {
    const { updateRecipe } = useContext(RecipeContext)
    const [recipeType, setRecipeType] = useState("0")

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
        const userId = parseInt(localStorage.getItem("recipe_user"))
        const recipeTypeId = parseInt(recipeType)

        updateRecipe({
            id: updatedRecipe.id,
            name: updatedRecipe.name,
            instructions: updatedRecipe.instructions,
            userId: userId,
            recipeTypeId: recipeTypeId,
            isFavorite: false

        })
            .then(toggleEdit)
    }

    return (
        <FormGroup className="recipeForm">
            <fieldset>
                <div className="form-group">
                    <Label for="name">Recipe name: </Label>
                    <Input type="text" name="name" required autoFocus className="form-control"
                        placeholder="Recipe name"
                        defaultValue={recipe.name}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <Label for="recipe">Recipe instructions: </Label>
                    <Input type="textarea" id="recipe__instructions"
                        name="instructions" required className="form-control"
                        placeholder="Recipe instructions"
                        defaultValue={recipe.instructions}
                        onChange={handleControlledInputChange}/>

                </div>
            </fieldset>

            <RecipeType setRecipeType={setRecipeType} />

            <Button type="submit" className="btn btn-primary"
                onClick={evt => {
                    evt.preventDefault()
                    editRecipe()
                }}>
                Save Changes
            </Button>
        </FormGroup>
    )
}
