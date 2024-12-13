const fs = require("fs");
const path = require("path");
const babelParser = require("@babel/parser");

const PAGES_DIR = path.join(__dirname, "../src/pages");
const ROUTES_FILE = path.join(__dirname, "../public/routes.json");
const ROUTES_FILE_FLAT = path.join(__dirname, "../public/routesFlat.json");

// Function to extract meta object from a file using Babel parser
function extractMeta(filePath) {
  try {
    const code = fs.readFileSync(filePath, "utf-8");

    // Parse the file content into an AST
    const ast = babelParser.parse(code, {
      sourceType: "module",
      plugins: ["jsx", "typescript"],
    });

    let metaObject = null;

    // Traverse the AST to find `export const meta`
    ast.program.body.forEach((node) => {
      if (
        node.type === "ExportNamedDeclaration" &&
        node.declaration &&
        node.declaration.type === "VariableDeclaration"
      ) {
        const declarator = node.declaration.declarations.find(
          (d) => d.id.name === "meta"
        );

        if (declarator && declarator.init.type === "ObjectExpression") {
          // Helper function to convert an ObjectExpression node to a JavaScript object
          function parseObjectExpression(objectNode) {
            const result = {};
            objectNode.properties.forEach((prop) => {
              if (prop.key.type === "Identifier") {
                if (prop.value.type === "ObjectExpression") {
                  result[prop.key.name] = parseObjectExpression(prop.value);
                } else {
                  result[prop.key.name] = prop.value.value;
                }
              }
            });
            return result;
          }

          // Convert the meta object from AST back to an actual object
          metaObject = parseObjectExpression(declarator.init);
        }
      }
    });

    return metaObject || {};
  } catch (error) {
    console.error(`Error extracting meta from file: ${filePath}`, error);
    return {};
  }
}


// Recursive function to parse the directory structure and generate routes
function parseDirectory(dir, basePath = "") {
  const routes = [];
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      const nestedRoutes = parseDirectory(
        fullPath,
        basePath === "" ? `/${file}` : `${basePath}/${file}`
      );
      const layoutPath =
        fs.existsSync(path.join(fullPath, "layout.jsx")) ||
        fs.existsSync(path.join(fullPath, "layout.js"))
          ? `./pages${basePath}/${file}/layout.${
              fs.existsSync(path.join(fullPath, "layout.jsx")) ? "jsx" : "js"
            }`
          : null;

      const indexFileJs = path.join(fullPath, "index.js");
      const indexFileJsx = path.join(fullPath, "index.jsx");

      if (fs.existsSync(indexFileJs) || fs.existsSync(indexFileJsx)) {
        const routePath = basePath === "" ? `/${file}` : `${basePath}/${file}`;
        const componentPath = `./pages${routePath}/index${
          fs.existsSync(indexFileJs) ? ".js" : ".jsx"
        }`;
        const meta = extractMeta(
          fs.existsSync(indexFileJs) ? indexFileJs : indexFileJsx
        );

        routes.push({
          path: routePath,
          component: componentPath,
          layout: layoutPath,
          meta: meta,
        });

        routes.push(...nestedRoutes);
      } else {
        routes.push(...nestedRoutes);
      }
    } else if (stat.isFile()) {
      if (file.match(/^\[.+\]\.jsx$/) || file.match(/^\[.+\]\.js$/)) {
        const param = file.match(/^\[(.+)\]\.(jsx|js)$/)[1];
        const routePath = `${basePath}/:${param}`;
        routes.push({
          path: routePath,
          component: `./pages${basePath}/${file}`,
        });
      } else if (file.endsWith(".jsx") || file.endsWith(".js")) {
        const routeName = file.replace(/\.(jsx|js)$/, "");
        const routePath = `${basePath}/${routeName}`;

        if (routeName !== "index" && routeName !== "layout") {
          const componentPath = `./pages${routePath}.${
            file.endsWith(".jsx") ? "jsx" : "js"
          }`;
          const meta = extractMeta(fullPath);

          routes.push({
            path: routePath,
            component: componentPath,
            meta: meta,
          });
        }
      }
    }
  }

  return routes;
}

function handleRootIndex(routes) {
  const rootIndexJs = path.join(PAGES_DIR, "index.js");
  const rootIndexJsx = path.join(PAGES_DIR, "index.jsx");

  if (fs.existsSync(rootIndexJs) || fs.existsSync(rootIndexJsx)) {
    const componentPath = `./pages/index${
      fs.existsSync(rootIndexJs) ? ".js" : ".jsx"
    }`;
    const meta = extractMeta(
      fs.existsSync(rootIndexJs) ? rootIndexJs : rootIndexJsx
    );

    const layoutPath =
      fs.existsSync(path.join(PAGES_DIR, "layout.jsx")) ||
      fs.existsSync(path.join(PAGES_DIR, "layout.js"))
        ? `./pages/layout.${
            fs.existsSync(path.join(PAGES_DIR, "layout.jsx")) ? "jsx" : "js"
          }`
        : null;

    routes.unshift({
      path: "/",
      component: componentPath,
      layout: layoutPath,
      meta: meta,
    });
  }
}

const routes = parseDirectory(PAGES_DIR);
handleRootIndex(routes);

// Function to build the nested route structure
function buildRoutesTree(routes) {
  const routeMap = {};

  //   // Create a map for easy lookup
  routes.forEach((route) => {
    routeMap[route.path] = { ...route, children: [] };
  });

  const tree = [];

  //   // Populate children arrays
  for (const route of Object.values(routeMap)) {
    const parentPath = route.path.substring(0, route.path.lastIndexOf("/"));

    // If the parent exists in the map, add this route to its children
    if (parentPath && routeMap[parentPath]) {
      routeMap[parentPath].children.push(route);
    } else if (route.path === "/") {
      // If it's the root path, add it to the tree directly
      tree.push(route);
    } else if (route.path !== "/") {
      // If it's a top-level path (not root), add it as a child of root
      tree[0].children.push(route);
    }
  }

  return tree;
}

// Convert routes to nested structure
const nestedRoutes = buildRoutesTree(routes);

// Log the result
// console.log(JSON.stringify(nestedRoutes, null, 2));

fs.writeFileSync(ROUTES_FILE, JSON.stringify(nestedRoutes, null, 2), "utf-8");
fs.writeFileSync(ROUTES_FILE_FLAT, JSON.stringify(routes, null, 2), "utf-8");
console.log("Routes generated successfully!");
