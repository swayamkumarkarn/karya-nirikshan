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
          // Convert the meta object from AST back to an actual object
          metaObject = {};
          declarator.init.properties.forEach((prop) => {
            if (prop.key.type === "Identifier") {
              metaObject[prop.key.name] = prop.value.value;
            }
          });
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
      const nestedRoutes = parseDirectory(fullPath, basePath === "" ? `/${file}` : `${basePath}/${file}`);
      const layoutPath = fs.existsSync(path.join(fullPath, "layout.jsx")) || fs.existsSync(path.join(fullPath, "layout.js"))
        ? `./pages${basePath}/${file}/layout.${fs.existsSync(path.join(fullPath, "layout.jsx")) ? "jsx" : "js"}`
        : null;

      const indexFileJs = path.join(fullPath, "index.js");
      const indexFileJsx = path.join(fullPath, "index.jsx");

      if (fs.existsSync(indexFileJs) || fs.existsSync(indexFileJsx)) {
        const routePath = basePath === "" ? `/${file}` : `${basePath}/${file}`;
        const componentPath = `./pages${routePath}/index${fs.existsSync(indexFileJs) ? ".js" : ".jsx"}`;
        const meta = extractMeta(fs.existsSync(indexFileJs) ? indexFileJs : indexFileJsx);

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
          const componentPath = `./pages${routePath}.${file.endsWith(".jsx") ? "jsx" : "js"}`;
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
    const componentPath = `./pages/index${fs.existsSync(rootIndexJs) ? ".js" : ".jsx"}`;
    const meta = extractMeta(fs.existsSync(rootIndexJs) ? rootIndexJs : rootIndexJsx);

    const layoutPath = fs.existsSync(path.join(PAGES_DIR, "layout.jsx")) || fs.existsSync(path.join(PAGES_DIR, "layout.js"))
      ? `./pages/layout.${fs.existsSync(path.join(PAGES_DIR, "layout.jsx")) ? "jsx" : "js"}`
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

fs.writeFileSync(ROUTES_FILE, JSON.stringify(routes, null, 2), "utf-8");
fs.writeFileSync(ROUTES_FILE_FLAT, JSON.stringify(routes, null, 2), "utf-8");
console.log("Routes generated successfully!");
