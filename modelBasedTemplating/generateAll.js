// templateGenerator/generateAll.js
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const inquirer = require('inquirer').default;

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

async function main() {
  // 1) Prompt the user for answers
  const answers = await inquirer.prompt([
    {
      name: 'name',
      message: 'Singular name (e.g. user):',
      validate: v => v ? true : 'This field is required'
    },
    {
      name: 'pluralName',
      message: 'Plural name (e.g. users):',
      validate: v => v ? true : 'This field is required'
    },
    {
      name: 'templates',
      message: 'Templates directory:',
      default: path.resolve(__dirname, 'templates')
    },
    {
      name: 'outDir',
      message: 'Output directory:',
      default: path.resolve(__dirname, 'generated')
    }
  ]);

  const { name, pluralName, templates, outDir } = answers;
  const Name = capitalize(name);
  const PluralName = capitalize(pluralName);

  // 2) Ensure output dir exists
  fs.mkdirSync(outDir, { recursive: true });

  // 3) Grab every .js template file
  const files = fs.readdirSync(templates).filter(f => f.endsWith('.js'));

  for (const file of files) {
    const tplModule = require(path.join(templates, file));
    const templateString = typeof tplModule === 'string'
      ? tplModule
      : tplModule.default || tplModule.template || '';

    const rendered = ejs.render(templateString, {
      name,
      Name,
      pluralName,
      PluralName,
      cap: capitalize,
    });

    const base = file.replace(/\.js$/, '');
    const outName = base
      .split(/[\-_ ]+/).map(capitalize).join('')
      + '.js';

    fs.writeFileSync(path.join(outDir, outName), rendered);
    console.log(`✔ Generated ${outName}`);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
