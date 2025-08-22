package com.example.newsassistant.dto;

import com.alibaba.excel.annotation.ExcelProperty;

public class NewsItem {
    @ExcelProperty("序号")
    private Integer id;
    @ExcelProperty("标题")
    private String title;
    @ExcelProperty("来源")
    private String source;
    @ExcelProperty("内容")
    private String content;
    @ExcelProperty("类型")
    private String type;
    @ExcelProperty("链接地址")
    private String url;

    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public String getSource() {
        return source;
    }
    public void setSource(String source) {
        this.source = source;
    }
    public String getContent() {
        return content;
    }
    public void setContent(String content) {
        this.content = content;
    }
    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }
    public String getUrl() {
        return url;
    }
    public void setUrl(String url) {
        this.url = url;
    }
    // getters and setters
}