import { useState } from "react"
import "./Filter.css"

function Filter(props){
    // const [selectedGenres, setSelectedGenres] = useState([]);
    const genres = props.genres;

    return(
        <div className="filter-container">
            <h3>Filters</h3>
            <div className="genre-filter">
                <h2>Genre</h2>
                {genres.map((genre) => (
                    <div key={genre.id} className="genre-checkbox">
                        <input
                            type="checkbox"
                            id={`genre-${genre.id}`}
                            name={genre.name}
                        />
                        <label htmlFor={`genre-${genre.id}`}>{genre.name}</label>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Filter
// {movies.map(movie => (
//     <Movie key={movie.id} movie={movie} genres={genres}/>
//   ))}