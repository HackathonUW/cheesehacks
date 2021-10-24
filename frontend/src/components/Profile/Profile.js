import { useEffect, useState } from "react";
import { Box, Heading, Grid, Spinner, Stack, Text, Link, Button } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";

import { BiUserCircle } from 'react-icons/bi';
import { FaBirthdayCake } from 'react-icons/fa';
import { GiAges } from 'react-icons/gi';
import { AiFillPhone,  AiOutlineCalendar, AiFillCalendar  } from 'react-icons/ai';

function Profile() {
	const { user } = useAuth0();

  const [fetching, setFetching] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getAttendingEvents();
  }, []);

  function getAttendingEvents() {
    const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
        email: user.email
      })
		};

    console.log(options);
    setFetching(true);
    fetch("https://cheesehack-backend.herokuapp.com/attended", options)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (!data) {
        throw Error("Null data");
      }
      data.forEach(event => {
        event.startDate = event.dates.split(',')[0];
        event.endDate = event.dates.split(',')[1];
      });
      setEvents(data);
      setFetching(false);
    })
    .catch(err => {
      console.error(err);
      setFetching(false);
    });
  }

  function handleLeaveEvent(event) {
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

    console.log("LEAVING EVENT", options)
    fetch("https://cheesehack-backend.herokuapp.com/users", options)
      .then(response => response.json())
      .then(res => {
        if (!res.error) {
          setEvents(events.filter(e => {
            return e.pid !== event.pid;
          }));
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

	return (
		<div className="profile">
			<Box textAlign="center">
				<Heading>Profile</Heading>
			</Box>
      <br/>
      <Heading size="lg">Information</Heading>
      <br/>
      <hr/>
      <br/>
      <Grid templateRows="repeat(4, 1fr)" gap={6} marginRight={'10vw'} marginLeft={'10vw'}>
        <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
          <BiUserCircle/>
          <b>{user.name}</b>
        </Box>
        <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
          <GiAges/>
          <b>21 years</b>
        </Box>
        <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
          <FaBirthdayCake/>
          <b>December 10th, 2002</b>
        </Box>
        <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
          <AiFillPhone/>
          <b>262-765-1864</b>
        </Box>
      </Grid>
      <br/>
      <Heading size="lg">Events</Heading>
      <br/>
      <hr/>
      <br/>
      {fetching ?
        <Spinner/>
        :
        events.length > 0 ? 
        <Box display={'flex'} flexWrap={'wrap'}>
        {events.map(event => (
          <Stack key={event.pid} p="4" boxShadow="lg" m="4" borderRadius="sm" width="30%">
            <Stack direction="row" alignItems="center">
              <Text fontWeight="semibold">{event.evname}</Text>
            </Stack>
            <Stack direction="column" alignItems="left">
              <Box>
                {event.description ?? "This is a description of a sample event! Please sign up!"}
              </Box>
              <br/>
              <Box display={'flex'} justifyContent={'left'} alignItems={'center'}>
                <AiOutlineCalendar display={'inline-block'}/> {new Date(event.startDate).toLocaleString()}
              </Box>
              <Box display={'flex'} justifyContent={'left'} alignItems={'center'}>
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
              <Button variant="secondary" onClick={() => {handleLeaveEvent(event)}}>Leave Event</Button>
            </Stack>
          </Stack>
        ))}</Box>
         : null
      }
		</div>
	);
}

export default Profile;