import React, { useState, useEffect } from "react";
import { ComposableMap, ZoomableGroup, Geographies, Geography } from "react-simple-maps";
import { scaleQuantize } from "d3-scale";
import { useSpring } from "react-spring";

/**
 * Centering on markers: https://github.com/zcreativelabs/react-simple-maps/issues/62
 */
const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/us-states/WI-55-wisconsin-counties.json";
// const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json";


const colorScale = scaleQuantize()
  .domain([1, 10])
  .range([
    '#eeeeee', 
    '#ecd7d4', 
    '#e9c1bb', 
    '#e5aba3', 
    '#df948b', 
    '#d77e74', 
    '#cf675e', 
    '#c64e48', 
    '#bb3333'
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
      .then(response => response.json())
      .then(data => {
        setData(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  function handleGeographyClick(geo) {
    console.log(geo.geometry.coordinates[0][0]);
    setCenter(geo.geometry.coordinates[0][0]);
  }

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
        <ZoomableGroup 
            center={center} 
            zoom={zoom}
            maxZoom={1}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => {
                const cur = data.find(s => s.country === geo.properties.NAME);
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => {handleGeographyClick(geo); }}
                    fill={colorScale(cur ? cur.unemployment_rate : "#EEE")}
                    style={{
                      default: {
                        outline: "none",
                        stroke: '#dddddd',
                      },
                      hover: {
                        outline: "none",
                        stroke: '#999999',
                        strokeWidth: '5px',
                        zIndex: 100
                      },
                      pressed: {
                        outline: "none",
                      }
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
  );
};

export default MapChart;
