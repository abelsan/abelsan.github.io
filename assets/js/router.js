window.onload = function () {
  console.log("DOM loaded");

  // ----------------------------------------
  // Route configuration
  // ----------------------------------------
  const routes = {
    "/": "assets/docs/home.html",
    "/home": "assets/docs/home.html",
    "/bio": "assets/docs/bio.html",
    "/research": "assets/docs/research.html",
    "/teaching": "assets/docs/teaching.html",
    "/speaking": "assets/docs/speaking.html",
    "/podcast": "assets/docs/podcast.html",
    "/blog": "assets/docs/blog.html",
    "/books": "assets/docs/books.html",
  };

  let lastPage = "";

  // ----------------------------------------
  // Router core
  // ----------------------------------------
  async function router() {
    let path = getPath();
    console.log("Path:", path);

    // Find route
    const route = routes[path] || routes["/"];
    console.log("Route:", route);

    await loadPage(route);

    // Handle deep links like /bio#photos
    const hash = window.location.hash;
    if (hash) {
      const id = hash.slice(1);
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      // Only scroll to top if there is no hash
      window.scrollTo(0, 0);
    }    
  }
  

  // ----------------------------------------
  // Normalize URL path
  // Supports both hash (/#/bio) and clean (/bio)
  // ----------------------------------------
  function getPath() {
    if (window.location.hash.startsWith("#/")) {
      return window.location.hash.replace("#", "");
    } else {
      return window.location.pathname === "/" ? "/" : window.location.pathname;
    }
  }

  // ----------------------------------------
  // Load external HTML file into #content
  // ----------------------------------------
  async function loadPage(url) {
    try {
      if (lastPage === url) return;
      lastPage = url;

      const res = await fetch(url);
      const html = await res.text();

      const container = document.getElementById("content");
      container.innerHTML = html;

      // Activate Bootstrap tooltips if needed
      const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
      [...tooltipTriggerList].forEach(
        (el) => new bootstrap.Tooltip(el)
      );
    } catch (err) {
      console.error("Error loading route:", err);
    }
  }

  // ----------------------------------------
  // Navigation helpers
  // ----------------------------------------
  function navigate(path) {
    if (window.location.origin.includes("github.io")) {
      // GitHub Pages prefers hash routing for safety
      window.location.hash = `#${path}`;
    } else {
      window.history.pushState({}, "", path);
      router();
    }
  }

  // ----------------------------------------
  // Listen for route changes
  // ----------------------------------------
  window.addEventListener("popstate", router);
  window.addEventListener("hashchange", router);

  // ----------------------------------------
  // Initialize
  // ----------------------------------------
  router();

  // ----------------------------------------
  // Global navigation click handler (optional)
  // ----------------------------------------
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("a[data-route]")) {
      e.preventDefault();
      navigate(e.target.getAttribute("href"));
    }
  });
};
