import marked, { Renderer } from 'marked'
import { observable, action, computed, autorun } from 'mobx'
import Inferno from 'inferno'
import InfernoDOM from 'inferno-dom'
import Component from 'inferno-component'
import createElement from 'inferno-create-element'
import { observer } from 'mobx-inferno'

require('normalize-css')
require('font-awesome-webpack')

const css = require('./main.css')

const root = document.getElementById('app')

/**
 *
 *  Document mobX Store
 *  @observable, @computed, @action
 *
 */

class MarkdownDocument {

  constructor() {
    this.renderer = new Renderer()
  }

  @observable tokens = []

  @observable filename = null
  @observable createdOn = new Date('August 20, 2016')

  @computed get dateParts () {
    const splitDate = this.createdOn.toGMTString().split(' ')
    const day = splitDate[1]
    const month = splitDate[2]
    const year = splitDate[3]

    return { day, month, year}
  }

  // @observable content = "# A Boy and A Fish\n\n[This is a link](http://lushfuture.com) in markdown"
  @observable content = `
  An h1 header
============

Paragraphs are separated by a blank line.

2nd paragraph. *Italic*, **bold**, and \`monospace\`. Itemized lists
look like:

  * this one
  * that one
  * the other one

Note that --- not considering the asterisk --- the actual text
content starts at 4-columns in.

> Block quotes are
> written like so.
>
> They can span multiple paragraphs,
> if you like.

Use 3 dashes for an em-dash. Use 2 dashes for ranges (ex., "it's all
in chapters 12--14"). Three dots ... will be converted to an ellipsis.
Unicode is supported. ☺



An h2 header
------------

Here's a numbered list:

 1. first item
 2. second item
 3. third item

Note again how the actual text starts at 4 columns in (4 characters
from the left side). Here's a code sample:

    # Let me re-iterate ...
    for i in 1 .. 10 { do-something(i) }

As you probably guessed, indented 4 spaces. By the way, instead of
indenting the block, you can use delimited blocks, if you like:

~~~
define foobar() {
    print "Welcome to flavor country!";
}
~~~

(which makes copying & pasting easier). You can optionally mark the
delimited block for Pandoc to syntax highlight it:

~~~python
import time
# Quick, count to ten!
for i in range(10):
    # (but not *too* quick)
    time.sleep(0.5)
    print i
~~~



### An h3 header ###

Now a nested list:

 1. First, get these ingredients:

      * carrots
      * celery
      * lentils

 2. Boil some water.

 3. Dump everything in the pot and follow
    this algorithm:

        find wooden spoon
        uncover pot
        stir
        cover pot
        balance wooden spoon precariously on pot handle
        wait 10 minutes
        goto first step (or shut off burner when done)

    Do not bump wooden spoon or it will fall.

Notice again how text always lines up on 4-space indents (including
that last line which continues item 3 above).

Here's a link to [a website](http://foo.bar), to a [local
doc](local-doc.html), and to a [section heading in the current
doc](#an-h2-header). Here's a footnote [^1].

[^1]: Footnote text goes here.

Tables can look like this:

size  material      color
----  ------------  ------------
9     leather       brown
10    hemp canvas   natural
11    glass         transparent

Table: Shoes, their sizes, and what they're made of

(The above is the caption for the table.) Pandoc also supports
multi-line tables:

--------  -----------------------
keyword   text
--------  -----------------------
red       Sunsets, apples, and
          other red or reddish
          things.

green     Leaves, grass, frogs
          and other things it's
          not easy being.
--------  -----------------------

A horizontal rule follows.

***

Here's a definition list:

apples
  : Good for making applesauce.
oranges
  : Citrus!
tomatoes
  : There's no "e" in tomatoe.

Again, text is indented 4 spaces. (Put a blank line between each
term/definition pair to spread things out more.)

Here's a "line block":

| Line one
|   Line too
| Line tree

and images can be specified like so:

![example image](http://images.akamai.steamusercontent.com/ugc/452985461540266384/E881CC4C258196F4390630E2CD19B1B8CA68F60D/ "An exemplary image")

Inline math equations go in like so: $\omega = d\phi / dt$. Display
math should get its own line and be put in in double-dollarsigns:

$$I = \int \rho R^{2} dV$$

And note that you can backslash-escape any punctuation characters
which you wish to be displayed literally, ex.: \`foo\`, \*bar\*, etc.
`

  @computed get markedContent() {
    return marked.parse(this.content, {renderer: this.renderer})
  }

  @action update = content => {
    // ...
    this.content = content
    // ...
  }

}

const mdDoc = new MarkdownDocument()



/**
 *
 *  MarkdownView Component
 *  @observer
 *
 */

const htmlStringToDOM = htmlString => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlString, "text/html")
  const body = doc.body
  const children = Array.from(body.children)
  return children
}


@observer
class MarkdownView extends Component {
  render() {
    const mdContent = htmlStringToDOM(this.props.md.markedContent)


    const lines = this.props.md.content.split('\n\n')

    console.log(lines)

    console.log({markedContent: this.props.md.markedContent}, 'htmlStringToDOM', mdContent)

    // <section dangerouslySetInnerHTML={{__html: this.props.md.markedContent}} />
    return (
      <div className={css.appContainer}>
        <div className={css.columnA}>
          <div className={css.documentDate}>
            <p className={css.month}>{`${this.props.md.dateParts.month}`.toUpperCase()}</p>
            <p className={css.day}>{this.props.md.dateParts.day}</p>
            <p className={css.year}>{this.props.md.dateParts.year}</p>
          </div>
        </div>
        <div className={css.markdownView}>
        {
          htmlStringToDOM(this.props.md.markedContent).map((mdElement, i) => {
            const lineHtml = mdElement.outerHTML
            return createElement('div', {
              key: `line-${i}`,
              id: `line-${i}`,
              className: css.line
            }, [
                createElement('span', {className: css.lineLabel}, i),
                createElement('div', {
                  className: css.lineBody,
                  mdLine: true,
                  dangerouslySetInnerHTML: {__html: lineHtml}
                }, null)
            ]
          )
          })
        }
        </div>
        <textarea
          className={css.mdEditor}
          onKeyUp={e => {
            // e.preventDefault()
            console.log({target: e.target.value})
            this.props.md.content = e.target.value
          }}
          value={this.props.md.content}/>
      </div>
    )
  }
}


/**
 *
 *  InfernoDOM Root Renderer
 *
 */

InfernoDOM.render(
  <MarkdownView md={mdDoc} />,
  root
)

/*

Block level renderer methods
code(code, string language)
blockquote(string quote)
html(string html)
heading(string text, number level)
hr()
list(string body, boolean ordered)
listitem(string text)
paragraph(string text)
table(string header, string body)
tablerow(string content)
tablecell(string content, object flags)



mdRenderer.code = (code, language) => {
  //
}
mdRenderer.blockquote = (quote) => {
  //
}
mdRenderer.html = (html) => {
  //
}
mdRenderer.heading = (text, level) => {
  //
}
mdRenderer.hr = () => {
  //
}
mdRenderer.list = (body, ordered) => {
  //
}
mdRenderer.listitem = (text) => {
  //
}
mdRenderer.paragraph = (text) => {
  //
}
mdRenderer.table = (header, body) => {
  //
}
mdRenderer.tablerow = (content) => {
  //
}
mdRenderer.tablecell = (content, flags) => {
  //
}



Inline level renderer methods
strong(string text)
em(string text)
codespan(string code)
br()
del(string text)
link(string href, string title, string text)
image(string href, string title, string text)

*/
