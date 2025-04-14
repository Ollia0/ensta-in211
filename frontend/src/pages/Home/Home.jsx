// import logo from './logo.svg';
import './Home.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Movie from '../../components/Movie/Movie';
import Filter from '../../components/Filter/Filter'

function Home() {

  const [movieName, setMovieName] = useState('')
  const [selectedGenres, setSelectedGenres] = useState([]);
  
  // update le nom du film selon l'input
  const movieNameChange = (Event) => {
    setMovieName(Event.target.value);
  }

  const getGenres = async () => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.VITE_API_KEY}`);
    return response.data.genres;
  } 
  catch (error) {
    console.log("Erreur de chargement des genres");
    return [];
  }
};

  const useFetchGenres = () => {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
      const fetchData = async() => {
        const genresData = await(getGenres());
        setGenres(genresData)
      };

      fetchData();
    }, []);
    return genres
  }

  const fetchMovies = async (selectedGenres)  => {
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}`;

    if (selectedGenres.length > 0){
      const with_genresParam = selectedGenres.join(',');
      url += `&with_genres=${with_genresParam}`;
    }

    try {
      const response = await axios.get(url);
      return(response.data.results);
    }
    catch (error){
      console.error("Erreur de chargement des films")
      return [];
    }
  }

  const useFetchMovies = (selectedGenres) => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
      const fetchData = async() => {
        const moviesData= await(fetchMovies(selectedGenres));
        setMovies(moviesData);
      };

      fetchData();
    }, [selectedGenres]);
    return movies;
  }
  
  const genres = useFetchGenres();
  const movies = useFetchMovies(selectedGenres)

  return (
    <div className="App">
      <header className="App-header">
        {/* partie haute du site, pas le header normal de index */}
      <div className="header-section">
        <h1>Filmopédia</h1>
        <input
          type="text"
          id="input_nom_film"
          name="input_nom_film"
          placeholder="Cherchez un film"
          value={movieName}
          onChange={movieNameChange}
        />
        {movieName && <p>Résultat de la recherche : {movieName}</p>}
      </div>

      <div className="content-section">
        {/* contenu du site à gauche */}
        <div className="main-content">
          <div className="movie-display">
            {movies.map(movie => (
              <Movie key={movie.id} movie={movie} genres={genres}/>
            ))}
          </div>
        </div>
        {/* panneau filtre à droite*/}
        <div className="filter-panel">
          <Filter
            genres={genres}
            selectedGenres={selectedGenres}
            onGenreChange={setSelectedGenres}
            />
        </div>
      </div>

      </header>
    </div>
  );
}

export default Home;
