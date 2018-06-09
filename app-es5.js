// Book Constructor
function Book(title, author, isbn) {
	this.title = title;
	this.author = author;
	this.isbn = isbn;
}

// UI Constructor
function UI() { }

// Creating prototypes for UI constructor --- START ---

// Add Book To List
UI.prototype.addBookToList = function (book) {
	const list = document.getElementById('book-list');
	// Create tr element
	const row = document.createElement('tr');
	// Insert Columns
	row.innerHTML = `
		<td>${book.title}</td>
		<td>${book.author}</td>
		<td>${book.isbn}</td>
		<td><a href="#" class="delete">X</a></td>
	`;
	// Append the created row to list
	list.appendChild(row);
}

// Clear Form Fields
UI.prototype.clearFormFields = function () {
	// Create an Array of the form field ids that we want to clear
	const fieldIDs = ['title', 'author', 'isbn'];
	// Run a forEach loop through the array and clear them all
	fieldIDs.forEach(function (id) {
		document.getElementById(id).value = '';
	});
}

// Show Alert
UI.prototype.showAlert = function (msg, className) {
	// Create Alert Div
	const div = document.createElement('div');
	// Add CSS classes
	div.classList.add('alert', className);
	// Add the message
	div.appendChild(document.createTextNode(msg));
	// Insert the alert into the DOM
	// Get a parent - (Put it within)
	const container = document.querySelector('.container');
	// Get the form - (Put it before)
	const form = document.querySelector('#book-form');
	// Insert the Alert (1st Param = What we wanna insert, 2nd Param = Insert before what)
	container.insertBefore(div, form);

	// Timeout after 3 sec
	setTimeout(function() {
		document.querySelector('.alert').remove();
	}, 3000);
}

// Delete Book
UI.prototype.deleteBook = function(target) {
	if(target.classList.contains('delete')) {
		if(confirm('Are you sure about deleting this book?')) {
			target.parentElement.parentElement.remove();
			// Show message that the book has been deleted
			this.showAlert('The selected book has been deleted.', 'success');
		}
	}
}

// Creating prototypes for UI constructor --- END ---

// Event Listeners for Add Book
document.getElementById('book-form').addEventListener('submit', function (e) {
	// Get form field values
	const title = document.querySelector('#title').value,
		author = document.getElementById('author').value,
		isbn = document.querySelector('#isbn').value;

	// Instantiate Book object
	const book = new Book(title, author, isbn);

	// Instantiate UI object
	const ui = new UI();

	// Validate the form fields
	if (title === '' || author === '' || isbn === '') {
		// Show Error Alert
		ui.showAlert('Please fill is all fields.', 'error');
	} else {
		// Add Book to list
		ui.addBookToList(book);

		// Show Book Successfully Added Alert
		ui.showAlert('Book has successfully been added.', 'success')

		// Clear Form Fields
		ui.clearFormFields();
	}

	// Stop form default behaviors i.e. reloading the page when submitted
	e.preventDefault();
});

// Event Listener for Deleting Books
document.getElementById('book-list').addEventListener('click', function(e) {
	if(e.target.classList.contains('delete')) {
		const ui = new UI();
		// Call the deleteBook() prototype method
		ui.deleteBook(e.target);
	}
	// Prevent Default Behavior
	e.preventDefault();
})