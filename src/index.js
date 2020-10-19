import React from "react";
import ReactDOM from "react-dom";

import { StoriesProvider } from "./store/stories/stories.store";
import { GlobalProvider } from "./store/global/global.store";
import Stories from "./components/stories";

import "./styles.css";

const globalProps = {
  width: 360,
  height: 640,
  defaultInterval: 4000,
};

ReactDOM.render(
  <GlobalProvider value={globalProps}>
    <StoriesProvider>
      <Stories {...storiesProps} />
    </StoriesProvider>
  </GlobalProvider>,
  document.getElementById("root")
);
