import React from 'react';
import Filter from './Filter';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import fetchData from '../actions/FetchData';
import fetchCurrency from '../actions/FetchCurrency';
import selectRace from '../actions/SelectRace';

class Sidebar extends React.Component {

  componentDidMount() {
    this.props.fetchData();
    this.props.fetchCurrency();
  }

  // unique items are used to compare and display the races by it's category -  J, T, G, G => J, T, G
  uniqueItems = (x, i, a) => a.indexOf(x) === i;

  // render fitler's buttons
  renderButtons = () => {
    const filterTypes = this.props.race.data.map((race) => race.race_type).filter(
      this.uniqueItems
    );
    return filterTypes.map((type) =>
      <li key={type} ><button onClick={() => this.props.selectRace(type)} className={`btn btn-${type}`} ><span className={`category-${type} point`}></span><img src={`http://localhost:3000/race-types/race-type-${type}.svg`} alt={type} /></button></li>
    );
  }

  currencyCheck = (aValue, bValue, aCurrency, bCurrency) => {
    if (aCurrency === bCurrency) {
      return aValue > bValue ? -1 : bValue > aValue ? 1 : 0;
    }
    else if (aCurrency === "EUR" || bCurrency !== "EUR") {
      return (aValue * this.props.currency.data) > bValue ? -1 : bValue > (aValue * this.props.currency.data) ? 1 : 0;
    }
  }

  // Convert the amount to divide it by thousands with ","
  numberWConverter(number) {
    let parts = number.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }

  // Convert timestamp to millisec and then to the most human readable format.
  time = (value) => {
    let millisec = new Date(value * 1000);
    let seconds = (millisec / 1000).toFixed(1);
    let minutes = (millisec / (1000 * 60)).toFixed(1);
    let hours = (millisec / (1000 * 60 * 60)).toFixed(1);
    let days = (millisec / (1000 * 60 * 60 * 24)).toFixed(1);

    if (seconds < 60) {
      return seconds + " Sec";
    } else if (minutes < 60) {
      return minutes + " Min";
    } else if (hours < 24) {
      return hours + " Hrs";
    } else {
      return days + " Days"
    }
  }

  // Rendering the JSON data
  result = () => {
    return this.props.race.data.filter((race) =>  //sort the results in each category by amount's value
      this.props.activeRace === race.race_type)
      .sort((a, b) => { return this.currencyCheck(a.purse.amount, b.purse.amount, a.purse.currency, b.purse.currency) })
      .map((race, i) =>
        <div className="race-container" key={i}>
          <div className="race-header">
            <div className={`race-country flag flag-${race.event.country.toLowerCase()}`} />
            <div className="race-title">{race.event.title}</div>
            <div className="race-time">{this.time(race.post_time)}</div>
          </div>
          <div className="separator horizontal-separator" />
          <div className="race-upper-row">
            <div className="race-total-runners">{race.num_runners} runners</div>
            <div className="separator separator-1">|</div>
            <div className="race-distance">{race.distance} m</div>
            <div className="separator separator-1">|</div>
            <div className="race-amount">{this.numberWConverter(race.purse.amount)}</div>
            <div className="race-currency">{race.purse.currency}</div>
            <div className="race-icon"><img src={`http://localhost:3000/race-types/race-type-${race.race_type}.svg`} alt="" /></div>
          </div>
          <div className="race-results-container">
            <ul className="race-runners-list">
              {race.runners.sort((a, b) => { return (a.odds > b.odds) ? 1 : ((b.odds > a.odds) ? -1 : 0); })
                .map((runner) => {  // Sort an array of Player's objects to display it my odd's value
                  return <li key={runner.id_runner} className="race-racer"><img src={`http://localhost:3000/silks/${runner.silk}`} alt={runner.silk} taget="blank" /><span className="race-racer-name">{runner.name}</span><a href={` http://www.racebets.com/bet/${runner.id_runner}`} className="race-odds"><span className="race-odd">{runner.odds}</span></a></li>
                })}
            </ul>
          </div>
        </div>
      )
  };

  render() {
    return (
      <aside className="sidebar">
        <Filter
          key={this.props.id_race}
          race={this.props.race}
          activeRace={this.props.activeRace}
          selectRace={this.props.selectRace}
          uniqueItems={this.uniqueItems}
          checking={this.checking}
          iconsRender={this.iconsRender}
          renderButtons={this.renderButtons}
        />
        {this.result()}
      </aside>
    )
  }
}

// Transfer our Redux store's states to React's app props
const mapStateToProps = (state) => {
  return {
    race: state.race, // The general racers' data
    currency: state.currency,  // The actual EUR => GBP rate
    activeRace: state.activeRace.data, // The selected race category

  }
}

/// Transfer our functions/actions from Redux to React's props
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchData: fetchData, // Take racers' data from JSON
    fetchCurrency: fetchCurrency, // Take async actual currency rate by external API
    selectRace: selectRace, // Select the race's category by filter's button click
  }, dispatch)
}

// Bridge between our React app and Redux store
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
