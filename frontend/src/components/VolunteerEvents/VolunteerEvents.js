import React from "react";
import { FormControl, FormLabel, Box, Heading, Button, Input, InputRightAddon, InputGroup, Textarea } from "@chakra-ui/react";
import events from "../Calendar/events";

function Events() {
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
				<Input />
			</FormControl>
			<FormControl my={5} id="org-email" isRequired>
				<FormLabel>
					Email Address
				</FormLabel>
				<InputGroup>
					<Input type="email" />
					<InputRightAddon children="@gmail.com" />
				</InputGroup>
			</FormControl>
			<FormControl id="ev-desc">
				<FormLabel>Event Description</FormLabel>
				<Textarea />
			</FormControl>
			</Box>
			<Button width={500} ml={500} mt={4} type="submit">
				Submit
			</Button>
		</div>
	)
}

export default Events;