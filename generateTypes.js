#!/usr/bin/env node

const { execSync: exec } = require("child_process");
const rimraf = require("rimraf");
const { Project } = require("ts-morph");
const DTG_IMAGE_NAME = "dtg";

function runDTG(template) {
  rimraf.sync(`./${template}-output/**/*`);
  console.info("Running DTG for", template);
  const output = exec(
    `docker run -v $(pwd)/input:/input -v $(pwd)/outputs/${template}:/output -v $(pwd)/templates/${template}:/template ${DTG_IMAGE_NAME} -s /input -t /output -o templates=/template`
  );
  console.info(`Done with DTG: '${String(output)}'`);
}

function makeTypesUnique(src) {
  const project = new Project();

  project.addExistingSourceFiles(src + "/*.ts");
  const knownIdentifiers = [];

  const removeIfDuplicate = interface => {
    const name = interface.getName();
    if (knownIdentifiers.includes(name)) {
      console.info("Deleting duplicate:", name);
      interface.remove();
    } else {
      knownIdentifiers.push(name);
    }
  };

  project.getSourceFiles().forEach(source => {
    source.getInterfaces().forEach(removeIfDuplicate);
    source.getEnums().forEach(removeIfDuplicate);
  });

  project.saveSync();
}

rimraf.sync("./outputs/{typescript,graphql}/*");
runDTG("graphql");
runDTG("typescript");

makeTypesUnique("./outputs/typescript");
