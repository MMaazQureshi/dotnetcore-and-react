import React, { useContext } from "react";
import { Menu, Segment, Container, Button } from "semantic-ui-react";
import ActivityStore from "../../app/stores/activityStore";
import { NavLink } from "react-router-dom";


export const NavBar:React.FC = () => {
  const activitystore = useContext(ActivityStore);
  const {openCreatForm} = activitystore;
  return (
    
    <Segment inverted>
      <Menu  fixed="top" inverted >
     <Container>
        <Menu.Item header as={NavLink} exact to="/"> 
            <img src="/assets/logo.png" alt="logo"/>
            Reactivities
        </Menu.Item>
        <Menu.Item as={NavLink}  to ="/Activities" name="activities" />
        <Menu.Item name="messages" />
        <Menu.Item >
            <Button positive as={NavLink}  to ="/createactivity"  onClick={openCreatForm} content="Create Activity"/>
        </Menu.Item>
        </Container>
      </Menu>
    </Segment>
  );
};
