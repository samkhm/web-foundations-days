
let notes = [
  { id: 1, text: "Buy milk and bread", category: "personal" },
  { id: 2, text: "Finish the Day 3 assignment", category: "study" },
  { id: 3, text: "Email the project report to Grace", category: "work" },
  { id: 4, text: "Revise JavaScript arrays", category: "study" },
  { id: 5, text: "Call mum", category: "personal" },
];


// 1. Search notes
function searchNotes(word) {
  const searchWord = word.toLowerCase();

  return notes.filter(note =>
    note.text.toLowerCase().includes(searchWord)
  );
}


// 2. Find the longest note
function longestNote() {
  if (notes.length === 0) {
    return null;
  }

  let longest = notes[0];

  for (let note of notes) {
    if (note.text.length > longest.text.length) {
      longest = note;
    }
  }

  return longest;
}


// 3. Count notes by category
function countByCategory() {
  const counts = {};

  for (let note of notes) {
    if (counts[note.category]) {
      counts[note.category]++;
    } else {
      counts[note.category] = 1;
    }
  }

  return counts;
}


// 4. Get summary
function getSummary() {
  const counts = countByCategory();

  const total = notes.length;
  const noteWord = total === 1 ? "note" : "notes";

  return `${total} ${noteWord}: ${counts.personal || 0} personal, ${counts.work || 0} work, ${counts.study || 0} study.`;
}


// 5. Check for duplicate
function isDuplicate(text) {
  const cleanedText = text.trim().toLowerCase();

  return notes.some(note =>
    note.text.trim().toLowerCase() === cleanedText
  );
}


// 6. Add a note
function addNote(text, category) {
  const cleanedText = text.trim();

  if (cleanedText.length < 1 || cleanedText.length > 200) {
    console.log("Note was not added: text must be 1–200 characters.");
    return false;
  }

  if (isDuplicate(cleanedText)) {
    console.log("Note was not added: duplicate note.");
    return false;
  }

  const validCategories = ["personal", "work", "study"];

  if (!validCategories.includes(category)) {
    console.log("Note was not added: invalid category.");
    return false;
  }

  const newNote = {
    id: notes.length + 1,
    text: cleanedText,
    category: category
  };

  notes.push(newNote);

  return true;
}


// ===============================
// TESTS
// ===============================

// searchNotes()
// Normal case
console.log(searchNotes("JavaScript"));
// Expected: [{ id: 4, text: "Revise JavaScript arrays", category: "study" }]

// Edge case - no results
console.log(searchNotes("Python"));
// Expected: []


// longestNote()
// Normal case
console.log(longestNote());
// Expected: { id: 3, text: "Email the project report to Grace", category: "work" }

// Edge case - empty array
const savedNotes = notes;
notes = [];
console.log(longestNote());
// Expected: null
notes = savedNotes;


// countByCategory()
// Normal case
console.log(countByCategory());
// Expected: { personal: 2, study: 2, work: 1 }

// Edge case - empty array
const savedNotesForCount = notes;
notes = [];
console.log(countByCategory());
// Expected: {}
notes = savedNotesForCount;


// getSummary()
// Normal case
console.log(getSummary());
// Expected: "5 notes: 2 personal, 1 work, 2 study."

// Edge case - exactly one note
const savedNotesForSummary = notes;
notes = [
  { id: 6, text: "Test note", category: "personal" }
];
console.log(getSummary());
// Expected: "1 note: 1 personal, 0 work, 0 study."
notes = savedNotesForSummary;


// isDuplicate()
// Normal case
console.log(isDuplicate("Buy milk and bread"));
// Expected: true

// Edge case - extra spaces and different case
console.log(isDuplicate("  BUY MILK AND BREAD  "));
// Expected: true


// addNote()
// Normal case
console.log(addNote("Prepare for the JavaScript test", "study"));
// Expected: true

// Edge case - duplicate
console.log(addNote("  BUY MILK AND BREAD  ", "personal"));
// Expected: false and logs the duplicate reason

