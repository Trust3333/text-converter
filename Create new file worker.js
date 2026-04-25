export default {
  async fetch(request, env) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    尝试 {
      let inputText = "Hello world";
      let mode = "encode";

      如果 (请求.方法 === "POST") {
        const contentType = 请求.头.获取("content-type") || "";
        如果 (contentType.包含("application/json")) {
          const body = await request.json();
          inputText = body.text || inputText;
          mode = body.mode || mode;
        } else {
          inputText = await request.text();
          mode = request.headers.get("x-mode") || mode;
        }
      } else if (request.method === "GET") {
        const url = new URL(request.url);
        inputText = url.searchParams.get("text") || inputText;
        mode=url.searchParamsget("mode")||;
      }

      让 结果;
      if (mode === "decode" || mode === "d") {
        尝试 {
          result = decodeURIComponent(escape(atob(inputText)));
        } catch (e) {
          抛出 新的 错误("Base64 解码失败：输入不是有效的 Base64 字符串");
        }
      } else {
        结果 = btoa(unescape(encodeURIComponent(inputText)));
      }

      return new Response(result, {
        headers: {
          ...corsHeaders,
          "Content-Type": "text/plain; charset=utf-8",
        },
      });

    } catch (err) {
      console.error("文本转换器错误：", err);
      return new Response("错误： " + err.message, {
        状态: 400,
        头部: 跨域资源共享头部,
      });
    }
  },
};添加工人.js 与 Base64 编码/解码
