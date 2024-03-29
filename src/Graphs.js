import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as Chartjs,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js/auto";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap styles
import "./App.css";

Chartjs.register(LineElement, CategoryScale, LinearScale, PointElement);

const Chart = () => {
  const { id } = useParams();
  const [chartdata, setChartdata] = useState({});
  const [timeline, setTimeline] = useState("m15");
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.coincap.io/v2/assets/${id}/history?interval=${timeline}`
        );
        const data = response.data.data;

        if (data !== undefined && data.length > 0) {
          setChartdata({
            labels: data.map((item) => item.date.slice(0, 10)),
            datasets: [
              {
                data: data.map((item) => item.priceUsd),
                backgroundColor: "skyblue",
                borderWidth: 3,
                borderColor: "skyblue",
              },
            ],
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchInfo = async () => {
      try {
        const response = await axios.get(
          `https://api.coincap.io/v2/assets/${id}`
        );
        const data = response.data.data;

        if (data !== undefined) {
          setInfo(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    fetchInfo();
  }, [id, timeline]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 mx-auto">
          <div className="container p-4 border rounded">
            <h1 className="header">Line Chart of {id}({timeline}).</h1>
            <div className="button-main">
              <button className="btn btn-secondary" onClick={() => setTimeline("m15")}>
                15 Minutes
              </button>
              <button className="btn btn-secondary" onClick={() => setTimeline("h1")}>
                1 Hour
              </button>
              <button className="btn btn-secondary" onClick={() => setTimeline("h6")}>
                6 Hours
              </button>
              <button className="btn btn-secondary" onClick={() => setTimeline("d1")}>
                1 Day
              </button>
            </div>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <div className="chart-container">
                <Line
                  data={chartdata}
                  options={{
                    elements: {
                      point: {
                        radius: 0,
                      },
                    },
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                    aspectRatio: 1, // Set aspect ratio to 1:1
                    maintainAspectRatio: false, // Allow chart to fill container
                  }}
                />
              </div>
            )}
            <br />
            <Link to="/" className="btn btn-primary">
              Back
            </Link>
          </div>
        </div>

        <div className="col-md-4 mt-4">
          <div className="container p-4 border rounded">
            <h5>
              <b>Name: </b>
              {info.name}
            </h5>
            <h5>
              <b>Symbol: </b>
              {info.symbol}
            </h5>
            <h5>
              <b>Market Cap. : </b>
              {info.marketCapUsd}
            </h5>
            <h5>
              <b>Current Price(USD): </b>
              {parseFloat(info.priceUsd).toFixed(3)}
            </h5>
            <h5>
              <b>Change % 24hr: </b>
              {parseFloat(info.changePercent24Hr).toFixed(3)}
            </h5>
            <h5>
              <b>Volume USD 24hr: </b>
              {parseFloat(info.volumeUsd24Hr).toFixed(3)}
            </h5>
            <h5>
              <b>More Information: </b>
              <a href={`https://www.blockchain.com/explorer/assets/${info.symbol}`}>
                Visit here.
              </a>
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chart;
