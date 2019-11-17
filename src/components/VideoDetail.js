import React from "react";
import "./VideoDetail.css";

const VideoDetail = ({ id, title, description }) => {
  if (!id) {
    return <div>Loading...</div>;
  }

  const videoSrc = `https://www.youtube.com/embed/${id}`;

  return (
    <div>
      <div className="ui embed">
        <iframe title="Video Player" src={videoSrc} />
      </div>
      <div className="ui segment">
        <h4>{title}</h4>
        <p className="video-detail__description">{description}</p>
      </div>
    </div>
  );
};

export default VideoDetail;
