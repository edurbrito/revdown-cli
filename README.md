<h1 align="center">revdown-cli</h1>
<p align="center">
<a href="https://github.com/edurbrito/revdown-cli/actions"><img src="https://github.com/edurbrito/revdown-cli/workflows/tests/badge.svg"></a>
</p>
<p align="center">
The markdown-to-reveal.js presentation CLI "transpiler"
</p>

## Motivation

The main goal is to automate the process of generating an HTML presentation from any Markdown file. It can be accomplished with the help of the open source HTML presentation framework [reveal.js](https://github.com/hakimel/reveal.js) that comes with a bunch of cool features for creating amazing browser presentations. This tool allows users to generate their presentations in-place from any of their Markdown files.

## Dependencies & Features

The main code was written entirely in TypeScript.

It queries the [GitHub API](https://api.github.com) to fetch the *reveal.js* repo, caching the user configurations when needed.

For the CLI interface, [*inquirer*](https://github.com/SBoudrias/Inquirer.js) and [*chalk*](https://github.com/chalk/chalk) were used.

## Install & Run

> Not tested with Windows or Mac. Some (directory) changes may be needed in order to work on these systems.

To install this CLI tool, run these commands:

1. Install [Node.js](https://nodejs.org/en/)
2. Clone this repository

`git clone https://github.com/edurbrito/revdown-cli.git`

3. Move to the cloned folder

`cd revdown-cli`

4. Install all the dependencies & Add it to your `bin` folder

`npm run bin`

> Note: You may need to guarantee `sudo` privileges

5. Now, on any markdown file, on any folder, in order to generate the *reveal.js* presentation, run

`revdown yourmarkdownfile.md`

6. Follow all the instructions until it finishes the presentation generation

7. Open in your favorite browser the `yourmarkdownfile.html` file that was created

## Test

Multiple Unit Tests made with [*QUnit*](https://github.com/qunitjs/qunit) were created for some of the functions and classes. These tests can be found inside the [test](test/) folder. To run them:

`npm run test`

To test the tool with an actual markdown test file (see the example file [here](test/example/test.md)), run:

`npm run test-file`

The result can be found at [test/example/test.html](test/example/test.html).

## Documentation

There is currently no documentation for the **revdown-cli** tool. 
*The full reveal.js documentation is available at [revealjs.com](https://revealjs.com).*

## License

MIT licensed

Copyright (C) 2021 Eduardo Brito, https://github.com/edurbrito, and **revdown-cli** contributors.