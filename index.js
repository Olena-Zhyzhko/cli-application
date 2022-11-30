const contscts = require('./contacts');

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
        const contactsList = await contscts.listContacts();
        console.table(contactsList);
      break;

    case "get":
        const contactById = await contscts.getContactById(id);
        console.log(contactById);
      break;

    case "add":
        const addContact = await contscts.addContact(name, email, phone);
        console.log(addContact);
      break;

    case "remove":
        const removeContact = await contscts.removeContact(id);
        console.log(removeContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);

