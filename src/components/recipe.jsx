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
    const[showButton,setShowButton]=useState(false);
    const[Category,setCategory]=useState("All");
    const [area, setArea] = useState("All");
    const[listening,setListening]=useState(false);
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

    useEffect(()=>{
        const handleScroll=()=>{
            if(window.scrollY>300){
                setShowButton(true);
            }
            else{
                setShowButton(false);
            }
        };
        window.addEventListener("scroll",handleScroll);
        return()=>{
            window.removeEventListener("scroll",handleScroll);
        };
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
    const handleCategoryChange=(cat)=>{
        setCategory(cat);
        if(cat !== "All"){
            fetchRecipesByCategory(cat);
        }
    };
    const fetchRecipesByCategory = async (cat) => {
        setLoading(true);
        setError(false);

        try {
            const response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`
            );
            const data = await response.json();

            if (data.meals) {
            const fullDetails = await Promise.all(
                data.meals.map(async (meal) => {
                const res = await fetch(
                    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
                );
                const mealData = await res.json();
                return mealData.meals[0]; // full recipe details
                })
            );
            setRecipes(fullDetails);
            } else {
            setRecipes([]);
            setError(true);
            }
        } catch (err) {
            setError(true);
            setRecipes([]);
        } finally {
            setLoading(false);
        }
    };
    const handleAreaChange = (selectedArea) => {
        setArea(selectedArea);
        setCategory("All"); // reset category to avoid conflict
        if (selectedArea !== "All") {
            fetchRecipesByArea(selectedArea);
        }
    };

    const fetchRecipesByArea = async (selectedArea) => {
        setLoading(true);
        setError(false);

        try {
            const response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedArea}`
            );
            const data = await response.json();

            if (data.meals) {
            const fullDetails = await Promise.all(
                data.meals.map(async (meal) => {
                const res = await fetch(
                    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
                );
                const mealData = await res.json();
                return mealData.meals[0];
                })
            );
            setRecipes(fullDetails);
            } else {
            setRecipes([]);
            setError(true);
            }
        } catch {
            setError(true);
            setRecipes([]);
        } finally {
            setLoading(false);
        }
    };
    const startVoiceSearch = () => {
        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            alert("Voice search not supported in this browser");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = "en-US";
        recognition.interimResults = false;

        recognition.start();
        setListening(true);

        recognition.onresult = (event) => {
            const spokenText = event.results[0][0].transcript;
            setSearch(spokenText);
            fetchRecipes(spokenText);
            setListening(false);
        };

        recognition.onerror = () => {
            setListening(false);
        };

        recognition.onend = () => {
            setListening(false);
        };
    };




    




















    return(
        <div>
            <div>
                <h1>Find Your Recipe</h1>
                <div className="c5">
                    <div className="search">
                        <input
                        type="text"
                        placeholder="Enter Food Name..."
                        value={search}
                        onChange={(e)=> setSearch(e.target.value)}
                        />
                        <button className="sbutton" onClick={()=>fetchRecipes(search)}>Search</button>

                        <button
                            className={`mic-btn ${listening ? "listening" : ""}`}
                            onClick={startVoiceSearch}
                        >
                            🎤
                        </button>

                    </div>
                    <div className="filters">
                        <select value={Category} onChange={(e)=>handleCategoryChange(e.target.value)}>
                             <option value="All">All Categories</option>
                             <option value="Chicken">Chicken</option>
                             <option value="Beef">Beef</option>
                             <option value="Seafood">Seafood</option>
                             <option value="Vegetarian">Vegetarian</option>

                        </select>
                        <select value={area} onChange={(e) => handleAreaChange(e.target.value)}>
                            <option value="All">All Areas</option>
                            <option value="Indian">Indian</option>
                            <option value="Italian">Italian</option>
                            <option value="American">American</option>
                            <option value="Chinese">Chinese</option>
                            <option value="Japanese">Japanese</option>
                        </select>
                        






                    </div>
                    
                </div>    











                {showButton && (
                    <button
                     className="go-favorites-btn"
                     onClick={() => {
                        favoritesRef.current.scrollIntoView({ behavior: "smooth" });
                     }}
                    >
                        ⬇️
                    </button>

                )}
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