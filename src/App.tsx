import "./App.css";
import ArtworkTable from "./components/art-work-table";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

function App() {
  return (
    <>
      <div className="App">
        <ArtworkTable />
      </div>
    </>
  );
}

export default App;
