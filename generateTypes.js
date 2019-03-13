#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync: exec } = require("child_process");
const rimraf = require("rimraf");

function getFilePaths(dir = __dirname + "/outputs/typescript") {
  const OUTPUT_SUFFIXES = [".ts"];
  const files = fs.readdirSync(dir);

  return (
    files
      // remove files with wrong ending
      .filter(path => OUTPUT_SUFFIXES.some(suffix => path.includes(suffix)))
  );
}

// This is only needed because DTG creates .raml.ts files instead of .ts
function getFileName(file) {
  return file.substring(0, file.indexOf("."));
}

function removeSuffix(file) {
  return path.basename(file, ".ts");
}

function runDTG(template) {
  rimraf.sync(`./${template}-output/**/*`);
  console.info("Running DTG for", template);
  const output = exec(
    `docker run -v $(pwd)/input:/input -v $(pwd)/outputs/${template}:/output -v $(pwd)/templates/${template}:/template dtg -s /input -t /output -o templates=/template`
  );
  console.info(`Done with DTG: '${String(output)}'`);
}

rimraf.sync("./outputs/{typescript,graphql}/*");
runDTG("graphql");
runDTG("typescript");

// Build Typescript export
const files = getFilePaths();
console.info(`Found ${files.length} files`);

// Create wire up file that imports all generated files
fs.writeFileSync(
  "./outputs/typescript/index.ts",
  `/** THIS FILE IS GENERATED, DO NOT EDIT IT DIRECTLY
* THE SOURCE FOR THIS IS AT ./generateTypes.js
**/
${files
  .map(
    file => `import * as ${getFileName(file)} from "./${removeSuffix(file)}";
`
  )
  .join("")}

export default {
    ${files
      .map(file => `${getFileName(file)}: ${getFileName(file)}`)
      .join(",\n")}
}
`
);
