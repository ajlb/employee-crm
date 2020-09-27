function getDepartmentNames() {
    return new Promise(function (resolve, reject) {
        connection.query(
            'SELECT * FROM department',
            [],
            function (error, data) {
                if (error) reject(error);
                resolve(data.map(record => record.name))
            });
    });
}

getDepartmentNames()
    .then(function (departments) {
        return inquirer.prompt([
            {
                name: 'departments',
                message: 'Pick one',
                type: 'list',
                choices: departments
            }
        ]);
    })
    .then(function () {
        return new Promise(function (resolve, reject) {
            connection.query(
                'INSERT INTO department (name) VALUES (?)',
                ['housewares'],
                function (error, data) {
                    if (error) reject(error);
                    resolve()
                });
        })
    })
    .then(function () {
        return getDepartmentNames();
    })
    .then(function (departments) {
        return inquirer.prompt([
            {
                name: 'departments',
                message: 'Pick one',
                type: 'list',
                choices: departments
            }
        ]);
    });