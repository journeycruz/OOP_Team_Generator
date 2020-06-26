// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee")

class Engineer extends Employee {
  constructor(name,id,email, userName) {
    super(name,id,email);

    this.userName  = userName ;
    
  }

  getGithub() { return this.userName ; }
  getRole() { return "Engineer"; }
}

module.exports = Engineer;