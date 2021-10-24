import React, { useState, useCallback } from "react";
import { FormControl, FormLabel, Box, Heading, Button, Input, InputRightAddon, InputGroup, Textarea } from "@chakra-ui/react";
import events from "../Calendar/events";
import { useAuth0 } from "@auth0/auth0-react";

function Events() {
	const [name, setName] = useState();
	const [email, setEmail] = useState();
	const [desc, setDesc] = useState();
	const [address, setAddress] = useState();
	const [zip, setZip] = useState();
	const { user } = useAuth0();
	//Number of events API

	const createEvent = useCallback(() => {

	},[])
	return (
		<div className="events">
			<Box textAlign="center">
				<Heading>Create Event</Heading>
			</Box>
			<Box my={4} textAlign="left" width={500} ml={500}>
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
				<Input placeholder="777 Torybrook Lane" onChange={event => setAddress(event.currentTarget.value)} />
			</FormControl>
			<FormControl my={5} id="zip" isRequired>
				<FormLabel>
					Zip
				</FormLabel>
				<Input onChange={event => setZip(event.currentTarget.value)} />
			</FormControl>
			<FormControl my={5} id="date" isRequired>
				<FormLabel>
					Event Date and Time
				</FormLabel>
				<Input type="datetime-local"></Input>
			</FormControl>
			<FormControl id="ev-desc" my={5}>
				<FormLabel>Event Description</FormLabel>
				<Textarea onChange={event => setDesc(event.currentTarget.value)} />
			</FormControl>
			</Box>
			<Button width={500} ml={500} mb={5} mt={4} type="submit" onClick={createEvent}>
				Submit
			</Button>
		</div>
	)
}

export default Events;