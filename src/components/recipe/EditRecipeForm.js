import React, { useContext, useState, useRef } from "react"
import { RecipeContext } from "./RecipeProvider"
import { RecipeType } from "../recipeTypes/RecipeTypeDropdown.js"
import { Button, Input, FormGroup, Label } from "reactstrap"

export const EditRecipeForm = ({ recipe, toggleEdit }) => {
    const { updateRecipe } = useContext(RecipeContext)
    const [recipeType, setRecipeType] = useState("0")
    const image = useRef()

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

    const editRecipe = async () => {
        const userId = parseInt(localStorage.getItem("recipe_user"))
        const recipeTypeId = parseInt(recipeType)
        let secure_url = null
        if(image.current.value){
            const files = image.current.files
            const data = new FormData()
            data.append('file', files[0])
            data.append('upload_preset', "recipes")

            const res = await fetch(
                'https://api.cloudinary.com/v1_1/dkwjvcieo/image/upload',
                {
                    method: 'POST',
                    body: data
                }
            )
            const file = await res.json()
            secure_url = file.secure_url
        } else {
            secure_url = recipe.image
        }

        updateRecipe({
            id: updatedRecipe.id,
            name: updatedRecipe.name,
            instructions: updatedRecipe.instructions,
            userId: userId,
            recipeTypeId: recipeTypeId,
            ingredients: updatedRecipe.ingredients,
            image: secure_url,
            isFavorite: recipe.isFavorite

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
                    <Label for="recipe">Recipe ingredients: </Label>
                    <Input type="textarea" id="recipe__ingredients"
                        name="ingredients" 
                        required 
                        className="form-control"
                        placeholder="Recipe ingredients"
                        defaultValue={recipe.ingredients}
                        onChange={handleControlledInputChange}/>

                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <Label for="recipe">Recipe instructions: </Label>
                    <Input type="textarea" id="recipe__instructions"
                        name="instructions" 
                        required 
                        className="form-control"
                        placeholder="Recipe instructions"
                        defaultValue={recipe.instructions}
                        onChange={handleControlledInputChange}/>

                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <Label for="recipeImage">Recipe image: </Label>
                    <Input type="file" 
                        id="recipe__image"
                        name="image" 
                        required 
                        className="form-control"
                        placeholder="Recipe image"
                        innerRef={image}
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
