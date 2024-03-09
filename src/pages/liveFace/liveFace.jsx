import React, { useState } from "react";

const LiveFaceScreen = () => {
  const liveCaptureUrl = `https://41.184.212.26/88220314000/ecitizen/eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJncmFjZW95aXphMDVAZ21haWwuY29tIiwiaWF0IjoxNzA5ODkxNTE0LCJleHAiOjE3MDk5Nzc5MTR9.yUvBU0JuJxb2d3EejiS5IvUnmnCyk_tu77H7qWQ8PFU`;
  return (
    <iframe
      id="inlineFrameExample"
      title="Inline Frame Example"
      width="100%"
      height="500"
      src="`https://41.184.212.26/88220314000/ecitizen/eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJncmFjZW95aXphMDVAZ21haWwuY29tIiwiaWF0IjoxNzA5OTcwNTk2LCJleHAiOjE3MTAwNTY5OTZ9.F3jRZG81DDeotBgVmA9CJWU-XypBN3YxcWm__uXj5Ek"
    ></iframe>
  );
};

export default LiveFaceScreen;
