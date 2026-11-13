// Safe Corner AI ასისტენტი: Cloudflare Worker.
// საიდუმლო ცვლადი (Settings → Variables and Secrets): ANTHROPIC_API_KEY
import Anthropic from "@anthropic-ai/sdk";

const ORIGINS = ["https://safecorner.ge", "https://www.safecorner.ge", "http://localhost:8765"];
const MODEL = "claude-opus-5-5";
const MAX_Q = 800;          // ერთი კითხვის მაქს. სიგრძე
const MAX_TURNS = 8;        // საუბრის ისტორია
const MAX_CTX = 14;         // ამონარიდების რაოდენობა
const MAX_CHUNK = 4500;

const SYSTEM = `შენ ხარ „Safe Corner AI“ — Safe Corner-ის (safecorner.ge, საქართველოს პირველი შრომის უსაფრთხოების YouTube პროექტი) ასისტენტი. ეხმარები ადამიანებს საქართველოს შრომის უსაფრთხოების კანონმდებლობის გაგებაში.

წესები:
- უპასუხე იმ ენაზე, რომელზეც გეკითხებიან (ჩვეულებრივ ქართულად). მოკლედ, გასაგებად, პრაქტიკულად: ჯერ პირდაპირი პასუხი, მერე საჭიროების შემთხვევაში 2–6 პუნქტი.
- ეყრდნობი პირველ რიგში მოწოდებულ ამონარიდებს Safe Corner-ის საკანონმდებლო ბაზიდან. თითოეული ამონარიდი იწყება [[კოდი]] ნიშნით.
- როცა ფაქტს იღებ ბაზის დოკუმენტიდან, მიუთითე წყარო ზუსტად ასე: [[კოდი]] (მაგ. [[4486188]]) და, თუ ჩანს, მუხლის ნომერი. სხვა ფორმატის ბმულები ბაზის დოკუმენტებზე არ გააკეთო.
- თუ ამონარიდებში პასუხი არ არის ან არასრულია, გამოიყენე ძებნა matsne.gov.ge-ზე (web_search / web_fetch) და მიუთითე matsne-ს ბმული.
- არასოდეს მოიგონო მუხლის ნომერი, ციფრი, ვადა ან ჯარიმის ოდენობა. თუ ვერ დაადასტურე, თქვი პირდაპირ.
- გაითვალისწინე, რომ ბაზის PDF-ების ნაწილი პირველადი რედაქციაა; თუ საკითხი კრიტიკულია (ჯარიმა, ვადა), ურჩიე matsne-ზე მოქმედი რედაქციის გადამოწმება.
- შენი პასუხი არ არის იურიდიული კონსულტაცია; კონკრეტულ შემთხვევაზე ურჩიე შრომის უსაფრთხოების სპეციალისტთან ან შრომის ინსპექციასთან კონსულტაცია.
- შრომის უსაფრთხოებასთან და Safe Corner-თან დაუკავშირებელ თხოვნებზე თავაზიანად უთხარი, რომ მხოლოდ ამ თემაზე გეხმარები.
- ფორმატი: მარტივი Markdown (**მუქი**, „- “ სიები). სათაურები და ცხრილები არ გამოიყენო.`;

function cors(origin) {
  return {
    "Access-Control-Allow-Origin": ORIGINS.includes(origin) ? origin : ORIGINS[0],
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Vary": "Origin",
  };
}
const json = (o, status, h) => new Response(JSON.stringify(o), { status, headers: { ...h, "Content-Type": "application/json; charset=utf-8" } });
const str = (v, n) => (typeof v === "string" ? v.slice(0, n) : "");

export default {
  async fetch(req, env) {
    const origin = req.headers.get("Origin") || "";
    const h = cors(origin);
    if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: h });
    if (req.method !== "POST") return json({ error: "method" }, 405, h);
    if (!ORIGINS.includes(origin)) return json({ error: "origin" }, 403, h);

    let body;
    try { body = await req.json(); } catch { return json({ error: "bad json" }, 400, h); }

    // საუბრის ისტორია: მხოლოდ ტექსტი, მონაცვლე როლები, ბოლო user-ით
    const hist = (Array.isArray(body.messages) ? body.messages : []).slice(-MAX_TURNS)
      .map((m) => ({ role: m.role === "assistant" ? "assistant" : "user", content: str(m.content, m.role === "assistant" ? 4000 : MAX_Q).trim() }))
      .filter((m) => m.content);
    while (hist.length && hist[0].role !== "user") hist.shift();
    if (!hist.length || hist[hist.length - 1].role !== "user") return json({ error: "no question" }, 400, h);

    const ctx = (Array.isArray(body.context) ? body.context : []).slice(0, MAX_CTX)
      .map((c) => `[[${str(c.k, 24).replace(/[^\w-]/g, "")}]] ${str(c.t, 200)}\n${str(c.x, MAX_CHUNK)}`).join("\n\n---\n\n");

    const q = hist.pop().content;
    hist.push({
      role: "user",
      content: [
        { type: "text", text: `ამონარიდები Safe Corner-ის საკანონმდებლო ბაზიდან:\n\n${ctx || "(ვერაფერი მოიძებნა)"}` },
        { type: "text", text: `კითხვა: ${q}` },
      ],
    });

    const client = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });
    const params = {
      model: MODEL,
      max_tokens: 4000,
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      output_config: { effort: "low" },
      system: SYSTEM,
      tools: [
        { type: "web_search_20260209", name: "web_search", max_uses: 3, allowed_domains: ["matsne.gov.ge"] },
        { type: "web_fetch_20260209", name: "web_fetch", max_uses: 2, allowed_domains: ["matsne.gov.ge"], max_content_tokens: 20000 },
      ],
      messages: hist,
    };

    try {
      let res;
      for (let i = 0; i < 3; i++) {
        res = await client.beta.messages.create(params);
        if (res.stop_reason !== "pause_turn") break;
        params.messages = [...params.messages, { role: "assistant", content: res.content }];
      }
      if (res.stop_reason === "refusal") return json({ answer: "ამ კითხვაზე პასუხის გაცემა ვერ შევძელი. სცადე სხვაგვარად ჩამოაყალიბო." }, 200, h);
      const answer = res.content.filter((b) => b.type === "text").map((b) => b.text).join("").trim();
      return json({ answer: answer || "პასუხი ვერ მივიღე, სცადე თავიდან." }, 200, h);
    } catch (e) {
      if (e instanceof Anthropic.RateLimitError) return json({ error: "busy" }, 429, h);
      if (e instanceof Anthropic.APIError) return json({ error: "api", status: e.status }, 502, h);
      return json({ error: "server" }, 500, h);
    }
  },
};
