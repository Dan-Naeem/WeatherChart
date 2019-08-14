import React, { Component } from 'react';
import './App.css';
import '../node_modules/react-vis/dist/style.css';
import {
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  LineMarkSeries,
  FlexibleWidthXYPlot, 
} from 'react-vis';

class Graph extends Component {
  render() {
    let temp = [];
    for( let i = 0; i < this.props.temp.length; i++) {
      temp.push({
        x: i, y: ( (parseFloat(this.props.temp[i])-273.15)*(9/5)+32 ) 
      });
    }
    console.log('i am the graphjs file');
    for( let i = 0; i < temp.length; i++) {
      console.log(temp[i]);
    }
    return (
      <div className="App">
        <FlexibleWidthXYPlot height={400}>
          <XAxis />
          <YAxis />
          <VerticalGridLines />
          <HorizontalGridLines />
          <LineMarkSeries 
            data={temp}
          />
        </FlexibleWidthXYPlot>
      </div>
    );
  }
}

export default Graph;