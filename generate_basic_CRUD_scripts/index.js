const fs = require('fs');

// Get arguments from the command line
const [, , fileName, functionName] = process.argv;

if (!fileName || !functionName) {
  console.error("Usage: node generate.js <fileName> <functionName>");
  process.exit(1);
};

const content = `
// Auto-generated file
function ${functionName}() {
  console.log("Function ${functionName} called!");
}

module.exports = ${functionName};
`;

fs.writeFileSync(`${fileName}.js`, content.trim());
console.log(`File "${fileName}.js" created successfully.`);