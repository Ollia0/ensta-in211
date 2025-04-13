// import logo from './logo.svg';
import './Home.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Movie from '../../components/Movie/Movie';

function Home() {
  // const api_key = "15d2ea6d0dc1d476efbca3eba2b9bbfb"

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
  

  // récupère les 20 films les plus populaires
  const useFetchMovies = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
      const fetchMovies = async() => {
        const data = await getPopularMovies();
        console.log(data);
        setMovies(data.results);
      };
  
      fetchMovies();
      // pas besoin de teardown ici
    }, [] );
  
    return(movies);
  };
  
  const movies = useFetchMovies();

  return (
    <div className="App">
      <header className="App-header">
        <h1>Filmopédia</h1>
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <input
          type="text"
          id="input_nom_film"
          name="input_nom_film"
          placeholder="Cherchez un film"
          value={movieName}
          onChange = {movieNameChange}
        />
        {movieName && <p>Résulatat de la recherche : {movieName}</p>}
        <h2>Les 20 films les plus populaires</h2>
        <div className="movie-display">
          {movies.map(movie => (
              <Movie key={movie.id} movie={movie} />
            ))}
        </div>

      </header>
    </div>
  );
}

export default Home;
