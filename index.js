import fetch from "node-fetch";

export default async ({ req, res }) => {
  try {
    const { prompt } = JSON.parse(req.body);

    // OpenAI
    const openai = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }]
      })
    }).then(r => r.json());

    // DeepSeek
    const deepseek = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [{ role: "user", content: prompt }]
      })
    }).then(r => r.json());

    // Grok (XAI)
    const grok = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROK_API_KEY}`
      },
      body: JSON.stringify({
        model: "grok-beta",
        messages: [{ role: "user", content: prompt }]
      })
    }).then(r => r.json());

    return res.json({
      openai: openai.choices?.[0]?.message?.content || "No response",
      deepseek: deepseek.choices?.[0]?.message?.content || "No response",
      grok: grok.choices?.[0]?.message?.content || "No response",
    });
  } catch (err) {
    return res.json({ error: err.message });
  }
};
