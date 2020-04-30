import React from "react"

export const Recipe = ({ recipe }) => (
    <section className="recipe">
        <h3 className="recipe">{recipe.name}</h3>
        <div className="recipe__instructions">{recipe.instructions}</div>
    </section>
)