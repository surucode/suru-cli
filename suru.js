const fs = require("fs");
const process = require("process");
const path = require("path");

task(() => {
  name("build");
  desc("build suru with suru");

  shell("npx", "tsc", "-d");

  run(() => {
    const package_json = fs.readFileSync(__dirname + "/package.json", {
      encoding: "utf-8",
      flag: "r"
    });
    const package = JSON.parse(package_json);
    package.main = "index.js";
    package.types = "index.d.ts";

    delete package.devDependencies;
    delete package.scripts;

    fs.writeFileSync(
      __dirname + "/dist/package.json",
      JSON.stringify(package, null, 3)
    );

    try {
      fs.unlinkSync(__dirname + "/dist/package-lock.json");
    } catch (err) {
      console.error(err);
    }
  });
});

task(() => {
  name("publish");
  desc("publish suru-cli");

  shell("npm", "install");

  invoke("build")();

  run(() => {
    process.chdir(path.resolve("./dist", __dirname));
  });

  shell("npm", "publish", "@surucode/suru-cli");
});

task(() => {
  name("test");
  desc("test with jest");

  shell("npm", "t", "--", "--watch");
});
