function Movie(props){

    return (
        <div>
            <img src={`https://image.tmdb.org/t/p/w342/${props.movie.poster_path}$`}
            alt={'Affiche'}/>
            <h3>{props.movie.title}</h3>
            <p>Sorti le {props.movie.release_date}</p>
        </div>
    )
}

export default Movie