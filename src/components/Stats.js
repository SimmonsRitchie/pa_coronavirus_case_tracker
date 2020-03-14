import React from 'react';

const Stats = ({cases, deaths}) => {
  return ( 
    <div>
    <div>Cases</div>
    <div>{cases ? cases : "..."}</div>
    <div>Deaths</div>
    <div>{deaths ? deaths : "..."}</div>
    </div> );
}
 
export default Stats;