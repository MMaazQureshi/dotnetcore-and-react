import React from "react";
import { Menu, Segment, Container, Button } from "semantic-ui-react";

interface IProps{
  handleCreateActivity:()=>void;
}
export const NavBar:React.FC<IProps> = ({handleCreateActivity}) => {
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
            <Button positive onClick={handleCreateActivity} content="Create Activity"/>
        </Menu.Item>
        </Container>
      </Menu>
    </Segment>
  );
};
