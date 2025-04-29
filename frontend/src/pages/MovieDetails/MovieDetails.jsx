import "./MovieDetails.css"
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import placeholderImage from '../../assets/images/poster_placeholder.png';

function MovieDetails() {
    const { id } = useParams();

    const fetchDetails = async () => {
        let url = `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_API_KEY}`;
        try{
            const response = await axios.get(url);
            return response.data;
        }
        catch (error){
            console.log("Erreur lors de la récupération des détails");
            return [];
        }
    }

    const useFetchDetails = () => {
        const [details, setDetails] = useState([]);

        useEffect(() => {
            const fetchData = async () => {
                const detailsData = await fetchDetails();
                setDetails(detailsData);
            }
            fetchData();
        }, [])
        return details;
    }

    const formatReleaseDate = () => {
        return !details?.release_date
            ? "TBA"
            : new Date(details.release_date).getFullYear();
    }

    const details = useFetchDetails();
    const posterSrc = details.poster_path === null
        ? placeholderImage
        : `https://image.tmdb.org/t/p/original${details.poster_path}`;
    // console.log(details.genres)

    return(
        <div className="App">
            <div className="movie-detail-container"
            style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${details.backdrop_path})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                position: 'relative'
            }}>
                <div className="backdrop-overlay"></div>
                <div className="movie-poster-container">
                    <img src={posterSrc}
                    alt={'Affiche'}
                    className="movie-details-poster"/>
                </div>
                <div className="movie-informations-container">
                    <h1>{details.title} ({formatReleaseDate()})</h1>
                    <p className="movie-tagline">{details.tagline}</p>
                    <div className="movie-details-genre-container">
                        {details.genres && details.genres.map((genre) => 
                        (<Link 
                            key={genre.id}
                            to={`/?genre=${genre.id}`} 
                            className="movie-details-genre"
                        >
                            {genre.name}
                        </Link>
                        ))}
                    </div>
                    <h3> Overview :</h3>
                    <p className="movie-details-overview">{details.overview}</p>
                </div>
            </div>
        </div>
    )
}

export default MovieDetails

// backdrop en arrière plan