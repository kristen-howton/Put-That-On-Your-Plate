import React, { useState } from "react"
import { RecipeList } from "./recipe/RecipeList"
import { RecipeProvider } from "./recipe/RecipeProvider"
import "./Recipe.css"
import { SearchBar } from "./search/SearchBar"
import "./Layout.css"
import { RecipeTypeProvider } from "./recipeTypes/RecipeTypeProvider"
import { RecipeType } from "./recipeTypes/RecipeTypeDropdown.js"

export const Dashboard = ( {activeUser} ) => {

    const [searchTerms, setTerms] = useState("")
    const [recipeType, setRecipeType] = useState("0")

    return (
        <div className="mainContainer">
            <div class="pageTitle">Put that on your plate!</div>
            <div className="searchContainer">
                <RecipeProvider>
                    <RecipeTypeProvider> 
                        <SearchBar setTerms={setTerms} />
                        <RecipeType setRecipeType={setRecipeType}/> 
                        <RecipeList searchTerms={searchTerms}
                                    recipeType={recipeType}
                                    activeUser={activeUser}/> 
                    </RecipeTypeProvider>
                </RecipeProvider>
            </div>      
        </div>
    )
}
