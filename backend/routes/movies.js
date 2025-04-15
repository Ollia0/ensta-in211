import express from 'express';

const router = express.Router();

router.get('/', function (req, res) {
    console.log('GET /api/movies')
    res.json({ 
      movies: [],
    });
  });
      
export default router