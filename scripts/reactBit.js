const path = require("path");
const spawn = require("cross-spawn");

// Helper function to spawn processes
const runCommand = (command, args, options = {}) => {
  const process = spawn(command, args, { stdio: "inherit", ...options });

  process.on("close", (code) => {
    if (code !== 0) {
      console.error(`Command "${command} ${args.join(" ")}" failed with code ${code}`);
      process.exit(code);
    }
  });

  process.on("error", (err) => {
    console.error(`Failed to start "${command}": ${err.message}`);
    process.exit(1);
  });

  return process;
};

// Step 1: Start nodemon to watch for route changes and regenerate routes
console.log("Starting nodemon to watch and regenerate routes...");
runCommand("npx", ["nodemon", "-w", "src/pages", "-x", "node scripts/generateRoutes.js"], {
  shell: true,
});

// Step 2: Start the React app using react-scripts
console.log("Starting the React application...");
const reactScriptsPath = path.resolve("node_modules/.bin/react-scripts");
runCommand(reactScriptsPath, ["start"], { shell: true });
