function toys() {
  get = function () {
    return axios.get('http://localhost:3000/toys');
  };

  remove = function (index) {
    return axios.delete('http://localhost:3000/toys/'+index);
  };

  return {
    get: get,
    remove: remove
  };
}
