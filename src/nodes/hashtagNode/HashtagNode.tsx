import { TextNode, EditorConfig, SerializedTextNode, LexicalNode } from "lexical";

export class HashtagNode extends TextNode {
    static getType(): string {
        return "hashtag";
    }

    static clone(node: HashtagNode): HashtagNode {
        return new HashtagNode(node.__text, node.__key);
    }

    createDOM(config: EditorConfig): HTMLElement {
        const dom = super.createDOM(config);
        dom.className = "text-purple-500 font-medium cursor-pointer hover:underline";
        return dom;        
    }

    static importJSON(serializedNode: SerializedTextNode): HashtagNode {
        const text = typeof serializedNode.text === "string" ? serializedNode.text : ""
        return new HashtagNode(text);
    }

    exportJSON() {
        return {
            ...super.exportJSON(),
            type: "hashtag",
            version: 1,
        };
    }
}

export function $createHashtagNode(text: string): HashtagNode {
    return new HashtagNode(text).setMode("segmented").toggleDirectionless();
}

export function $isHashtagNode(node: LexicalNode | null | undefined): node is HashtagNode {
    return node instanceof HashtagNode;
}