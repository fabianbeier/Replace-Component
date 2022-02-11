async function main() {
  let instance = null
  const all = figma.currentPage.selection;

  for (const node of figma.currentPage.selection) {
    if (node.type === 'INSTANCE') {
      instance = node
    }
    if (node.type === 'COMPONENT') {
      instance = node.createInstance()
    }
  }

  for (const node of figma.currentPage.selection) {
    if ( instance === null ) {
      figma.notify("Please select one instance or one component and multiple frames")
      figma.closePlugin()
    }
    if (node.type === 'FRAME') {
      let thisInstance = instance.clone()
      // const text = node.findAll(n => n.type === "TEXT")
      const text = node.findAllWithCriteria({
        types: ['TEXT']
      })
      const instanceText = thisInstance.findAllWithCriteria({
        types: ['TEXT']
      })
      // const instanceText = thisInstance.findAll(n => n.type === "TEXT")
      if (text.length != instanceText.length ) {
        figma.notify("Instance/Compenent and frame doesn't have the same layout!")
        figma.closePlugin()
      }
      for (let i = 0; i < instanceText.length; i++) {
        await figma.loadFontAsync(instanceText[i].fontName)
        instanceText[i].characters = text[i].characters
        // console.log()
      }

      thisInstance.y = node.y
      thisInstance.x = node.x
      // thisInstance.children[0].characters = text
      // console.log(thisInstance.children)
      node.parent.appendChild(thisInstance)
      node.remove()

    }
    // console.log(instance)

  }
}



main().then(() => {
  figma.closePlugin()
})