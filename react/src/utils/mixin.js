export default methods => {
  return target => {
    Object.assign(target.prototype, methods);
  }
}


