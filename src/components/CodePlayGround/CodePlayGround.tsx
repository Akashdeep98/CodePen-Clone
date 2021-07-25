import React, {useCallback, useEffect, useRef, useState} from 'react';
import CodeEditor from "../SharedResources/CodeEditor/CodeEditor";
import useLocalStorage, {defaultKeyPrefix} from "../../hooks/useLocalStorage";
import {CodeEditorLanguageModes} from "./helper";
import {useHistory, useParams} from "react-router-dom";
import {database} from "../../firebase";
import {Spin} from 'antd';

const CodePlayGround: React.FC = () => {
    const params:any = useParams();
    const history = useHistory();
    const [html, setHtml] = useLocalStorage(params.id + '-html', '');
    const [css, setCss] = useLocalStorage(params.id + '-css', '');
    const [js, setJs] = useLocalStorage(params.id + '-js', '');
    const [srcDoc, setSrcDoc] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [focusedWindow, setFocusedWindow] = useState<CodeEditorLanguageModes>(CodeEditorLanguageModes.HTML);

    const containerRef = useRef<HTMLDivElement>(null);
    const htmlCodeboxRef = useRef<HTMLDivElement>(null);
    const cssCodeboxRef = useRef<HTMLDivElement>(null);
    const jsCodeboxRef = useRef<HTMLDivElement>(null);

    useEffect(()=>{
        //Todo handle error
        const _html = JSON.parse(localStorage.getItem(defaultKeyPrefix+ params.id +"-html") || "");
        const _css = JSON.parse(localStorage.getItem(defaultKeyPrefix + params.id + "-css") || "");
        const _js = JSON.parse(localStorage.getItem(defaultKeyPrefix + params.id + "-js") || "");
        if(params.id && !_html && !_css && !_js) {
            setLoading(true);
            database.ref("codebase").child(params.id).get().then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    setHtml(JSON.parse(data.html || ""));
                    setCss(JSON.parse(data.css|| ""));
                    setJs(JSON.parse(data.js || ""));
                } else {
                    //Todo add notification
                    history.push("/");
                    console.log("No data available");
                }
                setLoading(false);
            }).catch((error) => {
                //Todo add notification
                console.error(error);
                setLoading(false);
            });
        }
    },[params.id, setHtml, setCss, setJs, history]);

    // This scrolls the focused window into view when windows are wrapped to make content responsive.
    useEffect(()=>{
        if(containerRef.current){
            switch (focusedWindow) {
                case CodeEditorLanguageModes.HTML:
                    htmlCodeboxRef.current?.scrollIntoView();
                    break;
                case CodeEditorLanguageModes.CSS:
                    cssCodeboxRef.current?.scrollIntoView();
                    break;
                case CodeEditorLanguageModes.JS:
                    jsCodeboxRef.current?.scrollIntoView();
                    break;
            }
        }
    },[containerRef.current?.scrollHeight]);

    useEffect(() => {
        //setting debounce time of 400ms before updating srcDoc to incorporate typing speed
        const timer = setTimeout(() => {
            setSrcDoc(`
                <html>
                   <body>
                    ${html}
                   </body>
                   <style>${css}</style>
                    <script>${js}</script>
                  </html>
           `)}, 400);

        return () => clearTimeout(timer);
    }, [html, css, js]);

    const handleHtmlChange = useCallback((newValue:string)=>{
        setHtml(newValue)
    }, [setHtml]);

    const handleCssChange = useCallback((newValue:string)=>{
        setCss(newValue)
    }, [setCss]);

    const handleJsChange = useCallback((newValue:string)=>{
        setJs(newValue)
    }, [setJs]);

    const handleFocusChange = useCallback((focused: boolean, mode: CodeEditorLanguageModes) => {
        if(focused) {
          switch (mode) {
              case CodeEditorLanguageModes.HTML:
                  setFocusedWindow(CodeEditorLanguageModes.HTML);
                  break;
              case CodeEditorLanguageModes.CSS:
                  setFocusedWindow(CodeEditorLanguageModes.CSS);
                  break;
              case CodeEditorLanguageModes.JS:
                  setFocusedWindow(CodeEditorLanguageModes.JS);
                  break;
          }
        }
    },[setFocusedWindow]);

    if(loading) {
        return (<div className={"flex w-screen h-screen bg-gray-600 items-center justify-center"}>
            <Spin/>
        </div>);
    }

    return (
        <>
            <div className={"flex flex-1 bg-gray-600 overflow-x-hidden flex-wrap"} ref={containerRef}>
                <div className={"flex-auto p-4 h-full min-w-full sm:min-w-10vw"} ref={htmlCodeboxRef}>
                    <CodeEditor windowTitle={"HTML"} languageMode={CodeEditorLanguageModes.HTML} editorContent={html}
                                onChange={handleHtmlChange} onFocus={handleFocusChange}/>
                </div>
                <div className={"flex-auto p-4 h-full min-w-full sm:min-w-10vw"} ref={cssCodeboxRef}>
                    <CodeEditor windowTitle={"CSS"} languageMode={CodeEditorLanguageModes.CSS} editorContent={css}
                                onChange={handleCssChange} onFocus={handleFocusChange} />
                </div>
                <div className={"flex-auto p-4 h-full min-w-full sm:min-w-10vw"} ref={jsCodeboxRef}>
                    <CodeEditor windowTitle={"JS"} languageMode={CodeEditorLanguageModes.JS} editorContent={js}
                                onChange={handleJsChange} onFocus={handleFocusChange} />
                </div>
            </div>
            <div className={"flex-1"}>
                <iframe title={"code-display-frame"} srcDoc={srcDoc} width={'100%'} height={'100%'}/>
            </div>
        </>
    );
};

export default CodePlayGround;
