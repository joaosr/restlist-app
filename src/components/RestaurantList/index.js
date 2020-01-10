import React from 'react';
import Detail from '../Detail'
import Edit from '../Edit'

export default class RestaurantList extends React.Component {
  state = {
    mode: 'list',
    restaurant: null,
  }

  render() {
    const back = e => {
      this.setState({
        mode: 'list',
        restaurant: null
      });
    }

    return (
      <div>
        {this.state.mode === 'list' && this.props.restaurants.map(restaurant => (
          <div key={`restaurant_${restaurant.id}`}>
            <h3>{restaurant.name}</h3>
            <div>{restaurant.description}</div>
            <div>{restaurant.address}</div>
            <div>
              <span>
                <button
                  onClick={e => {
                    this.setState({
                      mode: 'detail',
                      restaurant: restaurant
                    });
                  }
                }>detail</button>
              </span>&nbsp;&nbsp;
              {this.props.loggedin && <span>
                <button
                  onClick={e => {
                    this.setState({
                      mode: 'edit',
                      restaurant: restaurant
                    });
                  }
                }>edit</button>
              </span>}
            </div>
          </div>
        ))}
        {this.state.mode === 'detail' && <Detail
          restaurant={this.state.restaurant}
          back={back}
        />}
        {this.state.mode === 'edit' && <Edit
          restaurant={this.state.restaurant}
          back={back}
          onChange={r => {this.props.restaurantUpdate(r)}}
        />}
      </div>
    );
  }
}
