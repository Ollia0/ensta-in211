import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import MovieDetails from './pages/MovieDetails/MovieDetails';
import SearchResults from './pages/SearchResults/SearchResults';
import './App.css';
import { Root } from './components/Root/Root';
import Counter from './pages/Counter/Counter';
import Users from './pages/Users/Users';

function App() {
  return (
    <Root>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="counter" element={<Counter />} />
        <Route path="users" element={<Users />} />
        <Route path="about" element={<About />} />
        <Route path="movie/:id" element={<MovieDetails />} />
        <Route path="search" element={<SearchResults />} />
      </Routes>
    </Root>
  );
}

export default App;
