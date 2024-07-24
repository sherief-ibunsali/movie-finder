import React from "react";
import ReactDOM from "react-dom/client";
import MovieApp from "./Movie/movie";
// import Sample from "./sample/sample";

function App() {
  return (
    <div>
      <MovieApp />
      {/* <Sample /> */}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <App />
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
);
