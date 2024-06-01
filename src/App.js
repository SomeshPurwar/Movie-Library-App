import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourite from './components/AddFavourite';
import RemoveFavourites from './components/RemoveFavourite';
import styled from 'styled-components';
import { useAuth0 } from "@auth0/auth0-react";
import MovieInfoComponent from './components/MovieInfoComponent';





const Header=styled.div`
  
  display:flex;
  flex-direction:row;
  background-color:grey;
  color:white;
  padding:10px;
  font-size:25px;
  font-weight:bold;
  box-shadow:0 3px 6px 0 #555;
  justify-content:space-between;
  align-items:center;
  `;

  const AppName=styled.div`
  display:flex;
  flex-direction:row;
  align-items:center;
  `;

  const MovieImage=styled.img`
  width:48px;
  height:35px;
  margin:10px;
  `;

const Button=styled.button`
padding:10px;
background-color:black;
border:none;
color:white;
margin-left:10px;



`;
const UserName=styled.p`
  color:white;
  font-size:26px;
  font-weight:bold;
  
  

  `;

function App() {

  const [selectedMovie,onMovieSelect] = useState();

  const { loginWithRedirect,logout,isAuthenticated,user } = useAuth0();
  
  const [movies,setMovies] = useState([]);
  const [searchValue,setSearchValue]=useState('');
  const [favourites, setFavourites] = useState([])

    const getMovieRequest =async (searchValue) => {
      const url=`https://www.omdbapi.com/?s=${searchValue}&apikey=e996edce`;
      const response=await fetch(url);
      const responseJSON=await response.json();
      if(responseJSON.Search){
        setMovies(responseJSON.Search);

      }
      
      
    }

    useEffect(()=>{
      getMovieRequest(searchValue);
    },[searchValue])

    useEffect(() => {
      const movieFavourites = JSON.parse(
        localStorage.getItem('react-movie-app-favourites')
      );
  
      if (movieFavourites) {
        setFavourites(movieFavourites);
      }
    }, []);

    const saveToLocalStorage = (items) => {
      localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
    };
  
    const addFavouriteMovie = (movie) => {
      const newFavouriteList = [...favourites, movie];
      setFavourites(newFavouriteList);
      saveToLocalStorage(newFavouriteList);
    };
  
    const removeFavouriteMovie = (movie) => {
      const newFavouriteList = favourites.filter(
        (favourite) => favourite.imdbID !== movie.imdbID
      );
  
      setFavourites(newFavouriteList);
      saveToLocalStorage(newFavouriteList);
    };
    
  return (
    <>
    <Header>
      
      
      <AppName>
      <MovieImage src="/https://cdn-icons-png.flaticon.com/256/3171/3171927.png"/>
        SP Movie App
      </AppName>

      {isAuthenticated && <UserName>Welcome {user.name}</UserName>}

      {isAuthenticated?(<Button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      Log Out
    </Button>):(<Button onClick={() => loginWithRedirect()}>Log In</Button>)}
           
      
    </Header>
    {selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie} onMovieSelect={onMovieSelect}/>}
    
    <div className='container-fluid movie-app'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='Movies' />
				<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
			</div>
			<div className='row'>
				<MovieList
					movies={movies}
					handleFavouritesClick={addFavouriteMovie}
					favouriteComponent={AddFavourite}
          onMovieSelect={onMovieSelect}
				/>
			</div>
      {isAuthenticated && (<div>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='Favourites' />
			</div>
			<div className='row'>
				<MovieList
					movies={favourites}
					handleFavouritesClick={removeFavouriteMovie}
					favouriteComponent={RemoveFavourites}
          onMovieSelect={onMovieSelect}
				/>
			</div>
      </div>)}
		</div>
    </>
    
  );
}

export default App;
