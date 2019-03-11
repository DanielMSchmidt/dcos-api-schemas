#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync: exec } = require("child_process");
const rimraf = require("rimraf");

function runDTG() {
  console.info("Running DTG");
  const output = exec(
    "docker run -v $(pwd)/input:/input -v $(pwd)/output:/output -v $(pwd)/graphql-template:/template dtg -s /input -t /output -o templates=/template"
  );
  console.info(`Done with DTG: '${String(output)}'`);
}

rimraf.sync("./output/**/*");
runDTG();
