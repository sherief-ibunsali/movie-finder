import StarRating from "../star";
import { useEffect, useRef, useState } from "react";
let key = "6efe6bb8";
export default function MovieDetails({
  selectedId,
  onClose,
  onAddWatched,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const countRef = useRef(0);

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);

  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  const {
    Title: title = "",
    Year: year = "",
    Poster: poster = "",
    Runtime: runtime,
    imdbRating = "",
    Plot: plot = "",
    Released: released = "",
    Actors: actors,
    Director: director = "",
    Genre: genre = "",
  } = movie;

  useEffect(
    function () {
      if (userRating) {
        countRef.current = countRef.current + 1;
      }
    },
    [userRating]
  );

  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${key}&i=${selectedId}`
        );
        const data = await res.json();
        setMovie(data);
        setIsLoading(false);
      }
      getMovieDetails();
    },
    [selectedId]
  );

  useEffect(
    function () {
      if (!title) return;

      document.title = `Movie | ${title}`;

      return function () {
        document.title = "Movie Finder";
        console.log(`Clean up effect for movie ${title}`);
      };
    },
    [title]
  );

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      userRating,
      runtime: runtime ? Number(runtime.split(" ").at(0)) : 0,
      countRatingDesion: countRef.current,
    };
    console.log(newWatchedMovie);
    onAddWatched(newWatchedMovie);
    onClose();
    setUserRating(0);
  }

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onClose}>
              &larr;
            </button>

            <img src={poster} alt={`Poster of ${title} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You already rated this movie with {watchedUserRating} star
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starrting {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

function Loader() {
  return <p className="loader">Loading...</p>;
}
