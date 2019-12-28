import React, { Component } from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom';

let TrainerCard = ({
  id,
  name,
  isPrivate,
}) => {
  return (
    <Link className="mdl-card trainer-card" to={"/trainers/"+id}>
      <div className='name'>{name}</div>
      <div className='trainerImage'></div>
      <div className='trainerData'>Level 3 Ace Trainer</div>
      {isPrivate?<div>(private)</div>:<React.Fragment/>}
    </Link>
  );
};

class TrainerListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.addTrainerHandler = this.addTrainerHandler.bind(this);
  }

  async componentDidMount() {
    axios
    .get(routes.trainers.getTrainerList)
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

  addTrainerHandler() {
    axios
    .post(routes.trainers.addTrainer)
    .then( (response) => {
      if(response.data.success){
        this.setState({trainers: response.data.payload});
      }
      else{
        alert("Error adding new trainer.");
        console.log(response);
      }
    })
    .catch( (err) => {
      console.log(err);
    });
  }

  /*
  selectEntryHandler(eid) {
    if(this.state.selectedEntry == eid){
      this.setState({selectedEntry: null});
    }
    else {
      this.setState({selectedEntry: eid});
    }
  }*/

  render() {
    let items = (
      <React.Fragment></React.Fragment>
    );
    if(!this.state.trainers){
      return (
        <div className="mdl-single-column">
          <div className="mdl-card">Loading...</div>
        </div>
      );
    }
    let myTrainers = this.state.trainers.myTrainers.map((trainer, key) => {
      return (
        <TrainerCard
          key={trainer.id}
          id={trainer.id}
          name={trainer.name}
          isPrivate={trainer.private}
        />
      );
    });
    let otherTrainers = this.state.trainers.otherTrainers.map((trainer, key) => {
      return (
        <TrainerCard
          key={trainer.id}
          id={trainer.id}
          name={trainer.name}
          isPrivate={trainer.private}
        />
      );
    });
    return (
      <React.Fragment>
        <div className="mdl-header"><h2>Your trainers</h2></div>
        <div className="mdl-multi-column">
          {myTrainers}
        </div>
        <div className="mdl-header"><h2>Other trainers</h2></div>
        <div className="mdl-multi-column">
          {otherTrainers}
        </div>
        <div className='mdl-button main mdl-button-round' onClick={this.addTrainerHandler}>
        <i className="fas fa-user-plus"></i>
        <span className='sr-only'>Add new trainer</span>
        </div>
      </React.Fragment>
    );
  }
};

class TrainerProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    //this.addTrainerHandler = this.addTrainerHandler.bind(this);
  }

  async componentDidMount() {
    let trainer_id = this.props.match.params.id;
    let route = routes.trainers.getTrainerData+"/"+trainer_id;
    axios
    .get(route)
    .then( (response) => {
      if(response.data.success)
        this.setState({trainer: response.data.payload});
      else{
        alert("Error loading trainer data from server.");
        console.log(response);
      }
    })
    .catch( (err) => {
      console.log(err);
    });
  }

  /*
  selectEntryHandler(eid) {
    if(this.state.selectedEntry == eid){
      this.setState({selectedEntry: null});
    }
    else {
      this.setState({selectedEntry: eid});
    }
  }*/

  render() {
    if(!this.state.trainer){
      return (
        <div className="mdl-single-column">
          <div className="mdl-card">Loading...</div>
        </div>
      );
    }
    return (
      <div className="mdl-single-column">
        <div className="mdl-card trainer-profile">
          <div className='name'>{this.state.trainer.name}</div>
          <div className='trainerImage'></div>
          <div className='trainerData'>Level 3 Ace Trainer</div>
        </div>
      </div>
    );
  }
};

export {TrainerListPage, TrainerProfile};