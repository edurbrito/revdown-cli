interface Builder {
    result: string
    dir: string

    reset(dir)
    build_generic(title: string, resetcss: string, revealcss: string, revealjs: string)
    build_theme(theme: string)
    build_plugins(plugins: Array<string>)
    build_highlight_theme(theme?: string)
    build_markdown(markdown: string, separator: string, vseparator: string, noteseparator: string, charset: string)
    get_result(): string
}

export {Builder}