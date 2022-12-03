const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid')

const contactsPath = path.join(__dirname, '/db/contacts.json');
// console.log('contactsPath:', contactsPath)

// TODO: задокументувати кожну функцію
async function listContacts() {
    try {
        const data = await fs.readFile(contactsPath);
        return JSON.parse(data);
    } catch (error) {
        console.log(error.massage)
    }
}

async function getContactById(contactId) {
     try {
        const normId = String(contactId);
        const contacts = await listContacts();
        const contactById = contacts.find(contact => contact.id === normId)
        return contactById || null;
    } catch (error) {
        console.log(error.massage)
    }
}

async function removeContact(contactId) {
    try {
        const normId = String(contactId);
        const contacts = await listContacts();
        const index = contacts.findIndex(contact => contact.id === normId);
        if (index === -1) {
            return null;
        }
        const [removedContact] = contacts.splice(index, 1);
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
        return removedContact;
    } catch (error) {
        console.log(error.massage)
    }
}

async function addContact(name, email, phone) {
        if (!name || !email || !phone) {
            return console.log("All fields are required")
        }

    try {
        const contacts = await listContacts();
        const newContact = {
            id: nanoid(),
            name,
            email,
            phone,
        }
        contacts.push(newContact);
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
        return newContact;
    } catch (error) {
        console.log(error.massage)
    }
};

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}