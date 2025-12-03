import "./recipe.css"
import Grid from "./Grid"
import { useEffect,useState } from "react";
export default function Recipe(){
    const[recipes,setRecipes]=useState([]);
    const[search,setSearch]=useState("");
    const[selectedRecipe, setSelectedRecipe]=useState(null);

    useEffect(()=>{
        fetchRecipes("chicken");
    },[]);

    const fetchRecipes=async(query)=>{
        if(query==""){
            alert("Pls Enter A Food Type")
        }
        const response=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const data=await response.json();
        setRecipes(data.meals || []);

    };
    return(
        <div>
            <h1>Find Your Recipe</h1>

            <div className="search">
                <label>Enter Food Name:</label>
                <input placeholder="Enter Food Name..." type="text" value={search} onChange={(e)=>setSearch(e.target.value)}></input>
                <button className="sbutton" onClick={()=>fetchRecipes(search)}>Search</button>
            </div>
            <Grid recipes={recipes}/>
        </div>




    );

}    