import React from "react";
import CodeMirror from "react-codemirror";
import './CodeEditor.scss';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/htmlmixed/htmlmixed.js';
import {CodeEditorLanguageModes} from "../../CodePlayGround/helper";

interface CodeEditorProps {
    languageMode : CodeEditorLanguageModes,
    windowTitle: string,
    editorContent: string,
    onChange:(newValue: string)=>void;
    onFocus: (focused: boolean, mode:CodeEditorLanguageModes) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({windowTitle, languageMode, editorContent, onChange, onFocus}) => {
    const handleFocusChange = (focused: boolean) =>{
        onFocus(focused,languageMode);
    };
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
                    onFocusChange={handleFocusChange}
                />
        </div>
    )
};

export default CodeEditor;