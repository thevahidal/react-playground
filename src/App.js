import React, { useState, useEffect } from "react";

import './App.css'

const ALL_FAKE_DATA = [
  {
    name: "Vahid",
    is_trader: false
  },
  {
    name: "Mammad",
    is_trader: true
  },
  {
    name: "Hon",
    is_trader: false
  },
  {
    name: "Audrey",
    is_trader: false
  },
  {
    name: "Saeed",
    is_trader: true
  }
];

const fakeFetchAPI = (query, options) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      let result = ALL_FAKE_DATA
        .filter(p => p.name.toLowerCase().includes(query.toLowerCase()))

      Object.keys(options).forEach(key => {
        result = result
        .filter(p => p[key] === options[key])
      })
      
      resolve(result)
    }, 1500)
  });

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState("2");
  const [query, setQuery] = useState("");

  useEffect(() => {
    let options = {}

    if (selected !== "2") {
      options = {
        is_trader: selected === "0"
      }
    }

    setLoading(true)
    fakeFetchAPI(query, options).then((res) => {
      setData(res)
      setLoading(false)
    });
  }, [query, selected]);

  const handleSelect = (value) => {
    setSelected(value);
  };

  const handleSearch = (value) => {
    setQuery(value);
  };

  return (
    <div className='App'>
      <div className='main'>
        <h3>Options</h3>
        <div>
          <select value={selected} onChange={(e) => handleSelect(e.target.value)}>
            <option value={"0"}>Trader</option>
            <option value={"1"}>Normal user</option>
            <option value={"2"}>All</option>
          </select>
        </div>
        <h4>Seleted Option: {selected}</h4>
        <div>
          <input
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search for users..."
          />
        </div>
        <br />
        <div>
          {
            loading
              ? 'Loading...'
              : data.map((p) => (
                <div
                  style={{
                    border: "1px solid",
                    marginBottom: 4
                  }}
                >
                  <p>{p.name}</p>
                  <span>{p.is_trader ? "Trader" : "Normal User"}</span>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};


export default App