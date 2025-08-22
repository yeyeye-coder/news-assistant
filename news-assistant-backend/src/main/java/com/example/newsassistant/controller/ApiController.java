package com.example.newsassistant.controller;

import com.alibaba.dashscope.exception.ApiException;
import com.alibaba.dashscope.exception.InputRequiredException;
import com.alibaba.dashscope.exception.NoApiKeyException;
import com.example.newsassistant.dto.*;
import com.example.newsassistant.util.ExcelUtil;
import com.example.newsassistant.util.AliyunLLMUtil;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.io.PrintWriter;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api")
@Slf4j
@CrossOrigin // 允许跨域，前后端分离开发时需要
public class ApiController {

//    @PostMapping("/get-template")
//    public TemplateResponse getTemplate(@RequestBody TemplateRequest request) {
//        TemplateResponse response = new TemplateResponse();
//        response.setTemplate("【新闻标题】\n【时间】\n【地点】\n【事件经过】\n【结果/影响】");
//        return response;
//    }
//@PostMapping("/polish")
//public PolishResponse polish(@RequestBody PolishRequest request) {
//    // 简单示例：返回“润色”后的内容
//    String content = request.getContent();
//    String template = request.getTemplate();
//    String polished = "【AI润色结果】\n" + (content != null ? content : "") + "\n（已参考模版）";
//    PolishResponse response = new PolishResponse();
//    response.setPolished(polished);
//    return response;
//}
//    一次性输出
//@PostMapping("/get-template")
//public TemplateResponse getTemplate(@RequestBody TemplateRequest request) {
//    TemplateResponse response = new TemplateResponse();
//    try {
//
//
//        // 2. 组装 prompt
//        StringBuilder sb = new StringBuilder();
//        sb.append("请根据以下用户输入的新闻信息，从内置知识库中检索出类似的新闻，并输出其内容字段部分的全部信息：\n");//当做模版输出其全部信息
//        sb.append("用户输入：").append(request.getContent()).append("\n");
//
//
//        // 3. 调用阿里云大模型
//        String appId = "ccba98f1823c4c22920519f01aa524ca"; // 替换为你的应用ID
//        //String apiKey = System.getenv("DASHSCOPE_API_KEY"); // 推荐用环境变量
//        String apiKey ="sk-35ebff36b0fc406dad0751fcd95dbae5";
//        String result = AliyunLLMUtil.AliChat(appId, apiKey, sb.toString());
//        response.setTemplate(result);
//
//
//    } catch (Exception e) {
//        response.setTemplate("调用大模型失败：" + e.getMessage());
//    }
//    return response;
//}
//    @PostMapping("/polish")
//    public PolishResponse newspolish(@RequestBody PolishRequest request) {
//        PolishResponse response = new PolishResponse();
//        try {
//
//
//            // 2. 组装 prompt
//            StringBuilder sb = new StringBuilder();
//            sb.append("接下来将输入新闻模版和用户输入的新闻信息，请依据选取的新闻模版的风格对用户输入新闻信息进行润色并输出润色后的新闻：\n");
//
//            sb.append("选取的新闻模版：").append(request.getTemplate()).append("\n");
//            sb.append("用户输入的新闻信息：").append(request.getContent()).append("\n");
//
//
//            // 3. 调用阿里云大模型
//            String appId = "ccba98f1823c4c22920519f01aa524ca"; // 替换为你的应用ID
//            //String apiKey = System.getenv("DASHSCOPE_API_KEY"); // 推荐用环境变量
//            String apiKey = "sk-35ebff36b0fc406dad0751fcd95dbae5";
//            String result = AliyunLLMUtil.AliChat(appId, apiKey, sb.toString());
//            response.setPolished(result);
//
//
//        } catch (Exception e) {
//            response.setPolished("调用大模型失败：" + e.getMessage());
//        }
//        return response;
//    }

