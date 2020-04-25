import React from 'react'
import { FieldRenderProps } from 'react-final-form'
import { FormFieldProps, Input, Form, Label } from 'semantic-ui-react'

interface IProps extends FieldRenderProps<string,HTMLElement>,FormFieldProps{}
export const TextInput:React.FC<IProps> = ({input,width,type,placeholder,meta:{touched,error}}) => {
    return (
        <Form.Field error={touched&& !!error} width={width}>
                <input {...input} placeholder={placeholder} type={type} ></input>
                {
                    error&&(<Label basic color='red'> {error} </Label>)

                }
        </Form.Field>
        
        
    )
}
