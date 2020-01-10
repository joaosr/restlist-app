import React from 'react';
import AuthService from '../AuthService/';

export default class Edit extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      id: props.restaurant.id,
      name: props.restaurant.name,
      description: props.restaurant.description,
      category: props.restaurant.category,
      address: props.restaurant.address,
      phone: props.restaurant.phone,
      website: props.restaurant.website
    }

    this.auth = new AuthService();
    this.update = this.update.bind(this)
  }

  update() {
    this.auth.update(this.state).then(val => {this.props.onChange(val)});
    this.props.back();
  }

  render() {
    return (
      <div>
            <h3>{this.props.restaurant.name}</h3>
            <div><input
              type='text'
              value={this.state.name}
              onChange={e => {
                this.setState({
                  name: e.target.value,
                });
              }}
              placeholder='name'
              /></div>
            <div><input
              type='text'
              value={this.state.description}
              onChange={e => {
                this.setState({
                  description: e.target.value,
                });
              }}
              placeholder='description'
              /></div>
            <div><input
              type='text'
              value={this.state.category}
              onChange={e => {
                this.setState({
                  category: e.target.value,
                });
              }}
              placeholder='category'
              /></div>
            <div><input
              type='text'
              value={this.state.address}
              onChange={e => {
                this.setState({
                  address: e.target.value,
                });
              }}
              placeholder='address'
              /></div>
            <div><input
              type='text'
              value={this.state.phone}
              onChange={e => {
                this.setState({
                  phone: e.target.value,
                });
              }}
              placeholder='phone'
              /></div>
            <div><input
              type='text'
              value={this.state.website}
              onChange={e => {
                this.setState({
                  website: e.target.value,
                });
              }}
              placeholder='website'
              /></div>
            <button onClick={this.props.back}>back</button>
            <button onClick={this.update}>update</button>
      </div>
    );
  }
}
