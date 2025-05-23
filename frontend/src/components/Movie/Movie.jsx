import "./Movie.css"
import { useNavigate } from 'react-router-dom';
// import MovieDetails from '../pages/MovieDetails/MovieDetails';
import placeholderImage from '../../assets/images/poster_placeholder.png';

function Movie(props){
    const nav = useNavigate()

    const handleMovieClick = () => {
        nav(`/movie/${props.movie.id}`);
    }

    const formatReleaseDate = (dateStr) => {
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
        ];
        const date = new Date(dateStr);

        const month = date.getMonth();
        const year = date.getFullYear();

        return `${months[month]} ${year}`;
    }

    const cutOverview = (text) => {
        const maxLength = 580;
        if(!text) return 'Synopsis not found';
        if(text.length <= maxLength) return text;
        return text.substring(0, maxLength) +  '...';
    }

    const getRatingPercentage = () => {
        return props.movie.vote_average * 10;
    }
    
    // Déterminer la couleur selon la note
    const getRatingColor = () => {
        if(props.movie.vote_count == 0) return "#A07178"; // Neutre quand pas de vote
        const rating = props.movie.vote_average;
        if (rating >= 7) return "#21d07a"; // Vert pour les bonnes notes
        if (rating >= 5) return "#d2d531"; // Jaune pour les notes moyennes 
        return "#db2360"; // Rouge pour les mauvaises notes
    }

    // associe l'id de genre au genre réel
    const getGenreNames = (genre_ids, genres) => {
        if(!genre_ids || genre_ids.length == 0){
            return [];
        }
        else
        return props.movie.genre_ids.map(id => props.genres.find(genre => genre.id === id)?.name)
    }

    const genreNames = getGenreNames(props.movie?.genre_ids, props.genres);
    const posterSrc = props.movie.poster_path === null ? placeholderImage : `https://image.tmdb.org/t/p/original${props.movie.poster_path}`;
    const hasVotes = props.movie.vote_count > 0;

    return (
        // afficheage du film
        <div className="movie-container" onClick={handleMovieClick}>
            {/* affiche l'image*/}
            <img src={posterSrc}
            alt={'Affiche'}
            className="movie-poster"/>
            {/* barre d'affichage selon la note */}
            <div className="rating-bar-container">
                <div className="rating-bar-fill" style={{ width: `${getRatingPercentage()}%`,backgroundColor: getRatingColor() }}></div>
            </div>
            {/* infos sous l'image */}
            <div className="movie-information">
                <div className='movie-title'>{props.movie.title}</div>
                <div className='release-date'>{props.movie?.release_date 
                ? formatReleaseDate(props.movie.release_date) : "To be annouced"}</div>
            </div>
            {/* infos suplémentaires quand over */}
            <div className="movie-details-wrapper">
                <div className="movie-details-box">
                    <div className="movie-genres">
                        {genreNames.join(', ')}
                    </div>
                    <p className="movie-synopsis"><strong>Overview</strong> : {cutOverview(props.movie.overview)}</p>
                    <div className="movie-extra-info">
                        <div className="rating-badge" style={{ backgroundColor: getRatingColor() }}>
                        {hasVotes ? `${props.movie.vote_average.toFixed(2)}/10` : "Not Rated"}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Movie