// vendor
import React, { createContext, useContext } from "react";

export const GlobalContext = createContext({
  width: 360,
  height: 640,
  defaultInterval: 4000,
  loop: true,
  keyboardNavigation: true,
});

export const GlobalProvider = (props) => {
  const values = useContext(GlobalContext);

  return (
    <GlobalContext.Provider value={values}>
      {props.children}
    </GlobalContext.Provider>
  );
};

