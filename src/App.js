import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const [cryptData, setCryptData] = useState([]);

  useEffect(() => {
    axios.get(`https://api.coincap.io/v2/assets`).then((res) => {
      setCryptData(res.data.data);
    });
  }, []);

  return (
    <div className="container-fluid">
      <h3 className="text-success my-3">Cryptocurrencies</h3>
      <div className="row">
        <div className="col-md-6 mx-auto">
          <input
            className="form-control my-3"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            placeholder="Search Here..."
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-10 mx-auto">
          <table className="table table-striped mt-4">
            <thead className="table-dark">
              <tr>
                <th>RANK</th>
                <th>ID</th>
                <th>Name</th>
                <th>Symbol</th>
                <th>Price($ USD)</th>
                <th>ChangeIn24Hr(%)</th>
              </tr>
            </thead>
            <tbody>
              {cryptData
                .filter((val) => {
                  return val.name.toLowerCase().includes(searchValue.toLowerCase());
                })
                .map((item) => (
                  <tr key={item.id}>
                    <td>{item.rank}</td>
                    <td>{item.id}</td>
                    <td>
                      <Link to={`/Graphs/${item.id}`}>{item.name}</Link>
                    </td>
                    <td>{item.symbol}</td>
                    <td>{parseFloat(item.priceUsd).toFixed(3)}</td>
                    <td>{parseFloat(item.changePercent24Hr).toFixed(3)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default App;
