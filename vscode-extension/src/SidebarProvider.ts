import * as vscode from 'vscode';
import { handleChat } from './apiClient';

// Helper to generate a random nonce for Content Security Policy
function getNonce() {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export class SidebarProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = 'platypus.sidebarView';

  private _view?: vscode.WebviewView;

  constructor(private readonly _context: vscode.ExtensionContext) {}

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken,
  ) {
    this._view = webviewView;

    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [vscode.Uri.joinPath(this._context.extensionUri, 'webview-ui', 'dist')],
    };

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

    // --- Set up message listener ---
    webviewView.webview.onDidReceiveMessage(async (message) => {
      switch (message.type) {
        case 'sendMessage':
          {
            const apiKey = await this._context.secrets.get('platypusApiKey');
            if (!apiKey) {
              this._view?.webview.postMessage({ type: 'error', value: 'API Key not set.' });
              vscode.window.showErrorMessage("Platypus API Key not set. Please run 'Platypus: Generate Project' once to set it.");
              return;
            }
            try {
              const reply = await handleChat(message.value.message, message.value.history, apiKey);
              this._view?.webview.postMessage({ type: 'addMessage', value: { author: 'bot', text: reply } });
            } catch (error: any) {
              this._view?.webview.postMessage({ type: 'error', value: error.message });
            }
          }
          break;
        case 'requestApiKey':
          {
            const apiKey = await this._context.secrets.get('platypusApiKey');
            if(apiKey){
                 this._view?.webview.postMessage({ type: 'apiKey', value: true });
            } else {
                 this._view?.webview.postMessage({ type: 'apiKey', value: false });
            }
          }
          break;
        case 'setApiKey':
            {
                const apiKey = await vscode.window.showInputBox({
                    prompt: 'Enter your Platypus API Key',
                    password: true,
                    ignoreFocusOut: true,
                });
                if (apiKey) {
                    await this._context.secrets.store('platypusApiKey', apiKey);
                    this._view?.webview.postMessage({ type: 'apiKey', value: true });
                    vscode.window.showInformationMessage("Platypus API Key stored successfully.");
                }
            }
            break;
      }
    });
  }

  private _getHtmlForWebview(webview: vscode.Webview) {
    const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(this._context.extensionUri, 'webview-ui', 'dist', 'assets', 'index.js'));
    const styleUri = webview.asWebviewUri(vscode.Uri.joinPath(this._context.extensionUri, 'webview-ui', 'dist', 'assets', 'index.css'));
    const nonce = getNonce();

    return `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">
        <title>Platypus Chat</title>
        <link rel="stylesheet" type="text/css" href="${styleUri}">
      </head>
      <body>
        <div id="root"></div>
        <script nonce="${nonce}" src="${scriptUri}"></script>
      </body>
      </html>`;
  }
}
