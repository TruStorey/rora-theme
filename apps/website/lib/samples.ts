export const SAMPLES = {
  typescript: `// rora — a calm dark theme
import { type Theme } from "./theme";

interface Swatch {
  name: string;
  hex: \`#\${string}\`;
}

export function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  for (const [name, value] of Object.entries(theme.colors)) {
    root.style.setProperty(\`--\${name}\`, value);
  }
}

const accent = 0xb59eff;
console.log(\`primary accent: #\${accent.toString(16)}\`);
`,
  python: `# rora — a calm dark theme
from dataclasses import dataclass

@dataclass
class Swatch:
    name: str
    hex: str

def apply_theme(theme: dict[str, str]) -> None:
    """Write every CSS variable to stdout."""
    for name, value in theme.items():
        print(f"--{name}: {value};")

if __name__ == "__main__":
    apply_theme({"background": "#12101c", "foreground": "#eddeff"})
`,
  json: `{
  "name": "Rora",
  "version": "1.0.0",
  "description": "A cosy, calm dark theme.",
  "background": "#12101c",
  "foreground": "#eddeff",
  "accents": ["#b59eff", "#72f0c8", "#f06cb8"],
  "italic": true,
  "contrast": 9.1
}
`,
} as const;

export type SampleLang = keyof typeof SAMPLES;
