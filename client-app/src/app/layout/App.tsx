import React, { useEffect, useContext } from "react";
import { NavBar } from "../../features/Nav/NavBar";
import { Container } from "semantic-ui-react";
import ActivityDashboard  from "../../features/activities/Dashboard/ActivityDashboard";
import { LoadingComponent } from "./LoadingComponent";
import ActivityStore from "../stores/activityStore";
import {observer} from "mobx-react-lite";
import { Route } from "react-router-dom";
import { HomePage } from "../../features/Home/HomePage";
import ActivityForm from "../../features/activities/Forms/ActivityForm";
import ActivityDetails from "../../features/activities/Details/ActivityDetails";



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
        <Route exact path="/" component={HomePage} />
        <Route exact path="/Activities" component={ActivityDashboard} />
        <Route path="/Activities/:id" component={ActivityDetails} />
        <Route path="/CreateActivity" component={ActivityForm}/>
         
      </Container>
    </div>
  );
};

}
  
export default observer(App);
