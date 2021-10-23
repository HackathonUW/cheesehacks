import React, { useState, useCallback } from "react";
import { FormControl, FormLabel, Box, Heading, Button, Input, InputRightAddon, InputGroup, Textarea } from "@chakra-ui/react";
import events from "../Calendar/events";

function Events() {
	const [name, setName] = useState();
	const [email, setEmail] = useState();
	const [desc, setDesc] = useState();
	const [address, setAddress] = useState();
	const [zip, setZip] = useState();

	const createEvent = useCallback(() => {

	},[])
	return (
		<div className="events">
			<Box textAlign="center">
				<Heading>Create Event</Heading>
			</Box>
			<Box my={4} textAlign="left" width={500} ml={500}>
			<FormControl my={5} id="org-name" isRequired>
				<FormLabel>
					Organization Name
				</FormLabel>
				<Input onChange={event => setName(event.currentTarget.value)} />
			</FormControl>
			<FormControl my={5} id="org-email" isRequired>
				<FormLabel>
					Email
				</FormLabel>
				<InputGroup>
					<Input type="email" placeholder="example@gmail.com" onChange={event => setEmail(event.currentTarget.value)} />
				</InputGroup>
			</FormControl>
			<FormControl id="address" isRequired>
				<FormLabel>
					Address
				</FormLabel>
				<Input placeholder="777 Torybrook Lane" onChange={event => setAddress(event.currentTarget.value)} />
			</FormControl>
			<FormControl id="zip" isRequired>
				<FormLabel>
					Zip
				</FormLabel>
				<Input onChange={event => setZip(event.currentTarget.value)} />
			</FormControl>
			<FormControl id="date" isRequired>
				<FormLabel>
					Event Date and Time
				</FormLabel>
				<Input type="datetime-local"></Input>
			</FormControl>
			<FormControl id="ev-desc">
				<FormLabel>Event Description</FormLabel>
				<Textarea onChange={event => setDesc(event.currentTarget.value)} />
			</FormControl>
			</Box>
			<Button width={500} ml={500} mt={4} type="submit" onClick={createEvent}>
				Submit
			</Button>
		</div>
	)
}

export default Events;