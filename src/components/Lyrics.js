import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Spinner from "./Spinner";
import Moment from "react-moment";

const Lyrics = () => {
  const { id } = useParams();
  const [track, setTrack] = useState({});
  const [lyrics, setLyrics] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const lyricsRes = await axios.get(`http://localhost:3000/proxy?url=${encodeURIComponent(`https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${id}&apikey=${process.env.REACT_APP_KEY}`)}`);
        const lyricsData = lyricsRes.data.message.body.lyrics;
        setLyrics(lyricsData);
        console.log(lyricsRes);

        const trackRes = await axios.get(`http://localhost:3000/proxy?url=${encodeURIComponent(`https://api.musixmatch.com/ws/1.1/track.get?track_id=${id}&apikey=${process.env.REACT_APP_KEY}`)}`);
        const trackData = trackRes.data.message.body.track;
        setTrack(trackData);
        setLoading(false);
        console.log(trackRes);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading || Object.keys(track).length === 0 || Object.keys(lyrics).length === 0) {
    console.log(loading)
    console.log(Object.keys(track).length)
    console.log( Object.keys(lyrics).length)
    return <Spinner />;
  } else {
    return (
      <>
        <Link to="/" className="btn btn-dark btn-md mb-4">
          Go Back
        </Link>
        <div className="card lyricCard">
          <h5 className="card-header lyricHead">
            {track.track_name} by <span className="text-secondary">{track.artist_name}</span>
          </h5>
          <div className="card-body">
            <p className="card-text">{lyrics.lyrics_body}</p>
          </div>
        </div>

        <ul className="list-group mt-3 lyricCard">
          <li className="list-group-item ">
            <strong>Album ID</strong>: {track.album_id}
          </li>
          <li className="list-group-item ">
            <strong>Song Genre</strong>:{" "}
            {track.primary_genres.music_genre_list.length === 0
              ? "NO GENRE AVAILABLE"
              : track.primary_genres.music_genre_list[0].music_genre.music_genre_name}
          </li>
          <li className="list-group-item ">
            <strong>Explicit Words</strong>: {track.explicit === 0 ? "No" : "Yes"}
          </li>
          <li className="list-group-item ">
            <strong>Release Date</strong>:{" "}
            <Moment format="MM/DD/YYYY">{track.updated_time}</Moment>
          </li>
        </ul>
      </>
    );
  }
};

export default Lyrics;
