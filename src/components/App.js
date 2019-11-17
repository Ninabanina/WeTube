import React from "react";
import SearchBar from "./SearchBar";
import VideoList from "./VideoList";
import VideoDetail from "./VideoDetail";
import youtube from "../apis/youtube";
import VideoLikeButton from "./VideoLikeButton";
import LikedVideoList from "./LikedVideoList";

class App extends React.Component {
  state = {
    videos: [],
    likedVideos: [],
    id: null,
    title: null,
    description: null
  };

  componentDidMount() {
    // set default search content to "bunny rabbits"
    this.onTermSubmit("bunny rabbits");
    this.loadLikedVideosFromLocalStorage();
  }

  loadLikedVideosFromLocalStorage() {
    let savedVideos = localStorage.getItem("savedVideos")
      ? localStorage.getItem("savedVideos").split(",")
      : [];
    this.setState({
      likedVideos: savedVideos
    });
  }

  saveLikedVideosToLocalStorage(videos) {
    localStorage.setItem("savedVideos", videos.join(","));
    this.loadLikedVideosFromLocalStorage();
  }

  addVideoToLikedVideos(id) {
    this.saveLikedVideosToLocalStorage([...this.state.likedVideos, id]);
  }

  removeVideoFromLikedVideos(id) {
    this.saveLikedVideosToLocalStorage(
      this.state.likedVideos.filter(vid => vid !== id)
    );
  }

  onTermSubmit = async term => {
    const response = await youtube.get("/search", {
      params: {
        q: term,
        type: "video",
        maxResults: 10
      }
    });

    this.setState({
      videos: response.data.items,
      id: response.data.items[0].id.videoId,
      title: response.data.items[0].snippet.title,
      description: response.data.items[0].snippet.description
    });
  };

  onVideoSelect = video => {
    this.setState({
      id: video.id.videoId,
      title: video.snippet.title,
      description: video.snippet.description
    });
  };

  onLikedVideoSelect = video => {
    this.setState({
      id: video.id,
      title: video.snippet.title,
      description: video.snippet.description
    });
  };

  render() {
    return (
      <div className="ui container">
        <SearchBar onFormSubmit={this.onTermSubmit} />
        <div className="ui grid">
          <div className="ui row">
            <div className="eleven wide column">
              <VideoDetail
                id={this.state.id}
                title={this.state.title}
                description={this.state.description}
              />
              <div className="like-button">
                <VideoLikeButton
                  id={this.state.id}
                  likedVideos={this.state.likedVideos}
                  addVideoToLikedVideos={this.addVideoToLikedVideos.bind(this)}
                  removeVideoFromLikedVideos={this.removeVideoFromLikedVideos.bind(this)}
                />
              </div>
              <LikedVideoList
                onVideoSelect={this.onLikedVideoSelect}
                likedVideos={this.state.likedVideos}
              />
            </div>
            <div className="five wide column">
              <VideoList
                videos={this.state.videos}
                onVideoSelect={this.onVideoSelect}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
