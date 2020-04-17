import React, { useState, FormEvent, useContext, useEffect } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import {v4 as uuid} from 'uuid';
import ActivityStore from "../../../app/stores/activityStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";

 const ActivityForm: React.FC<RouteComponentProps<{id:string}>> = ({
  match,
  history
}) => {
  const [activity,setActivity] = useState({id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: ""});
  const activityStore = useContext(ActivityStore)
  const{createActivity,submitting,editActivity,cancelFormOpen,activity:initialFormState,loadActivity,clearActivity} = activityStore;
  useEffect(()=>{
    if(match.params.id && activity.id.length===0){
      loadActivity(match.params.id).then(()=>{initialFormState && setActivity(initialFormState)});
    }
    return ()=>{
clearActivity();
    } 
  },[initialFormState,match.params.id,loadActivity,activity.id.length,clearActivity])
    
    
  // const handleInputChange = (event:any)=>{
  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
  };
  const handleSubmit =()=>{
    if(activity.id.length===0){
        let newActivity = {
          ...activity,id:uuid()}
        createActivity(newActivity).then(()=>{history.push(`/activities/${newActivity.id}`)})
    
    }
    else{
        editActivity(activity).then(()=>{history.push(`/activities/${activity.id}`)});
    }
  }

  return (
    <Segment clearing>
      <Form>
        <Form.Input
          placeholder="Title"
          name="title"
          onChange={handleInputChange}
          value={activity.title}
        />
        <Form.TextArea
          rows="2"
          placeholder="Description"
          name="description"
          onChange={handleInputChange}
          value={activity.description}
        />
        <Form.Input
          placeholder="Category"
          onChange={handleInputChange}
          name="category"
          value={activity.category}
        />
        <Form.Input
          type="datetime-local"
          placeholder="Date"
          onChange ={handleInputChange}
          name="date"
          value={activity.date}
        />
        <Form.Input
          placeholder="City"
          onChange={handleInputChange}
          name="city"
          value={activity.city}
        />
        <Form.Input
          placeholder="Venue"
          value={activity.venue}
          name="venue"
          onChange={handleInputChange}
        />
        <Button
          floated="right"
          positive
          type="submit"
          onChange={handleInputChange}
          content="submit"
          onClick={handleSubmit}
          loading={submitting}
        />
        <Button
          floated="right"
          content="cancel"
          onClick={cancelFormOpen}
        />
      </Form>
    </Segment>
  );
};
export default observer(ActivityForm)