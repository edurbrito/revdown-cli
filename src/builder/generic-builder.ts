import { Builder } from './builder'

class GenericBuilder implements Builder {
    result: string
    dir: string

    static template: string = 
`
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>%{title}</title>
<link rel="stylesheet" href="%{reset.css}">
<link rel="stylesheet" href="%{reveal.css}">
<link rel="stylesheet" href="%{theme}" id="theme">
%{hitheme}
</head>
<body>
<div class="reveal">
<div class="slides">
<section data-markdown data-separator="%{separator}" data-separator-vertical="%{vseparator}" data-separator-notes="%{noteseparator}" data-charset="%{charset}">
<textarea data-template>
%{markdown}
</textarea>
</section>
</div>
</div>
<script src="%{reveal.js}"></script>
%{pluginsjs}
<script>
Reveal.initialize({
hash: true,
plugins: %{revealplugins}
});
</script>
</body>
</html>
`

    reset(dir) {
        this.result = GenericBuilder.template
        this.dir = dir
    }

    build_generic(title: string, resetcss: string, revealcss: string, revealjs: string) {
        this.result = this.result.replace("%{title}", title)
            .replace("%{reset.css}", this.dir + resetcss)
            .replace("%{reveal.css}", this.dir + revealcss)
            .replace("%{reveal.js}", this.dir + revealjs)
    }

    build_theme(theme: string) {
        this.result = this.result.replace("%{theme}", this.dir + theme)
    }

    build_plugins(plugins: string[]) {

        let str_js = ""
        let str_reveal = ""

        for (let p of plugins) {
            str_js += `<script src="${this.dir + p}"></script>\n`
            p = p.charAt(0).toUpperCase() + p.slice(1)
            str_reveal += "Reveal" + p.replace(".js", "") + ", "
        }

        str_reveal = str_reveal.replace(/\,$/,"")
        this.result = this.result.replace("%{pluginsjs}", str_js).replace("%{revealplugins}", `[${str_reveal}]`)
    }

    build_highlight_theme(theme?: string) {
        if (theme != null)
            this.result = this.result.replace("%{hitheme}", `<link rel="stylesheet" href="${this.dir + theme}" id="highlight-theme">`)
        else
            this.result = this.result.replace("%{hitheme}", "")

    }

    build_markdown(markdown: string, separator: string, vseparator: string, noteseparator: string, charset: string) {
        this.result = this.result.replace("%{markdown}", markdown)
            .replace("%{separator}", separator)
            .replace("%{vseparator}", vseparator)
            .replace("%{noteseparator}", noteseparator)
            .replace("%{charset}", charset)
    }

    get_result(): string {
        return this.result
    }
}

export { GenericBuilder }