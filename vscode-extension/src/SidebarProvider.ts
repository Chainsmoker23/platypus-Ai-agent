import * as vscode from 'vscode';

export class SidebarProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = 'platypus.sidebarView';

  private _view?: vscode.WebviewView;

  constructor(private readonly _extensionUri: vscode.Uri) {}

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken,
  ) {
    this._view = webviewView;

    webviewView.webview.options = {
      // Allow scripts in the webview
      enableScripts: true,
      localResourceRoots: [this._extensionUri],
    };

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
  }

  private _getHtmlForWebview(webview: vscode.Webview) {
    // For now, it will be a simple placeholder.
    // In the next step, we will load our React app here.
    return `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Platypus Chat</title>
        <style>
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                color: var(--vscode-foreground);
                background-color: var(--vscode-sideBar-background);
                padding: 1em;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100vh;
                text-align: center;
            }
            h1 {
                font-size: 1.2em;
            }
            p {
                font-size: 0.9em;
                color: var(--vscode-descriptionForeground);
            }
        </style>
      </head>
      <body>
        <h1>Welcome to Platypus!</h1>
        <p>Our interactive chat interface will live here.</p>
        <p>You can still use <strong>Platypus: Generate Project</strong> from the Command Palette.</p>
      </body>
      </html>`;
  }
}
