import React, { useRef, useContext } from 'react'
import { RecipeTypeContext } from './RecipeTypeProvider'

export const RecipeType = ( {setRecipeType} ) => {
    const { recipeTypes } = useContext(RecipeTypeContext)

    return (
    <div className="form-group">
        <label htmlFor="recipeType">Recipe Type: </label>
        <select onChange ={e => setRecipeType(e.target.value) }
            defaultValue=""
            id="recipeType"
            className="form-control"
            required
        >
            <option value="0">Select a type</option>
            {recipeTypes.map(recipeType => (
                <option key={recipeType.id} value={recipeType.id}>
                    {recipeType.name}
                </option>
            ))}
        </select>
    </div>
    )

}
