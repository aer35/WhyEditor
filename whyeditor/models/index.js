import JournalEntry from "./JournalEntry";
import Note from "./Note";
import BoxItem from "./CheckBox.js";

let models = {
  JournalEntry,
  Note,
  BoxItem
};

Object.values(models).forEach(model => model.createTable().catch(console.log));

export { JournalEntry, Note, BoxItem };
