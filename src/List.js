import React from 'react';
import { json, checkStatus } from './utils';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const dropdownDefault = 'USD';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      baseCurrency: 'USD',
      rates: [],
      dropdownOptions: [],
      error: '',
    }
  
  this.onSelect = this.onSelect.bind(this);
  this.fetchData = this.fetchData.bind(this);
  }
  
  fetchData(baseCurrency) {
    console.log(baseCurrency);
    fetch(`https://api.frankfurter.app/latest?from=${baseCurrency}`)
        .then(checkStatus)
        .then(json)
        .then((data) => {
          // console.log(data.rates);  
          this.setState({ dropdownOptions: Object.keys(data.rates), rates: data.rates, error: '' });          
          // console.log(this.state.rates);
        })
        .catch((error) => {
          console.log(error);
          this.setState({ error: error.message });          
        })    
  }

  onSelect(event) {
    // console.log(event);    
    this.fetchData(event.value);
    this.setState({ baseCurrency: event.value});    
  }
  
  componentDidMount () {
    console.log(this.state.baseCurrency);
    this.fetchData(this.state.baseCurrency);   
    // console.log(this.state);
  }

  render() {
    let { baseCurrency, rates, dropdownOptions } = this.state;

    return (
      <div>
        <div type='dropdown'>
          <Dropdown options={dropdownOptions} onChange={this.onSelect} value={baseCurrency} />
        </div>

        <div>{ Object.keys(rates).map(key => (
                <div key={key}> {key} { rates[key]} </div>))}            
        </div>
      </div>
      )
  }
}

export default List;