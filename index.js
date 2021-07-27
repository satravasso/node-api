const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let usuarios = Array({ "login": "Ana", "senha": "senha12", id: 1 }, { "login": "Antonio", "senha": "senha15", id: 2 });
let servicos = Array({ "nome": "Ana Clara", "funcao": "Analista", "horasTrabalhadas": 12 }, { "nome": "Antonio José", "funcao": "DBA", "horasTrabalhadas": 1 });
let pizzas = Array({ "sabor": "Calabresa", "tamanho": "Grande", "preco": 50, "id": 1 }, { "sabor": "4 Queijos", "tamanho": "Pequena", "preco": 40, "id": 2 });



app.get('/usuario', function (req, res) {
  const filterLogin = req.query.filterLogin;

  const filteredUser = usuarios.filter((user) => {
    return user.login.toUpperCase() === filterLogin?.toUpperCase();
  })

  if (req.query.filterLogin !== undefined && req.query.filterLogin.length > 0) {
    res.status(200).json(filteredUser)
  } else {
    res.status(200).json(usuarios)
  }

});

app.post('/usuario', function (req, res) {
  const user = req.body;

  usuarios.push(user)

  res.send('Usuário cadastrado com sucesso');
});

app.put('/usuario', function (req, res) {

  const user = req.body;

  usuarios = usuarios.map((item) => {
    if (item.id === user.id) {
      item = user;
    }

    return item;
  })

  res.status(200).json("Usuário alterado com sucesso")

});

//Serviços

app.get('/servico/horasTrabalhadas', function (res) {

  const horasTotal = servicos.reduce((index, servico) => {
    return index + servico.horasTrabalhadas
  }, 0)

  res.status(200).json(horasTotal)

});

// Pizzas 

app.get('/pizza', function (req, res) {
  const flavorFilter = req.query.flavor;


  const filteredPizza = pizzas.filter((flavor) => {
    return flavor.sabor.toUpperCase() === flavorFilter?.toUpperCase();
  })


  if (req.query.flavor !== undefined && req.query.flavor.length > 0) {
    res.status(200).json(filteredPizza)
  } else {
    res.status(200).json(pizzas)
  }

});

app.post('/pizza', function (req, res) {
  const flavor = req.body;

  pizzas.push(flavor)

  res.send('Pizza cadastrada com sucesso');
});

app.put('/pizza', function (req, res) {

  const flavor = req.body;

  pizzas = pizzas.map((item) => {
    if (item.id === flavor.id) {
      item = flavor;

    }

    return item;
  })

  res.status(200).json("Pizza alterada com sucesso")

});

app.delete('/pizza/:id', function (req, res) {
  const id = req.params.id;

  pizzas.map((item, index) => {
    if (item.id == id) {
      console.log(item.id == id)
      return pizzas.splice(index, 1);

    }
    return item;
  })

  console.log(pizzas)
  res.send('Pizza Deletado com sucesso');
});

app.get('/totalPizza', function (req, res) {
  const valorTotal = pizzas.reduce((index, pizza) => {
    return index + pizza.preco
  }, 0)

  res.status(200).json(valorTotal)
});


app.listen(port, () => {
  console.log('Aplicação On!')
})