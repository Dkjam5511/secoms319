/* globals Chart:false, feather:false */
let stocks;

fetch('./data.json')
  .then((response) => response.json())
  .then((json) => {
    stocks = json;
    assignStocks(json);
  })
  .catch(function (err) {
    console.log('error:' + err);
  })


function assignStocks(json){
  console.log(json);
  

  for(let i = 1; i < 10; i++){
    const element = document.getElementById(i.toString());
    let children = element.children;
    console.log(children);
    children[0].innerText = json.stocks[i-1].num;
    children[1].innerText = json.stocks[i-1].name;
    var img = document.createElement('img');
    img.src = json.stocks[i-1].image;
    children[2].appendChild(img);
    children[3].innerText = "$" + json.stocks[i-1].data[6];
  }
}
let myChart;
function changeChart(index){
  for(let i = 0; i < 7; i++){
    myChart.data.datasets[0].data[i] = stocks.stocks[index].data[i];
  }
  myChart.update();
}

(() => {
  'use strict'

  feather.replace({ 'aria-hidden': 'true' })

  // Graphs
  const ctx = document.getElementById('myChart')
  // eslint-disable-next-line no-unused-vars
  myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ],
      datasets: [{
        data: [
          331,
          424,
          326,
          440,
          380,
          400,
          468
        ],
        lineTension: 0,
        backgroundColor: 'transparent',
        borderColor: '#007bff',
        borderWidth: 4,
        pointBackgroundColor: '#007bff'
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: false
          }
        }]
      },
      legend: {
        display: false
      }
    }
  })
})()
