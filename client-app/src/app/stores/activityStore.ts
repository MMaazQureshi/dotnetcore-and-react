import { observable, action, computed,configure,runInAction } from "mobx";
import { createContext } from "react";
import { IActivity } from "../models/Activity";
import agent from "../Api/agent";
import { history } from '../..';
import { toast } from "react-toastify";

configure({enforceActions:"always"})
class ActivityStore {
  @observable activityRegistry = new Map<string,IActivity>();
  @observable activities: IActivity[] = [];
  @observable loadingInitial = false;
  @observable activity: IActivity|null =null;
  @observable editMode = false;
  @observable submitting = false;
  @observable target = "";
  @action loadActivities = async () => {
    this.loadingInitial = true;

    try {
      const activities = await agent.Activities.list();
      runInAction(()=>{
        activities.forEach((activity) => {
          activity.date = new Date(activity.date);
          this.activityRegistry.set(activity.id,activity);
        });
        this.loadingInitial = false;
        
      })
    } catch (error) {
      runInAction(()=>{
        this.loadingInitial = false;
           })
      console.log(error);
    }
  };
  @action openCreatForm= () => {
    this.editMode = true;
    this.activity = null;
  }
  @computed get activitiesByDate(){
    var sortedActivities:IActivity[] =Array.from(this.activityRegistry.values());
    return this.groupActivitiesByDate(sortedActivities);
  }
  groupActivitiesByDate(activities:IActivity[]){
    const sortedActivities = activities.sort((a,b)=>a.date!.getTime() -b.date!.getTime());
      return Object.entries(sortedActivities.reduce((activities,activity)=>{
        const date = activity.date.toISOString().split('T')[0];
        activities[date] = activities[date]?[...activities[date],activity]:[activity];
        return activities;
      },{} as {[key:string]:IActivity[]}));
  }
  @action createActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.create(activity);
      runInAction("Create Activity",()=>{
        this.activity = activity;
        history.push(`/activities/${activity.id}`);
        this.editMode = false;
        this.submitting = false;
        history.push(`/activities/${activity.id}`);
      })
    
    } catch (error) {
      runInAction("Create Activity",()=>{
        this.submitting = false;

      })
      toast.error("Some error occured!")
      console.log(error.response);
    }
  };
  @action editActivity = async (activity: IActivity)=>{
    this.submitting = true;
    try {
      await agent.Activities.update(activity.id,activity);
     runInAction("editing Activity",()=>{
      this.activityRegistry.set(activity.id,activity);
      this.activity = activity;
      this.editMode = false;
      this.submitting = false;
      history.push(`/activities/${activity.id}`);
     }) 
    } catch (error) {
      runInAction("editing Activity error",()=>{
        this.submitting = false;

      })
     toast.error("Some error occured!")
      console.log(error.response);
    }
  }
  @action deleteActivity = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>,activity:IActivity)=>{
      this.target=e.currentTarget.name;
      this.submitting=true;
      try{
        await agent.Activities.delete(activity.id);
        runInAction("delete activity",()=>{
          this.activityRegistry.delete(activity.id);
        this.target='';
        this.submitting=false;
        })
        
      }
      catch(error)
      {
        console.log(error);
        runInAction("delete activity",()=>{
          this.target='';
        this.submitting=false;
        })
        

      }
  }
  getActivity = (id: string) => {
    return this.activityRegistry.get(id);
  }
  @action loadActivity = async (id: string) => {
    let activity = this.getActivity(id);
    if (activity) {
     runInAction(()=>{this.activity = activity!;}) 
      return activity;
    } else {
      this.loadingInitial = true;
      try {
        activity = await agent.Activities.details(id);
        runInAction('getting activity',() => {
          activity!.date = new Date(activity!.date);
          this.activity = activity!;
         this.activityRegistry.set(activity!.id, activity!);
          this.loadingInitial = false;
        })
        return activity;
      } catch (error) {
        runInAction('get activity error', () => {
          this.loadingInitial = false;
        })
        console.log(error);
      }
    }
  }
    


 
  

  @action selectActivity = (id: string) => {
    this.activity = this.activityRegistry.get(id)!;
    this.editMode = false;
  };
}

export default createContext(new ActivityStore());
