document.addEventListener("DOMContentLoaded", () => {
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
  // Core Router
  // ----------------------------------------
  async function router() {
    let path = getPath();
    console.log("Path:", path);

    const route = routes[path] || routes["/"];
    console.log("Route:", route);

    await loadPage(route);

    const hash = window.location.hash;
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo(0, 0);
    }
  }

  // ----------------------------------------
  // Normalize URL path
  // ----------------------------------------
  function getPath() {
    if (window.location.hash.startsWith("#/")) {
      return window.location.hash.replace("#", "");
    } else {
      return window.location.pathname === "/" ? "/" : window.location.pathname;
    }
  }

  // ----------------------------------------
  // Load route content
  // ----------------------------------------
  async function loadPage(url) {
    try {
      if (lastPage === url) return;
      lastPage = url;

      const res = await fetch(url);
      const html = await res.text();

      const container = document.getElementById("content");
      container.innerHTML = html;
    } catch (err) {
      console.error("Error loading route:", err);
    }
  }

  // ----------------------------------------
  // Navigation helpers
  // ----------------------------------------
  function navigate(path) {
    window.history.pushState({}, "", path);
    router();
  }

  // ----------------------------------------
  // Event listeners
  // ----------------------------------------
  window.addEventListener("popstate", router);
  window.addEventListener("hashchange", router);

  document.body.addEventListener("click", (e) => {
    const a = e.target.closest("a[href^='/']");
    if (a && !a.hasAttribute("data-external")) {
      e.preventDefault();
      navigate(a.getAttribute("href"));
    }
  });

  // ----------------------------------------
  // Initialization (handles redirect from 404)
  // ----------------------------------------
  const redirect = sessionStorage.redirect;
  if (redirect) {
    sessionStorage.removeItem("redirect");
    console.log("Redirecting to:", redirect);
    navigate(redirect);
  } else {
    router();
  }
});
// End of router.js