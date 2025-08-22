package com.example.newsassistant.util;

import com.alibaba.dashscope.app.Application;
import com.alibaba.dashscope.app.ApplicationParam;
import com.alibaba.dashscope.app.ApplicationResult;
import com.alibaba.dashscope.exception.ApiException;
import com.alibaba.dashscope.exception.InputRequiredException;
import com.alibaba.dashscope.exception.NoApiKeyException;
import io.reactivex.Flowable;

import java.util.Iterator;

public class AliyunLLMUtil {
    //一次性输出
//    public static String AliChat(String appId, String apiKey, String prompt) throws ApiException, NoApiKeyException, InputRequiredException {
//        ApplicationParam param = ApplicationParam.builder()
//                .apiKey(apiKey)
//                .appId(appId)
//                .prompt(prompt)
//                .incrementalOutput(false)
//                .build();
//        Application application = new Application();
//        ApplicationResult result = application.call(param);
//        return result.getOutput().getText();
//    }
public static Iterable<String> AliChat(String appId, String apiKey, String prompt) throws ApiException, NoApiKeyException, InputRequiredException {
    ApplicationParam.ApplicationParamBuilder builder = ApplicationParam.builder()
            .apiKey(apiKey)
            .appId(appId)
            .prompt(prompt)
            .incrementalOutput(true);

    String sessionId="";
    if (sessionId != null && !sessionId.isEmpty()) {
        builder.sessionId(sessionId);
    }

    ApplicationParam param = builder.build();
    Application application = new Application();

    Flowable<ApplicationResult> resultFlow = application.streamCall(param);
    return () -> new Iterator<String>() {
        private final Iterator<ApplicationResult> innerIterator = resultFlow.blockingIterable().iterator();
        private int eventId = 0;

        @Override
        public boolean hasNext() {
            return innerIterator.hasNext();
        }

        @Override
        public String next() {
            ApplicationResult result = innerIterator.next();
            String content = result.getOutput().getText();
//            return String.format(
//                    "id:%d\nevent:result\n:HTTP_STATUS/200\ndata:{\"content\":\"%s\"}\n\n",
//                    eventId++, content.replace("\"", "\\\"")
//            );
            return String.format(content.replace("\"", "\\\"")
            );
        }
    };
}


}