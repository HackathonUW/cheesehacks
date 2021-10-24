import { useState, useEffect } from 'react';
import { Grid, Box, Button, Select, Tooltip, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody } from '@chakra-ui/react';
import ReactTooltip from "react-tooltip";
import { useHistory } from 'react-router-dom';
import addEvent from '../../images/addEvent.png'

import { useAuth0 } from "@auth0/auth0-react";

import MapChart from "./MapChart";

import { AddIcon } from '@chakra-ui/icons';
import { MdOutlineLegendToggle } from 'react-icons/md';


import './Map.css'

const colorsCovid = ['#eeeeee', '#ecd7d4', '#e9c1bb', '#e5aba3', '#df948b', '#d77e74', '#cf675e', '#c64e48', '#bb3333'];
const colorsAir = ['#eeeeee', '#ebe7e1', '#e8dfd5', '#e5d8c9', '#e1d1bc', '#dec9b0', '#dac2a4', '#d6bb98', '#d2b48c'];

function Map() {
  const { user } = useAuth0();
  const [topic, setTopic] = useState("covid");
  const [fetching, setFetching] = useState(false);
  const [type, setType] = useState("user");

  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);

  const { isOpen, onOpen, onClose } = useDisclosure();

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
      <Box display={'flex'} alignItems={'center'}>
        <Select value={topic} onChange={(e) => {setTopic(e.target.value)}}>
          <option value="covid">COVID-19</option>
          <option value="air">Air Pollution</option>
        </Select>
        <Button colorScheme="blue" onClick={onOpen} marginLeft={'3vw'} >
          <MdOutlineLegendToggle size={28}/>
        </Button>
      </Box>
      <MapChart topic={topic} setMin={setMin} setMax={setMax}/>
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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        { topic == 'covid' ?
          <ModalContent>
            <ModalHeader>COVID 19 - Deaths per 100k</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Grid display={'flex'} templateColumns="repeat(10, 1fr)" marginRight={'3vw'} marginLeft={'3vw'} height={'3vh'}>
                {colorsCovid.map((color) => (
                  <Box backgroundColor={color} flex={1}/>
                ))}
              </Grid>
              <Box textAlign={'center'}>
                {min.toLocaleString("en-US")} to {max.toLocaleString("en-US")} deaths / 100,000
              </Box>
            </ModalBody>
          </ModalContent> 
          :
          <ModalContent>
            <ModalHeader>Air Pollution - Benzene Levels</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Grid display={'flex'} templateColumns="repeat(10, 1fr)" marginRight={'3vw'} marginLeft={'3vw'} height={'3vh'}>
                {colorsAir.map((color) => (
                  <Box backgroundColor={color} flex={1}/>
                ))}
              </Grid>
              <Box textAlign={'center'}>
                {min.toLocaleString("en-US")} to {max.toLocaleString("en-US")} µg / meters cubed
              </Box>
            </ModalBody>
        </ModalContent>
        }

      </Modal>
    </div>
  );
}

export default Map;