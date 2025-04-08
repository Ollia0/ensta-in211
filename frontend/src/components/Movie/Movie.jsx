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

    return (
        <div className="movie-container">
            <img src={`https://image.tmdb.org/t/p/original${props.movie.poster_path}$`}
            alt={'Affiche'}
            className="movie-poster"/>
            <div className="movie-information">
                <div className='movie-title'>{props.movie.title}</div>
                <p>Sorti en {formatReleaseDate(props.movie.release_date)}</p>
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