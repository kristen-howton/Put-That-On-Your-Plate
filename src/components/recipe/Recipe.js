import React, { useContext, useState, useEffect } from "react"
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap"
import { RecipeContext } from "./RecipeProvider"
import { EditRecipeForm } from "./EditRecipeForm"

export const Recipe = ({ recipe }) => {

    const { deleteRecipe, updateRecipe } = useContext(RecipeContext)
    const [editModal, setEditModal] = useState(false)
    const toggleEdit = () => setEditModal(!editModal)
    const [isFavorite, setFavorite] = useState(recipe.isFavorite)
    const toggleFavorite = () => setFavorite(!isFavorite)

    useEffect(() => {
        updateRecipe({
            id: recipe.id,
            name: recipe.name,
            instructions: recipe.instructions,
            userId: recipe.userId,
            recipeTypeId: recipe.recipeTypeId,
            image: recipe.image,
            isFavorite: isFavorite,
            ingredients: recipe.ingredients
        })
    }, [isFavorite])

    return (
        < section className="recipe" >
            <div className="recipe__name">{recipe.name}</div>
            <section className="recipe__container">
                <img className="recipe__image" src={recipe.image} />
                <section className="recipe__textContainer">
                    <div className="recipe__ingredients"><strong>Ingredients: </strong>{recipe.ingredients}</div>
                    <div className="recipe__instructions"><strong>Instructions: </strong>{recipe.instructions}</div>
                    <section className="recipe__buttonContainer">
                        <Button className="recipe__editbutton" onClick={() => {
                            toggleEdit()
                        }}>Edit</Button>

                        <Button className="recipe__deletebutton" color="danger" onClick={() => {
                            deleteRecipe(recipe.id)
                        }}>Delete</Button>

                        <Modal isOpen={editModal} toggle={toggleEdit}>
                            <ModalHeader toggle={toggleEdit}>
                                {recipe.name}
                            </ModalHeader>
                            <ModalBody>
                                <EditRecipeForm key={recipe.id} toggleEdit={toggleEdit} recipe={recipe} />
                            </ModalBody>
                        </Modal>

                        <div className="recipe__favorite"> </div>
                        <Button color="translucent" onClick={toggleFavorite}>{isFavorite ? "❤️" : "♡"} </Button>
                    </section>
                </section>
            </section>

        </section >
    )
}

