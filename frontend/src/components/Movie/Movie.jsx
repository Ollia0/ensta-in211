import "./Movie.css"

function Movie(props){

    const formatReleaseDate = (dateStr) => {
        const monthsFr = [
            'janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octorbre', 'novembre', 'décembre'
        ];
        const date = new Date(dateStr);

        const month = date.getMonth();
        const year = date.getFullYear();

        return `${monthsFr[month]} ${year}`;
    }

    // associe l'id de genre au genre réel
    const getGenreNames = () => {
        return props.movie.genre_ids.map(id => props.genres.find(genre => genre.id === id)?.name)
    }

    const genreNames = getGenreNames();
    console.log(genreNames);

    return (
        // afficheage du film
        <div className="movie-container">
            {/* affiche l'image*/}
            <img src={`https://image.tmdb.org/t/p/original${props.movie.poster_path}`}
            alt={'Affiche'}
            className="movie-poster"/>
            {/* infos sous l'image */}
            <div className="movie-information">
                <div className='movie-title'>{props.movie.title}</div>
                <div className='release-date'>Sorti en {formatReleaseDate(props.movie.release_date)}</div>
            </div>
            {/* infos suplémentaires quand over */}
            <div className="movie-details-wrapper">
                <div className="movie-details-box">
                    <div className="movie-genres">
                        {genreNames.join(', ')}
                    </div>
                    <p className="movie-synopsis"><strong>Overview</strong> : {props.movie.overview}</p>
                    <div className="movie-extra-info">
                        <p>Note: {props.movie.vote_average}/10</p>
                        <p>Votes: {props.movie.vote_count}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Movie

/*
mediapermet d'afficher selon la taille de l'écran
    "poster_sizes": [
      "w92",
      "w154",
      "w185",
      "w342",
      "w500",
      "w780",
      "original"
    ],
*/