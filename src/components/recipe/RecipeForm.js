import React, { useContext, useRef, useState } from "react"
import { RecipeContext } from "./RecipeProvider"
import { RecipeType } from "../recipeTypes/RecipeTypeDropdown.js"
import { Button, Label, Input, FormGroup } from "reactstrap"

export const RecipeForm = () => {
    const [recipeType, setRecipeType] = useState("0")
    const { addRecipe } = useContext(RecipeContext)

    const name = useRef()
    const instructions = useRef()
    const image = useRef()
    const ingredients = useRef()

    const constructNewRecipe = async () => {
        const userId = parseInt(localStorage.getItem("recipe_user"))
        const recipeTypeId = parseInt(recipeType)
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

        // create a new recipe object  

        const newRecipeObj = {
            name: name.current.value,
            instructions: instructions.current.value,
            recipeTypeId: recipeTypeId,
            isFavorite: false,
            ingredients: ingredients.current.value,
            image: file.secure_url,
            userId: userId
        }
       
        // and save it to the API.
        addRecipe(newRecipeObj).then(RecipeForm.toggler)
    }

    return (
        <FormGroup className="recipeForm">
            <fieldset>
                <div className="form-group">
                    <Label for="recipeName">Name of Recipe: </Label>
                    <Input
                        type="text"
                        name="recipeName"
                        id="recipeName"
                        innerRef={name}
                        required
                        autoFocus
                        className="form-control"
                        placeholder="recipe name"
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <Label for="recipeIngredients">Ingredients: </Label>
                    <Input 
                        type="textarea"
                        id="recipeIngredients"
                        name="recipeIngredients"
                        innerRef={ingredients}
                        required
                        autoFocus
                        className="form-control"
                        placeholder="recipe ingredients"
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <Label for="recipeInstructions">Instructions: </Label>
                    <Input 
                        type="textarea"
                        id="recipeInstructions"
                        name="recipeInstructions"
                        innerRef={instructions}
                        required
                        autoFocus
                        className="form-control"
                        placeholder="recipe instructions"
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <Label for="recipeImage">Image: </Label>
                    <Input 
                        type="file"
                        id="recipeImage"
                        name=""
                        innerRef={image}
                        required
                        autoFocus
                        className="form-control"
                        placeholder="recipe image"
                    />
                </div>
            </fieldset>

            <RecipeType setRecipeType={setRecipeType}/> 

            <Button type="submit"
                onClick={
                    evt => {
                        evt.preventDefault() // Prevent browser from submitting the form
                        // create the recipe function goes here
                        constructNewRecipe()
                    }
                }
                className="btn btn-primary">
                Add Recipe
            </Button>
        </FormGroup>
    )
}