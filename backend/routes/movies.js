import express from 'express';
import { appDataSource } from '../datasource.js';
import Movie from "../entities/movie.js"

const router = express.Router();

router.get('/', function (req, res) {
    appDataSource
        .getRepository(Movie)
        .find({})
        .then(function (movies) {
            res.json({movies: movies});
        })
    console.log('GET /api/movies')
    // res.json({ 
    //   movies: [],
    // });
  });

  /*router.get('/', function (req, res) {
  appDataSource
    .getRepository(User)
    .find({})
    .then(function (users) {
      res.json({ users: users });
    });
});*/
      
router.post('/new', function (req, res) {
    const movieRepository = appDataSource.getRepository(Movie);  
    const newMovie = {
        title: req.body.title,
        releasedate: req.body.releaseDate
    }
    
    movieRepository
        .insert(newMovie)
        .then(function (newDocument) {
            res.status(201).json(newDocument);
        })
        .catch(function (error) {
            console.error(error);
            if (error.code === '23505') {
                res.status(400).json({
                    message: `Movie with title "${newMovie.title}" already exists`,
                });
            }
            else {
                res.status(500).json({message: 'Error while adding movie'});
            }
        })


});

export default router