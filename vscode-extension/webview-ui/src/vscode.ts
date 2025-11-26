import type { WebviewApi } from 'vscode-webview';

/**
 * A helper function that returns the VS Code API instance.
 * It's globally available in webviews, but this provides type safety.
 */
export function getVSCodeApi<T = unknown>(): WebviewApi<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (window as any).vscode;
}

export const vscode = getVSCodeApi();
