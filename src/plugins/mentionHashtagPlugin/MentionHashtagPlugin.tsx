"use client"
import { LexicalTypeaheadMenuPlugin, MenuOption } from "@lexical/react/LexicalTypeaheadMenuPlugin";
import { TextNode, $insertNodes, LexicalEditor } from "lexical";
import * as React from "react";
import { useState, useCallback } from "react";
import { $createMentionNode } from "../../nodes/mentionNode/MentionNode";
import { $createHashtagNode } from "../../nodes/hashtagNode/HashtagNode";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";


class MentionHashtagOption extends MenuOption {
    constructor(
        public key: string, 
        public type: 'mention' | 'hashtag'
    ) {
        super(key);
    }
}

export default function MentionHashtagPlugin() {
    const [editor] = useLexicalComposerContext();
    const [options, setOptions] = useState<MentionHashtagOption[]>([]);

    const triggerSymbolRef = React.useRef<"@" | "#" | null>(null);

    const triggerFn = (text: string) => {
        const match = text.match(/(?:^|\s)([@#])(\w*)$/);

        if (!match) return null;

        // const fullMatch = match[0];
        const symbol = match[1] as "@" | "#";
        const keyword = match[2];

        triggerSymbolRef.current = symbol;

        return {
            leadOffset: match.index! + 1,
            matchingString: keyword,
            replaceableString: symbol + keyword,
            // triggerSymbol: symbol, 
        };
    };

    const onQueryChange = useCallback((queryString: string | null) => {
        if (queryString === null) return;

        if (triggerSymbolRef.current === "@") {
            setOptions([
                new MentionHashtagOption("leonardo", "mention"),
                new MentionHashtagOption("maria", "mention"),
                new MentionHashtagOption("carlos", "mention"),
            ])
        } else if (triggerSymbolRef.current === "#") {
            setOptions([
                new MentionHashtagOption("React", "hashtag"),
                new MentionHashtagOption("Nextjs", "hashtag"),
                new MentionHashtagOption("DevOps", "hashtag"),
            ])
        } else {
            setOptions([]);
        }
    }, [])

    return (
        <LexicalTypeaheadMenuPlugin<MentionHashtagOption> 
            onQueryChange={onQueryChange}
            options={options}
            triggerFn={triggerFn}
            onSelectOption={(option, textNodeContainingQuery, closeMenu) => {
                editor.update(() => {
                    // if (!textNodeContainingQuery) return;
                    // const node =
                    //     option.type === "mention"
                    //         ? $createMentionNode(`@${option.key}`)
                    //         : $createHashtagNode(`#${option.key}`);
                    // textNodeContainingQuery.replace(node);
                    // closeMenu();
                    if (textNodeContainingQuery) {
                        let newNode;
                        if (option.type === "mention") {
                            newNode = ($createMentionNode(`@${option.key}`));
                        } else {
                            newNode = ($createHashtagNode(`#${option.key}`));
                        }

                        textNodeContainingQuery.replace(newNode);

                        const selection = newNode.selectNext();
                        if (selection) {
                            selection.insertText(" ");
                        }
                    }
                    closeMenu();
                });
            }}
            menuRenderFn={(anchorRef, { selectedIndex, selectOptionAndCleanUp }) => (
                <div className="bg-white shadow-lg rounded-md border p-2 w-40">
                    {options.map((option, i) => (
                        <div
                            key={option.key}
                            className={`p-2 cursor-pointer ${
                                i === selectedIndex ? "bg-gray-200" : ""
                            }`}
                            onClick={() => selectOptionAndCleanUp(option)}
                        >
                            {option.type === "mention" ? "@" : "#"}
                            {option.key}
                        </div>
                    ))}
                </div>
            )}
        />

    )
}