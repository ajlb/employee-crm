const inquirer = require("inquirer");
const mysql = require('mysql');
const cTable = require('console.table');
const app = require("express");
var table;

const programTitle = `
███████ ███    ███ ██████  ██       ██████  ██    ██ ███████ ███████ 
██      ████  ████ ██   ██ ██      ██    ██  ██  ██  ██      ██      
█████   ██ ████ ██ ██████  ██      ██    ██   ████   █████   █████   
██      ██  ██  ██ ██      ██      ██    ██    ██    ██      ██      
███████ ██      ██ ██      ███████  ██████     ██    ███████ ███████ 
                                                                     
                                                                     
                     ██████ ███    ███ ███████                       
                    ██      ████  ████ ██                            
                    ██      ██ ████ ██ ███████                       
                    ██      ██  ██  ██      ██                       
                     ██████ ██      ██ ███████                       
                                                                                              
`;

console.log(programTitle);

const connectionConfig = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "employeeCRM_DB"
};

var connection = mysql.createConnection(connectionConfig);
const allDataQuery = "SELECT employee.first_name, employee.last_name, role.name, department.name";

connection.connect(function (err) {
    if (err) {
        console.error(`error connecting: ${err.stack}`);
        return;
    }
    console.log(`connected as id  ${connection.threadId}`);
    afterConnection();
});

function afterConnection() {
    connection.query("SELECT * FROM employee", function (err, res) {
        if(err) throw err;
        table = cTable.getTable(res);
        console.log(table);
        connection.end();
    })
}
