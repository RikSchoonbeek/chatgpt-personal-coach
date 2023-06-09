

// Click add snippet
// Open modal with snippet form
// + Cancel + Add buttons
// onCancel => close modal + empty form data
// onAdd =>
//  send request
//  on success => call onAddSnippet, which leads to calling a function inside
//	SnippetOverview, where the new snippet is added to the list of snippets
//  on error => 400 > show validation errors !400 > show message that something went wrong

// Click delete snippet
//   - set snippet to delete full
//   - set show modal
// In modal ask for confirmation, show snippet by name
// on confirm => send request to delete
//  - on success => call onDeleteSnippet with snippet id and parent folder ids, which 
//    leads to calling a function inside SnippetOverview, where the deleted from the 
//    list of snippets
//  - on error => show message that something went wrong

// Click edit snippet
//   - set snippet to delete full
//   - set show modal
// Open modal with filled snippet form + Cancel + Edit buttons
//   - on edit => send backend request
//     - on success => call onEditSnippet(newSnippet), which leads to calling a function inside
//	SnippetOverview, where the existing snippet in the list of snippets is switched with new one
//     - on error => 400 > show validation errors !400 > show message that something went wrong
//   - on cancel > close form and clear form data                               
