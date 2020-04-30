import React, { useContext } from "react"
import { RecipeContext } from "./RecipeProvider"
import { Recipe } from "./Recipe"

export const RecipeList = () => {
    const { recipes } = useContext(RecipeContext)

    return (
        <div className="recipes">
        {
            recipes.map(rec => <Recipe key={rec.id} recipe={rec} />)
        }
        </div>
    )
}