#!/usr/bin/env node

import * as fs from 'fs'
import fetch from 'node-fetch'
const log = console.log
const err = console.error

import * as chalk from "chalk"
import { OneChoiceQuestion } from "./factory/one-choice"
import { MultipleChoiceQuestion } from "./factory/multiple-choice"
import { MultipleInputQuestions } from "./factory/multiple-input"
import { ConfirmQuestion } from "./factory/confirm"
import { GenericBuilder } from "./builder/generic-builder"
import { Director } from "./builder/director"

let homedir = require('os').homedir() + "/"
const cache_dir = homedir + ".revdown/cache/"
const user_dir = homedir + ".revdown/user/"
const url = "https://api.github.com/repos/hakimel/reveal.js/git/trees/master?recursive=true"

let user_config = {
    theme: "",
    plugins: [],
    highlight_theme: ""
}

async function download_files(files, tree) {
    for (const node of tree) {
        for (const g of files) {
            if (node.path.includes(g)) {
                fetch(node.url, { method: "Get" })
                    .then(res => res.text())
                    .then(body => {
                        if (g.match(/.+\//))
                            fs.mkdirSync(cache_dir + g.match(/.+\//).toString(), { recursive: true })
                        fs.writeFileSync(cache_dir + g, Buffer.from(JSON.parse(body).content, 'base64').toString())
                    })

                break
            }
        }
    }
}

async function create_cache() {
    return fetch(url, { method: "Get" })
        .then((response) => {
            if (response.ok) {
                return response.text();
            } else {
                throw 'API not responding';
            }
        })
        .then(body => {
            fs.writeFileSync(cache_dir + "tree.json", body)
        })
}

function get_themes(tree): Array<string> {

    let themes = []

    for (const node of tree) {
        if (/.*\/theme\/.+\.css/.test(node.path)) {
            themes.push(node.path.replace(/^.+\//, ""))
        }
    }

    return themes
}

function get_fonts(tree): Array<string> {

    let fonts = []

    for (const node of tree) {
        if (/.*\/theme\/fonts\/.+\..+/.test(node.path)) {
            fonts.push(node.path.replace(/.*\/theme\//, ""))
        }
    }

    return fonts
}

function get_plugins(tree): Array<string> {

    let plugins = []

    for (const node of tree) {
        if (/.*\/?plugin\/(.+)\/\1\.js/.test(node.path)) {
            plugins.push(node.path.replace(/^.+\//, ""))
        }
    }

    return plugins
}

function get_highlight_themes(tree): Array<string> {

    let highlight_themes = []

    for (const node of tree) {
        if (/.*\/?highlight\/.+\.css/.test(node.path)) {
            highlight_themes.push(node.path.replace(/^.+\//, ""))
        }
    }

    return highlight_themes
}

function ask_user(markdown_file: string) {
    if (!fs.existsSync(cache_dir))
        fs.mkdirSync(cache_dir, { recursive: true })

    create_cache().then(() => {
        fs.readFile(cache_dir + "tree.json", 'utf8', (error, data) => {
            let tree = JSON.parse(data).tree

            download_files(['reveal.css', 'reset.css', 'reveal.js'], tree)

            let themes = get_themes(tree)

            new OneChoiceQuestion("theme", "Which theme do you want to choose?", themes).create_question((a) => {
                user_config.theme = a.theme

                download_files([a.theme], tree)

                let fonts = get_fonts(tree)

                download_files(fonts, tree)

                let plugins = get_plugins(tree)

                new MultipleChoiceQuestion("plugins", "Which plugins do you want to include?", plugins).create_question((a) => {
                    user_config.plugins = a.plugins
                    download_files(a.plugins, tree)

                    if (a.plugins.includes("highlight.js")) {
                        let highlight_themes = get_highlight_themes(tree)
                        new OneChoiceQuestion("hitheme", "Which highlight theme do you want to choose?", highlight_themes).create_question((a) => {
                            user_config.highlight_theme = a.hitheme
                            download_files([a.hitheme], tree)
                            generate_slides(markdown_file)
                            fs.writeFileSync(user_dir + "user.json", JSON.stringify(user_config))
                        })
                    }
                    else {
                        generate_slides(markdown_file)
                        fs.writeFileSync(user_dir + "user.json", JSON.stringify(user_config))
                    }
                })
            })
        })
    }).catch((error) => {
        err(`An error <${error}> has occurred. Aborting the execution...`)
    })
}

function generate_slides(markdown_file: string) {

    new MultipleInputQuestions(
        [
            {
                type: "input",
                name: "separator",
                message: "What is the (Regex style) markdown horizontal separator (default is ^---)",
                default: "^---"
            },
            {
                type: "input",
                name: "vseparator",
                message: "What is the (Regex style) markdown vertical separator (default is ^:::)",
                default: "^:::"
            },
            {
                type: "input",
                name: "noteseparator",
                message: "What is the (Regex style) markdown note separator (default is ^%%%)",
                default: "^%%%"
            },
            {
                type: "input",
                name: "charset",
                message: "What is the markdown charset (default is iso-8859-15)",
                default: "iso-8859-15"
            }
        ]
    ).create_question((a) => {
        let title = markdown_file.replace(/\.md/, "")
        let markdown = fs.readFileSync(markdown_file).toString()

        let director = new Director(cache_dir, new GenericBuilder())
        let result = director.make(
            [
                title,
                "reset.css",
                "reveal.css",
                "reveal.js"
            ],
            user_config.theme,
            user_config.plugins,
            [markdown, a.separator, a.vseparator, a.noteseparator, a.charset],
            user_config.highlight_theme
        ).get_result()

        fs.writeFileSync(title + ".html", result)

        log(chalk.yellow("Slides generated at " + title + ".html"))
    })
}

function main(): number {

    if (process.argv.length == 3 && /.+\.md/.test(process.argv[2])) {

        let markdown_file = process.argv[2]

        try {

            log(chalk.yellow.bold(
`---------------------------------
|                               |
|                               |
|        revdown-cli            |
|                               |
| v1.0.0                        |
---------------------------------`))

            if (!fs.existsSync(user_dir + "user.json")) {
                fs.mkdirSync(user_dir, { recursive: true })
                ask_user(markdown_file)
            }
            else {
                fs.readFile(user_dir + "user.json", 'utf8', (error, data) => {
                    user_config = JSON.parse(data)
                    new ConfirmQuestion("last", `Last configuration was\nTheme: ${chalk.yellow(user_config.theme)}\nPlugins: ${chalk.blue(user_config.plugins)}\nHighlight Theme: ${chalk.red(user_config.highlight_theme)}\nDo you want to keep it?`).create_question((a) => {
                        if (!a.last) {
                            ask_user(markdown_file)
                        }
                        else {
                            generate_slides(markdown_file)
                        }
                    })
                })
            }

        }
        catch (error) {
            err(`An error <${error}> has occurred. Aborting the execution...`)
            return 1
        }
        return 0
    }

    err("Usage: revdown mymarkdownfile.md", process.argv.length)

    return 1
}

if (require.main === module && main()) {
    err("Program exited with code 1.")
}

export { fs, cache_dir, user_dir, get_themes, get_fonts, get_plugins, get_highlight_themes }