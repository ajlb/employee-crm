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

const allDataQuery = `
SELECT employee.id AS id, employee.first_name AS first_name, employee.last_name AS last_name, role.title AS title, department.name AS department, role.salary AS salary, CONCAT (manager.first_name, ' ', manager.last_name) AS manager
FROM employee
LEFT JOIN employee manager ON (manager.id = employee.manager_id)
JOIN role ON (employee.role_id = role.id)
JOIN department ON (role.department_id = department.id)
ORDER BY employee.id
`;

function allData() {
    connection.query(allDataQuery, function (err, res) {
        if(err) throw err;
        table = cTable.getTable(res);
        console.log(table);
        connection.end();
    })
}

allData();
