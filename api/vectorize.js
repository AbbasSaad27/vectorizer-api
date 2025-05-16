import { vectorize } from "@neplex/vectorizer";

export default async function handler(req, res) {

  
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const buffers = [];

  req.on("data", (chunk) => buffers.push(chunk));
  req.on("end", async () => {
    try {
      const inputBuffer = Buffer.concat(buffers);
      const svg = await vectorize(inputBuffer);
      res.setHeader("Content-Type", "image/svg+xml");
      res.status(200).send(svg);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
}
