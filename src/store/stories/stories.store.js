// vendor
import React, { createContext, useReducer } from "react";
import { actions } from "./action";
import initialState from "./initialState";

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
  ],
});

export const StoriesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(actions, initialState);

  return (
    <StoriesContext.Provider value={{ state, dispatch }}>
      {children}
    </StoriesContext.Provider>
  );
};
