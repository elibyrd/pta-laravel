import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';

let DexEntry = (props) => {
  let trainerRef = props.trainerRef;
  let toggleSelect = ()=>{props.toggleSelect(props.entryID)};
  let selected = props.selected;
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
    <div className='trainerList'>
      <div>Caught:</div>
      <ul>
        {trainerData}
      </ul>
    </div>
  );
  let removeSeen = ()=>(props.seenChangeHandler(props.entryID, false));
  let imgsrc = "https://img.pokemondb.net/sprites/sun-moon/icon/"+props.name.toLowerCase()+".png";
  let className="mdl-card dex-entry"+(selected?" selected":"");
  return (
    <div className={className} onClick={toggleSelect}>
      <div className='ndid'>#{props.ndid}</div>
      <div className='sprite'><img src={imgsrc} alt=""/></div>
      <div className='name'>{props.name}</div>
      {trainerList}
      <a className="remove" href='#' onClick={removeSeen}>
        <i className="far fa-times"></i>
        <span className="sr-only">Remove #{props.ndid}</span>
      </a>
    </div>
  );
};

let EntrySelect = (props) => {
  let pokedex = props.pokedex;
  let seenChangeHandler = props.seenChangeHandler;
  if(!pokedex){
    return (<div>Loading...</div>);
  }

  let options = pokedex.filter((entry) => {
    if(entry.seen){
      return false;
    }
    return true;
  }).map((entry) => ({ 
    value: entry.eid, 
    label: entry.ndid+": "+entry.name 
  }));
  let onChange = (selected)=>{seenChangeHandler(selected.value, true)};
  return (
    <Select
      value="-1"
      onChange={onChange}
      options={options}
      placeholder="Add a pokemon..."
    />
  );
};

class PlayerdexPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedEntry: null,
    };

    this.caughtChangeHandler = this.caughtChangeHandler.bind(this);
    this.seenChangeHandler = this.seenChangeHandler.bind(this);
    this.selectEntryHandler = this.selectEntryHandler.bind(this);
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
    .get(routes.trainers.getPublicTrainers)
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

    if(!status && !confirm("Delete this pokemon from the player dex?")){
      return;
    }
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

  selectEntryHandler(eid) {
    if(this.state.selectedEntry == eid){
      this.setState({selectedEntry: null});
    }
    else {
      this.setState({selectedEntry: eid});
    }
  }

  render() {
    if(!(this.state.pokedex && this.state.trainers)){
      return (
        <div className="mdl-single-column">
          <div className='mdl-card'>
            Loading...
          </div>
        </div>
      );
    }

    let dex_seen = this.state.pokedex.filter((entry)=>(entry.seen));
    let items = dex_seen.map((entry, key) => {
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
          toggleSelect={this.selectEntryHandler}
          selected={this.state.selectedEntry == entry.eid}
        />);
    });
    return (
      <React.Fragment>
        <div className="mdl-single-column">
          <div className='mdl-card'>
            <p>{dex_seen.length} pokemon registered.</p>
            <EntrySelect
              pokedex={this.state.pokedex}
              seenChangeHandler={this.seenChangeHandler}
            />
          </div>
        </div>
        <div className="mdl-multi-column">
          {items}
        </div>
      </React.Fragment>
    );
  }
};

export default PlayerdexPage;