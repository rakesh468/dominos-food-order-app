import { BrowserRouter as Router } from "react-router-dom";
import { DataProvider } from "./Globalstate";
import Header from "./components/Headers/Header";
import Page from "./components/Mainpages/Page";

function App() {
  return (
    <DataProvider>
      <Router>
        <div className="App">
          <Header />
          <Page />
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
