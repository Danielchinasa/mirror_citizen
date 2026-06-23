import React from "react";

const LiveFaceScreen = () => {
  const liveCaptureUrl = "about:blank";

  return (
    <iframe
      id="inlineFrameExample"
      title="Inline Frame Example"
      width="100%"
      height="500"
      src={liveCaptureUrl}
    ></iframe>
  );
};

export default LiveFaceScreen;
