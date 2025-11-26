import * as vscode from 'vscode';

/**
 * Recursively ensures that a directory exists.
 * @param dirUri The URI of the directory to create.
 */
export async function ensureDirectoryExists(dirUri: vscode.Uri): Promise<void> {
    try {
        // This will throw an error if the directory doesn't exist.
        await vscode.workspace.fs.stat(dirUri);
    } catch {
        // If it throws, the directory doesn't exist, so create it recursively.
        // The `createDirectory` function handles recursion automatically.
        await vscode.workspace.fs.createDirectory(dirUri);
    }
}
