Steps to create your own book list. Here is what mine looks like in the end:
https://abel.mit.edu/#/books

Step 01: Build a Json file. I used amazon data. See the format here:
https://abel.mit.edu/assets/generators/books.json

    {
        "title": "The Biology of Business: Decoding the Natural Laws of Enterprise",
        "author": "John Henry Clippinger",
        "isbn": "078794324X",
        "url": "https://www.amazon.com/dp/078794324X"
    }

Step 02: Getting the book cover images programmatically. Note that the code will break all the time because amazon does not like scraping - they change the html tag selectors all the time. The last 10 I had to do by hand
https://abel.mit.edu/assets/generators/book_covers.js

Step 03: Generating the HTML
https://abel.mit.edu/assets/generators/books.js

Step 04: Sample output
view-source:https://abel.mit.edu/assets/docs/books.html