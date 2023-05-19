import { useState } from "react";
import "./App.css";
import axios from "axios";
import optionsList from "./util/options_list";
import InputOptions from "./components/InputOptions";
import DisplayCard from "./components/DisplayCard";

function App() {
  const [chosenType, setChosenType] = useState("");
  const [chosenMag, setChosenMag] = useState(null);
  const [chosenLocation, setChosenLocation] = useState(null);
  const [chosenDateRange, setChosenDateRange] = useState(null);
  const [chosenSortOption, setChosenSortOption] = useState(null);
  const [documents, setDocuments] = useState(null);

  function sendSearchRequest() {
    console.log(
      chosenType,
      chosenMag,
      chosenLocation,
      chosenDateRange,
      chosenSortOption
    );

    const results = {
      method: "GET",
      url: "http://localhost:3001/results",
      params: {
        type: chosenType,
        mag: chosenMag,
        location: chosenLocation,
        dateRange: chosenDateRange,
        sortOption: chosenSortOption,
      },
    };
    axios
      .request(results)
      .then((response) => {
        console.log(response.data);
        setDocuments(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div className="App">
      <nav>
        <ul className="nav-bar">
          <li>Earthquake Watch</li>
        </ul>
      </nav>
      <p className="directions">
        {" "}
        Search for earthquakes using the following criteria:
      </p>
      <div className="main">
        <div className="type-selector">
          <ul>
            <li>
              <InputOptions
                name={optionsList.types.name}
                id={optionsList.types.name}
                options={optionsList.types.choices}
                values={optionsList.types.choices}
                default={optionsList.types.dafault}
                currentValue={chosenType}
                onChange={(value: string) => setChosenType(value)}
              />
            </li>
            <li>
              <InputOptions
                name={optionsList.mag.name}
                id={optionsList.mag.name}
                options={optionsList.mag.choices.map((choice) => `${choice}+`)}
                values={optionsList.mag.choices}
                default={optionsList.mag.dafault}
                currentValue={chosenMag}
                onChange={(value: string) => setChosenMag(value)}
              />
            </li>
            <li>
              <form>
                <label>
                  <input
                    className="form"
                    type="text"
                    placeholder="Enter city, state, country"
                    value={chosenLocation}
                    onChange={(e) => setChosenLocation(e.target.value)}
                  />
                </label>
              </form>
            </li>
            <li>
              <InputOptions
                name={optionsList.dateRange.name}
                id={optionsList.dateRange.name}
                options={optionsList.dateRange.choices.map(
                  (choice) => `Past ${choice} Days`
                )}
                values={optionsList.dateRange.choices}
                default={optionsList.dateRange.dafault}
                currentValue={chosenDateRange}
                onChange={(value: string) => setChosenDateRange(value)}
              />
            </li>
            <li>
              <InputOptions
                name={optionsList.sortOption.name}
                id={optionsList.sortOption.name}
                options={optionsList.sortOption.choices}
                values={optionsList.sortOption.values}
                default={optionsList.sortOption.dafault}
                currentValue={chosenSortOption}
                onChange={(value: string) => setChosenSortOption(value)}
              />
            </li>
            <li>
              <button onClick={sendSearchRequest}>Search</button>
            </li>
          </ul>
        </div>
        <DisplayCard documents={documents} />
      </div>
    </div>
  );
}

export default App;
