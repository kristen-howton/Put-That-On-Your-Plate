import React from "react"
import { RecipeList } from "./recipe/RecipeList"
import { RecipeProvider } from "./recipe/RecipeProvider"
import "./Recipe.css"

export const Dashboard = () => (
    <>
        <h2>Recipes</h2>
        <small>For all of your cooking needs.</small>
        
        <RecipeProvider>
            <RecipeList />
        </RecipeProvider>
    </>
)