// ------------------------------------
//  Code generates books.html
// 
//  steps to add a new book:
//    - find book on amazon
//    - get title, author, isbn, url
//    - add book to books.json
//        books.json needs to be 
//        in same directory
//    - run: node books.js
// ------------------------------------


const books = require('./books.json');
const fs = require('fs');
var jsonfile = "assets/generators/books.json";
console.log('Start books generation ...')

// get number of books
var numBooks = books.length;

// If I decide to use amazon affiliate link, I need to add the following to the page
var amazonAffiliate = "?tag=abelsan-20";

// Define categories in desired order
const categories = [
  'AI',
  'Digital Transformation',
  'Strategic Decision Making',
  'Cybersecurity',  
  'The Way We Think',
  'Leadership',
  'Biology',
  'Government and Society',
  'Fintech',
  'Mathematics',
  'Wide-Angle Perspectives'
];

var html = `
<style>
.my-col {
  /* minimum width requirement */
  min-width: 200px; 
  /* keeps original flexibility of the column */
  flex: 0 0 auto; 
}  
</style>

<div class="container px-4 py-5" id="featured-3">
  <h2 class="pb-2 border-bottom">Book List (<a href="${jsonfile}">Json File</a>) - Count: ${numBooks}</h2>
  <div class="row g-4 py-5">
`

// Generate a section per category
categories.forEach(category => {
  // Filter books in this category
  const booksInCat = books.filter(book => book.category === category);
  if (booksInCat.length > 0) {
    html += `  <h3 class="mt-4">${category}</h3>`;
    html += `  <div class="row g-4 py-3">`;
    booksInCat.forEach(book => {
      html += `
        <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 my-col">
          <div class="feature">
            <img src="assets/img/books/${book.isbn}.jpg" class="img-thumbnail" alt="book cover">
            <p>
              ${book.title} by ${book.author} 
              (<a href="${book.url}" class="link-primary">Link</a>)
            </p>        
          </div>
        </div>`;
    });
    html += `  </div>`;
  }
});


// If I decide to use amazon affiliate links, I need to add the following to the page
var disclosure = 'As an Amazon Associate I earn from qualifying purchases.';

html += `
  </div>
  <!-- Repeat for other features -->
  <!-- Dynamically generated features end -->
  <!-- ---------------------------------- -->
  <br><br>
  <!-- link to book recommendations, qr code -->    
  <img src="assets/img/books/qr_abel.png" style="width: 100px;" alt="QR code for abel's website">
  <img src="assets/img/books/qr_courses.png" style="width: 100px;" alt="QR code for books">

</div>
`

// Write html file to docs folder
fs.writeFileSync('../docs/books.html', html, 'utf8');
console.log('File written successfully');
