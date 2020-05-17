import React, { useContext, useState, useEffect } from "react"
import { RecipeContext } from "./RecipeProvider"
import { Recipe } from "./Recipe"
import { RecipeForm } from "./RecipeForm"
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap"
import "./Recipe.css"

export const RecipeList = ({ searchTerms, recipeType, activeUser }) => {
    const { recipes } = useContext(RecipeContext)

    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)

    const [favorite, setFavorite] = useState(false)
    const toggleFavorites = () => setFavorite(!favorite)

    const [matchingRecipes, setMatchingRecipes] = useState([])

    useEffect(
        () => {
            let filteredRecipes = recipes.filter(recipe => {
                return parseInt(activeUser) === recipe.userId
            })

            if (searchTerms !== "") {
                filteredRecipes = filteredRecipes.filter(recipe => recipe.name.toLowerCase().includes(searchTerms.toLowerCase()))
            }

            if (recipeType !== "0") {
                filteredRecipes = filteredRecipes.filter(recipe => recipe.recipeTypeId === parseInt(recipeType))
            }

            if (favorite) {
                filteredRecipes = filteredRecipes.filter(recipe => recipe.isFavorite)
            }

            setMatchingRecipes(filteredRecipes)

        },
        [searchTerms, recipes, recipeType, activeUser, favorite]
    )

    return (
        <>
            <article className="button__container">
                <Button className="addRecipeBtn" onClick={() => {
                    // Show the recipe form
                    toggle()
                }}>Add Recipe</Button>

                <Button className="favoriteBtn" onClick={() => {
                    // Show the favorites
                    toggleFavorites()
                }}>Show Favorites</Button>
            </article>

            <div className="recipes">
                {
                    matchingRecipes.map(rec => <Recipe key={rec.id} recipe={rec} />)
                }
            </div>

            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>
                    Create New Recipe
                </ModalHeader>
                <ModalBody>
                    <RecipeForm toggler={toggle} />
                </ModalBody>
            </Modal>

        </>
    )
}