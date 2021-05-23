import React, {useEffect, useState} from 'react';
import './App.css';
import CodeEditor from "./components/SharedResources/CodeEditor/CodeEditor";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
    const [html, setHtml] = useLocalStorage('html','');
    const [css, setCss] = useLocalStorage('css','');
    const [js, setJs] = useLocalStorage('js','');
    const [srcDoc, setSrcDoc] = useState<string>('');

    useEffect(()=>{
        //setting debounce time of 250ms before updating srcDoc to incorporate typing speed
        setTimeout(()=>setSrcDoc(`
                <html>
                   <body>
                    ${html}
                   </body>
                   <style>${css}</style>
                    <script>${js}</script>
                  </html>
           `), 400);
    },[html, css, js]);

  return (
    <div className="flex w-full h-screen items-center justify-center">
        <div className={"flex flex-col w-full h-full"}>
            <div className={"flex bg-black p-4"}>
                <span className={"text-white"}>CodePen</span>
            </div>
            <div className={"flex flex-1 bg-gray-600 overflow-x-hidden"}>
                <div className={"flex-auto p-4 h-full min-w-10vw"}>
                    <CodeEditor windowTitle={"HTML"} languageMode={"text/html"} editorContent={html as string} onChange={newValue => (setHtml as any)(newValue)}/>
                </div>
                <div className={"flex-auto p-4 h-full min-w-10vw"}>
                    <CodeEditor windowTitle={"CSS"} languageMode={"css"} editorContent={css as string} onChange={newValue => (setCss as any)(newValue)}/>
                </div>
                <div className={"flex-auto p-4 h-full min-w-10vw"}>
                    <CodeEditor windowTitle={"JS"} languageMode={"javascript"} editorContent={js as string} onChange={newValue => (setJs as any)(newValue)}/>
                </div>
            </div>
            <div className={"flex-1"}>
                <iframe srcDoc={srcDoc} width={'100%'} height={'100%'}/>
            </div>
        </div>
    </div>
  );
}

export default App;
