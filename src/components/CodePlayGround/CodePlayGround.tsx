import React, {useEffect, useState} from 'react';
import CodeEditor from "../SharedResources/CodeEditor/CodeEditor";
import useLocalStorage from "../../hooks/useLocalStorage";

const CodePlayGround: React.FC = () => {
    const [html, setHtml] = useLocalStorage('html', '');
    const [css, setCss] = useLocalStorage('css', '');
    const [js, setJs] = useLocalStorage('js', '');
    const [srcDoc, setSrcDoc] = useState<string>('');

    useEffect(() => {
        //setting debounce time of 250ms before updating srcDoc to incorporate typing speed
        const timer = setTimeout(() => setSrcDoc(`
                <html>
                   <body>
                    ${html}
                   </body>
                   <style>${css}</style>
                    <script>${js}</script>
                  </html>
           `), 400);

        return () => clearTimeout(timer);
    }, [html, css, js]);

    return (
        <>
            <div className={"flex flex-1 bg-gray-600 overflow-x-hidden flex-wrap"}>
                <div className={"flex-auto p-4 h-full min-w-10vw"}>
                    <CodeEditor windowTitle={"HTML"} languageMode={"text/html"} editorContent={html as string}
                                onChange={newValue => (setHtml as any)(newValue)}/>
                </div>
                <div className={"flex-auto p-4 h-full min-w-10vw"}>
                    <CodeEditor windowTitle={"CSS"} languageMode={"css"} editorContent={css as string}
                                onChange={newValue => (setCss as any)(newValue)}/>
                </div>
                <div className={"flex-auto p-4 h-full min-w-10vw"}>
                    <CodeEditor windowTitle={"JS"} languageMode={"javascript"} editorContent={js as string}
                                onChange={newValue => (setJs as any)(newValue)}/>
                </div>
            </div>
            <div className={"flex-1"}>
                <iframe srcDoc={srcDoc} width={'100%'} height={'100%'}/>
            </div>
        </>
    );
};

export default CodePlayGround;
