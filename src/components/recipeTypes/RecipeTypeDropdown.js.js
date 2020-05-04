import React, { useRef, useContext } from 'react'
import { RecipeTypeContext } from './RecipeTypeProvider'

export const RecipeType = () => {
    const { recipeTypes } = useContext(RecipeTypeContext)

    const recipe = useRef()
    return (
    <div className="form-group">
        <label htmlFor="recipeType">Recipe Type: </label>
        <select
            defaultValue=""
            name="recipe"
            ref={recipe}
            id="recipeType"
            className="form-control"
        >
            <option value="0">Select a type</option>
            {recipeTypes.map(recipe => (
                <option key={recipe.id} value={recipe.id}>
                    {recipe.name}
                </option>
            ))}
        </select>
    </div>
    )

}


// import React, { useContext } from "react"
// import { RecipeContext } from "./RecipeProvider"
// import Recipe from "./Recipe"


// export default () => {
//     const { recipes } = useContext(RecipeContext)

//     return (
//         <div className="recipes">
//         {
//             <select>
//                 recipes.map(recipe => <Recipe key={recipe.id} recipe={recipe} />
//             </select>)
//         }
//         </div>
//     )
// }

// <select>

//     {recipeTypes.map(recipeType => (
//       <option>{recipeType.name}</option>
//     ))}
//   </select>



// function CharacterDropDown() {
//     const [items] = React.useState([
//       {
//         label: "Luke Skywalker",
//         value: "Luke Skywalker"
//       },
//       { label: "C-3PO", value: "C-3PO" },
//       { label: "R2-D2", value: "R2-D2" }
//     ]);
//     return (
//       <select>
//         {items.map(item => (
//           <option
//             key={item.value}
//             value={item.value}
//           >
//             {item.label}
//           </option>
//         ))}
//       </select>
//     );
//   }