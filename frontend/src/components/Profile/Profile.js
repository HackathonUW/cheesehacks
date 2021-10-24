import { useEffect, useState } from "react";
import { Box, Heading, Grid, Spinner, Card } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";

import { BiUserCircle } from 'react-icons/bi';
import { FaBirthdayCake } from 'react-icons/fa';
import { GiAges } from 'react-icons/gi';
import { AiFillPhone } from 'react-icons/ai';

function Profile() {
	const { user } = useAuth0();

  const [fetching, setFetching] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getAttendingEvents();
  }, [])

  function getAttendingEvents() {
    const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
        action: "list",
        email: user.email
      })
		};

    console.log(options);
    setFetching(true);
    fetch("https://cheesehack-backend.herokuapp.com/events", options)
    .then(response => response.json())
    .then(res => {
      console.log(res);
      if (!res) {
        throw Error("Null res");
      }
      setEvents(res);
    })
    .catch(err => {
      console.error(err);
    })
    .finally(() => {
      setFetching(false);
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
        events.length > 0 ? events.map(event => (
          <Card>
            {event.evname}
          </Card>
        )) : null
      }
		</div>
	);
}

export default Profile;