"use client";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import MentionHashtagPlugin from "../mentionHashtagPlugin/MentionHashtagPlugin";
import {
  $createParagraphNode,
  $createTextNode,
  $getRoot,
  $getSelection,
  $isRangeSelection,
  $isParagraphNode,
  ParagraphNode,
} from "lexical";
import editorTheme from "@/lib/editorTheme";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import React from "react";
import { MentionNode } from "@/nodes/mentionNode/MentionNode";
import { HashtagNode } from "@/nodes/hashtagNode/HashtagNode";


function ClearEditorPlugin({ clearTrigger }: { clearTrigger: boolean }) {
  const [editor] = useLexicalComposerContext();

  React.useEffect(() => {
    if (!clearTrigger) return;

    editor.update(() => {
      const root = $getRoot();
      root.clear();
      const paragraph = $createParagraphNode();
      paragraph.append($createTextNode(""));
      root.append(paragraph);
    });
  }, [editor, clearTrigger]);

  return null;
}

function PlaceholderPlugin() {
  const [editor] = useLexicalComposerContext();
  const [isEmpty, setIsEmpty] = React.useState(true);

  React.useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const root = $getRoot();
        const text = root.getTextContent().trim();
        setIsEmpty(text.length === 0);
      });
    });
  }, [editor]);

  if (!isEmpty) return null;

  return (
    <div 
      className="
        absolute
        text-gray-400
        pointer-events-none
        select-none
        z-20
      "
      style={{ 
        top: "12px",
        left: "18px" 
      }}
    >
      ¿Qué estás pensando?
    </div>
  )
}

function EmojiInsertPlugin({
  onInsertEmoji,
  onFocusChange,
}: {
  onInsertEmoji?: (insertFn: (emoji: string) => void) => void;
  onFocusChange?: (focused: boolean) => void;
}) {
  const [editor] = useLexicalComposerContext();
  const lastSelectionRef = React.useRef<ReturnType<typeof $getSelection> | null>(null);

  React.useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          lastSelectionRef.current = selection.clone();
        }
      });
    });
  }, [editor]);

  React.useEffect(() => {
    const insertEmoji = (emoji: string) => {
      if (!emoji) return;
      editor.update(() => {
        let selection = $getSelection();
        if (!$isRangeSelection(selection) && lastSelectionRef.current) {
          const root = $getRoot();
          let paragraph = root.getLastChild();
          if (!paragraph || !$isParagraphNode(paragraph)) {
            paragraph = $createParagraphNode();
            root.append(paragraph);
          }

          const paragraphNode = paragraph as ParagraphNode;

          paragraphNode.select();

          selection = $getSelection();
        }

        if ($isRangeSelection(selection)) {
          selection.insertText(emoji + " ");
        }
      });
    };

    if (onInsertEmoji) {
      onInsertEmoji(insertEmoji);
    }
  }, [editor, onInsertEmoji]);

  React.useEffect(() => {
    const unregister = editor.registerRootListener((rootElement) => {
      if (!rootElement || !onFocusChange) return;
      const handleFocus = () => onFocusChange(true);
      const handleBlur = () => onFocusChange(false);
      rootElement.addEventListener("focus", handleFocus);
      rootElement.addEventListener("blur", handleBlur);
      return () => {
        rootElement.removeEventListener("focus", handleFocus);
        rootElement.removeEventListener("blur", handleBlur);
      };
    });
    return unregister;
  }, [editor, onFocusChange]);

  return null;
}

function InnerEditor({
  onChange,
  clearTrigger,
  onInsertEmoji,
  onFocusChange,
}: {
  onChange: (content: string) => void;
  clearTrigger: boolean;
  onInsertEmoji?: (insertFn: (emoji: string) => void) => void;
  onFocusChange?: (focused: boolean) => void;
}) {
  return (
    <>
        <RichTextPlugin
          contentEditable={
            <div className="relative">
              <ContentEditable
                className="
                  w-full 
                  min-h-[120px] 
                  border border-gray-300 
                  rounded-2xl 
                  px-4 
                  py-3 
                  text-base 
                  leading-relaxed
                  text-gray-800 
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-400/30
                  transition-all
                  duration-200
                  resize-none
                  whitespace-pre-wrap
                  break-words
                  bg-transparent
                  relative
                  z-10
                "
              />
              <PlaceholderPlugin />
            </div>
          }
          placeholder={null}
          ErrorBoundary={LexicalErrorBoundary}
        />
      <HistoryPlugin />
      <MentionHashtagPlugin />
      <OnChangePlugin
        onChange={(editorState) => {
          editorState.read(() => {
            const text = $getRoot().getTextContent();
            onChange(text);
          });
        }}
      />

      <ClearEditorPlugin clearTrigger={clearTrigger} />
      <EmojiInsertPlugin
        onInsertEmoji={onInsertEmoji}
        onFocusChange={onFocusChange}
      />
    </>
  );
}

export default function Editor({
  onChange,
  clearTrigger,
  onInsertEmoji,
  onFocusChange,
}: {
  onChange: (content: string) => void;
  clearTrigger: boolean;
  onInsertEmoji?: (insertFn: (emoji: string) => void) => void;
  onFocusChange?: (focused: boolean) => void;
}) {
  const editorConfig = React.useMemo(
    () => ({
      namespace: "SkillSwapEditor",
      theme: editorTheme,
      onError: (error: Error) => console.error(error),
      nodes: [MentionNode, HashtagNode],
    }),
    []
  );

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <InnerEditor
        onChange={onChange}
        clearTrigger={clearTrigger}
        onInsertEmoji={onInsertEmoji}
        onFocusChange={onFocusChange}
      />
    </LexicalComposer>
  );
}