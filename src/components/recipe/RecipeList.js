import React, { useContext, useState, useEffect } from "react"
import { RecipeContext } from "./RecipeProvider"
import { Recipe } from "./Recipe"
import { RecipeForm } from "./RecipeForm"
import { Button, Modal, ModalBody, ModalHeader} from "reactstrap"
import "./Recipe.css"

export const RecipeList = ( {searchTerms} ) => {
    const { recipes } = useContext(RecipeContext)

    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)
    const [matchingRecipe, setFiltered] = useState([])
    let activeUser = parseInt(localStorage.getItem("recipe_user"))
    useEffect(
        () => {
            const recipesForThisUser = recipes.filter(recipe => {
                return activeUser === recipe.userId })
            if (searchTerms !== "") {
                const subset = recipesForThisUser.filter(recipe => recipe.name.toLowerCase().includes(searchTerms))
                setFiltered(subset)
            } else {
                setFiltered(recipesForThisUser)
            }
        },
        [searchTerms, recipes]
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
                    matchingRecipe.map(rec => <Recipe key={rec.id} recipe={rec} />)
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