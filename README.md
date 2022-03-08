# Movies-Frontend
*By Heather Mielke & Meredith Bloom*

## User Stories

+ Users can go to the homepage to see data about popular, trending, upcoming, and top-rated movies and tv shows. This data is pulled from a third party API (<https://www.themoviedb.org>) and is updated live.
..* **See airing today section!**
+ Users can search for movies and display the results on the homepage.
+ Users can see movies by genre. 
+ Users can create an account, go to their profile, edit/update/delete their account. Users' passwords are encrypted using bcrypt. 
+ Users can add movies to their favorites and watchlist by clicking on the icons on the movie overlays. These lists are updated in real time. 
..* Please note that this only works for movies pulled from the third party API.
+ Users can see a master list of movies that is pulled from our mongodb database. Unfortunately the image urls do not work, but the user can still see other information about the movies.
+ Users can click on the site logo to return to the homepage. (Thanks Heather for the design!!)
+ Current user persists across all genre pages, all-movies, etc. So if a user is logged in, they can look at the genre pages, add movies to their favorites, and return to their profile to see those updated lists displayed. 



### Technologies Used

+ We used a combination of a third party API (<https://www.themoviedb.org>) and a mongodb database that we compiled from other movie data we were able to enter using a seed route.
+ Front-end: React, React Router, Axios, Bootstrap, Node.js, HTML/CSS
+ Back-end: Express, Bcrypt, Cors, Node.js



### Approach Taken
 

##### Movies Model
+ Started by pulling information from third party api (with an api key) to display on our site. 
+ Split requests to third party api into separate components on homepage. 
+ Implemented search bar on homepage that queries third party api for movies whose titles match the search input.
+ Initially tried to include genre sort on homepage, but decided it made more sense to create separate pages for each genre.
..* other movie related models include...
..* Favorites and Watchlist models, which are displayed on user profiles and updated with movie overlay icons (heart, plus sign)

##### User Model
+ User model includes name, username, email, encrypted password, a default profile picture, favorite genres, streaming providers, and a favorite movie. 
** We were not able to connect our user and movie models (including movie object Ids in user model), so the favorites/watchlist persist across all users**

+ User information can be updated from their profile. 
+ If someone tries to create an account with a username that already exists, the page won't change. If someone tries to sign in with an incorrect password, the page won't change.

### Unsolved Problems

##### Actual Unsolved Problems

+ Utilize sessions/cookies/jwt tokens for full user authentication. Implementing user authentication/sessions with the third party api, because right now users are only ever accessing information from our database, not the third party. For an individual user to make a request to the api, they need a session id/token, which we didn't know how to implement. 

+ Connect movie and user models - so each user would have their own lists of movies that they can add to/update. The lists would be of movie object ids, which would then call the movie info when referenced/displayed.

+ Be able to use arrays of strings for favorite movies, streaming providers, favorite genres. We were having trouble creating a form with a dropdown menu - the form submission was only working for text input, not "select". 

+ Display error messages to user if input is bad (i.e. password is incorrect). Right now, the only way to know if you entered bad data is if the page doesn't appear to refresh after hitting submit. 

+ We wanted a page for specifically doing searches. 



##### If we had more time / long term goals

+ Conditional rendering of header buttons (i.e. login, logout, signup, profile page, home). 

+ We really wanted to include a recommended movie section. The third party api has a functionality for this kind of request, but without being able to tie users to a session id to then make requests to the api, we were unable to execute this.

+ We want users to take a quiz when they sign up that would calculate their favorite genres/recommended movies, instead of them just inputting that information as strings. 

+ Ability to rate and leave reviews.

+ Movie data pulled from third party api would also show where a user could actually watch said movie/tv show (the api also had information on streaming providers). 

+ The api we used had no way to just display a master list of movies - all requests had to have some specifier, be it genre or movie id. Because of this limitation, we created our own database of movies that *does* display (in chunks of 20 movies). Unfortunately, the image urls for the movies in our database were broken. 

+ We wanted to incorporate pageination. Right now the movie get requests are limited to 20 movies at a time. So only the first 20 movies in any category. The search bar, however, searches all the movies in the third party api, not only those currently displayed. 

+ Cleaner file structure and pathing. Our code was not DRY at all. We read/learned about the <Layout> structure and think this would be a good thing to implement in the future. Also using contexts for global user auth... we watched some videos on this and started to code along, but opted to just pass the current user as props to each of our routes. 

### Other Thoughts

+ Topics we definitely want to explore further: React Router, User Auth with React, using params 

#### Links 

Third Party Movie API
<https://www.themoviedb.org/>

Front End Link
<https://limitless-scrubland-74072.herokuapp.com/>

Github Front End
<https://github.com/Heather-Mielke/Movies-Frontend>

Back End Link - has to either include /movies or /users as we have nothing at the root
<https://powerful-garden-94854.herokuapp.com/users>
<https://powerful-garden-94854.herokuapp.com/movies>

Github Back End
<https://github.com/Heather-Mielke/Movie-Backend>


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
