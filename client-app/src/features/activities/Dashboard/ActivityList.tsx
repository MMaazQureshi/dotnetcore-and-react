import React, { useContext } from "react";
import { Item, Button, Label, Segment } from "semantic-ui-react";
import ActivityStore from "../../../app/stores/activityStore";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";



const ActivityList: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  const{activitiesByDate:activities,deleteActivity,submitting,target} = activityStore
  return (
    <Segment clearing>
      <Item.Group divided>
        {activities.map(activity => (
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
                <Button
                  name={activity.id}
                  floated="right"
                  content="Delete"
                  onClick={(e) => deleteActivity(e,activity)}
                  color="red"
                  loading={target===activity.id && submitting}
                ></Button>
                <Label basic content="category" />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};
export default observer(ActivityList);