## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test -- --coverage --watchAll`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### Canvas tests

This one is a bit crazy. I know people were able to just get it to work on their macs but not me. npm install canvas just does not do the trick for me. I had to install a mac canvas adapter thing but I am not 100% sure it work. I had to add a bunch things to my test.js to make it work. I am not sure which platform you will be testing but it is not suppose to matter.

The below results are what I got.

-----------------|---------|----------|---------|---------|-------------------
File             | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-----------------|---------|----------|---------|---------|-------------------
All files        |   82.53 |    57.14 |   85.71 |   82.16 |
 src             |   69.56 |      100 |   44.44 |   69.56 |
  App.js         |   72.22 |      100 |   44.44 |   72.22 | 46-50
  TestConfigs.js |     100 |      100 |     100 |     100 |
  index.js       |       0 |      100 |     100 |       0 | 6-7
 src/boundary    |   89.28 |    55.55 |     100 |   88.67 |
  Boundary.js    |   89.28 |    55.55 |     100 |   88.67 | 56-60,70
 src/controller  |   96.29 |    91.66 |     100 |   96.29 |
  Controller.js  |   96.29 |    91.66 |     100 |   96.29 | 5
 src/model       |    77.1 |    48.97 |     100 |   76.82 |
  Model.js       |   76.25 |    48.97 |     100 |   75.94 | 94-126
  configs.js     |     100 |      100 |     100 |     100 |
-----------------|---------|----------|---------|---------|-------------------
Test Suites: 1 passed, 1 total
Tests:       13 passed, 13 total