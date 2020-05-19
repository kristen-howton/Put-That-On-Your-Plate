import React, { useContext } from 'react'
import { RecipeTypeContext } from './RecipeTypeProvider'
import "./SearchTypes.css"

export const RecipeType = ( props, {setRecipeType} ) => {
    const { recipeTypes } = useContext(RecipeTypeContext)
    return (
    <div className="form-group recipeDropdown">
        <label htmlFor="recipeType">Recipe Type: </label>
        <select onChange ={e => setRecipeType(e.target.value) }
            defaultValue={props.defaultValue}
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
