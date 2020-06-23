import React from "react";
import "./../Styles/App.css";
import "react-bootstrap";
import Table from "./Table";
import SearchPanel from "./SearchPanel";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import data from "./../pracownicy.json";
function App() {
  const [defaultWorkers, setDefaultWorkers] = useState(data);
  const [filtredWorkersArray, setfiltredWorkersArray] = useState(
    defaultWorkers
  );
  return (
    <div className="App">
      <div className="home">
        <div className="main">
          <SearchPanel
            setWorkersList={setfiltredWorkersArray}
            defaultWorkers={defaultWorkers}
            filtredWorkersArray={filtredWorkersArray}
            data={data}
          />

          <Table
            filtredWorkersArray={filtredWorkersArray}
            setWorkersList={setfiltredWorkersArray}
            setDefaultWorkers={setDefaultWorkers}
            defaultWorkers={defaultWorkers}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
