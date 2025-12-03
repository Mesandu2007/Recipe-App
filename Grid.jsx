import {useState} from "react";
import "./Grid.css";
export default function Grid({recipes}){
    const[selectedRecipe,setSelectedRecipe]=useState(null);
    let error=false
    return(
        <div>
            <div className="grid">
                {recipes.length > 0 ? (
                    recipes.map((item, index) => (
                        <div key={index} className="card">
                            <img src={item.strMealThumb} alt={item.strMeal} />
                            <h3>{item.strMeal}</h3>
                            <p><b>Category:</b> {item.strCategory}</p>
                            <button className="view-btn" onClick={() => setSelectedRecipe(item)}>
                                View Recipe
                            </button>
                        </div>
                    ))
                ) : (
                    <p>Error Not Found!</p>
                )}

                
            
            </div>

            
            {selectedRecipe && (
                <div className="modal-background">
                    <div className="modal">
                        <h2>{selectedRecipe.strMeal}</h2>
                        <img src={selectedRecipe.strMealThumb} alt={selectedRecipe.strMeal} />
                        <h3>Ingredients</h3>
                        <table className="ingredients-table">
                            <tbody>
                                {Object.keys(selectedRecipe)
                                .filter(key => key.startsWith("strIngredient") && selectedRecipe[key])
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
                        <button className="close-btn" onClick={() => setSelectedRecipe(null)}>Close</button>
                    </div>
                </div>
            )}
            

        </div>
       

        
    );



}