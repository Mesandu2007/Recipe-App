import "./recipe.css";
import Grid from "./Grid";
import {useEffect,useState,useRef} from "react";
import Favorites from "./Favorites";
import Footer from "./Footer";

export default function Recipe(){
    const[recipes,setRecipes]=useState([]);
    const[search,setSearch]=useState("");
    const[loading,setLoading]=useState(true);
    const[error,setError]=useState(false);
    const favoritesRef=useRef(null)


// loads  local storage when the app starts
    const[favorites,setFavorites]=useState(()=>{
        const saved=localStorage.getItem("favorites");
        return saved ? JSON.parse(saved):[];

    });
  // keeps local storage updated whenever favorites change
    useEffect(()=>{
        localStorage.setItem("favorites",JSON.stringify(favorites));
    }, [favorites]);




    useEffect(()=>{
        fetchRecipes("Chicken");

    },[]);
    const fetchRecipes=async(query)=>{
        if(query.trim()===""){
            alert("Please enter a food name");
            return;
        }
        setLoading(true);
        setError(false);
        try{
            const response=await fetch(
                 `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`

            );
            const data=await response.json();
            if(data.meals){
                setRecipes(data.meals);
            }
            else{
                setRecipes([]);
                setError(true);
            }

        }
        catch(err){
            setError(true);
            setRecipes([]);
        }
        finally{
            setLoading(false);
        }
    };
    const addToFavorites=(recipe)=>{
        if(!favorites.find((r)=> r.idMeal === recipe.idMeal)){
            setFavorites([...favorites,recipe]);
        }

    };
    const removeFromFavorites = (id)=>{
        setFavorites(favorites.filter((r) => r.idMeal !== id));
    };

    return(
        <div>
            <div>
                <h1>Find Your Recipe</h1>
                <div className="search">
                    <input
                    type="text"
                    placeholder="Enter Food Name..."
                    value={search}
                    onChange={(e)=> setSearch(e.target.value)}
                    />
                    <button className="sbutton" onClick={()=>fetchRecipes(search)}>Search</button>

                    <button className="go-favorites-btn"
                    onClick={()=>{
                        document.getElementById("favorites").scrollIntoView({
                            behavior: "smooth",
                        });
                    }}
                    >
                        Go to Favorites 
                    </button>

                    


                

                </div>
                <Grid
                recipes={recipes}
                loading={loading}
                error={error}
                favorites={favorites}
                onAddToFavorites={addToFavorites}
                
                />

                <div ref={favoritesRef}>
                    <Favorites
                        favorites={favorites}
                        removeFromFavorites={removeFromFavorites}

                    />
                </div>
                
            </div>
            <Footer/>
        </div>    
        
    );
}    