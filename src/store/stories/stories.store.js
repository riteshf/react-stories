// vendor
import React, { createContext, useContext } from "react";

export const StoriesContext = createContext({
  stories: [
    {
      url: "https://picsum.photos/1080/1920",
      type: "image",
    },
    {
      url:
        "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      type: "video",
    },
    {
      url:
        "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      type: "video",
    },
  ],
});

export const StoriesProvider = (props) => {
  const { stories } = useContext(StoriesContext);

  return (
    <StoriesContext.Provider value={stories}>
      {props.children}
    </StoriesContext.Provider>
  );
};