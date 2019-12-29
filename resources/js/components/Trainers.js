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

const FormField = ({
    label,
    input,
    type,
    name,
    className,
    onChange,
    value,
    //meta: { touched, error, warning }
}) => {
  let checked = false;
  if(type == 'checkbox' && value){
    checked = true;
  }
  return (
    <div className={"form-group "+className}>
        {
            label &&
            <label htmlFor={name}>{label}</label>
        }
        <input {...input } id={name} value={value} name={name} type={type} onChange={onChange} className={className} checked={checked} />
    </div>
  )};

class TrainerProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
    };

    this.editHandler = this.editHandler.bind(this);
    this.saveHandler = this.saveHandler.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
    this.changeTrainerHandler = this.changeTrainerHandler.bind(this);
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

  editHandler() {
    this.setState({editing: true});
  }

  saveHandler() {
    this.setState({editing: false});
    axios
    .post(routes.trainers.saveTrainer, this.state.trainer)
    .then( (response) => {
      if(response.data.success){
        this.setState({trainer: response.data.payload});
      }
      else{
        alert("Error saving trainer.");
        console.log(response);
      }
    })
    .catch( (err) => {
      console.log(err);
    });
  }

  deleteHandler() {
    if(confirm("Are you sure you want to delete this trainer?")){
      axios
      .post(routes.trainers.deleteTrainer, {
        tid: this.state.trainer.id,
      })
      .then( (response) => {
        if(response.data.success){
          this.props.history.push("/trainers");
        }
        else{
          alert("Error deleting trainer.");
          console.log(response);
        }
      })
      .catch( (err) => {
        console.log(err);
      });
    }
  }

  changeTrainerHandler(event) {
      let nam = event.target.name;
      let val = event.target.value;
      if(event.target.type == "checkbox")
          val = event.target.checked;

      let trainer = this.state.trainer;
      trainer[nam] = val;
      this.setState({trainer: trainer});
  }

  render() {
    if(!this.state.trainer){
      return (
        <div className="mdl-single-column">
          <div className="mdl-card">Loading...</div>
        </div>
      );
    }

    let profile = (
      <React.Fragment>
        <div className='name'>{this.state.trainer.name}</div>
        <div className='trainerImage'></div>
        <div className='trainerData'>{this.state.trainer.total_caught} pokemon caught</div>
      </React.Fragment>
    );
    if(this.state.editing){
      profile = (
        <React.Fragment>
          <FormField 
              label="Trainer name" 
              name="name" 
              id="name" 
              type="text" 
              className="" 
              value={this.state.trainer.name}
              onChange={this.changeTrainerHandler}
          />
          <FormField 
              label="Public"
              name="public" 
              id="public"
              type="checkbox" 
              className="checkbox" 
              value={this.state.trainer.public}
              onChange={this.changeTrainerHandler}
          />
        </React.Fragment>
      );
    }

    let actions = (<button className="mdl-button" onClick={this.editHandler}>Edit</button>);
    if(this.state.editing){
      actions = (
        <React.Fragment>
          <button className="mdl-button main" onClick={this.saveHandler}>Save</button>
          <button className="mdl-button warning" onClick={this.deleteHandler}>Delete</button>
        </React.Fragment>
      );
    }

    let actions_wrapped = (
      <div className='card-actions'>
        {actions}
      </div>
    )

    return (
      <div className="mdl-single-column">
        <div className="mdl-card trainer-profile">
          {profile}
          {this.state.trainer.currentUserHasEdit && actions_wrapped}
        </div>
      </div>
    );
  }
};

export {TrainerListPage, TrainerProfile};