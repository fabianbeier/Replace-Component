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
        for (const node of figma.currentPage.selection) {
            if (node.type === 'INSTANCE') {
                instance = node;
            }
            else if (node.type === 'FRAME') {
                let thisInstance = instance.clone();
                const text = node.findAll(n => n.type === "TEXT");
                const instanceText = thisInstance.findAll(n => n.type === "TEXT");
                for (let i = 0; i < instanceText.length; i++) {
                    yield figma.loadFontAsync(instanceText[i].fontName);
                    instanceText[i].characters = text[i].characters;
                    console.log();
                }
                thisInstance.y = node.y;
                thisInstance.x = node.x;
                // thisInstance.children[0].characters = text
                console.log(thisInstance.children);
                node.parent.appendChild(thisInstance);
                node.remove();
            }
            console.log(instance);
        }
    });
}
main().then(() => {
    figma.closePlugin();
});
