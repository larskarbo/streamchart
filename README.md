# StreamChart.js

Simple javascript library that plots realtime streamable data

## install:

```
yarn add streamchart
```

## usage:

```
import StreamChart from 'streamchart'

const chart = new StreamChart(document.getElementByID("#div"))

setInterval(() => {
  chart.addValue(Math.random())
}, 100)
```

![](src/gif.gif "")