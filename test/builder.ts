import { GenericBuilder } from '../src/builder/generic-builder'
import { QUnit } from 'qunit'

QUnit.module("generic_builder")

let generic_builder = new GenericBuilder()

QUnit.test('reset', assert => {

    generic_builder.reset("a beautiful dir")

    assert.equal(generic_builder.dir, "a beautiful dir", "generic_builder.dir")

    assert.equal(generic_builder.get_result(), GenericBuilder.template, "generic_builder.template")
})

QUnit.test('build_generic', assert => {

    generic_builder.reset("")

    generic_builder.build_generic("atitle", "resetcss", "revealcss", "revealjs")

    assert.equal(generic_builder.get_result().search("%{title}"), -1, "generic_builder title 1")

    assert.equal(generic_builder.get_result().search("<title>atitle</title>"), 161, "generic_builder title 2")

    assert.equal(generic_builder.get_result().search("%{resetcss}"), -1, "generic_builder resetcss 1")

    assert.equal(generic_builder.get_result().search('<link rel="stylesheet" href="resetcss">'), 183, "generic_builder resetcss 2")

    assert.equal(generic_builder.get_result().search("%{revealcss}"), -1, "generic_builder revealcss 1")

    assert.equal(generic_builder.get_result().search('<link rel="stylesheet" href="revealcss">'), 223, "generic_builder revealcss 2")

    assert.equal(generic_builder.get_result().search("%{revealjs}"), -1, "generic_builder revealjs 1")

    assert.equal(generic_builder.get_result().search('<script src="revealjs"></script>'), 617, "generic_builder revealjs 2")
})

QUnit.test('build_theme', assert => {

    generic_builder.reset("")

    generic_builder.build_theme("atheme")

    assert.equal(generic_builder.get_result().search("%{theme}"), -1, "generic_builder theme 1")

    assert.equal(generic_builder.get_result().search(`<link rel="stylesheet" href="atheme" id="theme">`), 274, "generic_builder theme 2")
})

QUnit.test('build_plugins', assert => {

    generic_builder.reset("")

    generic_builder.build_plugins(["plugin1", "plugin2", "plugin3"])

    assert.equal(generic_builder.get_result().search("%{pluginsjs}"), -1, "generic_builder plugins 1")

    assert.equal(generic_builder.get_result().search(`<script src="plugin1"></script>`), 664, "generic_builder plugins 2")

    assert.equal(generic_builder.get_result().search(`<script src="plugin2"></script>`), 696, "generic_builder plugins 3")

    assert.equal(generic_builder.get_result().search(`<script src="plugin3"></script>`), 728, "generic_builder plugins 4")

    assert.equal(generic_builder.get_result().search(`<script src="plugin4"></script>`), -1, "generic_builder plugins 5")

    assert.equal(generic_builder.get_result().match(/\<script src\="plugin\d"\>\<\/script\>/g).length, 3, "generic_builder plugins 6")

    assert.equal(generic_builder.get_result().search(`%{revealplugins}`), -1, "generic_builder plugins 7")

    assert.equal(generic_builder.get_result().search(`[RevealPlugin1, RevealPlugin2, RevealPlugin3, ]`), 8, "generic_builder plugins 8")
})

QUnit.test('build_highlight_theme', assert => {

    generic_builder.reset("")

    generic_builder.build_highlight_theme("atheme")

    assert.equal(generic_builder.get_result().search("%{hitheme}"), -1, "generic_builder highlight_theme 1")

    assert.equal(generic_builder.get_result().search(`<link rel="stylesheet" href="atheme" id="highlight-theme">`), 325, "generic_builder highlight_theme 2")

    generic_builder.reset("")

    generic_builder.build_highlight_theme()

    assert.equal(generic_builder.get_result().search("%{hitheme}"), -1, "generic_builder highlight_theme 3")

    assert.equal(generic_builder.get_result().search(`<link rel="stylesheet" href="atheme" id="highlight-theme">`), -1, "generic_builder highlight_theme 4")
})

QUnit.test('build_markdown', assert => {

    generic_builder.reset("")

    generic_builder.build_markdown("mdfile", "---", ":::", ";;;", "charset")

    assert.equal(generic_builder.get_result().search("%{markdown}"), -1, "generic_builder markdown 1")

    assert.equal(generic_builder.get_result().search("%{separator}"), -1, "generic_builder separator 1")

    assert.equal(generic_builder.get_result().search("%{vseparator}"), -1, "generic_builder vseparator 1")

    assert.equal(generic_builder.get_result().search("%{noteseparator}"), -1, "generic_builder noteseparator 1")

    assert.equal(generic_builder.get_result().search("%{charset}"), -1, "generic_builder charset 1")

    assert.equal(generic_builder.get_result().search('<section data-markdown data-separator="---" data-separator-vertical=":::" data-separator-notes=";;;" data-charset="charset">'), 393, "generic_builder markdown 2")
})
