import React from "react";
import { Grid } from "semantic-ui-react";
import { IActivity } from "../../../app/models/Activity";
import { ActivityList } from "./ActivityList";
import { ActivityDetails } from "../Details/ActivityDetails";
import { ActivityForm } from "../Forms/ActivityForm";

interface IProps {
  activities: IActivity[];
  selectActivity: (id: string) => void;
  selectedActivity: IActivity | null;
  setEditMode: (editMode: boolean) => void;
  editMode: boolean;
  setSelectedActivity: (activity: IActivity | null) => void;
  editActivity:(activity:IActivity)=> void;
  createActivity:(activity:IActivity)=> void;
  deleteActivity:(activity:IActivity)=> void;
}

export const ActivityDashboard: React.FC<IProps> = ({
  activities,
  selectActivity,
  selectedActivity,
  editMode,
  setEditMode,
  setSelectedActivity,
  editActivity,
  createActivity,
  deleteActivity
}) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList activities={activities} selectActivity={selectActivity} deleteActivity={deleteActivity} />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedActivity && !editMode && (
          <ActivityDetails
            Activity={selectedActivity}
            setEditMode={setEditMode}
            setSelectedActivity={setSelectedActivity}
          />
        )}
        {editMode && <ActivityForm key={selectedActivity?.id}
        setEditMode={setEditMode} 
        selectedActivity={selectedActivity!} 
        editActivity ={editActivity}
        createActivity ={createActivity}
        />}
      </Grid.Column>
    </Grid>
  );
};
