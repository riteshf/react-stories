// vendor
import React, { createContext, useContext } from "react";

export const GlobalContext = createContext({
  width: 360,
  height: 640,
  defaultInterval: 4000,
});

export const GlobalProvider = (props) => {
  const { width, height, defaultInterval } = useContext(GlobalContext);

  return (
    <GlobalContext.Provider value={{  width,
      height, defaultInterval }}>
      {props.children}
    </GlobalContext.Provider>
  );
};

