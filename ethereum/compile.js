// compile code will go here
const fs = require("fs-extra");
const path = require("path");
const solc = require("solc");

const buildPath = path.resolve(__dirname, "build");
const flipkartPath = path.resolve(__dirname, "contracts", "FlipKart.sol");
const tokenPath = path.resolve(__dirname, "contracts", "Token.sol");
const source1 = fs.readFileSync(flipkartPath, "utf-8");
const source2 = fs.readFileSync(tokenPath, "utf-8");

const input = {
  language: "Solidity",
  sources: {
    "FlipKart.sol": {
      content:
        'import "@openzeppelin/contracts/utils/Strings.sol";' + String(source1),
    },
    "Token.sol": {
      content: source2,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

function findImports(relativePath) {
  //my imported sources are stored under the node_modules folder!
  const absolutePath = path.resolve(__dirname, "../node_modules", relativePath);
  const source = fs.readFileSync(absolutePath, "utf8");
  return { contents: source };
}

// New syntax (supported from 0.5.12, mandatory from 0.6.0)
const output = JSON.parse(
  solc.compile(JSON.stringify(input), { import: findImports })
);

fs.removeSync(buildPath);
fs.ensureDirSync(buildPath);

for (let contracts in output.contracts) {
  for (let contract in output.contracts[contracts]) {
    fs.outputJSONSync(
      path.resolve(buildPath, contract + ".json"),
      output.contracts[contracts][contract]
    );
  }
}
