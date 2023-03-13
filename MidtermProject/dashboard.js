/* globals Chart:false, feather:false */
fetch('./data.json')
  .then((response) => response.json())
  .then((json) => {
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


(() => {
  'use strict'

  feather.replace({ 'aria-hidden': 'true' })

  // Graphs
  const ctx = document.getElementById('myChart')
  // eslint-disable-next-line no-unused-vars
  const myChart = new Chart(ctx, {
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
          15339,
          21345,
          18483,
          24003,
          23489,
          24092,
          12034
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
