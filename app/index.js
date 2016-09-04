import marked, { Renderer } from 'marked'
import { observable, action, computed, autorun } from 'mobx'
import Inferno from 'inferno'
import InfernoDOM from 'inferno-dom'
import Component from 'inferno-component'
import { observer } from 'mobx-inferno'

const root = document.createElement('div')
document.body.appendChild(root)


/**
 *
 *  MarkdownView Component
 *  @observer
 *
 */

@observer
class MarkdownView extends Component {
  render() {
    return (
      { /* < ... /> */ }
    )
  }
}



/**
 *
 *  Document mobX Store
 *  @observable, @computed, @action
 *
 */

class Document {

  constructor() {
    this.renderer = new Renderer()
  }


  @observable title = null

  @observable content = ''

  @computed markedContent() {
    return marked(this.content, {renderer: this.renderer})
  }

  @action update = data => {
    // ...
    this.content = data
    // ...
  }

}


/**
 *
 *  InfernoDOM Root Renderer
 *
 */

InfernoDOM.render(
  <h1>Hello, my name is Steve.</h1>,
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

*/

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

/*

Inline level renderer methods
strong(string text)
em(string text)
codespan(string code)
br()
del(string text)
link(string href, string title, string text)
image(string href, string title, string text)

*/
