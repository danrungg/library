const bookName = document.getElementById("bookName");
const author = document.getElementById("author");
const readStatus = document.getElementById("readStatus");
const tableBody = document.querySelector("tbody");
const form = document.querySelector("form");
const table = document.querySelector("table");

const myLibrary = [
	{ bookName: "Wolf Hall", author: "Hilary Mantel", readStatus: "read" },
	{ bookName: "Shining", author: "Steven King", readStatus: "not read" },
	{ bookName: "Austerlitz", author: "WG Sebald", readStatus: "read" },
];

function Book(bookName, author, status) {
	this.bookName = bookName;
	this.author = author;
	this.readStatus = status;
}

function render() {
	tableBody.innerHTML = "";

	myLibrary.forEach((book) => {
		let fixedReadStatus = "";
		if (book.readStatus === "notread" || book.readStatus === "not read") {
			fixedReadStatus = "not read";
		} else fixedReadStatus = "read";

		const html = `
		<tr>
			<td>${book.bookName}</td>
			<td>${book.author}</td>
			<td><button class="status-button">${fixedReadStatus}</button></td>
			<td><span class="delete">delete</span></td>
		</tr>
		`;
		tableBody.innerHTML += html;
	});
}

function addBookToLibrary() {
	const newBook = new Book(bookName.value, author.value, readStatus.value);
	myLibrary.unshift(newBook);
	render();
}

form.addEventListener("submit", (e) => {
	e.preventDefault();
	addBookToLibrary();
	form.reset();
});

function deleteBook(row) {
	const index = row.rowIndex;
	table.deleteRow(index);
	myLibrary.splice(index - 1, 1);
}

function switchReadStatus(item) {
	if (item.innerText === "READ") {
		item.innerText = "NOT READ";
		myLibrary[item.parentNode.parentNode.rowIndex - 1].readStatus =
			"not read";
	} else {
		item.innerText = "READ";
		myLibrary[item.parentNode.parentNode.rowIndex - 1].readStatus = "read";
	}
}

table.addEventListener("click", (e) => {
	if (e.target.classList.contains("delete")) {
		deleteBook(e.target.parentNode.parentNode);
	}

	if (e.target.classList.contains("status-button")) {
		switchReadStatus(e.target);
	}
});

render();
