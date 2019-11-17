import React from "react";
import "./VideoLikeButton.css";

const VideoLiekButton = ({
  id,
  likedVideos,
  addVideoToLikedVideos,
  removeVideoFromLikedVideos
}) => {
  function toggleLikeState() {
    if (likedVideos.includes(id)) {
      removeVideoFromLikedVideos(id);
    } else {
      addVideoToLikedVideos(id);
    }
  }
  return (
    <div className="ui red button" onClick={toggleLikeState} tabIndex="0">
      {likedVideos.includes(id) ? (
        <div className="content">Liked</div>
      ) : (
        <div className="content">
          {" "}
          <i className="heart icon"></i>Like
        </div>
      )}
    </div>
  );
};

export default VideoLiekButton;
