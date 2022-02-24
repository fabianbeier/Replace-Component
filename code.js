var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        let instance = null;
        let all = null;
        for (const node of figma.currentPage.selection) {
            if (node.type === 'INSTANCE') {
                instance = node;
            }
            if (node.type === 'COMPONENT') {
                instance = node;
            }
            if (node.type === 'FRAME')
                all = node.parent.children;
        }
        for (const node of figma.currentPage.selection) {
            if (instance === null) {
                figma.notify("Please select one instance or one component and multiple frames");
                figma.closePlugin();
            }
            if (node.type === 'TEXT') {
                figma.notify("Please wrap single textframes in a frame");
                figma.closePlugin();
            }
            if (node.type === 'FRAME') {
                let thisInstance = instance.clone();
                if (thisInstance.type === 'COMPONENT') {
                    thisInstance = thisInstance.createInstance();
                }
                // const text = node.findAll(n => n.type === "TEXT")
                const text = node.findAllWithCriteria({
                    types: ['TEXT']
                });
                const instanceText = thisInstance.findAllWithCriteria({
                    types: ['TEXT']
                });
                // const instanceText = thisInstance.findAll(n => n.type === "TEXT")
                if (text.length != instanceText.length) {
                    figma.notify("Instance/Compenent and frame doesn't have the same layout!");
                    figma.closePlugin();
                }
                for (let i = 0; i < instanceText.length; i++) {
                    yield figma.loadFontAsync(instanceText[i].fontName);
                    instanceText[i].characters = text[i].characters;
                }
                thisInstance.y = node.y;
                thisInstance.x = node.x;
                // thisInstance.children[0].characters = text
                // console.log(thisInstance.children)
                node.parent.insertChild(all.indexOf(node), thisInstance);
                node.remove();
            }
            // console.log(instance)
        }
    });
}
main().then(() => {
    figma.closePlugin();
});
