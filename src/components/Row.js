import React, {useState, useEffect} from 'react';
import axios from '../axios';
import "./Row.css"

const base_url = "https://image.tmdb.org/t/p/original";

function Row({title, fetchUrl, isLargeRow}) {

    const [movies, setMovies] = useState([]);


    //  code that runs when it meets a specific condition
    useEffect (() => {

        async function fetchData() {
            const request = await axios.get(fetchUrl);
            //console.log(request.data.results);
            setMovies(request.data.results)
            return request;
        }

        fetchData();

    }, [fetchUrl]);
    //  [] is used so that it loads only when the page loads not when it changes. i.e., load row once and don't load again.
    //  [movies] is used, if it needs to be loaded each time movies is changed.
    
    //console.log(movies)
    
    return (
        <div className="row">
            
            <h2>{title}</h2>
            <div className="row_posters">
                { movies.map(movie => (
                    <img
                    key={movie.id} 
                    className={`row_poster ${isLargeRow && "row_posterLarge"}`} 
                    src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name} />
                ))}


            </div>


        </div>

    )
}

export default Row;