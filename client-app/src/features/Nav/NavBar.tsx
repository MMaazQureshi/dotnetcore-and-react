import React, { useContext } from "react";
import { Menu, Segment, Container, Button } from "semantic-ui-react";
import ActivityStore from "../../app/stores/activityStore";


export const NavBar:React.FC = () => {
  const activitystore = useContext(ActivityStore);
  const {openCreatForm} = activitystore;
  return (
    
    <Segment inverted>
      <Menu  fixed="top" inverted >
     <Container>
        <Menu.Item header> 
            <img src="/assets/logo.png" alt="logo"/>
            Reactivities
        </Menu.Item>
        <Menu.Item name="activities" />
        <Menu.Item name="messages" />
        <Menu.Item >
            <Button positive onClick={openCreatForm} content="Create Activity"/>
        </Menu.Item>
        </Container>
      </Menu>
    </Segment>
  );
};
