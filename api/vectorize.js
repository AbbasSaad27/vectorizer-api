import { vectorize } from "@neplex/vectorizer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const buffers = [];

  req.on("data", (chunk) => buffers.push(chunk));
  req.on("end", async () => {
    try {
      const inputBuffer = Buffer.concat(buffers);
      const svg = await vectorize(inputBuffer);
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader("Content-Type", "image/svg+xml");
      res.status(200).send(svg);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
}
