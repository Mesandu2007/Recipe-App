🍲 Recipe Finder App

A simple React web application to search for meals, view recipes, and explore ingredients and cooking instructions. Powered by TheMealDB API
.

Features

Search recipes by name (e.g., “chicken”, “pasta”)

Display recipes in a responsive grid layout

View detailed recipe in a modal popup

Ingredients listed separately

Cooking instructions shown step by step

Fetch default recipes on page load

Technologies Used

React (functional components, hooks: useState, useEffect)

CSS for styling and grid layout

TheMealDB API for meal data

Pictures
<img width="1918" height="902" alt="image" src="https://github.com/user-attachments/assets/919706f9-cda6-476b-8936-03383b34afc6" />
<img width="1918" height="902" alt="image" src="https://github.com/user-attachments/assets/97aca328-0e1a-49d4-8e86-92fa8bfb25d9" />








Installation & Setup

Clone the repository:

git clone <your-repo-url>
cd recipe-finder


Install dependencies:

npm install


Start the development server:

npm run dev


Open your browser and go to:

http://localhost:5173

Usage

On page load, default recipes (e.g., “chicken”) are displayed.

Enter a food name in the search bar and click Search.

Click View Recipe on any recipe card to open the modal:

See ingredients listed individually

Read step-by-step instructions

Click Close to exit the modal.

API Used

TheMealDB API

Endpoint:

https://www.themealdb.com/api/json/v1/1/search.php?s=<search-query>


Returns JSON with meal details:

strMeal, strMealThumb, strCategory, strInstructions, strIngredient1..20, strMeasure1..20

Notes

Maximum 20 ingredients per recipe are handled.

If no recipes are found, a message No Recipe Found 🙁 is displayed.

Default search term is "chicken" on first load.

Future Enhancements

Filter by category or cuisine

Save favorite recipes locally

Add pagination for large search results

Improve modal with step-by-step instruction formatting

Author

Developed by [Mesandu]

This is a clean text-only README, ready for GitHub or submission.

If you want, I can also write a version formatted with Markdown headings and bullets for even cleaner GitHub presentation. Do you want me to do that?
