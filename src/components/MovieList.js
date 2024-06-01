import { useAuth0 } from '@auth0/auth0-react';
import React from 'react'
import styled from 'styled-components';


const MovieContainer=styled.div`
cursor:pointer;
display:flex;
flex-direction:column;
padding:10px;
width:280px;
box-shadow:0 3px 10px 0 #aaa;
`;
const CoverImage=styled.img`
object-fit:cover;
height:362px;
`;

const MovieName=styled.span`
font-size:18px;
font-weight:600;
color:white;
margin:15px 0;
white-space:nowrap;
text-overflow:ellipsis;
overflow:hidden;

`;

const InfoCol=styled.div`
display:flex;
flex-direction:row;
justify-content:space-between;

`;

const MovieInfo=styled.span`
display:flex;
flex-direction:row;
font-size:16px;
font-weight:500;

color:white;
text-transform:capitalize;

`;


const MovieList = (props) => {
    
    const FavouriteComponent=props.favouriteComponent;
    const { isAuthenticated } = useAuth0();
  return (
    <>
    {props.movies.map((movie,index)=>(
        
        <div className="image-container d-flex justify-content-start m-3">
            <MovieContainer onClick={()=>{props.onMovieSelect(movie.imdbID)}}>
            <CoverImage src={movie.Poster} alt={movie.Title}></CoverImage>
            <MovieName>{movie.Title}</MovieName>
        <InfoCol>
        <MovieInfo>Year: {movie.Year}</MovieInfo>
        <MovieInfo>Type: {movie.Type}</MovieInfo>
        </InfoCol>
        </MovieContainer>
            <div
						onClick={() =>{ 
                            if(isAuthenticated){
                                props.handleFavouritesClick(movie)}
                                else{alert("You have to Login First")}
                            
                        }}
						className='overlay d-flex align-items-center justify-content-center'
					>
						<FavouriteComponent />
					</div>
        </div>
    ))}

      
    </>
  )
}

export default MovieList
