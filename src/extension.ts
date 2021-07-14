import * as vscode from "vscode";
import { ProgressLocation, window, ColorThemeKind } from "vscode";

const quotes: Record<vscode.ColorThemeKind, string[]> = {
  [ColorThemeKind.Dark]: [
    "The darkness holds much worse than mere trickery and bogeymen.",
    "Darkness closes in, haunting the hearts of men.",
    "Terrors may indeed stalk these shadows, but yonder – a glint of gold.",
    "Secrets and wonders can be found in the most tenebrous corners of this place.",
    "And now... the darkness holds dominion – black as death.",
  ],
  [ColorThemeKind.Light]: [
    "The match is struck. A blazing star is born!",
    "The way is lit. The path is clear. We require only the strength to follow it.",
    "In radiance may we find victory!",
    "As the light gains purchase, spirits are lifted and purpose is made clear.",
    "The light, the promise of safety!",
  ],
  [ColorThemeKind.HighContrast]: ["high contrast quotes, open to suggestions"],
};

export function activate() {
  vscode.workspace.onDidChangeConfiguration((x) => {
    if (x.affectsConfiguration("workbench.colorTheme")) {
      const thisQuotes = quotes[vscode.window.activeColorTheme.kind];
      const quoteIndex =
        Math.round(Math.random() * thisQuotes.length) % thisQuotes.length;

      window.withProgress(
        {
          location: ProgressLocation.Notification,
          cancellable: true,
        },
        (progress) => {
          progress.report({
            increment: undefined,
            message: thisQuotes[quoteIndex],
          });
          const delay = 4000;

          return new Promise<void>((resolve) => setTimeout(resolve, delay));
        }
      );
    }
  });
}
