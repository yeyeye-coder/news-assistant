import React, { useState, useEffect, useMemo, useRef } from "react";
import { Layout, message } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import HeaderBar from "./components/HeaderBar";
import EditorPanel from "./components/EditorPanel";
import AISidebar from "./components/AISidebar";
import "./App.css";

const { Header, Content, Sider } = Layout;

const LOCAL_KEY = "news-assistant-docs";

export default function App() {
  const [docs, setDocs] = useState(() => {
    const saved = localStorage.getItem(LOCAL_KEY);
    return saved ? JSON.parse(saved) : [{ id:Date.now(), title: "新建文档", content: "" }];
  });
  const [currentDocId, setCurrentDocId] = useState(docs[0].id);
  const [siderCollapsed, setSiderCollapsed] = useState(false);

  const currentDocIdRef = useRef(currentDocId);

  // 每次 currentDocId 变化时同步到 ref
  useEffect(() => {
    console.info('currentDocIdRef changed',currentDocId);

    currentDocIdRef.current = currentDocId;
  }, [currentDocId]);

  useEffect(() => {
    console.info('docs changed',docs);

    localStorage.setItem(LOCAL_KEY, JSON.stringify(docs));
  }, [docs]);


  // const currentDoc = useMemo(
  //   () => {
  //     console.info('currentDoc changed',currentDocId);
  //     return docs.find((d) => d.id === currentDocId)
  //   },
  //   [currentDocId]
  // );
  const currentDoc = useMemo(
  () => docs.find((d) => d.id === currentDocId),
  [currentDocId, docs]
);

  const handleDocChange = (content) => {
    setDocs((prev) =>
      prev.map((doc) =>
        doc.id === currentDocIdRef.current ? { ...doc, content } : doc
      )
    );
  };

  // const handleTitleChange = (title) => {
  //   setDocs((prev) =>
  //     prev.map((doc) =>
  //       doc.id === currentDocId ? { ...doc, title } : doc
  //     )
  //   );
  // };
  const handleTitleChange = (title) => {
  setDocs((prev) =>
    prev.map((doc) =>
      doc.id === currentDocIdRef.current ? { ...doc, title } : doc
    )
  );
};


  const handleSwitchDoc = (id) => {
    setCurrentDocId(id);
  };

  const handleNewDoc = () => {
    const newId = Date.now();
    setDocs(prev => [
      ...prev,
      { id: newId, title: `新建文档${prev.length + 1}`, content: "" }
    ]);
    setTimeout(() => setCurrentDocId(newId), 200);
  };
  

  const handleDeleteDoc = (id) => {
    if (docs.length === 1) {
      message.warning("至少保留一个文档");
      return;
    }
    const idx = docs.findIndex((d) => d.id === id);
    const newDocs = docs.filter((d) => d.id !== id);
    setDocs(newDocs);
    setCurrentDocId(newDocs[Math.max(0, idx - 1)].id);
  };

  const handleClearDocs = () => {
    const newId = Date.now();
    setDocs([{ id: newId, title: "新建文档1", content: "" }]);
    //过500毫米再调用下面的代码
    setTimeout(() => setCurrentDocId(newId), 200);
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Header style={{ background: "#1464E4", padding: 0, height: 50 }}>
        <HeaderBar
          docs={docs}
          currentDocId={currentDocId}
          onSwitch={handleSwitchDoc}
          onNewDoc={handleNewDoc}
          onDeleteDoc={handleDeleteDoc}
          onTitleChange={handleTitleChange}
          currentTitle={currentDoc?.title || ""}
          onClearDocs={handleClearDocs}
        />
      </Header>
      <Layout style={{ height: "calc(100vh - 50px)" }}>
        <Sider
          width="40%"
          theme="light"
          collapsible
          collapsed={siderCollapsed}
          trigger={null}
          style={{ background: "#fff", borderRight: "1px solid #eee", paddingTop: 0, position: 'relative', overflow: 'hidden', height: '100%' }}
        >
          <div style={{ height: 48, display: 'flex', alignItems: 'center', justifyContent: siderCollapsed ? 'center' : 'flex-end', borderBottom: '1px solid #eee', padding: siderCollapsed ? 0 : '0 12px' }}>
            {siderCollapsed ? (
              <MenuUnfoldOutlined style={{ fontSize: 22, cursor: 'pointer' }} onClick={() => setSiderCollapsed(false)} />
            ) : (
              <MenuFoldOutlined style={{ fontSize: 22, cursor: 'pointer' }} onClick={() => setSiderCollapsed(true)} />
            )}
          </div>
          <AISidebar editorContent={currentDoc?.content || ""} collapsed={siderCollapsed} />
        </Sider>
        <Content style={{ padding: 16, background: "#f5f6fa", width: '60%' }}>
          <EditorPanel
            value={currentDoc?.content || ""}
            onChange={(content) => handleDocChange(content)}
          />
        </Content>
      </Layout>
    </Layout>
  );
} 