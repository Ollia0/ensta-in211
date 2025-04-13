// import logo from './logo.svg';
import './Home.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Movie from '../../components/Movie/Movie';
import Filter from '../../components/Filter/Filter'

function Home() {

  const [movieName, setMovieName] = useState('')
  // const [movies, setMovies] = useState('')
  
  // update le nom du film selon l'input
  const movieNameChange = (Event) => {
    setMovieName(Event.target.value);
  }

  // récupère les 20 films les plus populaires
  const getPopularMovies = async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_API_KEY}&language=en-US&page=1`);
      return response.data;
    }
    catch (error){
      console.log("Erreur de chargement des films");
      return []
    }
  };

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

  // récupère les 20 films les plus populaires & des codes des gens
  const useFetchMoviesAndGenres = () => {
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);

    useEffect(() => {
      const fetchData = async() => {
        const [moviesData, genresData] = await Promise.all([
          getPopularMovies(),
          getGenres()
        ]);
        // console.log(data);
        setMovies(moviesData.results);
        setGenres(genresData)
      };
  
      fetchData();
      // pas besoin de teardown ici
    }, [] );
  
    return {movies, genres};
  };
  
  const { movies, genres } = useFetchMoviesAndGenres();

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
          <Filter genres={genres}/>
        </div>
      </div>

      </header>
    </div>
  );
}

export default Home;
