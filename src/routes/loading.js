import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

const Loading = () => {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Dimmer active inverted>
        <Loader inverted content="Loading" />
      </Dimmer>
    </div>
  );
};

export default Loading;
