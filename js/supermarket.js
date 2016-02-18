/* Supermarket Checkout JS */

/* DOM Vars */
var numberItems = document.getElementById('number-items');
var price = document.getElementById('price');
var saved = document.getElementById('saved');
var items = document.getElementById('items');

var basket = new Basket(); //Basket

/* Checkout of product */
function scan(code) {
  var key = findInBasketByCode(code); //position if the item in the basket, that means the item exist
  var product;

  if(key) {
    //We increment the quantity if already exist
    product = basket.scannedItems[key];
    product.scanOffer();
  }else{
    //If not exist in the basket we create a new one
    product = findInDB(code);
    product.scanOffer();
    basket.scannedItems.push(product);
  }

  basket.updateBasket();
  updateView(); //Updating the view
}

/* Search item in the basket by code */
function findInBasketByCode(code) {
  for (var key in basket.scannedItems) {
    var item = basket.scannedItems[key];
    if(item.code == code) {
      return key;
    }
  }

  return false;
}

/* Switch items, in normal app would be a findByCode in DB */
function findInDB(code) {
  if(code == 'AD45') {
     return new Product('AD45','biscuits', 1.29, false, 1.29, 1);
  }else if(code == 'E12R') {
    return new Product('E12R','juice', 0.53, true, 0.53, 3, 'nfree');
  }else if(code == 'PP45') {
    return new Product('PP45','popcorn', 1.50, true, 1, 2, 'discount');
  }
}

/* Refresh the view with all the information */
function updateView() {
  var item, itemQuantity;
  var quantity = 0;
  price.innerHTML = parseFloat(basket.offerPrice).toFixed(2);
  items.innerHTML = '';
  for(var i in basket.scannedItems) {
    var item = basket.scannedItems[i];
    items.innerHTML += "<li>Quantity: "+item.quantity+"<img width='80' height='80' src='images/"+item.name+".jpg'/>"+
    parseFloat(item.total).toFixed(2)+"</li>";
    quantity = quantity + item.quantity;
  }
  numberItems.innerHTML = quantity;
  saved.innerHTML = parseFloat(basket.saved).toFixed(2);
}
