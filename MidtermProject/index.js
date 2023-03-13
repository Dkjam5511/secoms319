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
    
  }