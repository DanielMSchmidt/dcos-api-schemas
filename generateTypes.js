#!/usr/bin/env node

const { execSync: exec } = require("child_process");
const rimraf = require("rimraf");

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
