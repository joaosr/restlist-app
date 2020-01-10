import React from 'react';

export default class Detail extends React.Component {
  render() {
    return (
      <div>
            <h3>{this.props.restaurant.name}</h3>
            <div>{this.props.restaurant.description}</div>
            <div>{this.props.restaurant.category}</div>
            <div>{this.props.restaurant.address}</div>
            <div>{this.props.restaurant.phone}</div>
            <div>{this.props.restaurant.website}</div>
            <button onClick={this.props.back}>back</button>
      </div>
    );
  }
}
