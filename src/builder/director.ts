import { Builder } from './builder'

class Director {
    dir: string
    builder: Builder

    constructor(dir: string, builder: Builder) {
        this.dir = dir
        this.builder = builder
    }

    make(generic: [string,string,string,string], theme: string, plugins: Array<string>, markdown: [string,string,string,string,string], hitheme?: string) : Director {

        this.builder.reset(this.dir)
        this.builder.build_generic(...generic)
        this.builder.build_theme(theme)
        this.builder.build_plugins(plugins)
        this.builder.build_markdown(...markdown)
        this.builder.build_highlight_theme(hitheme)
        
        return this
    }

    get_result(){
        return this.builder.get_result()
    }
}

export { Director }