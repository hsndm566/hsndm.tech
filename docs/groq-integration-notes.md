# Groq integration notes

Source URLs:

- https://console.groq.com/docs/models
- https://console.groq.com/docs/text-chat
- https://console.groq.com/docs/openai

Verified facts from official Groq documentation (retrieved 2026-08-13):

- Groq exposes an OpenAI-compatible API at `https://api.groq.com/openai/v1`.
- Authentication uses the `GROQ_API_KEY` environment variable as a Bearer/API key credential.
- The production model `llama-3.3-70b-versatile` is listed as available and supports chat completions.
- The production model `openai/gpt-oss-120b` is also listed as available.
- Groq documents structured JSON output through JSON Schema for chat completions.
- The model list is available from `https://api.groq.com/openai/v1/models`.
- The implementation must keep `GROQ_API_KEY` server-side and never expose it in client code.
- The first CV-maker endpoint uses `llama-3.3-70b-versatile` by default, with `GROQ_MODEL` as an environment override.
