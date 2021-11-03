# I. This App is called "What'cha Makin'?" and can be found at 
    - A. https://reddev14-lunch-recipes-2.herokuapp.com/ or 
    - B. https://github.com/damatoaj/proj_2_lunch

# II. Purpose
    - A. The primary purpose of the app is to create recipes using the FDA's food API.
    - B. Users create profiles, then favorite different foods and add those foods to dishes that they name.
    - C. As of now, users can see the protein, carbohydrate, and fat content of their ingredients per 100 grams of said ingredient.
    - D. Users can delete ingredients from their menus and recipes from their profile.


# III. Next Steps
    - A. Modification of serving sizes
        1. Currently the default setting of the API is to present the amounts of nutritional components as a fraction of 100g. I believe that many would find it useful to have calculators in the app where they can adjust how large they want their portions to be and then to save that in their recipe; e.g. a bread recipe that calls for 1kg of wheat flour and .5kg of white flour. It could then display the total calories in the recipe.
        2. These calculators could be added to the results page where people see their initial lists of ingredients, and their profile pages where they could edit recipes that have already been crafted.
    - B. A comments section should be added to the recipes so that users can make notes about how well they liked a recipe or whether they would want to change it.
    - C. A databse could be added for the steps necessary to make the meals. Having ingredients is great, but cooking is more than just mixing ingredients together.

# IV. Models: my project had three primary tables and two join tables
    - A. user
        1. Attributes
            a. id:PK, name:string, age:integer, password:string
        2. Relationships
            a. One user has many lunches
            b. Many users have many foods
    - B. food
        1. Attributes
            a. id:PK, fdcid:integer, description:string
        2. Relationships
            a. Many users have many foods
            b. Many lunches have many foods
    - C. lunch
        1. Attributes
            a. id:PK, name:string, user_Id:string
        2. Relationships
            a. One user has many lunches
            b. Many lunches have many foods
    - D. users_foods
        1. Attributes
            a. id:PK, user_id:FK, food_id:FK
    - E. lunches_foods
        1. Attributes
            a. id:PK, lunch_id:FK, food_id:fk

# V. Routes Chart
    - A. GET Routes
        1. Homepage '/'
        2. Profile Page '/profile'
        3. A show page for each meal '/profile:id'
        4. Signup Page '/signup'
        5. Login Page '/login'
        6. Log Out '/logout'
        7. Show the results page when searching for foods '/results'
    - B. POST
        1. Post new lunches '/'
        2. Sign up a new user '/signup'
        3. Make a passport to do logins '/login'
        4. Post from a search bar to look for foods '/results'
        5.  Post a food to a user '/lunch'
        6. Add a food to a lunch '/foods'
    - C. DELETE
        1. Delete luncehs from a user's database '/profile/:id'
        2. Delete a food from the menu '/foods/:fdcId'

# VI. Technologies Used
    - A. Node.js
    - B. Axios for API calls
    - C. Bcrypt for security
    - D. SQL for databases
    - E. Helmet for security
    - F. Passport for authentication
    - G. Express JS
