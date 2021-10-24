import { Marker } from "react-simple-maps";

import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, useDisclosure } from '@chakra-ui/react';

import './EventMarker.js';

function EventMarker({event}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  function onJoinEvent() {
    console.log("JOINING EVENT", event)
  }

  return (
    <>
      <Marker coordinates={event.coordinates} onClick={onOpen} className="EventMarker">
        <g
          fill="none"
          stroke="#FF5533"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          transform="translate(-12, -24)"
        >
          <circle cx="12" cy="10" r="3" />
          <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
        </g>
      </Marker>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div>Test message</div>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onJoinEvent} colorScheme="blue">Join Event</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default EventMarker;