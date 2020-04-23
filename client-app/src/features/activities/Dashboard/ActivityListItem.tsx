import React from "react";
import { Item, Button, Segment, Icon } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { IActivity } from "../../../app/models/Activity";

export const ActivityListItem: React.FC<{ activity: IActivity }> = ({
  activity,
}) => {
  return (
    <Segment.Group key={activity.id}>
      <Segment>
        <Item.Group>
        <Item>
          <Item.Image size="tiny" circular src="/assets/user.png"></Item.Image>
          <Item.Content>
            <Item.Header as="a">{activity.title}</Item.Header>

            <Item.Description>Hosted by</Item.Description>
          </Item.Content>
        </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <Icon name="clock" />
        {activity.date}
        <Icon name="marker" />
        {activity.venue},{activity.city}
      </Segment>
      <Segment secondary>attendees will go here</Segment>
      <Segment clearing>
        <span>{activity.description}</span>
        <Button
          as={NavLink}
          to={`/activities/${activity.id}`}
          floated="right"
          content="view"
          color="blue"
        ></Button>
      </Segment>
    </Segment.Group>
  );
};
