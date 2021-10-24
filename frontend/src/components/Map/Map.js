import { useState, useEffect } from 'react';
import { Box, Button, Select } from '@chakra-ui/react';
import ReactTooltip from "react-tooltip";
import { useHistory } from 'react-router-dom';
import addEvent from '../../images/addEvent.png'

import { useAuth0 } from "@auth0/auth0-react";

import MapChart from "./MapChart";

import { AddIcon } from '@chakra-ui/icons';


import './Map.css'

function Map() {
  const { user } = useAuth0();
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
      <Select placeholder="Select data to view">
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </Select>
      <MapChart />
      {!fetching && type == 'user' ? 
      <circle r="10vh" className=" addEvent addEventCircle" onClick={addEvent} data-tip="Create Event" data-for="registerTip">
        <div className="addIcon">
          <AddIcon />
        </div>
      </circle>
      : null }
      <ReactTooltip id="registerTip" place="top" effect="solid"/>
    </div>
  );
}

export default Map;