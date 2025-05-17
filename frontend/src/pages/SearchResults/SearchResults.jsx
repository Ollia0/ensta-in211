// import logo from './logo.svg';
import './SearchResults.css';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Movie from '../../components/Movie/Movie';
import Filter from '../../components/Filter/Filter';

function SearchResults() {
  const [sortCriteria, setSortCriteria] = useState('popularity');
  const [sortOrder, setSortOrder] = useState('desc');
  const [minVoteCount, setMinVoteCount] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedGenres, setSelectedGenres] = useState(() => {
    const genreParam = searchParams.get('genre');
    return genreParam ? genreParam.split(',').map(Number) : [];
  });
  const query = searchParams.get('query');

  const getGenres = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.VITE_API_KEY}`,
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
    }, []);
    return genres;
  };

  const fetchMovies = async (selectedGenres) => {
    let url = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${import.meta.env.VITE_API_KEY}`;

    try {
      const response = await axios.get(url);
      return response.data.results;
    } catch (error) {
      console.error('Erreur de chargement des films');
      return [];
    }
  };

  // fetch movies, filters and sort
  const useFetchMovies = (selectedGenres) => {
    const [allMovies, setAllMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        const moviesData = await fetchMovies(selectedGenres);
        setAllMovies(moviesData);
      };

      fetchData();
    }, [query]);

    useEffect(() => {
      let filtered = [...allMovies];
      // genres
      if (selectedGenres.length > 0) {
        filtered = filtered.filter((movie) => {
          return (
            movie.genre_ids &&
            selectedGenres.every((selectedId) =>
              movie.genre_ids.includes(selectedId),
            )
          );
        });
      }
      // vote count
      filtered = filtered.filter(
        (movie) => (movie.vote_count || 0) >= minVoteCount,
      );

      // sort
      filtered.sort((a, b) => {
        const valueA = a[sortCriteria] || 0;
        const valueB = b[sortCriteria] || 0;

        if (sortOrder === 'asc') {
          return sortCriteria === 'title'
            ? (a.title || '').localeCompare(b.title || '') // Tri alphabétique pour les titres
            : valueA - valueB; // Tri numérique pour les autres critères
        } else {
          return sortCriteria === 'title'
            ? (b.title || '').localeCompare(a.title || '') // Tri alphabétique inverse
            : valueB - valueA; // Tri numérique inverse
        }
      });

      setFilteredMovies(filtered);
    }, [allMovies, selectedGenres, sortOrder, sortCriteria, minVoteCount]);

    return filteredMovies;
  };

  const genres = useFetchGenres();
  const movies = useFetchMovies(selectedGenres);

  return (
    <div className="App">
      <header className="App-header">
        <div className="search-indicator-wrapper">
          <h3 className="search-indicator">Search results : {query}</h3>
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

export default SearchResults;
