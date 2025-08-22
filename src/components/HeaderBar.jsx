import React from "react";
import { Select, Button, Input, Popconfirm, Space } from "antd";
import { PlusOutlined, DeleteOutlined, ClearOutlined } from "@ant-design/icons";
import mccIcon from "../assets/icon/mccicon.png";

export default function HeaderBar({
  docs,
  currentDocId,
  onSwitch,
  onNewDoc,
  onDeleteDoc,
  onTitleChange,
  currentTitle,
  onClearDocs
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", height: 50 }}>
      <img src={mccIcon} alt="MCC Icon" style={{ height: 40, marginRight: 8, marginLeft: 16 }} />
      <span style={{ color: '#fff', fontSize: 18, fontWeight: 'bold', marginRight: 24 }}>AI新闻助手</span>
      <Select
        value={currentDocId}
        style={{ width: 180, marginRight: 16 }}
        onChange={onSwitch}
      >
        {docs.map((doc) => (
          <Select.Option key={doc.id} value={doc.id}>
            {doc.title}
          </Select.Option>
        ))}
      </Select>
      <Input
        value={currentTitle}
        onChange={(e) => onTitleChange(e.target.value)}
        style={{ width: 260, marginRight: 16 }}
        placeholder="输入文档标题加"
        maxLength={40}
      />
      <Space>
        <Button icon={<PlusOutlined />} onClick={onNewDoc} type="primary">
          新建
        </Button>
        <Popconfirm
          title="确定要删除当前文档吗？"
          onConfirm={() => onDeleteDoc(currentDocId)}
          okText="删除"
          cancelText="取消"
        >
          <Button icon={<DeleteOutlined />} danger>
            删除文档
          </Button>
        </Popconfirm>
        <Button icon={<ClearOutlined />} onClick={onClearDocs} danger type="default">
          清空全部
        </Button>
      </Space>
    </div>
  );
} 