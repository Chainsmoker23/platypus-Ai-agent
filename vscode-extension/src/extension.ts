import * as vscode from 'vscode';
import { generateProject as callGenerateProjectApi } from './apiClient';
import { ensureDirectoryExists } from './utils';
import * as path from 'path';

// This method is called when your extension is activated
export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "platypus" is now active!');

    // --- Register the main project generation command ---
    let disposable = vscode.commands.registerCommand('platypus.generateProject', async () => {
        // --- 1. Get API Key (securely) ---
        let apiKey = await context.secrets.get('platypusApiKey');
        if (!apiKey) {
            apiKey = await vscode.window.showInputBox({
                prompt: 'Enter your Platypus API Key',
                password: true,
                ignoreFocusOut: true,
            });
            if (apiKey) {
                await context.secrets.store('platypusApiKey', apiKey);
            } else {
                vscode.window.showErrorMessage('Platypus API Key is required.');
                return;
            }
        }

        // --- 2. Get Project Prompt from User ---
        const prompt = await vscode.window.showInputBox({
            prompt: 'Describe the project you want to build',
            placeHolder: 'e.g., a simple React to-do app',
            ignoreFocusOut: true,
        });

        if (!prompt) {
            return; // User cancelled
        }
        
        // --- 3. Show Progress and Call Backend API ---
        await vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: 'Platypus is building your project...',
            cancellable: false
        }, async (progress) => {
            try {
                progress.report({ increment: 20, message: "Contacting AI..." });
                
                const response = await callGenerateProjectApi(prompt, apiKey as string);
                
                if (!response.files || typeof response.files !== 'object') {
                    throw new Error("Invalid response from API. Expected a 'files' object.");
                }

                progress.report({ increment: 50, message: "Generating files..." });

                // --- 4. Write Files to Workspace ---
                const workspaceFolders = vscode.workspace.workspaceFolders;
                if (!workspaceFolders) {
                    vscode.window.showErrorMessage('You must have a folder open in VS Code to generate a project.');
                    return;
                }
                const rootUri = workspaceFolders[0].uri;

                for (const filePath in response.files) {
                    const content = response.files[filePath];
                    const fileUri = vscode.Uri.joinPath(rootUri, filePath);
                    
                    // Ensure parent directory exists before writing file
                    const dirUri = vscode.Uri.file(path.dirname(fileUri.fsPath));
                    await ensureDirectoryExists(dirUri);
                    
                    const writeData = Buffer.from(content, 'utf8');
                    await vscode.workspace.fs.writeFile(fileUri, writeData);
                }
                
                progress.report({ increment: 100, message: "Done!" });
                vscode.window.showInformationMessage(`Platypus successfully generated your project: ${prompt}`);

            } catch (error: any) {
                console.error(error);
                vscode.window.showErrorMessage(`Failed to generate project: ${error.message || 'Unknown error'}`);
            }
        });
    });

    context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
