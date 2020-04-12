import React, { useContext} from "react";
import { Card, Image, Button } from "semantic-ui-react";
import ActivityStore from "../../../app/stores/activityStore";
import { observer } from "mobx-react-lite";

 const ActivityDetails: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  const{selectedActivity:Activity,openEditForm,canceSelectedActivity}= activityStore
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
            onClick={() => openEditForm(Activity!.id)}
            content="Edit"
          />
          <Button
            basic
            color="grey"
            content="Cancel"
            onClick={() => canceSelectedActivity()}
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};
export default observer(ActivityDetails);