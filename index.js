import { program } from "commander";
import * as contactsStack from "./contacts.js";

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();


async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contactsList = await contactsStack.listContacts();
      return console.table(contactsList);

    case "get":
      const contactsFiltered = await contactsStack.getContactById(id);
      return console.table(contactsFiltered);

    case "add":
      const contactsAdded = await contactsStack.addContact(name, email, phone);
      return console.table(contactsAdded);

    case "remove":
      const contactsCut = await contactsStack.removeContact(id);
      return console.table(contactsCut);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
