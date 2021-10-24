import React, { useState, useEffect } from "react";
import { ComposableMap, ZoomableGroup, Geographies, Geography } from "react-simple-maps";
import { scaleQuantize } from "d3-scale";
import { csv } from "d3-fetch";

/**
 * Centering on markers: https://github.com/zcreativelabs/react-simple-maps/issues/62
 */
const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/us-states/WI-55-wisconsin-counties.json";
// const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json";


const colorScale = scaleQuantize()
  .domain([1, 10])
  .range([
    "#ffedea",
    "#ffcec5",
    "#ffad9f",
    "#ff8a75",
    "#ff5533",
    "#e2492d",
    "#be3d26",
    "#9a311f",
    "#782618"
  ]);

const MapChart = () => {
  const [center, setCenter] = useState([0, 0]);
  const [zoom, setZoom] = useState(1);
  const [data, setData] = useState([]);

  useEffect(() => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: ""
    }

    fetch("https://cheesehack-backend.herokuapp.com/wicovid", options)
      .then(data => {
        setData(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
      <ComposableMap 
          projection="geoConicConformal" 
          projectionConfig={{
            rotate: [90,-45.16667, 0],
            parallels: [46.76667,45.56667],
            bounds: [[-0.046794,-0.044049],[0.052058,0.063177]],
            scale: 5000
          }}
          style={{height: '100%'}}
      >
        {/* <ZoomableGroup center={center} zoom={zoom}> */}
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => {
                console.log(geo);
                const cur = data.find(s => s.id === geo.id);
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={colorScale(cur ? cur.unemployment_rate : "#EEE")}
                    style={{
                      default: {
                        fill: '#eeeeee',
                      },
                      hover: {
                        fill: '#bbbbbb',
                        outline: "none"
                      },
                      pressed: {
                        fill: 'none',
                        outline: "none"
                      }
                    }}
                  />
                );
              })
            }
          </Geographies>
        {/* </ZoomableGroup> */}
      </ComposableMap>
  );
};

export default MapChart;
