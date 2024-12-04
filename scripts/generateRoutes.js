const fs = require("fs");
const path = require("path");

const PAGES_DIR = path.join(__dirname, "../src/pages");
const ROUTES_FILE = path.join(__dirname, "../public/routes.json");

function parseDirectory(dir, basePath = "") {
  const routes = [];
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      const indexFileJs = path.join(fullPath, "index.js");
      const indexFileJsx = path.join(fullPath, "index.jsx");

      // If the folder contains index.js or index.jsx, add it as a route
      if (fs.existsSync(indexFileJs) || fs.existsSync(indexFileJsx)) {
        const routePath = basePath === "" ? `/${file}` : `${basePath}/${file}`;
        routes.push({
          path: routePath,
          component: `./pages${routePath}/index${fs.existsSync(indexFileJs) ? ".js" : ".jsx"}`,
        });
      }

      // Recursively parse subdirectories
      routes.push(...parseDirectory(fullPath, basePath === "" ? `/${file}` : `${basePath}/${file}`));
    } else if (stat.isFile()) {
      // Dynamic route handling for [param].jsx or [param].js
      if (file.match(/^\[.+\]\.jsx$/) || file.match(/^\[.+\]\.js$/)) {
        const param = file.match(/^\[(.+)\]\.(jsx|js)$/)[1];
        const routePath = `${basePath}/:${param}`;
        routes.push({
          path: routePath,
          component: `./pages${basePath}/${file}`,
        });
      } else if (file.endsWith(".jsx") || file.endsWith(".js")) {
        // Normal route for standalone files
        const routeName = file.replace(/\.(jsx|js)$/, "");
        const routePath = `${basePath}/${routeName}`;
        // Prevent creating a duplicate route for index.js or index.jsx
        if (routeName !== "index") {
          routes.push({
            path: routePath,
            component: `./pages${routePath}.${file.endsWith(".jsx") ? "jsx" : "js"}`,
          });
        }
      }
    }
  }

  return routes;
}

// Special handling for the root index.js or index.jsx file
function handleRootIndex(routes) {
  const rootIndexJs = path.join(PAGES_DIR, "index.js");
  const rootIndexJsx = path.join(PAGES_DIR, "index.jsx");

  if (fs.existsSync(rootIndexJs) || fs.existsSync(rootIndexJsx)) {
    routes.unshift({
      path: "/",
      component: `./pages/index${fs.existsSync(rootIndexJs) ? ".js" : ".jsx"}`,
    });
  }
}

const routes = parseDirectory(PAGES_DIR);
handleRootIndex(routes);

fs.writeFileSync(ROUTES_FILE, JSON.stringify(routes, null, 2), "utf-8");
console.log("Routes generated successfully!");
