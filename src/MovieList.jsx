// src/MovieList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css' 

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('All');
    const genres = ['All', 'Action', 'Drama', 'Comedy', 'Sci-Fi', 'Fantasy', 'Horror', 'Thriller', 'Romance', 'Animation', 'Documentary', 'Crime'];

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        try {
            const response = await axios.get('http://localhost:5000/movies'); // Adjust the URL based on your backend
            setMovies(response.data);
            setLoading(false);
        } catch (error) {
            setError('Error fetching movies. Please try again later.');
            setLoading(false);
        }
    };

    const handleGenreChange = (event) => {
        setSelectedGenre(event.target.value);
    };

    const filteredMovies = selectedGenre === 'All' ? movies : movies.filter(movie => movie.genre === selectedGenre);

    if (loading) return <div className="text-center">Loading movies...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div className="container">
            <h1 className="mt-4">Movie Recommendations</h1>
            <div className="form-group">
                <label htmlFor="genreSelect">Select Genre:</label>
                <select id="genreSelect" className="form-control" value={selectedGenre} onChange={handleGenreChange}>
                    {genres.map((genre) => (
                        <option key={genre} value={genre}>{genre}</option>
                    ))}
                </select>
            </div>
            <ul className="list-group">
                {filteredMovies.map((movie) => (
                   <a href={movie.link} target='_blank'><li key={movie._id} className="list-group-item">
                        <h5>{movie.title}</h5>
                        <p>{movie.genre} - {movie.year}</p>
                    </li></a> 
                ))}
            </ul>
        </div>
    );
};

export default MovieList;