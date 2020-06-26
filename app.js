const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

async function promptUser() {
    let team = "";
    let teamSize;
    await inquirer.prompt({
            type: "number",
            message: "How many employees will be working on this project?",
            name: "memberCount"
        })
        .then((data) => {
            teamSize = data.memberCount + 1;
        });
    if (teamSize === 0) {
        console.log("There must be at least one member on your team.");
        return;
    }
    for (i = 1; i < teamSize; i++) {
        let empName;
        let id;
        let title;
        let email;

        await inquirer.prompt([{
                    type: "input",
                    message: "Enter Employee Name: ",
                    name: "name"
                },
                {
                    type: "input",
                    message: "What is this employee's ID number?",
                    name: "idNum"
                },
                {
                    type: "input",
                    message: "What is this employee's e-mail address?",
                    name: "email"

                },
                {
                    type: "list",
                    message: "What is this employee's job title?",
                    name: "title",
                    choices: [
                        "Manager",
                        "Engineer",
                        "Intern",
                    ]

                }
            ])
            .then((data) => {
                empName = data.name;
                id = data.idNum;
                title = data.title;
                email = data.email;
            });
        switch (title) {
            case "Manager":
                await inquirer.prompt([{
                        type: "input",
                        message: "What is your Manager's Office Number?",
                        name: "managerPhone"
                    }])
                    .then((data) => {
                        const newManager = new Manager(empName, id, email, data.managerPhone);
                        memberPosition = fs.readFileSync("templates/manager.html");
                        team = team + "\n" + eval('`' + memberPosition + '`');
                    });
                break;
            case "Intern":
                await inquirer.prompt([{
                        type: "input",
                        message: "What school does this intern go to?",
                        name: "school"
                    }])
                    .then((data) => {
                        const newIntern = new Intern(empName, id, email, data.school);
                        memberPosition = fs.readFileSync("templates/intern.html");
                        team = team + "\n" + eval('`' + memberPosition + '`');
                    });
                break;
            case "Engineer":
                await inquirer.prompt([{
                        type: "input",
                        message: "What is this employee's GitHub username?",
                        name: "userName"
                    }])
                    .then((data) => {
                        const newEngineer = new Engineer(empName, id, email, data.userName);
                        memberPosition = fs.readFileSync("templates/engineer.html");
                        team = team + "\n" + eval('`' + memberPosition + '`');
                    });
                break;

        }
    }

    const allMemberData = fs.readFileSync("templates/main.html");
    team = eval('`' + allMemberData + '`');
    fs.writeFile("team.html", team, function (err) {
        if (err) {
            return console.log(err);
        }

        console.log("Your team has been created and your HTML file is ready to view!");


    });
}
promptUser();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```