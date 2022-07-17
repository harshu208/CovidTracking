import axios from 'axios';

let url = 'https://covid19.mathdro.id/api';

export const fetchData=async (country)=>{
  try{
    // old***
    // const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(url);
    // console.log("data");
    // console.log(confirmed, recovered, deaths, lastUpdate);

    // return { confirmed, recovered, deaths, lastUpdate };
   
    // new **
    let url = 'https://data.covid19india.org/data.json'
    let data = await axios.get(url);
    if(country == ''){
    
      console.log("country..",country);
      let confirmed = {};
      let recovered = {};
      let deaths = {};
      confirmed.value = data.data.statewise[0].confirmed;
      recovered.value = data.data.statewise[0].recovered;
      deaths.value = data.data.statewise[0].deaths;
      let lastUpdate = data.data.statewise[0].lastupdatedtime;
      // console.log("data..",data);
      // console.log("lastUpdate...",lastUpdate);
      return { confirmed, recovered, deaths, lastUpdate };
    }
    
    let confirmed = {};
    let recovered = {};
    let deaths = {};
    let arr = data.data.statewise;
    let lastUpdate;
    for(var i=0;i<arr.length;i++)
    {
      if(arr[i].state == country)
      {
        confirmed.value = data.data.statewise[i].confirmed;
        recovered.value = data.data.statewise[i].recovered;
        deaths.value = data.data.statewise[i].deaths;
        lastUpdate = data.data.statewise[i].lastupdatedtime;
        break;
      }
    }
    return { confirmed, recovered, deaths, lastUpdate };

  }
   

  catch(error){
    return error;
  }
}

export const fetchDailyData = async () => {
  try {
    // old **;
    // let url = 'https://covid19.mathdro.id/api';
    // const { data } = await axios.get(`${url}/daily`);
    // console.log("daily data ...",data);
    // let res = data.map(({ confirmed, deaths, reportDate: date }) => ({ confirmed: confirmed.total, deaths: deaths.total, date }));
    // console.log("result daily data...",res);
    // return res;
    // new **
    let url = 'https://data.covid19india.org/data.json';
     let data = await axios.get(url);
    // console.log("daily data",data.data.cases_time_series);
    let arr = data.data.cases_time_series;
    //let res = arr.map(({confirmed,deaths,reportDate:dateymd})=>({confirmed:totalconfirmed,deaths:totaldeceased,date}));
    let res = [];
    for(var i=0;i<arr.length;i++)
    {
        let obj = {};
        obj.confirmed = arr[i].totalconfirmed;
        obj.deaths = arr[i].totaldeceased;
        obj.date = arr[i].dateymd;
        res.push(obj);
        
    }
    //console.log("daily data new method..",res);
     return res;
  } catch (error) {
    return error;
  }
    };

    export const fetchCountries = async () => {
        try { 
          //old **
          // let url = 'https://covid19.mathdro.id/api';
          // const { data: { countries } } = await axios.get(`${url}/countries`);
          // let res = countries.map((country) => country.name);
          // console.log(res);
          // return res;
          // new**
          let url = 'https://data.covid19india.org/data.json';
          let data = await axios.get(url);
          let arr = data.data.statewise;
          let res =[];
          for(var i=0;i<arr.length;i++)
          {
               let state = arr[i].state;
               res.push(state);
          }
         // console.log("fetch countreis...",res);
           return res;
        }
         catch (error) {
          return error;
        }
      };