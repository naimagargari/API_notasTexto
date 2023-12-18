const mysql = require('mysql2');

// Configuración de la conexión a MySQL
const connection = mysql.createConnection({
  host: 'localhost', 
  user: 'root',
  password: '22032001',
  database: 'notas_app'
});

connection.connect((err) => {
  if (err) {
    console.error('Error de conexión', err);
    return;
  }
  console.log('Conexión establecida correctamente!');
});

module.exports = connection;