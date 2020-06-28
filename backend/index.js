//express: framework de node express para crear el servidor
//mongose: para conectar a una base de datos mongodb
//morgan: permite ver por consola las peticiones que llegan al servidor
//multer: para subir imagenes al servidor
//dotenv: permite trabajar con variables de entorno
//cross-env: permite definir en qué entorno de produccion estamos
//cors: permite enviar y recivir datos entre dos servidores

//para ejecutar script indicados en package.json: npm run dev
//para ejecutar script indicados en package.json: npm run serverdev

require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const port = process.env.PORT || 3000;
const cors = require('cors');
//init
const app = express();
require('./database');
 
//Settings
app.set('port', port);

//midelware
app.use(morgan('dev'));

const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'), 
        filename(req,file,cb) {
            cb(null, new Date().getTime().toString().concat(path.extname(file.originalname)));
        }
})

app.use(multer({storage}).single('image'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

//definicion del enrutador
app.use('/api/books',require('./routes/books'));

//ficheros estaticos 
app.use(express.static(path.join(__dirname, 'public')));

//Start Server 
app.listen(app.get('port') ,() => {
    console.log('Server port', app.get('port'));
});