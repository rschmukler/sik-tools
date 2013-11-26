module.exports = function({capitalizedModelName}) {
  {capitalizedModelName}.prototype.present = function() {
    return new Presenter(this);
  };
};

function Presenter(instance) {
  this.instance = instance;
}
