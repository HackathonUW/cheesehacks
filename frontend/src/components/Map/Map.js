import { useState, useEffect } from 'react';
import { Box, Button, Select, Tooltip } from '@chakra-ui/react';
import ReactTooltip from "react-tooltip";
import { useHistory } from 'react-router-dom';
import addEvent from '../../images/addEvent.png'

import { useAuth0 } from "@auth0/auth0-react";

import MapChart from "./MapChart";

import { AddIcon } from '@chakra-ui/icons';


import './Map.css'

function Map() {
  const { user } = useAuth0();
  const [topic, setTopic] = useState("covid");
  const [fetching, setFetching] = useState(false);
  const [type, setType] = useState("user");

  const history = useHistory();

  useEffect(() => {
    getUserType();
  }, [])

  function getUserType() {
    const body = {
      action: "search",
      email: user.email
    };

    const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
    };

    setFetching(true);

    fetch("https://cheesehack-backend.herokuapp.com/users", options)
      .then(response => response.json)
      .then(res => {
        if (!res || !res.type) {
          throw new Error("Null res");
        }
        setType(res.type);
        setFetching(false);
      })
      .catch(err => {
        console.error(err);
        setFetching(false);
      })
  }

  function addEvent() {
    history.push("/dashboard/volunteerevents");
  }

  return (
    <div className="Map">
      <Select value={topic} onChange={(e) => {setTopic(e.target.value)}}>
        <option value="covid">COVID-19</option>
        <option value="air">Air Pollution</option>
        <option value="water">Water Pollution</option>
      </Select>
      <MapChart topic={topic}/>
      {!fetching && type == 'user' ? 
      <Tooltip 
          label="Add Event" 
          bg="white" 
          placement="top"
          color="gray.800"
          fontSize='1.2em'
      >
        <circle r="10vh" className=" addEvent addEventCircle" onClick={addEvent} data-tip="Create Event" data-for="registerTip">
          <div className="addIcon">
            <AddIcon />
          </div>
        </circle>
      </Tooltip>

      : null }
      <ReactTooltip id="registerTip" place="top" effect="solid"/>
    </div>
  );
}

export default Map;