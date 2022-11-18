import { NgeMonacoContribution } from './monaco-contribution';

/**
 * When a user type a composition key like ^ or \` the editor
 * enter in composition mode, then after the user type any key the editor leave
 * this composition mode an duplicate the character pressed by the user.
 *
 * This bug occurs only on some browsers like firefox and calling this method will prevent this behavior
 * by removing any extra character added by the editor between 2 calls
 * of `onDidCompositionStart` and `onDidCompositionEnd`
 */
export class PreventSymbolDuplication implements NgeMonacoContribution {
  private disposable?: monaco.IDisposable;

  activate() {
    this.disposable = monaco.editor.onDidCreateEditor((e) => {
      this.preventSymbolDuplicationOnCompositionEnd(e);
    });
  }

  deactivate() {
    this.disposable?.dispose();
  }

  private preventSymbolDuplicationOnCompositionEnd(
    editor: monaco.editor.ICodeEditor
  ) {
    const positions: monaco.Position[] = [];
    let disposables: monaco.IDisposable[] = [];
    disposables.push(
      editor.onDidCompositionStart(() => {
        const position = editor.getPosition();
        if (position) {
          positions.push(position);
        }
      })
    );
    disposables.push(
      editor.onDidCompositionEnd(() => {
        setTimeout(() => {
          if (!positions.length) {
            return;
          }
          const before = positions[0];
          const after = editor.getPosition();
          if (!after) {
            return;
          }

          positions.splice(0, 1);
          const diff = after.column - before.column;
          if (diff > 1) {
            // unfocus the editor to leave composition
            // mode because when the user type ` the editor
            // leave the composition mode and begin another one
            (document.activeElement as any)?.blur();

            // focus the editor to let the user continue to edit the content
            // of the editor
            editor.focus();

            const r = new monaco.Range(
              after.lineNumber,
              after.column - (diff - 1),
              after.lineNumber,
              after.column
            );
            editor.executeEdits('api', [
              { range: r, text: '', forceMoveMarkers: false },
            ]);
          }
        });
      })
    );
    disposables.push(
      editor.onDidDispose(() => {
        disposables.forEach((e) => e.dispose());
        disposables = [];
      })
    );
  }
}
