//entities.js
function Product(code, name, unitPrice, hasOffer, offerPrice, quantityCondition, nFree, type) {
  this.code = code;
  this.name = name;
  this.unitPrice = unitPrice;
  this.quantity = 0;
  this.hasOffer = hasOffer;
  this.offerPrice = offerPrice;
  this.offerQuantityCondition = quantityCondition;
  this.nFree = nFree;
  this.type = type;
  this.total = 0.0;
}

Product.prototype.scanOffer = function() {
  this.quantity++;
  //If has an offer and the quantity is correct then the offer is applied
  if(this.hasOffer && this.quantity % this.offerQuantityCondition == 0) {
    switch (this.type) {
      case 'discount':
        this.total = this.total + this.offerPrice;
        break;
      case 'nfree':
        //Simply nothing happens
        break;
      default:
        this.total = this.total + this.unitPrice;
    }
  }else{
    this.total = this.total + this.unitPrice;
  }
}

function Basket() {
  this.scannedItems = [];
  this.saved = 0.0;
  this.realPrice = 0.0;
  this.offerPrice = 0.0;
}

//Updates the basket
Basket.prototype.updateBasket = function() {
  basket.realPrice = 0.0;
  basket.offerPrice = 0.0;
  for(var i in this.scannedItems) {
    var item = this.scannedItems[i];
    basket.realPrice = basket.realPrice + item.unitPrice * item.quantity;
    basket.offerPrice = basket.offerPrice + item.total;
  }

  basket.saved = basket.realPrice - basket.offerPrice;
}
