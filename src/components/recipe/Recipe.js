import React, { useState, useContext } from "react"
import { Button } from "reactstrap"
import { RecipeContext } from "./RecipeProvider"

export const Recipe = ({ recipe }) => { 

const { recipes, deleteRecipe } = useContext(RecipeContext)
const [e, setRecipes] = useState({recipe: { id: 0 }, name: null, instruction: null } )  

return (

    < section className="recipe" >
        <h3 className="recipe">{recipe.name}</h3>
        <div className="recipe__instructions">{recipe.instructions}</div>
        <Button color="danger" onClick={() => {
            deleteRecipe(recipe.id)
            setRecipes(recipes)
        }}>Delete 🤢</Button>
    </section >
)
}