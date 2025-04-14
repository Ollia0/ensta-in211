import { useState } from "react"
import "./Filter.css"

function Filter(props){
    const genres = props.genres;
    const selectedGenres = props.selectedGenres || [];
    const sortOrder = props.sortOrder;
    const sortCriteria = props.sortCriteria;
    
    const toggleGenre = (genreId) => {
        // si le genre est déjà selectionné on l'enlève
        if (selectedGenres.includes(genreId)){
            props.onGenreChange(selectedGenres.filter(id=>id != genreId))
        }
        else{
            props.onGenreChange([...selectedGenres, genreId]);
        }
    }
    // changer l'ordre de tri
    const toggleSortOrder = () => {
        props.onSortOrderChange(sortOrder === "asc" ? "desc" : "asc");
    }
    // changer critère tri
    const handleSortCriteriaChange = (selectEvent) => {
        props.onSortCriteriaChange(selectEvent.target.value);
    }

    return(
        <div className="filter-container">
            <h3>Sort by :</h3>

            <div className="sort-selector-ellipse">
                <select className="sort-dropdown" value={sortCriteria} onChange={handleSortCriteriaChange}>
                    <option value="popularity">Popularity</option>
                    <option value="title">Title</option>
                    <option value="release_date">Release date</option>
                    <option value="vote_average">Vote average</option>
                    <option value="vote_count">Vote number</option>
                    <option value="revenue">Revenue</option>
                </select>
                
                <div className="sort-order-arrows" onClick={toggleSortOrder}>
                    <div className={`up-arrow ${sortOrder === "asc" ? "active" : ""}`}>
                        ▲
                    </div>
                    <div className={`down-arrow ${sortOrder === "desc" ? "active" : ""}`}>
                        ▼
                    </div>
                </div>
            </div>

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