import React, { useEffect, useState } from 'react';
import axios from '../axios';
import requests from '../requests';
import "./Banner.css"


function Banner() {
    const [movie, setMovie] = useState([]);
    
    useEffect(() => {
        async function fetchData(){
            const request = await axios.get(requests.fetchTrending);
            setMovie(request.data.results[
                Math.floor(Math.random() * request.data.results.length - 1)
            ]);
            return request;
        }

        fetchData();
    }, []);
    
    //console.log(movie)

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n-1) + "..." : str;
    }


    
    return(

        <header className="Banner"
        style={{
            backgroundSize: "cover",
            backgroundImage: `url(
                "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
            )`,
            backgroundPosition: "center center",
            }}
        >
            <div className="Banner_contents">
                <h1 className="Banner_title">{movie?.title || movie?.name || movie?.original_name}</h1>
                <div className="Banner_buttons">
                    <button className="Banner_button">Play</button>
                    <button className="Banner_button">My List</button>    
                </div>
                
                <h1 className="Banner_description">{truncate(movie?.overview, 150)}</h1>
            </div>
            <div className="Banner_fade_bottom"></div>
        </header>
    )
}

export default Banner;