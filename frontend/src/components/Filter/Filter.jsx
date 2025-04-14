import { useState } from "react"
import "./Filter.css"

function Filter(props){
    const genres = props.genres;
    const selectedGenres = props.selectedGenres || [];
    
    const toggleGenre = (genreId) => {
        // si le genre est déjà selectionné on l'enlève
        if (selectedGenres.includes(genreId)){
            props.onGenreChange(selectedGenres.filter(id=>id != genreId))
        }
        else{
            props.onGenreChange([...selectedGenres, genreId]);
        }
    }
    

    return(
        <div className="filter-container">
            <h3>Sort by :</h3>
            <h4>Genre</h4>
            <div className="genre-filter">
                {genres.map((genre) => (
                    <div 
                        key={genre.id}
                        className={`genre-selector ${selectedGenres.includes(genre.id) ? 'selected' : ''}`}
                        onClick={() => toggleGenre(genre.id)}
                    > {genre.name}
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