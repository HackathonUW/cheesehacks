import { Marker } from "react-simple-maps";

import { Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, useDisclosure, Link } from '@chakra-ui/react';

import event from '../../images/blueEvent.png';

import './EventMarker.js';

function EventMarker({event}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  function onJoinEvent() {
    console.log("JOINING EVENT", event)
  }

  return (
    <>
      <Marker coordinates={event.coordinates} onClick={onOpen} className="EventMarker" data-tip={event.address} data-for="EventMarker">
          <img
                src={event}
                width='35'
                height='35'
                className="d-inline-block align-top"
                alt='eventTest'
            />
      </Marker>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{event.title ?? "Example Event"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              Start Date: {event.startDate}
            </Box>
            <Box>
              End Date: {event.endDate}
            </Box>
            <Box>
              Description: {event.description ?? "This is a description of a sample event! Please sign up!"}
            </Box>
            <Box>
              Event Created By: &nbsp;
              <Link href={event.email}>
                {event.email ?? "example@gmail.com"}
              </Link>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onJoinEvent} colorScheme="blue">Join Event!</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      

    </>
  )
}

export default EventMarker;