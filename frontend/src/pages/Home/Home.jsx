// import logo from './logo.svg';
import './Home.css';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Movie from '../../components/Movie/Movie';
import Filter from '../../components/Filter/Filter';

function Home() {
  const [sortCriteria, setSortCriteria] = useState('popularity');
  const [sortOrder, setSortOrder] = useState('desc');
  const [minVoteCount, setMinVoteCount] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedGenres, setSelectedGenres] = useState(() => {
    const genreParam = searchParams.get('genre');
    return genreParam ? genreParam.split(',').map(Number) : [];
  });
  const [mediaType, setMediaType] = useState('movie');

  const getGenres = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/genre/${mediaType}/list?api_key=${import.meta.env.VITE_API_KEY}`,
      );
      return response.data.genres;
    } catch (error) {
      console.log('Erreur de chargement des genres');
      return [];
    }
  };

  const useFetchGenres = () => {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        const genresData = await getGenres();
        setGenres(genresData);
      };

      fetchData();
    }, [mediaType]);
    return genres;
  };

  const fetchMovies = async (selectedGenres) => {
    let url = `https://api.themoviedb.org/3/discover/${mediaType}?api_key=${import.meta.env.VITE_API_KEY}&sort_by=${sortCriteria}.${sortOrder}&vote_count.gte=${minVoteCount}`;

    if (selectedGenres.length > 0) {
      const with_genresParam = selectedGenres.join(',');
      url += `&with_genres=${with_genresParam}`;
    }

    try {
      const response = await axios.get(url);
      return response.data.results;
    } catch (error) {
      console.error('Erreur de chargement des films');
      return [];
    }
  };

  const useFetchMovies = (selectedGenres) => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        const moviesData = await fetchMovies(selectedGenres);
        setMovies(moviesData);
      };

      fetchData();
    }, [selectedGenres, sortOrder, sortCriteria, minVoteCount, mediaType]);
    return movies;
  };

  const handleMediaTypeChange = (newMediaType) => {
    if (mediaType == newMediaType) return;
    setMediaType(newMediaType);
    setSelectedGenres([]);
  };

  const genres = useFetchGenres();
  const movies = useFetchMovies(selectedGenres);

  return (
    <div className="App">
      <header className="App-header">
        <div className="media-type-selector">
          <button
            className={`media-type-button ${mediaType === 'movie' ? 'active' : ''}`}
            onClick={() => handleMediaTypeChange('movie')}
          >
            Movies
          </button>
          <button
            className={`media-type-button ${mediaType === 'tv' ? 'active' : ''}`}
            onClick={() => handleMediaTypeChange('tv')}
          >
            TV Shows
          </button>
        </div>
        <div className="content-section">
          {/* contenu du site à gauche */}
          <div className="main-content">
            <div className="movie-display">
              {movies.map((movie) => (
                <Movie key={movie.id} movie={movie} genres={genres} />
              ))}
            </div>
          </div>
          {/* panneau filtre à droite*/}
          <div className="filter-panel">
            <Filter
              genres={genres}
              selectedGenres={selectedGenres}
              onGenreChange={setSelectedGenres}
              sortCriteria={sortCriteria}
              onSortCriteriaChange={setSortCriteria}
              sortOrder={sortOrder}
              onSortOrderChange={setSortOrder}
              minVoteCount={minVoteCount}
              onMinVoteCountChange={setMinVoteCount}
            />
          </div>
        </div>
      </header>
    </div>
  );
}

export default Home;
