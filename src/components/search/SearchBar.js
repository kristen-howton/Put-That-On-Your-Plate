import React from "react"
import "./SearchBar.css"

export const SearchBar = ({ setTerms }) => {

    return (
        <fieldset className="searchTermsBar">
            <div className="form-group">
                <label htmlFor="searchTerms">Search:</label>
                <input onKeyUp={ e => setTerms(e.target.value) }
                    type="text"
                    id="searchTerms"
                    required
                    autoFocus
                    className="form-control"
                />
            </div>
        </fieldset>
    )
}