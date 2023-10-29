import * as React from "react";
import * as ReactDOM from "react-dom";
import RepositoryPage from './components/repositories/RepositoriesPage'

interface AppProps {
  arg: string;
}

const App = () => {
  return <div>
    <RepositoryPage/>
  </div>;
};

document.addEventListener("DOMContentLoaded", () => {
  const rootEl = document.getElementById("root");
  ReactDOM.render(<App/>, rootEl);
});