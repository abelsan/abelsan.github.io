// Create a class for the element
class NavBar extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();

    this.innerHTML = `
    <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
        <div class="container-fluid">
          <a class="navbar-brand" href="#/home">
            <img src="assets/img/logo.svg" height="30" class="d-inline-block align-top" alt="" loading="lazy">
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
      
          <div class="collapse navbar-collapse" id="navbarsExampleDefault">
            <ul class="navbar-nav mr-auto mb-2 mb-md-0">
              <li class="nav-item active">
                <a class="nav-link" aria-current="page" href="#/home">Home</a>
              </li>
              <li class="nav-item">                  
                <a class="nav-link" href="#/bio">Bio</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#/research">Research</a>
              </li>              
              <li class="nav-item">
                <a class="nav-link" href="#/teaching">Teaching</a>
              </li>              
              <li class="nav-item">
                <a class="nav-link" href="#/speaking">Speaking</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#/books">Books</a>
              </li>                             
              <li class="nav-item">
                <a class="nav-link" href="#/podcast">Daily</a>
              </li>               
            </ul>
          </div>
        </div>
      </nav>    
    `;    
  }
}

// Define the new element
customElements.define('abel-navbar', NavBar);


// Create a class for the element
class Card extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();
    
    // attribute content 
    let title        = this.getAttribute('title');    
    let img          = this.getAttribute('img');
    let newsletter   = this.getAttribute('newsletter');
    let podcast      = this.getAttribute('podcast');
    let video        = this.getAttribute('video');
    let description  = this.getAttribute('description');                

    // set title
    if (!title) {
        title = '<h5 class="card-title">No Title</h5>'
    }
    else{
        title = `<h5 class="card-title">${title}</h5>`
    }

    // set image
    if (!img) {
        img = `<img src="assets/img/no_image.jpeg" class="rounded-start" alt="...">`;
    }
    else{
        img = `<img src="${img}" class="rounded-start" alt="...">`;
    }

    // set newsletter
    if (!newsletter) {
      newsletter = '';
    }
    else{
      newsletter = `<a href="${newsletter}" class="card-link">Newsletter</a>`;
    }

    // set podcast
    if (!podcast) {
      podcast = '';
    }
    else{
      podcast = `<a href="${podcast}" class="card-link">Podcast</a>`;
    }

    // set video
    if (!video) {
      video = '';
    }
    else{
      video = `<a href="${video}" class="card-link">Video</a>`;
    }

    // set description
    if (!description) {
        description = `<p class="card-text">No description</p>`;
    }
    else{
        description = `<p class="card-text">${description}</p>`;
    }

    this.innerHTML = `
        <div class="card mb-3 w-100">
          <div class="row g-0">
            <div class="col-3 d-flex align-items-stretch">
              <div class="img-container w-100">
                ${img}
              </div>
            </div>
            <div class="col-9 d-flex align-items-center">
              <div class="card-body">
                ${title}
                ${description}
                ${newsletter}${podcast}${video}
              </div>
            </div>
          </div>
        </div>    
    `;    

  }
}

// Define the new element
customElements.define('abel-card', Card);

