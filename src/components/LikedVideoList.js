import React, { useEffect, useState } from "react";
import youtube from "./../apis/youtube";
import VideoItem from "./VideoItem";
import "./LikedVideoList.css";

const LikedVideoList = ({ onVideoSelect, likedVideos }) => {
  let [videos, setVideos] = useState([]);
  useEffect(() => {
    if (likedVideos.length) {
      youtube
        .get("/videos", {
          params: {
            id: likedVideos.join(",")
          }
        })
        .then(response => setVideos(response.data.items));
    } else {
      setVideos([]);
    }
  }, [likedVideos]);

  const renderLikedList = videos.map(video => {
    return (
      <VideoItem key={video.id} video={video} onVideoSelect={onVideoSelect} />
    );
  });

  return (
    <div className="ui horizontal list list--liked">
      <h4 className="ui horizontal divider header">
        <i className="tag icon"></i>
        Videos that you liked
      </h4>
      {likedVideos.length === 0 ? (
        <div className="list__content--empty"> You have no liked videos...</div>
      ) : (
        renderLikedList
      )}
    </div>
  );
};

export default LikedVideoList;
