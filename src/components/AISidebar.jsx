import React, { useState } from "react";
import { Tabs, Button, Spin, message } from "antd";
import { RobotOutlined } from '@ant-design/icons';
import axios from "axios";

export default function AISidebar({ editorContent, collapsed }) {
  const [template, setTemplate] = useState("");
  const [missing, setMissing] = useState("");
  const [polished, setPolished] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchTemplate = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/get-template", { content: editorContent });
      setTemplate(res.data.template || "示例新闻模版内容");
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

  const polishContent = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/polish", { content: editorContent, template });
      setPolished(res.data.polished || "润色后的新闻内容示例");
    } catch (e) {
      message.error("AI润色失败");
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
        <>
          <Button onClick={fetchTemplate} type="primary" style={{ marginBottom: 12 }}>
            获取新闻模版
          </Button>
          <Spin spinning={loading}>
            <div style={{ minHeight: 120, whiteSpace: "pre-wrap" }}>{template}</div>
          </Spin>
        </>
      ),
    },
    {
      key: "2",
      label: "根据模版润色",
      children: (
        <>
          <Button onClick={polishContent} type="primary" style={{ marginBottom: 12 }}>
            AI润色
          </Button>
          <Spin spinning={loading}>
            <div style={{ minHeight: 120, whiteSpace: "pre-wrap" }}>{polished}</div>
          </Spin>
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