import {
  createHighlighter,
  type BundledLanguage,
  type Highlighter,
} from "shiki";
import { roraShikiTheme } from "./rora-shiki-theme";

let highlighterPromise: Promise<Highlighter> | null = null;

const SUPPORTED_LANGS: BundledLanguage[] = ["typescript", "python", "json"];

function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: [roraShikiTheme],
      langs: SUPPORTED_LANGS,
    });
  }
  return highlighterPromise;
}

export async function highlight(code: string, lang: BundledLanguage) {
  const highlighter = await getHighlighter();
  return highlighter.codeToHtml(code, {
    lang,
    theme: "rora",
  });
}
