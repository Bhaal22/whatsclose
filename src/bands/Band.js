function Band() {
  this.url = '';
  this.datesPath = '';
  this.pattern = '';
  this.name = '';
}

Band.prototype.toString = function () {
  console.log(this.url + this.datesPath);
}
