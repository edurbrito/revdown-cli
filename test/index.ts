import * as index from '../src/index'
import { const_tree } from './tree'
const cache_dir = index.cache_dir
import { QUnit } from 'qunit'
import * as builder from './builder'
import * as director from './director'

QUnit.module("index")

try {
    let tree = JSON.parse(index.fs.readFileSync(cache_dir + "tree.json", 'utf8')).tree

    QUnit.test('get_themes test', assert => {
        assert.notEqual(index.get_themes(tree).length, 0, 'get_themes().length != 0')
    })

    QUnit.test('get_fonts test', assert => {
        assert.notEqual(index.get_fonts(tree).length, 0, 'get_fonts().length != 0')
    })

    QUnit.test('get_plugins test', assert => {
        assert.notEqual(index.get_plugins(tree).length, 0, 'get_plugins().length != 0')
    })

    QUnit.test('get_highlight_themes test', assert => {
        assert.notEqual(index.get_highlight_themes(tree).length, 0, 'get_highlight_themes().length != 0')
    })

    tree = const_tree

    QUnit.test('get_themes test', assert => {
        assert.equal(index.get_themes(tree).length, 13, 'get_themes().length == 13')
    })

    QUnit.test('get_fonts test', assert => {
        assert.equal(index.get_fonts(tree).length, 17, 'get_fonts().length == 17')
    })

    QUnit.test('get_plugins test', assert => {
        assert.equal(index.get_plugins(tree).length, 6, 'get_plugins().length == 6')
    })

    QUnit.test('get_highlight_themes test', assert => {
        assert.equal(index.get_highlight_themes(tree).length, 2, 'get_highlight_themes().length == 2')
    })

    QUnit.test('get_themes test', assert => {
        assert.deepEqual(index.get_themes(tree), [
            "beige.css",
            "black.css",
            "blood.css",
            "league-gothic.css",
            "source-sans-pro.css",
            "league.css",
            "moon.css",
            "night.css",
            "serif.css",
            "simple.css",
            "sky.css",
            "solarized.css",
            "white.css"
        ], 'get_themes() list of themes')
    })

    QUnit.test('get_fonts test', assert => {
        assert.deepEqual(index.get_fonts(tree), [
            "fonts/league-gothic/league-gothic.css",
            "fonts/league-gothic/league-gothic.eot",
            "fonts/league-gothic/league-gothic.ttf",
            "fonts/league-gothic/league-gothic.woff",
            "fonts/source-sans-pro/source-sans-pro-italic.eot",
            "fonts/source-sans-pro/source-sans-pro-italic.ttf",
            "fonts/source-sans-pro/source-sans-pro-italic.woff",
            "fonts/source-sans-pro/source-sans-pro-regular.eot",
            "fonts/source-sans-pro/source-sans-pro-regular.ttf",
            "fonts/source-sans-pro/source-sans-pro-regular.woff",
            "fonts/source-sans-pro/source-sans-pro-semibold.eot",
            "fonts/source-sans-pro/source-sans-pro-semibold.ttf",
            "fonts/source-sans-pro/source-sans-pro-semibold.woff",
            "fonts/source-sans-pro/source-sans-pro-semibolditalic.eot",
            "fonts/source-sans-pro/source-sans-pro-semibolditalic.ttf",
            "fonts/source-sans-pro/source-sans-pro-semibolditalic.woff",
            "fonts/source-sans-pro/source-sans-pro.css"
        ], 'get_fonts() list of fonts')
    })

    QUnit.test('get_plugins test', assert => {
        assert.deepEqual(index.get_plugins(tree), [
            "highlight.js",
            "markdown.js",
            "math.js",
            "notes.js",
            "search.js",
            "zoom.js"
        ], 'get_plugins() list of plugins')
    })

    QUnit.test('get_highlight_themes test', assert => {
        assert.deepEqual(index.get_highlight_themes(tree), [
            "monokai.css",
            "zenburn.css"
        ], 'get_highlight_themes() list of highlight themes')
    })

}
catch (err) {
    console.error(`An Error <${err}> has occurred. Aborted testing...`)
}


