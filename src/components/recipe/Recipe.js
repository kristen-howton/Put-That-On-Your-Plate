import React, { useContext } from "react"
import { Button } from "reactstrap"
import { RecipeContext } from "./RecipeProvider"

export const Recipe = ({ recipe }) => { 

const { deleteRecipe } = useContext(RecipeContext)  

return (

    < section className="recipe" >
        <h3 className="recipe">{recipe.name}</h3>
        <div className="recipe__instructions">{recipe.instructions}</div>
        <Button color="danger" onClick={() => {
            deleteRecipe(recipe.id)
        }}>Delete 🤢</Button>
    </section >
)
}