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
            isFavorite: isFavorite
        })
    }, [isFavorite])
    
    return (
        < section className="recipe" >
            <h3 className="recipe__name">{recipe.name}</h3>
            <div className="recipe__instructions">{recipe.instructions}</div>
            <Button color="info" onClick={() => {
                toggleEdit()
            }}>Edit</Button>
            <Button color="danger" onClick={() => {
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

            <div className="favorite"> </div>
            <Button color = "translucent" onClick={toggleFavorite}>{ isFavorite ? "❤️" : "♡"  } </Button>
        </section >
    )
}

