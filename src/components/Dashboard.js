import React, { useState } from "react"
import { RecipeList } from "./recipe/RecipeList"
import { RecipeProvider } from "./recipe/RecipeProvider"
import "./Recipe.css"
import { SearchBar } from "./search/SearchBar"
import "./Layout.css"

export const Dashboard = () => {

    const [searchTerms, setTerms] = useState(null)

    return (
        <div className="mainContainer">
            <h2>Put that on your plate!</h2>
            <div className="searchContainer">
                <RecipeProvider>
                    <RecipeList searchTerms={searchTerms}  />
                    <SearchBar setTerms={setTerms} />
                </RecipeProvider>
            </div>
        </div>
    )
}
