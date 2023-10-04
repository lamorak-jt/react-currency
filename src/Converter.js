import React from 'react';
import { json, checkStatus } from './utils';
import Dropdown from 'react-dropdown';
import List from './List';
import 'react-dropdown/style.css';

class Converter extends React.Component {  
  constructor(props) {
    super(props);
    this.state = {
      baseCurrency: 'USD',
      targetCurrency: 'EUR',
      rate: '',
      baseAmount: 1,
      targetAmount: '',
      dropdownOptions: [],
      error: '',
    }
    this.onSelectBase = this.onSelectBase.bind(this);
    this.onSelectTarget = this.onSelectTarget.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.onChangeBaseAmount = this.onChangeBaseAmount.bind(this);
    this.onChangeTargetAmount = this.onChangeTargetAmount.bind(this);   
  }

  fetchData(baseCurrency, targetCurrency, element) {
    console.log(baseCurrency, targetCurrency, element);
    fetch(`https://api.frankfurter.app/latest?from=${baseCurrency}&to=${targetCurrency}`)
        .then(checkStatus)
        .then(json)
        .then((data) => {
          let rates = data.rates;
          console.log(rates);
          let thisRate = rates[targetCurrency];
          console.log(thisRate);          
          if (element == 'base') {
            this.setState({ rate: thisRate, targetAmount: (this.state.baseAmount * thisRate).toFixed(2), baseCurrency: baseCurrency});
          } else if (element == 'target') {
              this.setState({ rate: thisRate, baseAmount: (this.state.targetAmount * thisRate).toFixed(2), targetCurrency: targetCurrency});
            }
          })        
        .catch((error) => {
          console.log(error);
          this.setState({ error: error.message });          
        })
        console.log(this.state);  
  }

  onSelectBase(event) {    
    console.log('found onSelectBase');
    console.log(event.value);
    let baseCurrency = event.value;
    let targetCurrency = this.state.targetCurrency;
    this.fetchData(baseCurrency, targetCurrency, 'base');    
  }

  onSelectTarget(event) {    
    console.log('found onSelectTarget');
    console.log(event.value);
    let baseCurrency = this.state.baseCurrency;
    let targetCurrency = event.value;
    this.fetchData(baseCurrency, targetCurrency, 'target');    
  }

  onChangeBaseAmount(event) {   
    console.log('found onChangeBaseAmount');
    console.log(event.target.value);
    let targetAmount = (event.target.value * this.state.rate);
    this.setState({ targetAmount: targetAmount.toFixed(2), baseAmount: event.target.value })
  }

  onChangeTargetAmount(event) {   
    console.log('found onChangeTargetAmount');
    console.log(event.target.value);      
    let baseAmount = (event.target.value / this.state.rate);
    this.setState({ baseAmount: baseAmount.toFixed(2), targetAmount: event.target.value })
  }

  componentDidMount () {
    console.log(this.state); 
    fetch(`https://api.frankfurter.app/latest?from=USD`)
        .then(checkStatus)
        .then(json)
        .then((data) => {
          // console.log(data.rates); 
          let dropdownOptions = Object.keys(data.rates);
          console.log(dropdownOptions);
          dropdownOptions = ['USD', ...dropdownOptions].sort();        
          this.setState({ dropdownOptions: dropdownOptions, rate: data.rates[this.state.targetCurrency], targetAmount: data.rates[this.state.targetCurrency].toFixed(2) });          
          // console.log(this.state.rates);
        })
        .catch((error) => {
          console.log(error);
          this.setState({ error: error.message });          
        }) 
    console.log(this.state);
    this.fetchData(this.state.baseCurrency, this.state.targetCurrency);
    
  }

  render() {
    console.log('rendering');
    console.log(this.state);
    let { baseCurrency, targetCurrency, rate, baseAmount, targetAmount, dropdownOptions } = this.state;
    
    return (      
    <div>
      <input name='base-amount' type='number' value={baseAmount} onChange={this.onChangeBaseAmount} />
      <div type='dropdown' name='base-currency'>
        <Dropdown options={dropdownOptions} onChange={this.onSelectBase} value={baseCurrency} />
      </div>
      <input name='target-amount' type='number' value={targetAmount} onChange={this.onChangeTargetAmount} />
      <div type='dropdown' name='target-currency'>
        <Dropdown options={dropdownOptions} onChange={this.onSelectTarget} value={targetCurrency} />
      </div>
    </div>
    )
  }
}

export default Converter;