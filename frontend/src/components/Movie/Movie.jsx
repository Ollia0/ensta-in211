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
        const rating = props.movie.vote_average;
        if (rating >= 7) return "#21d07a"; // Vert pour les bonnes notes
        if (rating >= 5) return "#d2d531"; // Jaune pour les notes moyennes 
        return "#db2360"; // Rouge pour les mauvaises notes
    }

    // associe l'id de genre au genre réel
    const getGenreNames = () => {
        return props.movie.genre_ids.map(id => props.genres.find(genre => genre.id === id)?.name)
    }

    const genreNames = getGenreNames();
    // console.log(genreNames);

    return (
        // afficheage du film
        <div className="movie-container">
            {/* affiche l'image*/}
            <img src={`https://image.tmdb.org/t/p/original${props.movie.poster_path}`}
            alt={'Affiche'}
            className="movie-poster"/>
            {/* barre d'affichage selon la note */}
            <div className="rating-bar-container">
                <div className="rating-bar-fill" style={{ width: `${getRatingPercentage()}%`,backgroundColor: getRatingColor() }}></div>
            </div>
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
                    <p className="movie-synopsis"><strong>Overview</strong> : {cutOverview(props.movie.overview)}</p>
                    <div className="movie-extra-info">
                        <div className="rating-badge" style={{ backgroundColor: getRatingColor() }}>
                            {props.movie.vote_average.toFixed(2)}/10
                        </div>
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