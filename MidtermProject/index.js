fetch('./data.json')
  .then((response) => response.json())
  .then((json) => {
    assignFavoriteStocks(json);
  })
  .catch(function (err) {
    console.log('error:' + err);
  })

  function assignFavoriteStocks(json){
    console.log(json);
    let favCounter = 1;
    for(let i = 0; i < 9; i++){
      
      if (json.stocks[i].favorite == true && favCounter <= 4){
        const element = document.getElementById(favCounter.toString());
        console.log(element);
        let children = element.children;
        children[0].innerText = json.stocks[i].name;
        var img = document.createElement('img');
        img.src = json.stocks[i].image;
        children[1].appendChild(img);
        children[2].innerText = "Current value: " + json.stocks[i].data[6] + "$";
        favCounter++;
      }
    }
    
  }

  