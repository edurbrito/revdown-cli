import { GenericBuilder } from '../src/builder/generic-builder'
import { Director } from '../src/builder/director'
import { QUnit } from 'qunit'

QUnit.module("director")

let generic_builder = new GenericBuilder()
let generic_builder_copy = new GenericBuilder()
let director = new Director("mydir", generic_builder)

QUnit.test('make', assert => {

    generic_builder_copy.reset("mydir")
    generic_builder_copy.build_generic("title", "resetcss", "revealcss", "revealjs")
    generic_builder_copy.build_theme("theme")
    generic_builder_copy.build_plugins(["plugin1", "plugin2", "plugin3"])
    generic_builder_copy.build_markdown("mdfile", "---", ":::", ";;;", "charset")
    generic_builder_copy.build_highlight_theme("hitheme")

    director.make(["title", "resetcss", "revealcss", "revealjs"], "theme", ["plugin1", "plugin2", "plugin3"], ["mdfile", "---", ":::", ";;;", "charset"], "hitheme")

    assert.equal(generic_builder_copy.get_result().toString(), director.get_result().toString(), "director make")

    generic_builder_copy.reset("mydir")
    generic_builder_copy.build_generic("title", "resetcss", "revealcss", "revealjs")
    generic_builder_copy.build_theme("theme")
    generic_builder_copy.build_plugins(["plugin1", "plugin2", "plugin3"])
    generic_builder_copy.build_markdown("mdfile", "---", ":::", ";;;", "charset")
    generic_builder_copy.build_highlight_theme(null)

    director.make(["title", "resetcss", "revealcss", "revealjs"], "theme", ["plugin1", "plugin2", "plugin3"], ["mdfile", "---", ":::", ";;;", "charset"])

    assert.equal(generic_builder_copy.get_result().toString(), director.get_result().toString(), "director make")
})