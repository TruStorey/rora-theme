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

PRIMARY = "#b59eff"  # Violet

@dataclass
class Swatch:
    name: str
    hex: str
    role: str = "accent"

def apply_theme(theme: dict[str, str]) -> None:
    """Write every CSS variable to stdout."""
    for name, value in theme.items():
        print(f"--{name}: {value};")

if __name__ == "__main__":
    apply_theme({"background": "#12101c", "foreground": "#eddeff"})
    print(f"primary accent: {PRIMARY}")
`,
  json: `{
  "name": "Rora",
  "version": "1.0.0",
  "author": "Rora Theme",
  "description": "A cosy, calm dark theme.",
  "type": "dark",
  "background": "#12101c",
  "foreground": "#eddeff",
  "accents": {
    "violet": "#b59eff",
    "rosa": "#f06cb8",
    "aurora": "#72f0c8",
    "polar": "#7ec8f4"
  },
  "italic": true,
  "contrast": 9.1,
  "license": "MIT"
}
`,
} as const;

export type SampleLang = keyof typeof SAMPLES;
