---
to: packages/<%=package%>/package.json
---
{
  "name": "@rocket.chat/<%=package%>",
  "version": "<%=version%>",
  "description": "<%=description%>",
  "keywords": [
    "string",
    "helpers"
  ],
  "author": {
    "name": "Rocket.Chat",
    "url": "https://rocket.chat/"
  },
  "homepage": "https://github.com/RocketChat/Rocket.Chat.Fuselage#readme",
  "license": "MIT",
  "publishConfig": {
    "access": "public"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/RocketChat/Rocket.Chat.Fuselage.git",
    "directory": "packages/<%=package%>"
  },
  "bugs": {
    "url": "https://github.com/RocketChat/Rocket.Chat.Fuselage/issues"
  },
  "main": "dist/cjs/index.js",
  "module": "dist/esm/index.js",
  "types": "dist/esm/index.d.ts",
  "typesVersions": {
    "<4.1": {
      "*": [
        "dist/ts3.4/*"
      ]
    }
  },
  "files": [
    "/dist"
  ],
  "scripts": {
    "build": "run-s .:build:clean .:build:esm .:build:cjs .:build:ts3.4",
    ".:build:clean": "rimraf dist",
    ".:build:esm": "tsc -p tsconfig-esm.json",
    ".:build:cjs": "tsc -p tsconfig-cjs.json",
    ".:build:ts3.4": "downlevel-dts dist/esm/ dist/ts3.4/ --to=3.4",
    "lint": "eslint src",
    "lint-fix": "eslint --fix src",
    "lint-staged": "lint-staged",
    "test": "jest --runInBand",
    "docs": "typedoc"
  },
  "devDependencies": {
    "@rocket.chat/eslint-config-alt": "^0.27.0",
    "@rocket.chat/prettier-config": "^0.27.0",
    "@types/jest": "^26.0.23",
    "downlevel-dts": "^0.7.0",
    "eslint": "^7.26.0",
    "jest": "^26.6.3",
    "lint-staged": "^11.0.0",
    "npm-run-all": "^4.1.5",
    "prettier": "^2.2.1",
    "rimraf": "^3.0.2",
    "ts-jest": "^26.5.6",
    "typedoc": "^0.20.36",
    "typescript": "^4.2.4"
  },
  "dependencies": {
    "tslib": "^2.2.0"
  }
}
