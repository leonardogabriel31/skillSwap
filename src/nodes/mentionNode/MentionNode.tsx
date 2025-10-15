import { EditorConfig, LexicalEditor, SerializedTextNode, TextNode } from "lexical";

export class MentionNode extends TextNode {
    static getType(): string {
        return "mention";
    }

    static clone(node: MentionNode): MentionNode {
        return new MentionNode(node.__text, node.__key);
    }

    createDOM(config: any): HTMLElement {
        const dom = super.createDOM(config);
        dom.className = "text-blue-500 font-medium cursor-pointer hover:underline";
        return dom;
    }

    static importJSON(serializedNode: any) {
        const text = typeof serializedNode.text === "string" ? serializedNode.text : ""
        return new MentionNode(text);
    }

    exportJSON() {
        return {
            ...super.exportJSON(),
            type: "mention",
        };
    }
}

export function $createMentionNode(text: string) {
    return new MentionNode(text).setMode("segmented").toggleDirectionless();
}

export function $isMentionNode(node: any): node is MentionNode {
    return node instanceof MentionNode;
}