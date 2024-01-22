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
console.log('Start books generation ...')

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
  <h2 class="pb-2 border-bottom">Books List</h2>
  <div class="row g-4 py-5">
`

// create a feature for each book
books.forEach(book => {
    html += `
        <!-- Dynamically generated features start -->
        <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 my-col">

            <!-- Feature 1 -->
            <div class="feature">
                <img src="assets/img/books/${book.isbn}.jpg" class="img-thumbnail" alt="book cover">
                <p>
                    ${book.title} by ${book.author}
                    <a href="${book.url}" class="link-primary">More ...</a>
                </p>        
            </div>
        </div>        
    `        
});

html += `
    <!-- Repeat for other features -->
    <!-- Dynamically generated features end -->
  </div>
</div>
`

// Write html file to docs folder
fs.writeFileSync('../docs/books.html', html, 'utf8');
console.log('File written successfully');