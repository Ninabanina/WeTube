import axios from "axios";

const KEY = "AIzaSyBGA1xAZzdrVkRjLYDOpPs2hVl4zSQI9TQ";

export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    part: "snippet",
    key: KEY
  }
});
