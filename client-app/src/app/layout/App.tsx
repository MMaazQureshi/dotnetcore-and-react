import React, { useEffect, useContext, Fragment } from "react";
import { NavBar } from "../../features/Nav/NavBar";
import { Container } from "semantic-ui-react";
import ActivityDashboard  from "../../features/activities/Dashboard/ActivityDashboard";
import { LoadingComponent } from "./LoadingComponent";
import ActivityStore from "../stores/activityStore";
import {observer} from "mobx-react-lite";
import { Route ,withRouter, RouteComponentProps, Switch} from "react-router-dom";
import { HomePage } from "../../features/Home/HomePage";
import ActivityForm from "../../features/activities/Forms/ActivityForm";
import ActivityDetails from "../../features/activities/Details/ActivityDetails";
import NotFound from "./NotFound";
import { ToastContainer } from "react-toastify";


const App:React.FC<RouteComponentProps> = ({location}) => {
  const activityStore = useContext(ActivityStore);
  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]); //now equivalent to componenDidMount with second parameter as an array
if(activityStore.loadingInitial){
  return <LoadingComponent inverted={true} content="Loading activities..."/>
}
else{
  return (
    <div>
      <ToastContainer position={'bottom-right'}/>
      <Route exact path="/" component={HomePage} />
      <Route path = {'/(.+)'} render ={()=>(
          <Fragment>
          <NavBar/>
           <Container style={{ marginTop: "7em" }}>
             <Switch>
             <Route exact path="/Activities" component={ActivityDashboard} />
             <Route path="/Activities/:id" component={ActivityDetails} />
             <Route key={location.key} path={["/CreateActivity","/Edit/:id"]} component={ActivityForm}/>
              <Route component={NotFound}/>
             </Switch>
            
           </Container>
           </Fragment>
      )

      } />
     
    </div>
  );
};

}
  
export default withRouter(observer(App));
