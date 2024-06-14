import React, { useContext } from "react";
import { Context } from "../context";
import Spinner from "./Spinner";
import Track from "./Track";

const Tracks = () => {
  const [state] = useContext(Context);
  const { track_list, heading } = state;

  return track_list?.length ? (
    <>
      <h3 className="text-center mb-4 tracksHeading">{heading}</h3>
      <div className="row">
        {track_list.map((item) => (
          <Track key={item.track.track_id} track={item.track} />
        ))}
      </div>
    </>
  ) : (
    <Spinner />
    // <h1>Spinner</h1>
  );
};

export default Tracks;
