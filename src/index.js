import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './index.css';

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      todo_arr: [],
      finished_arr: [],
      total: [],
      idDone: true,
      visible_all: false,
      visible_finished: false,
      visible_unfinished: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.Submit = this.Submit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  Submit(event) {
    event.preventDefault();
    this.setState({todo_arr: this.state.todo_arr.concat(this.state.value)})
    this.setState({total: this.state.total.concat(this.state.value)})
    this.setState({value: ''})
  }
  Edit = (val,ind,arr) => {
    var arrr = []
    for(let i=0;i<arr.length;i++){
      if(i===ind){
        arrr.push(val)
      }else{
        arrr.push(arr[i])
      }
    }
    return arrr
  }

  render(){
    return (
      <div id='booo' className='container'>
        <div id='heading'>TO DO LIST</div>
        <div>
          <form id='body' onSubmit={this.Submit}>
            Enter tasks to do: &nbsp;&nbsp;&nbsp;
            <label>
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>&nbsp;&nbsp;
            <input id='but' type="submit" value="Add task" />
          </form>
        </div>
        <div style={{textAlign: "center"}}>
          <ul style={{listStyleType: "none"}}>
            {this.state.todo_arr.map((data, index) => {
              return <li key={index}>{data}&nbsp;&nbsp;
              <input type="text" id={`${data}`} />
              <button onClick={()=>{
                this.setState({
                  todo_arr : this.Edit(document.getElementById(`${data}`).value,index,this.state.todo_arr)
                })
                document.getElementById(`${data}`).value='';
              }}>Edit</button>&nbsp;&nbsp;
              <button onClick={()=>{
                this.setState({
                  finished_arr: this.state.finished_arr.concat(data),
                  todo_arr: this.state.todo_arr.filter((item)=>item!==data)})
                }}>
                  Delete if finished
              </button></li>
            })}
          </ul>
        </div>
        <div style={{textAlign: "center"}}>
            <button onClick={() => this.setState({visible_all: !this.state.visible_all})}>All</button>&nbsp;&nbsp;
            <button onClick={() => this.setState({visible_finished: !this.state.visible_finished})}>Finished</button>&nbsp;&nbsp;
            <button onClick={() => this.setState({visible_unfinished: !this.state.visible_unfinished})}>Unfinished</button>  
            {this.state.visible_all?<div><br /><h1>All tasks</h1>
              <ul style={{listStyleType: "none"}}>
                {this.state.total.map((data, index) => {
                  return <li key={index}>{data}</li>})}
              </ul></div>:null}
            {this.state.visible_finished?<div><br /><h1>Finished tasks</h1>
            <ul style={{listStyleType: "none"}}>
            {this.state.finished_arr.map((data, index) => {
            return <li key={index}>{data}</li>})}
            </ul></div>:null}
            {this.state.visible_unfinished?<div><br /><h1>Unfinished tasks</h1>
              <ul style={{listStyleType: "none"}}>
              {this.state.todo_arr.filter(x => !this.state.finished_arr.includes(x)).map((data, index) => {
              return <li key={index}>{data}</li>})}
              </ul></div>:null}
        </div>
      </div>
    );
  }
}
ReactDOM.render(<NameForm />,
  document.getElementById('root')
);
