import React from "react";
import { Card, Image, Button } from "semantic-ui-react";
import { IActivity } from "../../../app/models/Activity";

interface IProps {
  Activity: IActivity;
  setEditMode: (editMode: boolean) => void;
  setSelectedActivity: (activity: IActivity | null) => void;
}
export const ActivityDetails: React.FC<IProps> = ({
  Activity,
  setEditMode,
  setSelectedActivity
}) => {
  return (
    <Card fluid>
      <Image
        src={`/assets/categoryImages/${Activity.category}.jpg`}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{Activity.title}</Card.Header>
        <Card.Meta>
          <span className="date">{Activity.date}</span>
        </Card.Meta>
        <Card.Description>{Activity.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            color="blue"
            onClick={() => setEditMode(true)}
            content="Edit"
          />
          <Button
            basic
            color="grey"
            content="Cancel"
            onClick={() => setSelectedActivity(null)}
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};
