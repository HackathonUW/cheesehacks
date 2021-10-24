import React, { useState, useCallback } from "react";
import { FormControl, FormLabel, Box, Heading, Button, Input, Textarea, InputGroup } from "@chakra-ui/react";
import events from "../Calendar/events";
import { useAuth0 } from "@auth0/auth0-react";

import './VolunteerEvents.css'

function Events() {
	const [name, setName] = useState();
	const [desc, setDesc] = useState();
	const [address, setAddress] = useState();
	const [zip, setZip] = useState();
	const [dateTime, setDateTime] = useState();
	const [fdateTime, setFDateTime] = useState();
	const { user } = useAuth0();

  const [length, setLength] = useState();

	//Number of events API

  function handleCreateEvent() {
    getEventLength()
    .then(() => {
      postEvent();
    })
  }

  function getEventLength() {
    const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({action: "length"})
		}
		return fetch("https://cheesehack-backend.herokuapp.com/events", options)
      .then(response => response.json())
      .then(data => {
        console.log("LENGTH:", data.length);
        setLength(data.length);
      })
      .catch(error => {
        console.log(error);
      })
  }

  function postEvent() {
    var info = {
			action: "add",
			id: length + 1,
			eventname: name,
			email: user.email,
			description: desc,
			address: address,
			zip_code: zip,
			dates: {dateTime, fdateTime},
		};

		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(info)
		}

		console.log(JSON.stringify(info))
		fetch("https://cheesehack-backend.herokuapp.com/events", options)
      .then(response => response.json())
      .then(res => {
        console.log("EVENT CREATED:", res.error);
      })
		  .catch(error => console.error('Error: ', error));
  }

	return (
		<div className="Events">
			<div>
				<Heading>Create Event</Heading>
			</div>
			<Box my={4} width={500}>
			<FormControl my={5} isReadOnly>
				<FormLabel>
					Organization Name
				</FormLabel>
				<Input defaultValue={user.name} />	
			</FormControl>
			<FormControl my={5}>
				<FormLabel>
					Email
				</FormLabel>
				<Input defaultValue={user.email} />
			</FormControl>
			<FormControl my={5} id="ev-name" isRequired>
				<FormLabel>
					Event Name
				</FormLabel>
				<Input onChange={event => setName(event.currentTarget.value)} />
			</FormControl>
			<FormControl my={5} id="address" isRequired>
				<FormLabel>
					Event Location
				</FormLabel>
				<Input onChange={event => setAddress(event.currentTarget.value)} />
			</FormControl>
			<FormControl my={5} id="zip" isRequired>
				<FormLabel>
					Zip
				</FormLabel>
				<Input onChange={event => setZip(event.currentTarget.value)} />
			</FormControl>
			<FormControl my={5} id="date" isRequired>
				<FormLabel>
					Event Start and End Time
				</FormLabel>
				<InputGroup>
					<Input type="datetime-local" onChange={event => setDateTime(event.currentTarget.value)}></Input>
					<Input type="datetime-local" onChange={event => setFDateTime(event.currentTarget.value)}></Input>
				</InputGroup>
			</FormControl>
			<FormControl id="ev-desc" my={5}>
				<FormLabel>Event Description</FormLabel>
				<Textarea onChange={event => setDesc(event.currentTarget.value)} />
			</FormControl>
			</Box>
			<Button width={500} mb={5} mt={4} type="submit" onClick={handleCreateEvent}>
				Submit
			</Button>
		</div>
	)
}

export default Events;