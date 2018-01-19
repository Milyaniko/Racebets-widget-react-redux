import React from 'react';

export default class Filter extends React.Component {
  render() {

    return (
      <div className="filter-container">
        <ul className="filter-bar">
          {this.props.renderButtons()}
          <li><button className="btn-disabled" disabled="true" ><span className="dog-point point"></span><img src='http://localhost:3000/race-types/race-type-D.svg' alt=""/></button></li> 
        </ul>
      </div>
    )
  }
}
