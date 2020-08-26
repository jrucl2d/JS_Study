Function.prototype.curry = function (one) {
  const target = this.length;
  let args = [];
  const nextFunc = (next) => {
    args = args.concat(next);
    if (args.length === target) {
      return this.apply(null, args);
    } else {
      return (next) => nextFunc(next);
    }
  };
  return nextFunc(one);
};

function mult(w, x, y, z) {
  return w * x * y * z;
}
console.log(mult.curry(1)(5)(3)(4));
