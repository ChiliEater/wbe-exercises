
/**
 * Renders page according to SJDON syntax
 * @param {Array | string} element The element to append
 * @param {Element} appRoot Root node
 */
function renderSJDON(element, appRoot) {
    let node
    if (Array.isArray(element)) {
        node = document.createElement(element[0].toUpperCase())
        let start = 1
        if (typeof element[1] !== "string" && !Array.isArray(element[1])) {
            parseAttributes(node, element[1])
            start++
        }

        for (let i = start; i < element.length; i++) {
            const child = element[i];
            if (Array.isArray(child)) {
                renderSJDON(child, node)
            } else if (typeof child === "string") {
                node.appendChild(document.createTextNode(child))
            } else {
                throw new Error("Syntaxt error: Expected string or array but got generic object")
            }
        }
    } else {
        node = document.createElement(element.toUpperCase())
    }
    appRoot.appendChild(node)
}

/**
 * 
 * @param {Element} element 
 * @param {Object} attributes 
 */
function parseAttributes(element, attributes) {
    Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value))
}

window.addEventListener("load", () => {
    const input = [
        "div", 
        {style: "background: salmon"},
        ["h1", "Hello World"],
        ["h2", {style: "text-align:right"}, 
        "from our library"] 
    ]
    
    let root = document.getElementById("app")
    renderSJDON(input, root)
})