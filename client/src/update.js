function run() {
    new Vue({
      el: '#update',
      data: {
        id: '',
        message: '',
        toy: {}
      },
      created: function () {

        let uri = window.location.search.substring(1);
        let params = new URLSearchParams(uri);
        this.id = params.get("id");

        axios.get('http://localhost:3000/toys/'+this.id).then(
            (response) => {
                this.toy = response.data;
            }
        );
      },
      methods: {
        update: function(){
            console.dir(this.toy);

            return axios.post('http://localhost:3000/toys', this.toy).then(
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
  