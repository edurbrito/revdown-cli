<h1 align="center">revdown-cli</h1>
<p align="center">
<a href="https://github.com/edurbrito/revdown-cli/actions"><img src="https://github.com/edurbrito/revdown-cli/workflows/tests/badge.svg"></a>
</p>
<p align="center">
The markdown-to-<a href="revealjs.com">revealjs</a> presentation cli "transpiler"
</p>

## Install & Run

To install this cli tool, run these commands:

1. Install [Node.js](https://nodejs.org/en/)
2. Clone this repository

`git clone https://github.com/edurbrito/revdown-cli.git`

3. Move to the cloned folder

`cd revdown-cli`

4. Install all the dependencies & Add it to your `bin` folder

`npm run bin`

> Note: You may need to guarantee `sudo` privileges

5. Now, on any markdown file, on any folder, in order to generate the *revealjs* presentation, run

`revdown yourmarkdownfile.md`

6. Open in your favorite browser the `yourmarkdownfile.html` file that was created

## Test

Multiple Unit Tests were created for some of the functions and classes. These tests can be found inside the [test](test/) folder. To run them:

`npm run test`

To test the tool with an actual markdown test file (see the example file [here](test/example/test.md)), run:

`npm run test-file`

The result can be found at [test/example/test.html](test/example/test.html).

## Documentation

There is currently no documentation for the **revdown-cli** tool. 
*The full reveal.js documentation is available at [revealjs.com](https://revealjs.com).*

## License

MIT licensed

Copyright (C) 2021 Eduardo Brito, https://github.com/edurbrito, and revdown-cli contributors