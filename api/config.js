import { writeFileSync, readFileSync } from "fs";
import { join } from "path";

const configFile = join(process.cwd(), "config.json");

export default function handler(req, res) {
    if (req.method === "POST") {
        const { prefix } = req.body;
        if (!prefix) {
            return res.status(400).json({ error: "Prefix is required" });
        }
        
        writeFileSync(configFile, JSON.stringify({ codePrefix: prefix }), "utf-8");
        return res.status(200).json({ success: true, prefix });
    }

    if (req.method === "GET") {
        try {
            const data = readFileSync(configFile, "utf-8");
            const config = JSON.parse(data);
            return res.status(200).json(config);
        } catch (error) {
            return res.status(500).json({ error: "Could not read config" });
        }
    }

    return res.status(405).json({ error: "Method not allowed" });
}
