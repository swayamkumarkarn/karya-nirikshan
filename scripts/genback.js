const routes = [
  { "path": "/", "component": "./pages/index.jsx", "layout": "./pages/layout.jsx", "meta": {} },
  { "path": "/about", "component": "./pages/about/index.jsx", "layout": "./pages/about/layout.jsx", "meta": {} },
  { "path": "/yoyo", "component": "./pages/about/index.jsx", "layout": "./pages/about/layout.jsx", "meta": {} },
  { "path": "/about/home", "component": "./pages/about/home/index.jsx", "layout": null, "meta": {} },
  { "path": "/about/home/inhome", "component": "./pages/about/home/inhome/index.jsx", "layout": null, "meta": {} },
  { "path": "/about/:id", "component": "./pages/about/[id].jsx" },
  { "path": "/home", "component": "./pages/home/index.js", "layout": "./pages/home/layout.jsx", "meta": { "title": "Home Page", "description": "This is the home page" } }
];

// Function to build the nested route structure
function buildRoutesTree(routes) {
  const routeMap = {};

  // Create a map for easy lookup
  routes.forEach(route => {
    routeMap[route.path] = { ...route, children: [] };
  });

  const tree = [];

  // Populate children arrays
  for (const route of Object.values(routeMap)) {
    const parentPath = route.path.substring(0, route.path.lastIndexOf('/'));

    // If the parent exists in the map, add this route to its children
    if (parentPath && routeMap[parentPath]) {
      routeMap[parentPath].children.push(route);
    } else if (route.path === '/') {
      // If it's the root path, add it to the tree directly
      tree.push(route);
    } else if (route.path !== '/') {
      // If it's a top-level path (not root), add it as a child of root
      tree[0].children.push(route);
    }
  }

  return tree;
}

// Convert routes to nested structure
const nestedRoutes = buildRoutesTree(routes);

// Log the result
console.log(JSON.stringify(nestedRoutes, null, 2));