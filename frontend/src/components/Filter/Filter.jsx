import { useState, useEffect } from "react"
import "./Filter.css"

function Filter(props){
    const genres = props.genres;
    const selectedGenres = props.selectedGenres || [];
    const sortOrder = props.sortOrder;
    const sortCriteria = props.sortCriteria;
    // un état local pour la valeur de l'input du nb de vote
    const [voteInputValue, setVoteInputValue] = useState(props.minVoteCount);
    const [debouncedValue, setDebouncedValue] = useState(voteInputValue);
    const [minVoteIsEdited, setMinVoteIsEdited] = useState(false);

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

    // changer nb min vote
    const handleVoteInputChange = (e) => {
        // Accepter seulement des nombres
        const value = e.target.value.replace(/\D/g, '');
        if (value !== props.minVoteCount.toString()) {
            setMinVoteIsEdited(true);
        }
        setVoteInputValue(value);
    }

    // // appliquer nb min vote
    // const submitVoteCount = () => {
    //     // convertir en nombre valide
    //     const voteCount = parseInt(voteInputValue) || 0;
    //     props.onMinVoteCountChange(voteCount);
    // }

    // utilisation d'un debounce pour timer le changement du nb min de vote
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(voteInputValue);
        }, 1000);
        
        return () => clearTimeout(timer);
    }, [voteInputValue]);
    
    useEffect(() => {
        if (debouncedValue !== props.minVoteCount) {
            const voteCount = parseInt(debouncedValue) || 0;
            props.onMinVoteCountChange(voteCount);
            setMinVoteIsEdited(false);
        }
    }, [debouncedValue]);
    
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

            <h4>Minimum Votes</h4>
            <div className="vote-input-container">
                <input 
                    type="text"
                    className={`vote-input ${minVoteIsEdited ? 'editing' : ''}`}
                    value={voteInputValue}
                    onChange={handleVoteInputChange}
                    placeholder="Minimum vote number"
                />

            </div>
        </div>
    )
}

export default Filter
// {movies.map(movie => (
//     <Movie key={movie.id} movie={movie} genres={genres}/>
//   ))}