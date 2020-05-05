import React, { useState } from "react"
import { RecipeList } from "./recipe/RecipeList"
import { RecipeProvider } from "./recipe/RecipeProvider"
import "./Recipe.css"
import { SearchBar } from "./search/SearchBar"
import "./Layout.css"
import { RecipeTypeProvider } from "./recipeTypes/RecipeTypeProvider"
import { RecipeType } from "./recipeTypes/RecipeTypeDropdown.js"

export const Dashboard = () => {

    const [searchTerms, setTerms] = useState("")
    const [recipeType, setRecipeType] = useState("0")

    return (
        <div className="mainContainer">
            <h2>Put that on your plate!</h2>
            <div className="searchContainer">
                <RecipeProvider>
                    <RecipeTypeProvider> 
                        <RecipeType setRecipeType={setRecipeType}/> 
                        <RecipeList searchTerms={searchTerms}
                                    recipeType={recipeType}/>
                        <SearchBar setTerms={setTerms} /> 
                    </RecipeTypeProvider>
                </RecipeProvider>
            </div>
        </div>
    )
}
