// const { matchPath } = require("react-router-dom");
const { lazy } = require("react");
// Function to build the nested route structure
// function buildRoutesTree(routes) {
//   const routeMap = {};

//   // Create a map for easy lookup
//   routes.forEach(route => {
//     routeMap[route.path] = { ...route, children: [] };
//   });

//   const tree = [];

//   // Populate children arrays
//   for (const route of Object.values(routeMap)) {
//     const parentPath = route.path.substring(0, route.path.lastIndexOf('/'));

//     // If the parent exists in the map, add this route to its children
//     if (parentPath && routeMap[parentPath]) {
//       routeMap[parentPath].children.push(route);
//     } else if (route.path === '/') {
//       // If it's the root path, add it to the tree directly
//       tree.push(route);
//     } else if (route.path !== '/') {
//       // If it's a top-level path (not root), add it as a child of root
//       tree[0].children.push(route);
//     }
//   }

//   return tree;
// }

// Convert routes to nested structure
// const nestedRoutes = buildRoutesTree(routes);

// Log the result
// console.log(JSON.stringify(nestedRoutes, null, 2));

// const routes = [
//   { "path": "/", "component": "./pages/index.jsx", "layout": "./pages/layout.jsx", "meta": {} },
//   { "path": "/about", "component": "./pages/about/index.jsx", "layout": "./pages/about/layout.jsx", "meta": {} },
//   { "path": "/about/home", "component": "./pages/about/home/index.jsx", "layout": null, "meta": {} },
//   { "path": "/about/home/inhome", "component": "./pages/about/home/inhome/index.jsx", "layout": null, "meta": {} },
//   { "path": "/about/:id", "component": "./pages/about/[id].jsx" },
//   { "path": "/home", "component": "./pages/home/index.js", "layout": "./pages/home/layout.jsx", "meta": { "title": "Home Page", "description": "This is the home page" } }
// ];
// [lazy(() => import(`${route.layout}`))]










const routes = [
  {
    path: "/",
    component: "./pages/index.jsx",
    layout: "./pages/layout.jsx",
    meta: {},
    children: [
      {
        path: "/about",
        component: "./pages/about/index.jsx",
        layout: "./pages/about/layout.jsx",
        meta: {},
        children: [
          {
            path: "/about/home",
            component: "./pages/about/home/index.jsx",
            layout: null,
            meta: {},
            children: [
              {
                path: "/about/home/inhome",
                component: "./pages/about/home/inhome/index.jsx",
                layout: "./pages/about/home/inhome/layout.jsx",
                meta: {},
                children: [],
              },
            ],
          },
          {
            path: "/about/:id",
            component: "./pages/about/[id].jsx",
            layout: null,
            children: [],
          },
        ],
      },
      {
        path: "/home",
        component: "./pages/home/index.js",
        layout: "./pages/home/layout.jsx",
        meta: {
          title: "Home Page",
          description: "This is the home page",
        },
        children: [],
      },
    ],
  },
];

function findLayoutsForPath(path, routes) {
  const layouts = [];

  function recursiveFind(currentPath, currentRoutes) {
    for (const route of currentRoutes) {
      // Check if the route path matches or is a parameterized route
      const regex = new RegExp(`^${route.path.replace(/:\w+/g, '\\w+')}`);
      if (regex.test(currentPath)) {
        // Add the current layout if it exists
        if (route.layout) {
          layouts.push(lazy(() => import(`${route.layout}`)));
        }
        
        // Recursively check children routes if they exist
        if (route.children && route.children.length > 0) {
          recursiveFind(currentPath, route.children);
        }
        
        // If we found a match, we can return early
        return;
      }
    }
  }

  recursiveFind(path, routes);
  return layouts;
}

// Test cases
console.log(findLayoutsForPath("/", routes)); // ["./pages/layout.jsx"]
console.log(findLayoutsForPath("/about", routes)); // ["./pages/layout.jsx", "./pages/about/layout.jsx"]
console.log(findLayoutsForPath("/about/home", routes)); // ["./pages/layout.jsx", "./pages/about/layout.jsx"]
console.log(findLayoutsForPath("/about/home/inhome", routes)); // ["./pages/layout.jsx", "./pages/about/layout.jsx"]
console.log(findLayoutsForPath("/about/123", routes)); // ["./pages/layout.jsx", "./pages/about/layout.jsx"]
console.log(findLayoutsForPath("/home", routes)); // ["./pages/layout.jsx", "./pages/home/layout.jsx"]