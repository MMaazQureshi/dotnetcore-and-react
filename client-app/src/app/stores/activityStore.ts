import { observable, action, computed,configure,runInAction } from "mobx";
import { createContext } from "react";
import { IActivity } from "../models/Activity";
import agent from "../Api/agent";
configure({enforceActions:"always"})
class ActivityStore {
  @observable activityRegistry = new Map();
  @observable activities: IActivity[] = [];
  @observable loadingInitial = false;
  @observable activity: IActivity | undefined;
  @observable editMode = false;
  @observable submitting = false;
  @observable target = "";
  @action loadActivities = async () => {
    this.loadingInitial = true;

    try {
      const activities = await agent.Activities.list();
      runInAction(()=>{
        activities.forEach((activity) => {
          activity.date = activity.date.split(".")[0];
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
    this.activity = undefined;
  }
  @computed get activitiesByDate(){
    return Array.from(this.activityRegistry.values()).sort((a,b)=>Date.parse(a.date) -Date.parse(b.date))
  }
  @action editActivity = async (activity: IActivity)=>{
    this.submitting = true;
    try {
      await agent.Activities.update(activity.id,activity);
     runInAction("editing Activity",()=>{
      this.activityRegistry.set(activity.id,activity);
      this.activity = activity;
      this.editMode = false;
      this.submitting = false;
     }) 
    } catch (error) {
      runInAction("editing Activity error",()=>{
        this.submitting = false;
      })
     
      console.log(error);
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
  @action openEditForm = async (id:string)=>{
    this.activity = this.activityRegistry.get(id);
      this.editMode = true;
  }
  @action canceactivity =()=>{
    this.activity=undefined;
  }
  @action cancelFormOpen = () => {
    this.editMode = false;
  }
  @action loadActivity=async (id:string)=>{
    let activity = this.activityRegistry.get(id);
    if(activity){
      this.activity=activity;
    }
    else{
      this.loadingInitial=true;
      try{
        this.selectActivity = await agent.Activities.details(id);
        runInAction("getting activity",()=>{
          this.loadingInitial=false;
        })
      }
      catch{
        runInAction("getting activity error",()=>{
          this.loadingInitial=false;
        })
      }
      
    }
  }
  
  @action createActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.create(activity);
      runInAction("Create Activity",()=>{
        this.activityRegistry.set(activity.id,activity);
        this.activity = activity;
        this.editMode = false;
        this.submitting = false;
      })
    
    } catch (error) {
      runInAction("Create Activity",()=>{
        this.submitting = false;

      })
      console.log(error);
    }
  };
  @action selectActivity = (id: string) => {
    this.activity = this.activityRegistry.get(id);
    this.editMode = false;
  };
}

export default createContext(new ActivityStore());
