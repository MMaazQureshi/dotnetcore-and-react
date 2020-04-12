import React, { useEffect, useContext } from "react";
import { NavBar } from "../../features/Nav/NavBar";
import { Container } from "semantic-ui-react";
import ActivityDashboard  from "../../features/activities/Dashboard/ActivityDashboard";
import { LoadingComponent } from "./LoadingComponent";
import ActivityStore from "../stores/activityStore";
import {observer} from "mobx-react-lite";



const App = () => {
  const activityStore = useContext(ActivityStore);
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
        <ActivityDashboard/>
      </Container>
    </div>
  );
};

}
  
export default observer(App);
