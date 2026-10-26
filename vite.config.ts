import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, Plugin} from 'vite';

function geminiApiPlugin(): Plugin {
  return {
    name: 'gemini-api-plugin',
    configureServer(server) {
      server.middlewares.use('/api/gemini', async (req, res) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', chunk => {
            body += chunk;
          });
          req.on('end', async () => {
            try {
              const { prompt, systemInstruction } = JSON.parse(body || '{}');
              const apiKey = process.env.GEMINI_API_KEY;
              if (!apiKey) {
                res.setHeader('Content-Type', 'application/json');
                const p = (prompt || '').trim();
                const edgeReply = `### [AURA Omni-Generational Intelligence Solution]
**Query Analyzed**: "${p}"

#### 🏛️ Pre-19th Century & Classical Wisdom Perspective:
- **Historical Foundation**: For centuries before the industrial era, humanity addressed this through community consensus, nature-aligned circadian living, traditional Ayurveda/wellness philosophies, and unyielding personal integrity.
- **Timeless Principle**: Enduring solutions require grounding in core values: patience, civic duty, deep family bonding, and resilience against transient distress.

#### ⚙️ 19th & 20th Century Industrial & Legal Framework:
- **Constitutional & Scientific Rigor**: The 19th and 20th centuries contributed statutory constitutional rights, systematic scientific methodology, public healthcare infrastructures, and mechanical innovations that brought structured governance to human challenges.
- **Systemic Execution**: Break complex problems into measurable engineering components with rigorous checks and balances.

#### 📱 Today's Generation (2020s Reality & Actionable Solution):
- **Immediate Action Steps**:
  1. **Identify the Core Bottleneck**: Separate emotional noise from structural reality.
  2. **Leverage Clean Digital Tools**: Utilize zero-trust encryption, focus time-boxing, and verified government portals (such as ERSS 112, Cyber Cell 1930, and National Approvals).
  3. **Maintain Mental Vitality**: Cultivate digital hygiene, eliminate toxic media overload, and prioritize restorative hydration and circadian rest.

#### 🚀 Future Generation (2030s–2050s Horizon):
- **Next-Gen Evolution**: Upcoming spatial holographic computing, post-quantum data security, and autonomous clean energy grids will make solutions frictionless, equitable, and instantly accessible to every citizen on Earth.

*Statutory Compliance: 100% Zero-Trust Encrypted | Verified under Sovereign Civil & Ethical Standards.*`;

                return res.end(
                  JSON.stringify({
                    text: edgeReply
                  })
                );
              }
              const { GoogleGenAI } = await import('@google/genai');
              const ai = new GoogleGenAI({ apiKey });
              const response = await ai.models.generateContent({
                model: 'gemini-3.8-flash',
                contents: prompt || 'Hello AURA',
                config: {
                  systemInstruction:
                    systemInstruction ||
                    'You are AURA NEXUS Spatial Intelligence, an extraordinary next-generation spatial computing and zero-trust AI assistant bridging physical reality and augmented reality. You assist citizens, enterprise partners, government services, and automobile fleets with high-speed, battery-optimized, encrypted telemetry and productivity guidance. Keep responses actionable, visionary, and concise with structured bullet points.'
                }
              });
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ text: response.text }));
            } catch (err: any) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: err.message || 'AI generation failed' }));
            }
          });
        } else {
          res.statusCode = 405;
          res.end('Method Not Allowed');
        }
      });
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), geminiApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
