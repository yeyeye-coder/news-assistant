import React, { useState } from "react";
import { Tabs, Button, Spin, message } from "antd";
import { RobotOutlined } from '@ant-design/icons';
import axios from "axios";
import {Input } from "antd";

const { TextArea } = Input;
export default function AISidebar({ editorContent, collapsed }) {
  const [template, setTemplate] = useState("");
  const [missing, setMissing] = useState("");
  const [polished, setPolished] = useState("");
  const [loading, setLoading] = useState(false);

  //const fetchTemplate = async () => {
  //  setLoading(true);
  //  try {
  //    const res = await axios.post("/api/get-template", { content: editorContent });
  //    setTemplate(res.data.template || "示例新闻模版内容");
  //  } catch (e) {
  //    message.error("获取新闻模版失败");
  //  }
  //  setLoading(false);
  //};
   const fetchTemplate = async () => {
     setLoading(true);
     setTemplate(""); // 清空旧内容
     try {
       const response = await fetch("/api/get-template", {
         method: "POST",
         headers: {
           "Content-Type": "application/json"
         },
         body: JSON.stringify({ content: editorContent })
       });
       if (!response.body) throw new Error("无响应流");
       const reader = response.body.getReader();
       const decoder = new TextDecoder("utf-8");
       let result = "";
       while (true) {
         const { done, value } = await reader.read();
         if (done) break;
         result += decoder.decode(value, { stream: true });
         setTemplate(prev => prev + decoder.decode(value, { stream: true })); // 实时追加
       }
     } catch (e) {
       message.error("获取新闻模版失败");
     }
     setLoading(false);
   };

  const checkMissing = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/check-missing", { content: editorContent, template });
      setMissing(res.data.missing || "缺失内容示例：还需补充时间、地点等要素");
    } catch (e) {
      message.error("检查缺失内容失败");
    }
    setLoading(false);
  };

  //const polishContent = async () => {
  //  setLoading(true);
  //  try {
  //    const res = await axios.post("/api/polish", { content: editorContent, template });
  //    setPolished(res.data.polished || "润色后的新闻内容示例");
  //  } catch (e) {
  //    message.error("AI润色失败");
  //  }
  //  setLoading(false);
  //};
  const polishContent = async () => {
       setLoading(true);
       setPolished(""); // 清空旧内容
       try {
         const response = await fetch("/api/polish", {
           method: "POST",
           headers: {
             "Content-Type": "application/json"
           },
           body: JSON.stringify({ content: editorContent })
         });
         if (!response.body) throw new Error("无响应流");
         const reader = response.body.getReader();
         const decoder = new TextDecoder("utf-8");
         let result = "";
         while (true) {
           const { done, value } = await reader.read();
           if (done) break;
           result += decoder.decode(value, { stream: true });
           setPolished(prev => prev + decoder.decode(value, { stream: true })); // 实时追加
         }
       } catch (e) {
         message.error("获取新闻模版失败");
       }
       setLoading(false);
     };

  if (collapsed) {
    return (
      <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <RobotOutlined style={{ fontSize: 32, color: '#999' }} />
      </div>
    );
  }

  const tabItems = [
    {
      key: "1",
      label: "检索类似模版",
      children: (
        //<>
        //  <Button onClick={fetchTemplate} type="primary" style={{ marginBottom: 12 }}>
        //    获取新闻模版
        //  </Button>
        //  <Spin spinning={loading}>
        // <div
        //    style={{
        //      minHeight: 120,
        //      maxHeight: 300, // 限制最大高度
        //      overflowY: "auto", // 垂直滚动
        //      whiteSpace: "pre-wrap",
        //      border: "1px solid #f0f0f0", // 可选，加个边框
        //      padding: "8px" // 可选，让内容不贴边
        //    }}
        //  >
        //    {template}
        //  </div>
        //</Spin>
        //</>
        <>
          <Button
            onClick={fetchTemplate}
            type="primary"
            loading={loading} // 只在按钮上显示加载中
            style={{ marginBottom: 12 }}
          >
            获取新闻模版
          </Button>

          <TextArea
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
            autoSize={{ minRows: 5, maxRows: 12 }}
            style={{
              minHeight: 120,
              maxHeight: 300,
              overflowY: "auto",
              border: "1px solid #f0f0f0",
              padding: "8px"
            }}
          />
        </>

      ),
    },
    {
      key: "2",
      label: "根据模版润色",
      children: (
        //<>
        //  <Button onClick={polishContent} type="primary" style={{ marginBottom: 12 }}>
        //    AI润色
        //  </Button>
        //  <Spin spinning={loading}>
        //        <div
        //          style={{
        //            minHeight: 120,
        //            maxHeight: 300, // 最大高度
        //            overflowY: "auto", // 超出时出现滚动条
        //            whiteSpace: "pre-wrap",
        //            border: "1px solid #f0f0f0", // 可选：加个边框区分
        //            padding: "8px" // 可选：增加内边距
        //          }}
        //        >
        //          {polished}
        //        </div>
        //      </Spin>
        //</>
        <>
          <Button
            onClick={polishContent}
            type="primary"
            loading={loading} // 只在按钮显示 loading
            style={{ marginBottom: 12 }}
          >
            AI润色
          </Button>

          <TextArea
            value={polished} // 绑定状态
            onChange={(e) => setPolished(e.target.value)} // 修改时更新状态
            autoSize={{ minRows: 5, maxRows: 12 }} // 自动高度调整
            style={{
              minHeight: 120,
              maxHeight: 300, // 最大高度
              overflowY: "auto", // 超出时滚动
              border: "1px solid #f0f0f0", // 边框
              padding: "8px" // 内边距
            }}
          />
        </>

      ),
    },
  ];

  return (
    <div style={{ paddingRight: 8 }}>
      <Tabs defaultActiveKey="1" items={tabItems} style={{ height: "100%" }} />
    </div>
  );
} 