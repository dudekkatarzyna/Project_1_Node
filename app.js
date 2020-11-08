// app.js
const express = require('express')

// Create Express app
const app = express()

let mysql = require('mysql');
let connection = mysql.createConnection({
    host: 'shopping-ceneter-1.cpyweoetxkin.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'j5FWjmnKfGDzKHd',
    database: 'shopping_center'
});

function connect() {
    connection.connect(function (err) {
        if (err) {
            return console.error('error: ' + err.message);
        }

        console.log('Connected to the MySQL server.');
    });

}

function destroyConnection() {
    connection.end(function (err) {
        if (err) {
            return console.log('error:' + err.message);
        }
        console.log('Close the database connection.');
    });
}

// A sample route
app.get('/', (req, res) => res.send('Hello World!'))
app.get('/getAll', (req, res) => {
    connect()
    connection.query('SELECT * FROM SensorData ORDER BY id DESC LIMIT 30', function (err, rows) {
        if (err) {
        } else
            res.send(rows)
    })

    destroyConnection()
})
app.get('/getShops', (req, res) => {
    connect()
    connection.query('SELECT * FROM Shop', function (err, rows) {
        if (err) {
        } else
            res.send(rows)
    })

    destroyConnection()})

// Start the Express server
app.listen(8080, () => console.log('Server running on port 8080!'))