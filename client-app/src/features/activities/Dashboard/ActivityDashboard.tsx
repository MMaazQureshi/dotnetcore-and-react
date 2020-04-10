import React, { useContext } from "react";
import { Grid } from "semantic-ui-react";
import { IActivity } from "../../../app/models/Activity";
import ActivityList from "./ActivityList";
import ActivityDetails  from "../Details/ActivityDetails";
import { ActivityForm } from "../Forms/ActivityForm";
import ActivityStore from "../../../app/stores/activityStore";
import { observer } from "mobx-react-lite";

interface IProps {
  setEditMode: (editMode: boolean) => void;
  setSelectedActivity: (activity: IActivity | null) => void;
  editActivity:(activity:IActivity)=> void;
  createActivity:(activity:IActivity)=> void;
  deleteActivity:( e:React.MouseEvent<HTMLButtonElement, MouseEvent>,activity:IActivity)=> void;
  submitting:boolean;
  target:string;
}
 const ActivityDashboard: React.FC<IProps> = ({
  setEditMode,
  setSelectedActivity,
  editActivity,
  createActivity,
  deleteActivity,
  submitting,
  target
}) => {
  const activityStore = useContext(ActivityStore);
  const {editMode,selectedActivity} = activityStore
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList target = {target}submitting={submitting}   deleteActivity={deleteActivity} />
      </Grid.Column>
      <Grid.Column width={6}>

        {selectedActivity && !editMode && (
          <ActivityDetails
            setEditMode={setEditMode}
            setSelectedActivity={setSelectedActivity}
          />
        )}
        {editMode && <ActivityForm key={selectedActivity?.id}
        setEditMode={setEditMode} 
        selectedActivity={selectedActivity!} 
        editActivity ={editActivity}
        createActivity ={createActivity}
        submitting={submitting}
        />}
      </Grid.Column>
    </Grid>
  );
};
export default observer(ActivityDashboard);