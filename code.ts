async function main() {
  let instance = null;
  

  for (const node of figma.currentPage.selection) {

    if (node.type === 'INSTANCE') {
      instance = node
    } else if (node.type === 'FRAME') {
      let thisInstance = instance.clone()
      const text = node.findAll(n => n.type === "TEXT")
      const instanceText = thisInstance.findAll(n => n.type === "TEXT")
      for (let i = 0; i < instanceText.length; i++) {
        await figma.loadFontAsync(instanceText[i].fontName)
        instanceText[i].characters = text[i].characters
        console.log()
      }
 
      thisInstance.y = node.y
      thisInstance.x = node.x
      // thisInstance.children[0].characters = text
      console.log(thisInstance.children)
      node.parent.appendChild(thisInstance)
      node.remove()

    }
    console.log(instance)

  }
}



main().then(() => {
  figma.closePlugin()
})