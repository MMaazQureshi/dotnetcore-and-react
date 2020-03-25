import React ,{Component} from 'react';
import './App.css';
import axios from 'axios';

class App extends Component{
  state={
    values:[]
  }
  componentDidMount(){
    
    axios.get('http://localhost:5000/api/value')
    .then((response: { data: void; })=>
    {

      this.setState({
         values:response.data
        })
    })
  }
    
  render(){
    return (
    <div>
      <h2 className="ui header">
  <i aria-hidden="true" className="users icon"></i>
  <div className="content">Reactivities</div>
</h2>


    
 
        <div role="list" className="ui list">
        {
          this.state.values.map((value:any)=>(
            <div role="listitem" className="item" key={value.id}>{value.value}</div>
          ))
        }
        </div>
        </div>
  );
}
}

export default App;
