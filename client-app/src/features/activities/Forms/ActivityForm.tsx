import React, { useState, FormEvent, useContext, useEffect } from "react";
import { Segment, Form, Button, Grid } from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import ActivityStore from "../../../app/stores/activityStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import { IActivity, IActivityFormValues, ActivityFormValues } from "../../../app/models/Activity";
import { Form as FinalForm, Field } from "react-final-form";
import { TextInput } from "../../../app/Common/Form/TextInput";
import { TextAreaInput } from "../../../app/Common/Form/TextAreaInput";
import { SelectInput } from "../../../app/Common/Form/SelectInput";
import { category } from "../../../app/Common/Options/CateogoryOptions";
import DateInput from "../../../app/Common/Form/DateInput";
import { combineDateAndTime } from "../../../app/Common/Helper/helper";

const ActivityForm: React.FC<RouteComponentProps<{ id: string }>> = ({
  match,
  history,
}) => {
  const [activity, setActivity] = useState(new ActivityFormValues());
const [loading,setLoading] = useState(false);

  const handleFinalFormSubmit = (values: any) => {
    const DateTime = combineDateAndTime(values.date,values.time);
    const{date,time,...activity} =values
    activity.date = DateTime;
    if (!activity.id) {
          let newActivity = {
            ...activity,
            id: uuid(),
          };
          createActivity(newActivity);
        } else {
          editActivity(activity);
        }
  };
  const activityStore = useContext(ActivityStore);
  const {
    createActivity,
    submitting,
    editActivity,
    loadActivity,
  } = activityStore;
  useEffect(() => {
    if (match.params.id) {
      setLoading(true);
      loadActivity(match.params.id).then((activity) => {
         setActivity(new ActivityFormValues(activity));
      }).finally(()=>{setLoading(false)} );
    }
  }, [
    
    match.params.id,
    loadActivity,
  ]);

  // const handleInputChange = (event:any)=>{
  // const handleInputChange = (
  //   event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   const { name, value } = event.currentTarget;
  //   setActivity({ ...activity, [name]: value });
  // };
  // const handleSubmit = () => {
  //   if (activity.id.length === 0) {
  //     let newActivity = {
  //       ...activity,
  //       id: uuid(),
  //     };
  //     createActivity(newActivity).then(() => {
  //       history.push(`/activities/${newActivity.id}`);
  //     });
  //   } else {
  //     editActivity(activity).then(() => {
  //       history.push(`/activities/${activity.id}`);
  //     });
  //   }
  // };

  return (
    <Grid>
      <Grid.Column width="10">
        <Segment clearing>
          <FinalForm
          initialValues={activity}
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit }) => (
              <Form loading={loading}>
                <Field
                  placeholder="Title"
                  name="title"
                  component={TextInput}
                  value={activity.title}
                />
                <Field
                  component={TextAreaInput}
                  rows={2}
                  placeholder="Description"
                  name="description"
                  value={activity.description}
                />
                <Field
                  component={SelectInput}
                  options={category}
                  placeholder="Category"
                  name="category"
                  value={activity.category}
                />
                <Form.Group widths='equal'>
                <Field
                    component={DateInput}
                    name='date'
                    date={true}
                    placeholder='Date'
                    value={activity.date}
                  />
                   <Field
                    component={DateInput}
                    name='time'
                    time={true}
                    placeholder='time'
                    value={activity.time}
                  />
</Form.Group>
                   
                <Field
                  placeholder="City"
                  component={TextInput}
                  name="city"
                  value={activity.city || ""}
                />
                <Field
                  component={TextInput}
                  placeholder="Venue"
                  value={activity.venue || ""}
                  name="venue"
                />
                <Button
                  floated="right"
                  positive
                  type="submit"
                  content="submit"
                  onClick={handleSubmit}
                  loading={submitting}
                />
                <Button
                  floated="right"
                  content="cancel"
                  onClick={()=>{activity.id? history.push(`/activities/${activity.id}`):history.push('/activities')}}
                />
              </Form>
            )}
          ></FinalForm>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};
export default observer(ActivityForm);
