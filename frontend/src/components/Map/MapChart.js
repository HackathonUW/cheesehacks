import React, { useState, useEffect } from "react";
import { ComposableMap, ZoomableGroup, Geographies, Geography } from "react-simple-maps";
import { scaleQuantize } from "d3-scale";

import EventMarker from './../EventMarker/EventMarker';

import moment from 'moment';

/**
 * Centering on markers: https://github.com/zcreativelabs/react-simple-maps/issues/62
 */
const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/us-states/WI-55-wisconsin-counties.json";
// const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json";

const colorScale = scaleQuantize()
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

const colorScale2 = scaleQuantize()
.range([
  '#bbbbbb', 
  '#baaaa9', 
  '#b89a97', 
  '#b58985', 
  '#b17974', 
  '#ac6863', 
  '#a65752', 
  '#a04642', 
  '#993333'
]);

const colorScale3 = scaleQuantize()
    .range([['#eeeeee', '#ebe7e1', '#e8dfd5', '#e5d8c9', '#e1d1bc', '#dec9b0', '#dac2a4', '#d6bb98', '#d2b48c']]);

const colorScale4 = scaleQuantize()
    .range(['#bbbbbb', '#b6b3ad', '#b2aca0', '#ada592', '#a79d85', '#a29678', '#9d8f6b', '#97885e', '#918151']);


const MapChart = ({topic}) => {
  const [mapData, setMapData] = useState([]);
  const [eventData, setEventData] = useState([]);

  useEffect(() => {
    console.log("REFETCH");
    fetchMapData();
  }, [topic]);

  useEffect(() => {
    console.log("RESCALE");
    var values = [];
    switch(topic) {
      case 'covid':
        values = mapData.map(data => data.Cases_per_100);
        break;
      case 'air':
        values = mapData.map(data => data.Benzene);
        break;
      default:
        values = mapData.map(data => data.Cases_per_100);
        break;
    }
    var min = Math.min.apply(0, values),
        max = Math.max.apply(100, values);

    colorScale.domain([min, max])
    colorScale2.domain([min, max])
    colorScale3.domain([min, max])
    colorScale4.domain([min, max])
  }, [mapData])

  function fetchMapData() {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: ""
    }

    var endpoint = "";
    switch(topic) {
      case 'covid':
        endpoint = 'wicovid';
        break;
      case 'air':
        endpoint = 'airpol';
        break;
      default:
        endpoint = 'wicovid';
        break;
    }

    setMapData([]);
    fetch('https://cheesehack-backend.herokuapp.com/' + endpoint, options)
      .then(response => response.json())
      .then(data => {
        setMapData(data);
      })
      .then(() => {
        fetchEventData();
      })
      .catch(error => {
        console.error(error);
      });
  }

  function fetchEventData() {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({action: "search", topic: topic})
    }

    setEventData([]);
    fetch("https://cheesehack-backend.herokuapp.com/events", options)
      .then(response => response.json())
      .then(data => {
        data.forEach(event => {
          event.coordinates = event.coordinates.split('(')[1].split(')')[0].split(' ').map(Number);
          event.coordinates = [event.coordinates[1], event.coordinates[0]];
          event.startDate = event.dates.split(',')[0];
          event.endDate = event.dates.split(',')[1];
          // event.startDate = moment(event.dates.split(',')[0], 'YYYY-MM-DD HH:mm:ss').toDate();
          // event.endDate = moment(event.dates.split(',')[1], 'YYYY-MM-DD HH:mm:ss').toDate();
        });
        setEventData(data);
        console.log("FINISH REFETCH");
      })
      .catch(error => {
        console.error(error);
      });
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
            center={[-89.84427405362867, 44.68479592051389]}
            maxZoom={1}>
          <Geographies geography={geoUrl} disableOptimisation={true}>
            {({ geographies }) => 
              geographies.map(geo => {
                const cur = mapData.find(s => s.county === geo.properties.NAME);
                var fill = 0;
                var darkerFill = 0;
                if (cur) {
                  switch(topic) {
                    case 'covid':
                      fill = colorScale(cur.Cases_per_100);
                      darkerFill = colorScale2(cur.Cases_per_100);
                      break;
                    case 'air':
                      fill = colorScale3(cur.Benzene);
                      darkerFill = colorScale4(cur.Benzene);
                      break;
                    default:
                      fill = colorScale(cur.Cases_per_100);
                      darkerFill = colorScale2(cur.Cases_per_100);
                      break;
                  }
                }


                return (
                  <Geography
                    key={geo.rsmKey + topic}
                    geography={geo}
                    style={{
                      default: {
                        fill: cur ? fill : '#eeeeee',
                        outline: "none",
                        stroke: '#dddddd',
                      },
                      hover: {
                        fill: cur ? darkerFill : '#eeeeee',
                        outline: "none"
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
          {eventData.map(event => (
            <EventMarker key={event.pid} event={event} />
          ))}
        </ZoomableGroup>
      </ComposableMap>
  );
};

export default MapChart;
