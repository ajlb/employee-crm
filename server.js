const inquirer = require("inquirer");
const mysql = require('mysql');
const cTable = require('console.table');
const app = require("express");
const connection = require("./config/connection.js");
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

const allDataQuery = "SELECT employee.first_name, employee.last_name, role.name, department.name";


function afterConnection() {
    connection.query("SELECT * FROM employee", function (err, res) {
        if(err) throw err;
        table = cTable.getTable(res);
        console.log(table);
        connection.end();
    })
}

afterConnection();
