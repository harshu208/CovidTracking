import React from 'react';
import { Cards, CountryPicker,Chart } from './components';
import styles from './App.module.css';
import {fetchData} from './api';
class App extends React.Component{
   state={
     data:{},
     country: 'Total',
   }
  async componentDidMount(){
    const fetchedData = await fetchData('');
    this.setState({data:fetchedData})
  
  }

  handleCountryChange = async (country) => {   
    console.log("country selected...",country);
    const data = await fetchData(country);   
    this.setState({ data, country: country });
  }

  render(){
    const { data,country } = this.state;
    console.log("data",data);
    console.log("country",country);
    return(
      <div className={styles.container}>

        <Cards data={data}/>
        <div />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        
        <Chart data={data} country={country} /> 

     

        
      </div>
    );
  }
}
export default App;
