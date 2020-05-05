import React, { useContext, useState, useEffect } from "react"
import { RecipeContext } from "./RecipeProvider"
import { Recipe } from "./Recipe"
import { RecipeForm } from "./RecipeForm"
import { Button, Modal, ModalBody, ModalHeader} from "reactstrap"
import "./Recipe.css"

export const RecipeList = ( {searchTerms, recipeType} ) => {
    const { recipes } = useContext(RecipeContext)

    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)
    const [matchingRecipes, setMatchingRecipes] = useState([])
    let activeUser = parseInt(localStorage.getItem("recipe_user"))
    useEffect(
        () => {
            let filteredRecipes = recipes.filter(recipe => {
                return activeUser === recipe.userId })

            if(searchTerms !== ""){
                filteredRecipes = filteredRecipes.filter(recipe => recipe.name.toLowerCase().includes(searchTerms))
            }

            if(recipeType !== "0"){
                filteredRecipes = filteredRecipes.filter(recipe => recipe.recipeTypeId === parseInt(recipeType))
            }

            setMatchingRecipes(filteredRecipes)

     },
        [searchTerms, recipes, recipeType]
    )
    
    return (
        <>
            <Button onClick={() => {
                // check if the user is authenticated
                    if (activeUser) {
                        // If the user is authenticated, show the recipe form
                        toggle()
                    }
                }}>Add Recipe</Button>
           
            <div className="recipes">
                {
                    matchingRecipes.map(rec => <Recipe key={rec.id} recipe={rec} />)
                }
            </div>

            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>
                    Submit
                </ModalHeader>
                <ModalBody>
                    <RecipeForm toggler={toggle} />
                </ModalBody>
            </Modal>
            
        </>
    )
}