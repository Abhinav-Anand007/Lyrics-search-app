import React, { useState, useEffect } from "react";
import axios from "axios";

export const Context = React.createContext();

export function ContextController({ children }) {
  const initialState = {
    track_list: [],
    heading: ""
  };

  const [state, setState] = useState(initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/proxy?url=${encodeURIComponent(`https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=us&f_has_lyrics=1&apikey=${process.env.REACT_APP_KEY}`)}`);

        const track_list = res.data.message.body.track_list;
        setState({
          track_list,
          heading: "Top 10 Tracks"
        });
        console.log(res);
      } catch (err) {
        console.log(err);
        console.log(process.env.REACT_APP_KEY)
      }
    };

    fetchData();
  }, []);

  return (
    <Context.Provider value={[state, setState]}>{children}</Context.Provider>
  );
}
