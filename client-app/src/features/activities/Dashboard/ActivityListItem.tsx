import React from 'react'
import { Item, Button, Label } from "semantic-ui-react";
import { NavLink } from 'react-router-dom';
import { IActivity } from '../../../app/models/Activity';

export const ActivityListItem:React.FC<{activity:IActivity}> = ({activity}) => {
    return (
            <Item key={activity.id}>
            <Item.Content>
              <Item.Header as="a">{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>
                  {activity.city},{activity.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                as={NavLink} to={`/activities/${activity.id}`}
                  floated="right"
                  content="view"
                  color="blue"
                ></Button>
                <Label basic content="category" />
              </Item.Extra>
            </Item.Content>
          </Item>
    )
}
