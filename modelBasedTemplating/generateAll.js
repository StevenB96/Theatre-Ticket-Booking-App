// templateGenerator/generateAll.js
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const inquirer = require('inquirer').default;

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

/**
 * Recursively walk a directory and return all .js, .ts, and .tsx template file paths.
 * @param {string} dir - Directory to traverse
 * @returns {string[]} Array of absolute file paths
 */
function walkTemplates(dir) {
  let results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(walkTemplates(fullPath));
    } else if (entry.isFile() && /\.(js|ts|tsx)$/.test(entry.name)) {
      results.push(fullPath);
    }
  }
  return results;
}

/**
 * Replace placeholders in a path segment using provided context.
 * Supported placeholders in names: [name], [Name], [pluralName], [PluralName]
 */
function renderSegment(segment, context) {
  return segment
    .replace(/\[name\]/g, context.name)
    .replace(/\[Name\]/g, context.Name)
    .replace(/\[pluralName\]/g, context.pluralName)
    .replace(/\[PluralName\]/g, context.PluralName);
}

/**
 * Given the raw contents of a .js/.ts/.tsx file that exports a template string,
 * strip away the surrounding `const … = \` … \`;` and `module.exports = …;`
 * so we only return the inner template literal text.
 */
function extractTemplateLiteral(raw) {
  // Match text between the first backtick after `=` and the final backtick before `;`
  const match = raw.match(/=\s*`([\s\S]*?)`;/);
  return match ? match[1] : raw;
}

async function main() {
  // Prompt user for config
  const answers = await inquirer.prompt([
    { name: 'name', message: 'Singular name (e.g. user):', validate: (v) => (v ? true : 'Required') },
    { name: 'pluralName', message: 'Plural name (e.g. users):', validate: (v) => (v ? true : 'Required') },
    { name: 'templates', message: 'Templates directory:', default: path.resolve(__dirname, 'templates') },
    { name: 'outDir', message: 'Output directory:', default: path.resolve(__dirname, 'generated') },
  ]);

  const { name, pluralName, templates, outDir } = answers;
  const Name = capitalize(name);
  const PluralName = capitalize(pluralName);
  const context = { name, Name, pluralName, PluralName };

  // Ensure output directory exists
  fs.mkdirSync(outDir, { recursive: true });

  // Get all template files recursively
  const templateFiles = walkTemplates(templates);

  for (const filePath of templateFiles) {
    // Compute relative path from templates root
    const relPath = path.relative(templates, filePath);
    const parts = relPath.split(path.sep);

    // Render each directory segment
    const renderedDirs = parts.slice(0, -1).map((seg) =>
      /\[.*\]/.test(seg) ? renderSegment(seg, context) : seg
    );

    // Prepare target directory path
    const targetDir = path.join(outDir, ...renderedDirs);
    fs.mkdirSync(targetDir, { recursive: true });

    // Read raw file contents
    const raw = fs.readFileSync(filePath, 'utf8');

    // If the file exports a template literal, extract just the interior text.
    // Otherwise, use the raw content directly.
    const templateContent = extractTemplateLiteral(raw);

    // Render template with EJS
    const renderedContent = ejs.render(templateContent, context);

    // Compute output file name by replacing placeholders in basename, preserving extension
    const ext = path.extname(parts[parts.length - 1]); // .js, .ts, or .tsx
    const baseNameWithoutExt = path.basename(parts[parts.length - 1], ext);
    const outFileBase = /\[.*\]/.test(baseNameWithoutExt)
      ? renderSegment(baseNameWithoutExt, context)
      : baseNameWithoutExt;
    const outFileName = outFileBase + ext;

    // Write the rendered file
    const outPath = path.join(targetDir, outFileName);
    fs.writeFileSync(outPath, renderedContent, 'utf8');
    console.log(`✔ Generated ${path.join(path.join(...renderedDirs), outFileName)}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
