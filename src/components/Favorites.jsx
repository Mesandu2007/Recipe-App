import "./Grid.css";
import {useState} from "react"; 

export default function Favorites({favorites,removeFromFavorites}){
    const[selectedRecipe, setSelectedRecipe]=useState(null);
    if(!favorites || favorites.length===0){
        return(
            <div className="favo">
                <h2>Favorites</h2>
                <p>No favorites yet. Click ❤️ on a recipe to add it</p>

            </div>
        )
    }

    return (
        <div id="favorites">
            <h2 className="favh">Favorites</h2>
            <div className="grid">
                {favorites.map((item)=>(
                    <div key={item.idMeal} className="card">
                        <img src={item.strMealThumb} alt={item.strMeal} />
                        <h3>{item.strMeal}</h3>
                        <p>
                            <b className="fbold">Category:</b> 
                            {item.strCategory}
                        </p>
                        <div className="fav">
                            <button className="view-btn" onClick={()=> setSelectedRecipe(item)}>
                                View Recipe
                            </button>
                            <button className="remove-btn" onClick={()=> removeFromFavorites(item.idMeal)}>
                                🚮 Remove
                            </button>
                        </div>    
                    </div>    


                ))}
            </div>

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