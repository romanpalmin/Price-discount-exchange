/*global _, $, underscore*/
define([], function () {
    return function (options) {
        this.id = options.Id ? options.Id : (options.id ? options.id : '');
        this.isLeader = options.isLeader ? options.isLeader : false;
        this.name = options.Name ? options.Name : '';
        this.description = options.Description ? options.Description : '';
        this.imageUrl = options.ImageUrl ? options.ImageUrl : '';
        this.currentDiscount = (options.CurrentDiscount ? options.CurrentDiscount.toFixed(0) : 0);// + '%';
        //this.currentCoin = options.TotalItemsSold ? options.TotalItemsSold : 0;
        //this.currentCoin = options.TotalItemsSold > 20 ? 20 : options.TotalItemsSold ? options.TotalItemsSold : 0;
        this.currentCoin = options.DisplayCoinsNow;
        this.remainToDiscount = (options.RemainToDiscount ? options.RemainToDiscount : 0)/* + ' ед.'*/;
        this.currentDiscountSuperAction = (options.CurrentDiscount ? options.CurrentDiscount.toFixed(0) : 0) + '%';
        this.isExplosive = options.DisplayBadaBoom;
    };
});