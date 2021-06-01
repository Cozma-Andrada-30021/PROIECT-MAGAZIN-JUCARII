function run() {
  let indexComponent = new Vue({
    el: '#app',
    data: {
      toys: [],
      toysService: null,
      message: ''
    },
    created: function () {
      this.toysService = toys();
      console.log(toys());
      this.toysService.get().then(response => (this.toys = response.data));
      console.log( this.toys );
    },
    methods: {
      deleteToy: function(id) {
        console.log('HTTP DELETE spre backend, toy: '+id);
        this.toysService.remove(id).then(response => {
          this.toysService.get().then(response => (this.toys = response.data));
        });
      },
    }
  });

//  indexComponent.use(VueMaterial);

}

document.addEventListener('DOMContentLoaded', () => {
  run();
});
