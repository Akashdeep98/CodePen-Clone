import React from "react";
import CodeMirror from "react-codemirror";
import './CodeEditor.scss';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/htmlmixed/htmlmixed.js';

interface CodeEditorProps {
    languageMode : string,
    windowTitle: string,
    editorContent: string,
    onChange:(newValue: string)=>void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({windowTitle, languageMode, editorContent, onChange}) => {
    return(
        <div className={"flex flex-col h-full"}>
            <div className={"flex bg-black p-2"}>
                <span className={"text-white"}>{windowTitle}</span>
            </div>
                <CodeMirror
                    value={editorContent}
                    options={{
                        mode: languageMode,
                        theme: 'material',
                        lineNumbers: true,
                        lineWrapping: true,
                    }}
                    onChange={onChange}
                />
        </div>
    )
};

export default CodeEditor;