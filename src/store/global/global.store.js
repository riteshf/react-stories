// vendor
import React, { createContext, useReducer } from "react";
import { actions } from "./action";
import initialState from "./initialState";

export const GlobalContext = createContext({
  width: 360,
  height: 640,
  defaultInterval: 4000,
});

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(actions, initialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};
