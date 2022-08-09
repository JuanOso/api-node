const express = require('express');
const routerApi = require('./routes');
const cors = require('cors');
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require('./middlewares/error.handler');
const app = express();
const port = process.env.PORT || 3000;

//este middwealere se usa cuando queremos recibir informacion en json
app.use(express.json());

//con cors soluciono que se puedan hacer peticiones desde diferentes origenes,
//app.use(cors()) le da acceso a todos, o de la mane escrita abajo, a origenes seleccionados
const whiteList = ['http://localhost:5500', 'http://127.0.0.1:5500'];
const options = {
  origin: (origin, callback) => {
    //!origin, para que reciba del mismo origne también
    if (whiteList.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  },
};
app.use(cors(options));

app.get('/', (req, res) => {
  res.send('mi server en express');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('esta es la nueva ruta');
});

routerApi(app);

//los middlewares se ejecutan como se llaman, si el primero que llamamos no tiene un next, ata el proceso de los middlewares
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Mi port es' + port);
});
