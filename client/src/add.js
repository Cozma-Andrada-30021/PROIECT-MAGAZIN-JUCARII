function run() {
    new Vue({
      el: '#add',
      data: {
        id: '',
        message: '',
        toy: {}
      },
      created: function () {
      },
      methods: {
       add: function(){
            console.dir(this.toy);
            return axios.put('http://localhost:3000/toys', this.toy).then(
                (response) => {
                    this.message = response.data; // saved
                }
            );

        }
      }
    });
  }
  document.addEventListener('DOMContentLoaded', () => {
    run();
  });