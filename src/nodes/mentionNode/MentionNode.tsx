import { TextNode, EditorConfig, SerializedTextNode, LexicalNode } from "lexical";

export class MentionNode extends TextNode {
    static getType(): string {
        return "mention";
    }

    static clone(node: MentionNode): MentionNode {
        return new MentionNode(node.__text, node.__key);
    }

    createDOM(config: EditorConfig): HTMLElement {
        const dom = super.createDOM(config);
        dom.className = "text-blue-500 font-medium cursor-pointer hover:underline";
        return dom;
    }

    static importJSON(serializedNode: SerializedTextNode): MentionNode {
        const text = typeof serializedNode.text === "string" ? serializedNode.text : ""
        return new MentionNode(text);
    }

    exportJSON() {
        return {
            ...super.exportJSON(),
            type: "mention",
            version: 1,
        };
    }
}

export function $createMentionNode(text: string): MentionNode {
    return new MentionNode(text).setMode("segmented").toggleDirectionless();
}

export function $isMentionNode(node: LexicalNode | null | undefined): node is MentionNode {
    return node instanceof MentionNode;
}