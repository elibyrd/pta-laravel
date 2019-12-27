import React, { Component } from 'react';
import axios from 'axios'

let DexEntry = (props) => {
  let trainerRef = props.trainerRef;
  let trainerData = Object.keys(trainerRef).map((key) => {
    let ref = trainerRef[key];
    let checked = props.trainersCaught.includes(ref.id);
    let checkboxKey = 'caught-'+props.ndid+'-'+ref.id;
    let onChange = ()=>(props.caughtChangeHandler(props.entryID, key, !checked));
    return (
      <li key={checkboxKey}>
        <input type='checkbox' id={checkboxKey} name={checkboxKey} checked={checked} onChange={onChange}/>
        <label htmlFor={checkboxKey}>{ref.name}</label>
      </li>
    );
  });
  let trainerList = (
    <div>
      <div>Caught by:</div>
      <ul>
        {trainerData}
      </ul>
    </div>
  );
  let removeSeen = ()=>(props.seenChangeHandler(props.entryID, false));
  return (
    <div className="dex-entry">
      <div>#{props.ndid}: {props.name}</div>
      {trainerList}
    <a href='#' onClick={removeSeen}>Remove #{props.ndid}</a>
    </div>
  );
};

let EntrySelect = (props) => {
  let pokedex = props.pokedex;
  let seenChangeHandler = props.seenChangeHandler;
  if(!pokedex){
    return (<div>Loading...</div>);
  }

  let options = pokedex.map((entry, key) => {
    if(entry.seen){
      return null;
    }
    return (
      <option key={entry.eid} value={entry.eid}>
        {entry.ndid}: {entry.name}
      </option>
    );
  });
  let onChange = (event)=>(seenChangeHandler(event.target.value, true));
  return (
    <select onChange={onChange}>
      <option key="-1" value="-1">Add a pokemon...</option>
      {options}
    </select>
  );
};

class PlayerdexPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.caughtChangeHandler = this.caughtChangeHandler.bind(this);
    this.seenChangeHandler = this.seenChangeHandler.bind(this);
  }

  async componentDidMount() {
    axios
    .get(routes.pokedex.getPokedexData)
    .then( (response) => {
      if(response.data.success)
        this.setState({pokedex: response.data.payload});
      else{
        alert("Error loading pokedex data from server.");
        console.log(response);
      }
    })
    .catch( (err) => {
      console.log(err);
    });
    
    axios
    .get(routes.getPublicTrainers)
    .then( (response) => {
      if(response.data.success)
        this.setState({trainers: response.data.payload});
      else{
        alert("Error loading trainer data from server.");
        console.log(response);
      }
    })
    .catch( (err) => {
      console.log(err);
    });
  }

  caughtChangeHandler(eid, tid, status) {
    axios
    .post(routes.pokedex.setCaughtStatus, {
      eid: eid,
      tid: tid,
      status: status,
    })
    .then( (response) => {
      if(response.data.success){
        this.setState({pokedex: response.data.payload});
      }
      else{
        alert("Error updating caught status.");
        console.log(response);
      }
    })
    .catch( (err) => {
      console.log(err);
    });
  }

  seenChangeHandler(eid, status) {
    if(eid < 0 || eid == "-1")
      return;

    axios
    .post(routes.pokedex.setSeenStatus, {
      eid: eid,
      status: status,
    })
    .then( (response) => {
      if(response.data.success){
        this.setState({pokedex: response.data.payload});
      }
      else{
        alert("Error updating seen status.");
        console.log(response);
      }
    })
    .catch( (err) => {
      console.log(err);
    });
  }

  render() {
    let items = (
      <div>Loading...</div>
    );
    if(this.state.pokedex && this.state.trainers){
      items = this.state.pokedex.map((entry, key) => {
        if(entry.seen)
          return (
            <DexEntry
              key={entry.ndid}
              entryID={entry.eid}
              ndid={entry.ndid}
              name={entry.name}
              trainersCaught={entry.trainersCaught}
              trainerRef={this.state.trainers}
              caughtChangeHandler={this.caughtChangeHandler}
              seenChangeHandler={this.seenChangeHandler}
            />);
        return null;
      });
    }
    return (
      <div className="">
        <h2 className="">Player Pokedex</h2>
        <EntrySelect
          pokedex={this.state.pokedex}
          seenChangeHandler={this.seenChangeHandler}
        />
        <div className="dex">
          {items}
        </div>
      </div>
    );
  }
};

export default PlayerdexPage;