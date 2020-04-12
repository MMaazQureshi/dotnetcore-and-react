import React, { useState, useEffect, useContext } from "react";
import { IActivity } from "../models/Activity";
import { NavBar } from "../../features/Nav/NavBar";
import { Container } from "semantic-ui-react";
import ActivityDashboard  from "../../features/activities/Dashboard/ActivityDashboard";
import agent from "../Api/agent";
import { LoadingComponent } from "./LoadingComponent";
import ActivityStore from "../stores/activityStore";
import {observer} from "mobx-react-lite";

interface IState {
  activities: IActivity[];
}

const App = () => {
  const activityStore = useContext(ActivityStore);
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  );
  const [editMode, setEditMode] = useState(false);
  
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState('');

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.filter(a => a.id === id)[0]);
    setEditMode(false);
  };
  const handleOPenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);

  };
  const handleCreateActivity =(activity:IActivity) =>{
    setSubmitting(true);
    agent.Activities.create(activity).then(() => {
      setActivities([...activities,activity])
      setSelectedActivity(activity);
      setEditMode(false);
    }).then(()=>setSubmitting(false));
    
  }
  const handleEditActivity =(activity:IActivity)=>{
    setSubmitting(true);
    agent.Activities.update(activity.id,activity).then(()=>
    {
      
      setActivities([...activities.filter(a=>a.id!==activity.id),activity]);
      setSelectedActivity(activity);
      setEditMode(false);
    }

    ).then(()=>setSubmitting(false));
    
  }
  const handleDeleteActivity=( e:React.MouseEvent<HTMLButtonElement, MouseEvent>,activity:IActivity)=>{
    setSubmitting(true);
    setTarget(e.currentTarget.name);
    agent.Activities.delete(activity.id).then(()=>{
      
      setActivities([...activities.filter(a=>a.id!==activity.id)]);
    }).then(()=>setSubmitting(false));
  }
  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]); //now equivalent to componenDidMount with second parameter as empty array
if(activityStore.loadingInitial){
  return <LoadingComponent inverted={true} content="Loading activities..."/>
}
else{
  return (
    <div>
      <NavBar/>
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          setSelectedActivity={setSelectedActivity}
          setEditMode={setEditMode}
          editActivity={handleEditActivity}
          deleteActivity ={handleDeleteActivity}
          submitting={submitting}
          target={target}
        />
      </Container>
    </div>
  );
};

}
  
export default observer(App);
