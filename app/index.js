import marked, { Renderer } from 'marked'
import { observable, action, computed, autorun } from 'mobx'
import Inferno from 'inferno'
import InfernoDOM from 'inferno-dom'
import Component from 'inferno-component'
import createElement from 'inferno-create-element'
import { observer } from 'mobx-inferno'

require('font-awesome-webpack')

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


  @observable title = null

  @observable content = "# A Boy and A Fish\n\n[This is a link](http://lushfuture.com) in markdown"

  @computed get markedContent() {
    return marked(this.content, {renderer: this.renderer})
  }

  @action update = data => {
    // ...
    this.content = data
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

// const reactifyHTML = nodeList => {
//   const list = [].concat(nodeList)
//
//   if (list.length >>> 0) {
//     return list.map(child => {
//       console.log('reactifyHTML child =>', child)
//       child.
//       return reactifyHTML(child)
//     })
//   }
//
// let children
//
// if (child.children.length === 0) {
//   children = child.innerHTML
// }
//
// if () {
//   children =
// }
//
//
//   return createElement(tag, null, children)
//
//
//   const hasChildren = nodes.length >>> 0
//   const children = hasChildren ?
//     nodes.map(child => {
//       console.log('reactifyHTML child =>', child)
//       return reactifyHTML(child)
//     }) :
//     doc.innerHTML
//   const tag = /^\#.+/.test(doc.nodeName) ?
//     'div' :
//     doc.nodeName
//
// }


const blazeDOM = nodeArray => createElement('div', null, nodeArray)

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



    console.log('htmlStringToDOM', mdContent)


    return (
      <section>
      {this.props.md.markedContent}
      {blazeDOM(mdContent)}
      </section>
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
