var api = require('./src/api.js').app;
const fs = require('fs');
const toysFilepath = './src/jucarii.json';

api.get('/', function (request, response) {
  response.json('NodeJS REST API');
});

api.get('/toys', function (request, response) {
  response.json(getToys());
});

api.get('/toys/:id', function (request, response) {
  let toy = getToyById(request.params.id);
  if (toy)
    response.json(toy);

  response.json('not found');
});

api.put('/toys', function (request, response) {
  saveToy(request.body);

  response.json('Toy was saved succesfully');
});

api.post('/toys', function (request, response) {
  // in request o sa-mi vina un obiect de tip car care o sa aiba un anumit id
  // console.log(request.body);  //un obiect de tipul car actualizat pe client
  // citim toys din fisier pe baza id-ului primit de la client
  let toy = request.body;
  let toys = getToys();// citire json din fisier
  // cautam daca exista id de pe request.body
  // daca exista actualizam parametrii acestui produs/item
  for(let i=0; i < toys.length; i++) {
    if (toys[i].id === toy.id) {
      toys[i] = toy;
    }
  }
  // salvam in fisier produsele actualizate
  try {
    fs.writeFileSync(toysFilepath, JSON.stringify(toys));// salvare json array in fisier
  } catch (err) {
    console.error(err)
  }

  response.json('Toy was updated succesfully');
});

api.delete('/toys/:index', function (request, response) {
  // delete din fisier pe baza unui id
  // cars.splice(request.params.index, 1);
    let toys = getToys();

    toys.splice(findIdInArray(request.params.index),1);

    try {
            fs.writeFileSync(toysFilepath, JSON.stringify(toys));// salvare json array in fisier
        } catch (err) {
            console.error(err)
        }

    response.json('Toy with index ' + request.params.index + ' was deleted');
});

api.listen(3000, function () {
  console.log('Server running @ localhost:3000');
});

function getToys() {
  let toys = [];
  try {
    toys = JSON.parse(fs.readFileSync(toysFilepath, 'utf8'));
  } catch (err) {
    console.error(err);
    return false;
  }
  return toys;
}

function saveToy(toy) {
  let toys = getToys();// citire json din fisier
  let maxId = getMaxId(toys);  // get maximum id form cars array
  console.log(toy);
  toy.id = maxId+1;// generare id unic
  toys.push(toy);// adaugare toy nou in array
  try {
    fs.writeFileSync(toysFilepath, JSON.stringify(toys));// salvare json array in fisier
  } catch (err) {
    console.error(err)
  }
}

function getMaxId(toys) {
  let max = 0;
  for (var i=0; i<toys.length;i++) {
    if(max < toys[i].id) {
      max = toys[i].id;
    }
  }
  return max;
}

function getToyById(id){
  let toys = getToys();// citire json din fisier
  let selectedToy = null;
  for(var i=0; i<toys.length; i++) {
    if(id == toys[i].id)
        selectedToy = toys[i];
  }
      return selectedToy;
}

function findIdInArray(id){
    let toys = getToys();
    for(var i=0; i<toys.length; i++) {
        if(id == toys[i].id)
            return i;
      }
    return -1;
}