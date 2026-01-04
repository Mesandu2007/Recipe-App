import { useState } from "react";
import "./Grid.css";

export default function Grid({ recipes,loading,error,favorites,onAddToFavorites }) {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  if(loading){
    return<p className="info-message">Loading Recipes...</p>
  }
  if(error){
    return<p className="error-message">No Recipes Found!</p>
  }
   // optional chaining used
  const isFavorite = (id) => favorites?.some((r) => r.idMeal=== id); 
  

  return (
    <div>
      {error ? (
        <p className="error-message">No recipes available. Please try again later.</p>
      ) : (
        <div className="grid">
          {recipes.map((item, index) => (
            <div key={index} className="card">
              <img src={item.strMealThumb} alt={item.strMeal} />
              <h3>{item.strMeal}</h3>
              <p>
                <b className="bold">Category:</b> {item.strCategory}
              </p>
              <div className="buttonf">
                  <button className="view-btn" onClick={() => setSelectedRecipe(item)}>
                    View Recipe
                  </button>
                  {onAddToFavorites && (
                    <button className="favorite-btn" onClick={() => onAddToFavorites(item)}disabled={isFavorite(item.idMeal)}>
                      {isFavorite(item.idMeal) ? "❤️ Added" : "Add ❤️"}
                    </button>

                  )}
              </div>  


            </div>
          ))}
        </div>
      )}




      {selectedRecipe && (
        <div className="modal-background">
          <div className="modal">
            <h2 className="foodname">{selectedRecipe.strMeal}</h2>
            <img src={selectedRecipe.strMealThumb} alt={selectedRecipe.strMeal} />
            <h3>Ingredients</h3>
            <table className="ingredients-table">
              <tbody>
                {Object.keys(selectedRecipe)
                  .filter((key) => key.startsWith("strIngredient") && selectedRecipe[key])
                  .map((key, index) => {
                    const ingredient = selectedRecipe[key];
                    const measure = selectedRecipe[`strMeasure${key.slice(13)}`];
                    return (
                      <tr key={index}>
                        <td>{ingredient}</td>
                        <td>{measure}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>

            <h3>Instructions</h3>
            <p>{selectedRecipe.strInstructions}</p>
            <button className="close-btn" onClick={() => setSelectedRecipe(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
