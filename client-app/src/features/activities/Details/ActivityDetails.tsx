import React, { useContext } from "react";
import { Card, Image, Button } from "semantic-ui-react";
import { IActivity } from "../../../app/models/Activity";
import ActivityStore from "../../../app/stores/activityStore";
import { observer } from "mobx-react-lite";
interface IProps {
  setEditMode: (editMode: boolean) => void;
  setSelectedActivity: (activity: IActivity | null) => void;
}
 const ActivityDetails: React.FC<IProps> = ({
  setEditMode,
  setSelectedActivity
}) => {
  const activityStore = useContext(ActivityStore);
  const{selectedActivity:Activity}= activityStore
  return (
   
    <Card fluid>
      <Image
        src={`/assets/categoryImages/${Activity!.category}.jpg`}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{Activity!.title}</Card.Header>
        <Card.Meta>
          <span className="date">{Activity!.date}</span>
        </Card.Meta>
        <Card.Description>{Activity!.description}</Card.Description>
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
export default observer(ActivityDetails);