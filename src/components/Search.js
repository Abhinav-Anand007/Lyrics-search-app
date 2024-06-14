import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Context } from "../context";

const Search = () => {
  const [state, setState] = useContext(Context);
  const [userInput, setUserInput] = useState("");
  const [trackTitle, setTrackTitle] = useState("");

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/proxy?url=${encodeURIComponent(`https://api.musixmatch.com/ws/1.1/track.search?q_track=${trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${process.env.REACT_APP_KEY}`)}`);
        const track_list = res.data.message.body.track_list;
        setState({ track_list: track_list, heading: "Search Results" });
      } catch (err) {
        console.log(err);
      }
    };

    if (trackTitle) {
      fetchTracks();
      setUserInput("");
    }
  }, [trackTitle, setState]);

  const findTrack = e => {
    e.preventDefault();
    setTrackTitle(userInput);
  };

  const onChange = e => {
    setUserInput(e.target.value);
  };

  return (
    <div className="card card-body mb-4 p-4 searchCard">
      <h1 className="display-4 text-center searchHead">
        <i className="fas fa-music music-icon" />  Search For A Song
      </h1>
      <p className="lead text-center">Get the lyrics for any song</p>
      <form onSubmit={findTrack}>
        <div className="form-group">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Song title..."
            name="userInput"
            value={userInput}
            onChange={onChange}
          />
        </div>
        <button className="btn btn-primary btn-lg btn-block mb-5" type="submit">
          Get Song Lyrics
        </button>
      </form>
    </div>
  );
};

export default Search;
