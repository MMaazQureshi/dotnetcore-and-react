import React, { useState, FormEvent } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { IActivity } from "../../../app/models/Activity";
import {v4 as uuid} from 'uuid';
interface IProps {
  setEditMode: (editMode: boolean) => void;
  selectedActivity: IActivity;
  editActivity:(activity:IActivity)=> void;
  createActivity:(activity:IActivity)=> void;
  submitting: boolean;
}

export const ActivityForm: React.FC<IProps> = ({
  setEditMode,
  selectedActivity,editActivity,createActivity,submitting
}) => {
    const initForm = () => {
        if (selectedActivity) {
          return selectedActivity;
        } else {
          return {
            id: "",
            title: "",
            category: "",
            description: "",
            date: "",
            city: "",
            venue: ""
          };
        }
      };
    const [activity, setActivity] = useState(initForm());
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
        createActivity(newActivity);
    
    }
    else{
        editActivity(activity);
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
          onClick={() => setEditMode(false)}
        />
      </Form>
    </Segment>
  );
};
