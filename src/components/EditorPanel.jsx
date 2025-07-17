import React, { useRef, useEffect } from "react";
import { Editor, Toolbar } from "@wangeditor/editor-for-react";
import "@wangeditor/editor/dist/css/style.css";

export default function EditorPanel({ value, onChange }) {
  const editorRef = useRef(null);

  useEffect(() => {
    return () => {
      if (editorRef.current) editorRef.current.destroy();
    };
  }, []);

  // 清空文档后新建文档不会刷新编辑器内容
  
  // 自定义工具栏，移除图片、视频、全屏、表格等
  const toolbarConfig = {
    toolbarKeys: [
      'headerSelect', 'bold', 'underline', 'italic', 'through', 'color', 'bgColor',
      '|',
      'fontSize', 'fontFamily',
      '|',
      'bulletedList', 'numberedList', 'todo',
      '|',
      'justifyLeft', 'justifyRight', 'justifyCenter', 'justifyJustify',
      '|',
      'quote', 'code',
      '|',
      'insertLink',
      '|',
      'undo', 'redo',
    ]
  };

  return (
    <div style={{ height: "calc(100vh - 50px - 32px)", background: "#fff", borderRadius: 8, boxShadow: "0 1px 4px #eee", padding: 16, display: 'flex', flexDirection: 'column' }}>
      <Toolbar
        editor={editorRef.current}
        defaultConfig={toolbarConfig}
        mode="default"
        style={{ borderBottom: '1px solid #eee' }}
      />
      <div style={{ flex: 1, overflow: 'auto' }}>
        <Editor
          defaultConfig={{ placeholder: '请输入新闻内容...' }}
          value={value}
          onCreated={editor => (editorRef.current = editor)}
          onChange={editor => onChange(editor.getHtml())}
          mode="default"
          style={{ height: '100%', minHeight: 300, border: 'none' }}
        />
      </div>
    </div>
  );
} 