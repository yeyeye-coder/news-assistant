package com.example.newsassistant.util;

import com.alibaba.excel.EasyExcel;
import com.example.newsassistant.dto.NewsItem;
import java.util.List;

public class ExcelUtil {
    public static List<NewsItem> readNews(String filePath) {
        return EasyExcel.read(filePath)
                .head(NewsItem.class)
                .sheet()
                .doReadSync();
    }
}