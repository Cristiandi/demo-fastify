const isEmptyObject = (obj) => {
  return !Object.keys(obj).length;
};

function Class (options) {
  this.options = options;
}

function createFactoryBuilder (options) {
  // modify the options here if you want
  return new Class(options);
}

module.exports = {
  isEmptyObject,
  createFactoryBuilder
};
