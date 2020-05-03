import React, { useContext, useState } from "react"
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap"
import { RecipeContext } from "./RecipeProvider"
import { EditRecipeForm } from "./EditRecipeForm"


export const Recipe = ({ recipe }) => {

    const { deleteRecipe } = useContext(RecipeContext)
    const [editModal, setEditModal] = useState(false)
    const toggleEdit = () => setEditModal(!editModal)

    return (
        < section className="recipe" >
            <h3 className="recipe">{recipe.name}</h3>
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
        </section >
    )
}