    //@PostMapping("/polish")
//    public PolishResponse newspolish(@RequestBody PolishRequest request) {
//        PolishResponse response = new PolishResponse();
//        try {
//
//
//            // 2. 组装 prompt
//            StringBuilder sb = new StringBuilder();
//            sb.append("请根据以下用户输入的新闻信息，依据选取的新闻模版对新闻进行润色并输出润色后的新闻：\n");
//            //后续此处需要从前端传输模版信息，此处先写死
//            sb.append("选取的新闻模版：4月27日，公司党委召开党委理论学习中心组第3次集中学习暨深入贯彻中央八项规定精神学习教育读书班。深刻领悟习近平总书记关于深入贯彻中冶八项规定精神学习教育的重要讲话和重要指示精神。公司党委书记、总经理沈胜节主持，公司党委班子参加学习并作交流研讨。\n" +
//                    "学习中，公司党委理论学习中心组成员领学，原原本本、逐句逐条研读《习近平关于加强党的作风建设论述摘编》、习近平总书记关于党的历史的重要论述；学习领会和贯彻落实中央八项规定精神及其实施细则精神；传达学习中国五矿企业文化手册、中冶南方2025年度党风廉政建设与反腐败工作会议精神。\n" +
//                    "沈胜节在总结讲话时，对进一步抓好学习教育工作提出了三点要求：一是要严格落实《中冶南方深入贯彻中央八项规定精神学习教育工作指引》要求，谋深抓实学习教育各项工作。二是要学在前、做表率，始终在“严”字上下功夫，在“实”字上做文章，带头增强党性、带头砥砺作风，以上率下形成良好风气，用实际行动推动公司广大党员干部凝心聚力、振奋精神。三是要发扬自我革命精神，坚持用改革精神和严的标准管党治党，紧密围绕落实国家重大战略和党委年度重点工作，有力确保学习教育落地见效。\n");
//            sb.append("用户输入的新闻信息：").append(request.getContent()).append("\n");
//
//
//            // 3. 调用阿里云大模型
//            String appId = "ccba98f1823c4c22920519f01aa524ca"; // 替换为你的应用ID
//            //String apiKey = System.getenv("DASHSCOPE_API_KEY"); // 推荐用环境变量
//            String apiKey ="sk-35ebff36b0fc406dad0751fcd95dbae5";
//            String result = AliyunLLMUtil.AliChat(appId, apiKey, sb.toString());
//            response.setPolished(result);
//
//
//        } catch (Exception e) {
//            response.setPolished("调用大模型失败：" + e.getMessage());
//        }
//        return response;
//
//
//    }
    //流式输出
    @PostMapping("/get-template")
    public void getTemplate(@RequestBody TemplateRequest request, HttpServletResponse response) {
        //TemplateResponse response = new TemplateResponse();
        response.setContentType("application/octet-stream;charset=UTF-8");

        // 设置响应编码为 UTF-8（必须）
        response.setCharacterEncoding("UTF-8");
        try (
                // 强制以 UTF-8 写入流，避免使用平台默认编码
                PrintWriter writer = new PrintWriter(response.getOutputStream(), true, StandardCharsets.UTF_8)
        ){


            // 2. 组装 prompt
            StringBuilder sb = new StringBuilder();
            sb.append("请根据以下用户输入的新闻信息，从内置知识库中检索出最相似的新闻，并输出其内容字段部分的全部信息：\n");//当做模版输出其全部信息
            sb.append("用户输入：").append(request.getContent()).append("\n");


            // 3. 调用阿里云大模型
            String appId = "ccba98f1823c4c22920519f01aa524ca"; // 替换为你的应用ID
            //String apiKey = System.getenv("DASHSCOPE_API_KEY"); // 推荐用环境变量
            String apiKey ="sk-35ebff36b0fc406dad0751fcd95dbae5";
//            String result = AliyunLLMUtil.getMostSimilar(appId, apiKey, sb.toString());
//            response.setTemplate(result);

            //*************************
            for (String data : AliyunLLMUtil.AliChat(appId, apiKey, sb.toString())) {
                writer.write(data);
                writer.flush();
            }

            //********************
        }catch (IOException e) {
            log.error("Stream writing failed", e);
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }catch (NoApiKeyException | InputRequiredException | ApiException e) {
            log.error("DashScope call failed", e);
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST); // 或 500
        }
        //return response;
    }


    //流式输出
    @PostMapping("/polish")
    public void newspolish(@RequestBody PolishRequest request,HttpServletResponse response) {
        response.setContentType("application/octet-stream;charset=UTF-8");

        // 设置响应编码为 UTF-8（必须）
        response.setCharacterEncoding("UTF-8");
        try (
                // 强制以 UTF-8 写入流，避免使用平台默认编码
                PrintWriter writer = new PrintWriter(response.getOutputStream(), true, StandardCharsets.UTF_8)
        ){


            // 2. 组装 prompt
            StringBuilder sb = new StringBuilder();
            sb.append("请根据以下用户输入的新闻信息，依据选取的新闻模版对新闻进行润色并输出润色后的新闻：\n");
            //后续此处需要从前端传输模版信息，此处先写死
            sb.append("选取的新闻模版：4月27日，公司党委召开党委理论学习中心组第3次集中学习暨深入贯彻中央八项规定精神学习教育读书班。深刻领悟习近平总书记关于深入贯彻中冶八项规定精神学习教育的重要讲话和重要指示精神。公司党委书记、总经理沈胜节主持，公司党委班子参加学习并作交流研讨。\n" +
                    "学习中，公司党委理论学习中心组成员领学，原原本本、逐句逐条研读《习近平关于加强党的作风建设论述摘编》、习近平总书记关于党的历史的重要论述；学习领会和贯彻落实中央八项规定精神及其实施细则精神；传达学习中国五矿企业文化手册、中冶南方2025年度党风廉政建设与反腐败工作会议精神。\n" +
                    "沈胜节在总结讲话时，对进一步抓好学习教育工作提出了三点要求：一是要严格落实《中冶南方深入贯彻中央八项规定精神学习教育工作指引》要求，谋深抓实学习教育各项工作。二是要学在前、做表率，始终在“严”字上下功夫，在“实”字上做文章，带头增强党性、带头砥砺作风，以上率下形成良好风气，用实际行动推动公司广大党员干部凝心聚力、振奋精神。三是要发扬自我革命精神，坚持用改革精神和严的标准管党治党，紧密围绕落实国家重大战略和党委年度重点工作，有力确保学习教育落地见效。\n");
            sb.append("用户输入的新闻信息：").append(request.getContent()).append("\n");


            // 3. 调用阿里云大模型
            String appId = "ccba98f1823c4c22920519f01aa524ca"; // 替换为你的应用ID
            //String apiKey = System.getenv("DASHSCOPE_API_KEY"); // 推荐用环境变量
            String apiKey ="sk-35ebff36b0fc406dad0751fcd95dbae5";
//            String result = AliyunLLMUtil.getMostSimilar(appId, apiKey, sb.toString());
//            response.setTemplate(result);

            //*************************
            for (String data : AliyunLLMUtil.AliChat(appId, apiKey, sb.toString())) {
                writer.write(data);
                writer.flush();
            }

            //********************
        }catch (IOException e) {
            log.error("Stream writing failed", e);
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }catch (NoApiKeyException | InputRequiredException | ApiException e) {
            log.error("AliChat call failed", e);
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST); // 或 500
        }
    }


}