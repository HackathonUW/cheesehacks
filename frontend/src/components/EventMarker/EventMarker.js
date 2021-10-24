import { useEffect, useState } from 'react';
import { Marker } from "react-simple-maps";
import ReactTooltip from "react-tooltip";
import { useToast, Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, useDisclosure, Link } from '@chakra-ui/react';
import { useAuth0 } from "@auth0/auth0-react";

import { FaMapMarkerAlt } from 'react-icons/fa';
import { AiOutlineCalendar, AiFillCalendar } from 'react-icons/ai'
import { MdDescription } from 'react-icons/md';
import './EventMarker.js';

function EventMarker({event}) {
  const toast = useToast();
  const { user } = useAuth0();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [attending, setAttending] = useState();
  const [fetching, setFetching] = useState();

  useEffect(() => {
    getAttendance();
  }, [isOpen])

  function getAttendance() {
    const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
        action: "list",
        pid: event.pid,
        email: user.email
      })
		};

    setFetching(true);
    fetch("https://cheesehack-backend.herokuapp.com/users", options)
    .then(response => response.json())
    .then(res => {
      console.log(res.length > 0);
      setAttending(res.length > 0);
    })
    .catch(err => {
      console.error(err);
    })
    .finally(() => {
      setFetching(false);
    });
  }

  function handleLeaveEvent() {
    const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
        action: "delete",
        pid: event.pid,
        email: user.email
      })
		};

    setFetching(true);
    console.log("LEAVING EVENT", options)
    fetch("https://cheesehack-backend.herokuapp.com/users", options)
      .then(response => response.json())
      .then(res => {
        if (!res.error) {
          toast({
            title: "Left Event Successfully",
            status: "success",
            duration: 2500,
            isClosable: true,
          })
        } else {
          toast({
            title: "Oops!",
            description: "Was not able to leave event",
            status: "fail",
            duration: 2500,
            isClosable: true,
          }) 
        }
        setAttending(false);
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        setFetching(false);
      });
  }

  function handleJoinEvent() {
    const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
        action: "attended",
        pid: event.pid,
        email: user.email
      })
		};

    setFetching(true);
    console.log("JOINING EVENT", options)
    fetch("https://cheesehack-backend.herokuapp.com/users", options)
      .then(response => response.json())
      .then(res => {
        if (!res.error) {
          toast({
            title: "Joined Event!",
            description: "You have joined " + event.name + "!",
            status: "success",
            duration: 2500,
            isClosable: true,
          })
        } else {
          toast({
            title: "Oops!",
            description: "Was not able to join event",
            status: "fail",
            duration: 2500,
            isClosable: true,
          }) 
        }
        setAttending(true);
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        setFetching(false);
      });
  }

  return (
    <>
      <Marker 
          coordinates={event.coordinates} 
          onClick={onOpen} 
          className="EventMarker" 
          data-tip={event.address} 
          >
            {/* <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 857 538"><defs><style>{`.cls-1{fill:#fefefe;}.cls-2{fill:#75d95e;}.cls-3{fill:#0c800c;}`}</style></defs><path class="cls-1" d="M507,204h857V742H507Zm532.8,74c-5.27.35-10.59.39-15.82,1.11-20.7,2.86-39.82,10.08-56.19,23.15-39.11,31.22-54.52,71.95-45.36,121,4.14,22.16,15.33,41.43,31,57.91a42.28,42.28,0,0,1,7.25,10.56C967,504.75,973,517.92,979,531c13,27.84,26,55.66,38.85,83.54,3.15,6.82,7.86,11.89,14.93,14.45,11.16,4,23.9-1.52,29.45-13,5-10.32,9.61-20.82,14.44-31.22q20.22-43.6,40.55-87.16c2.6-5.53,5-11.56,9-16,24.12-26.46,35.56-57,33-93a115,115,0,0,0-7.68-34.56C1132.16,305.5,1088.69,279.08,1039.8,278Z" transform="translate(-507 -204)"/><path class="cls-2" d="M1039.8,278c48.89,1.08,92.36,27.5,111.73,76.1a115,115,0,0,1,7.68,34.56c2.6,36-8.84,66.53-33,93-4,4.4-6.39,10.43-9,16q-20.43,43.51-40.55,87.16c-4.83,10.4-9.45,20.9-14.44,31.22-5.55,11.49-18.29,17.06-29.45,13-7.07-2.56-11.78-7.63-14.93-14.45C1005,586.67,992,558.85,979,531c-6.09-13.09-12-26.26-18.32-39.24a42.28,42.28,0,0,0-7.25-10.56c-15.71-16.48-26.9-35.75-31-57.91-9.16-49.09,6.25-89.82,45.36-121,16.37-13.07,35.49-20.29,56.19-23.15C1029.21,278.39,1034.53,278.35,1039.8,278Zm-.36,180c32.16.35,60.41-24.95,60.39-59.73,0-33.57-24.68-59.57-59.87-60.13-33.73-.55-59.55,27.72-60.07,59.14C979.33,430.72,1008.62,458.83,1039.44,458Z" transform="translate(-507 -204)"/><path class="cls-3" d="M1039.44,458c-30.82.83-60.11-27.28-59.55-60.72.52-31.42,26.34-59.69,60.07-59.14,35.19.56,59.86,26.56,59.87,60.13C1099.85,433.05,1071.6,458.35,1039.44,458Z" transform="translate(-507 -204)"/></svg> */}

            <FaMapMarkerAlt size={28} color={'#5092c8'}/>
      </Marker>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{event.evname ?? "Example Event"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              {event.description ?? "This is a description of a sample event! Please sign up!"}
            </Box>
            <br/>
            <Box display={'flex'} justifyContent={'space-evenly'} alignItems={'center'}>
              <AiOutlineCalendar display={'inline-block'}/> {new Date(event.startDate).toLocaleString()}
            </Box>
            <Box display={'flex'} justifyContent={'space-evenly'} alignItems={'center'}>
              <AiFillCalendar/> 
              <div> {new Date(event.endDate).toLocaleString()} </div>
            </Box>
            <br/>
            <Box display={'flex'}>
              Creator: &nbsp;
              <Link href={event.email}>
                {event.email ?? "example@gmail.com"}
              </Link>
            </Box>
          </ModalBody>

          <ModalFooter>
            {fetching ? 
            <Button isLoading colorScheme="blue"/>
            :
            attending ? 
            <>
              <Button variant="secondary" onClick={() => {handleLeaveEvent(toast)}}>Leave Event</Button>
              <Button isDisabled colorScheme="blue">Attending/Attended</Button>
            </>
              : 
              <Button onClick={() => {
                handleJoinEvent(toast)}} colorScheme="blue">Join Event!</Button>
            }
          </ModalFooter>
        </ModalContent>
      </Modal>
      

    </>
  )
}

export default EventMarker;