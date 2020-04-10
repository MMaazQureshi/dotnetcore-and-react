import React from "react";
import { Loader, Dimmer } from "semantic-ui-react";

export const LoadingComponent:React.FC<{content:string , inverted?:boolean}> = ({content,inverted}) => {
  return (
    <div>
      <Dimmer active inverted={inverted}>
        <Loader content={content}/>
      </Dimmer>
    </div>
  );
};
