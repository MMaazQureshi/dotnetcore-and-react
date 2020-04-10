import {observable, action} from 'mobx'
import { createContext } from 'react';
import { IActivity } from '../models/Activity';
import agent from '../Api/agent';

class ActivityStore{
@observable activities:IActivity[]=[];
@observable loadingInitial = false;
@observable selectedActivity:IActivity|undefined;
@observable editMode = false;

@action loadActivities= async ()=> {
this.loadingInitial = true;
 
try{
    const activities = await agent.Activities.list();
        activities.forEach(
          activity => {activity.date=activity.date.split('.')[0]
          this.activities.push(activity);}
        )
        this.loadingInitial=false;
        }
        catch(error){
            this.loadingInitial=false;
            console.log(error);
        }    
      
}
@action selectActivity = (id: string) => {
    this.selectedActivity = this.activities.find(a => a.id === id);
    this.editMode=false;
  };
}
export default createContext(new ActivityStore());