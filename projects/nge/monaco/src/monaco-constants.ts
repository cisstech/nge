// ACTIONS
/** Toggle High Contrast Theme */
export const ACTION_TOGGLE_HIGH_CONTRAST = 'editor.action.toggleHighContrast';

/** Set Selection Anchor */
export const ACTION_SET_SELECTION_ANCHOR = 'editor.action.setSelectionAnchor';

/** Move Selected Text Left */
export const ACTION_MOVE_CARRET_LEFT = 'editor.action.moveCarretLeftAction';

/** Move Selected Text Right */
export const ACTION_MOVE_CARRET_RIGHT = 'editor.action.moveCarretRightAction';

/** Transpose Letters */
export const ACTION_TRANSPOSE_LETTERS = 'editor.action.transposeLetters';

/** Copy With Syntax Highlighting */
export const ACTION_CLIPBOARD_COPY_WITH_SYNTAX_HIGHLIGHTING =
  'editor.action.clipboardCopyWithSyntaxHighlightingAction';

/** Toggle Line Comment */
export const ACTION_COMMENT_LINE = 'editor.action.commentLine';

/** Add Line Comment */
export const ACTION_ADD_COMMENT_LINE = 'editor.action.addCommentLine';

/** Remove Line Comment */
export const ACTION_REMOVE_COMMENT_LINE = 'editor.action.removeCommentLine';

/** Toggle Block Comment */
export const ACTION_BLOCK_COMMENT = 'editor.action.blockComment';

/** Show Editor Context Menu */
export const ACTION_SHOW_CONTEXT_MENU = 'editor.action.showContextMenu';

/** Cursor Undo */
export const ACTION_CURSOR_UNDO = 'cursorUndo';

/** Cursor Redo */
export const ACTION_CURSOR_REDO = 'cursorRedo';

/** Editor Font Zoom In */
export const ACTION_FONT_ZOOM_IN = 'editor.action.fontZoomIn';

/** Editor Font Zoom Out */
export const ACTION_FONT_ZOOM_OUT = 'editor.action.fontZoomOut';

/** Editor Font Zoom Reset */
export const ACTION_FONT_ZOOM_RESET = 'editor.action.fontZoomReset';

/** Convert Indentation to Spaces */
export const ACTION_INDENTATION_TO_SPACES = 'editor.action.indentationToSpaces';

/** Convert Indentation to Tabs */
export const ACTION_INDENTATION_TO_TABS = 'editor.action.indentationToTabs';

/** Indent Using Tabs */
export const ACTION_INDENT_USING_TABS = 'editor.action.indentUsingTabs';

/** Indent Using Spaces */
export const ACTION_INDENT_USING_SPACES = 'editor.action.indentUsingSpaces';

/** Detect Indentation from Content */
export const ACTION_DETECT_INDENTATION = 'editor.action.detectIndentation';

/** Reindent Lines */
export const ACTION_REINDENTLINES = 'editor.action.reindentlines';

/** Reindent Selected Lines */
export const ACTION_REINDENTSELECTEDLINES =
  'editor.action.reindentselectedlines';

/** Copy Line Up */
export const ACTION_COPY_LINES_UP = 'editor.action.copyLinesUpAction';

/** Copy Line Down */
export const ACTION_COPY_LINES_DOWN = 'editor.action.copyLinesDownAction';

/** Duplicate Selection */
export const ACTION_DUPLICATE_SELECTION = 'editor.action.duplicateSelection';

/** Move Line Up */
export const ACTION_MOVE_LINES_UP = 'editor.action.moveLinesUpAction';

/** Move Line Down */
export const ACTION_MOVE_LINES_DOWN = 'editor.action.moveLinesDownAction';

/** Sort Lines Ascending */
export const ACTION_SORT_LINES_ASCENDING = 'editor.action.sortLinesAscending';

/** Sort Lines Descending */
export const ACTION_SORT_LINES_DESCENDING = 'editor.action.sortLinesDescending';

/** Trim Trailing Whitespace */
export const ACTION_TRIM_TRAILING_WHITESPACE =
  'editor.action.trimTrailingWhitespace';

/** Delete Line */
export const ACTION_DELETE_LINES = 'editor.action.deleteLines';

/** Indent Line */
export const ACTION_INDENT_LINES = 'editor.action.indentLines';

/** Outdent Line */
export const ACTION_OUTDENT_LINES = 'editor.action.outdentLines';

/** Insert Line Above */
export const ACTION_INSERT_LINE_BEFORE = 'editor.action.insertLineBefore';

/** Insert Line Below */
export const ACTION_INSERT_LINE_AFTER = 'editor.action.insertLineAfter';

/** Delete All Left */
export const ACTION_DELETE_ALL_LEFT = 'deleteAllLeft';

/** Delete All Right */
export const ACTION_DELETE_ALL_RIGHT = 'deleteAllRight';

/** Join Lines */
export const ACTION_JOIN_LINES = 'editor.action.joinLines';

/** Transpose characters around the cursor */
export const ACTION_TRANSPOSE = 'editor.action.transpose';

/** Transform to Uppercase */
export const ACTION_TRANSFORM_TO_UPPERCASE =
  'editor.action.transformToUppercase';

/** Transform to Lowercase */
export const ACTION_TRANSFORM_TO_LOWERCASE =
  'editor.action.transformToLowercase';

/** Transform to Title Case */
export const ACTION_TRANSFORM_TO_TITLECASE =
  'editor.action.transformToTitlecase';

/** Expand Selection */
export const ACTION_SMART_SELECT_EXPAND = 'editor.action.smartSelect.expand';

/** Shrink Selection */
export const ACTION_SMART_SELECT_SHRINK = 'editor.action.smartSelect.shrink';

/** Developer: Force Retokenize */
export const ACTION_FORCE_RETOKENIZE = 'editor.action.forceRetokenize';

/** Toggle Tab Key Moves Focus */
export const ACTION_TOGGLE_TAB_FOCUS_MODE = 'editor.action.toggleTabFocusMode';

/** Command Palette */
export const ACTION_QUICK_COMMAND = 'editor.action.quickCommand';

/** Replace with Previous Value */
export const ACTION_IN_PLACE_REPLACE_UP = 'editor.action.inPlaceReplace.up';

/** Replace with Next Value */
export const ACTION_IN_PLACE_REPLACE_DOWN = 'editor.action.inPlaceReplace.down';

/** Go to Line/Column... */
export const ACTION_GOTO_LINE = 'editor.action.gotoLine';

/** Select to Bracket */
export const ACTION_SELECT_TO_BRACKET = 'editor.action.selectToBracket';

/** Go to Bracket */
export const ACTION_JUMP_TO_BRACKET = 'editor.action.jumpToBracket';

/** Find */
export const ACTION_FIND = 'actions.find';

/** Find With Selection */
export const ACTION_FIND_WITH_SELECTION = 'actions.findWithSelection';

/** Find Next */
export const ACTION_NEXT_MATCH_FIND = 'editor.action.nextMatchFindAction';

/** Find Previous */
export const ACTION_PREVIOUS_MATCH_FIND =
  'editor.action.previousMatchFindAction';

/** Find Next Selection */
export const ACTION_NEXT_SELECTION_MATCH_FIND =
  'editor.action.nextSelectionMatchFindAction';

/** Find Previous Selection */
export const ACTION_PREVIOUS_SELECTION_MATCH_FIND =
  'editor.action.previousSelectionMatchFindAction';

/** Replace */
export const ACTION_START_FIND_REPLACE = 'editor.action.startFindReplaceAction';

/** Unfold */
export const ACTION_EDITOR_UNFOLD = 'editor.unfold';

/** Unfold Recursively */
export const ACTION_EDITOR_UNFOLD_RECURSIVELY = 'editor.unfoldRecursively';

/** Fold */
export const ACTION_EDITOR_FOLD = 'editor.fold';

/** Fold Recursively */
export const ACTION_EDITOR_FOLD_RECURSIVELY = 'editor.foldRecursively';

/** Fold All */
export const ACTION_EDITOR_FOLD_ALL = 'editor.foldAll';

/** Unfold All */
export const ACTION_EDITOR_UNFOLD_ALL = 'editor.unfoldAll';

/** Fold All Block Comments */
export const ACTION_EDITOR_FOLD_ALL_BLOCK_COMMENTS =
  'editor.foldAllBlockComments';

/** Fold All Regions */
export const ACTION_EDITOR_FOLD_ALL_MARKER_REGIONS =
  'editor.foldAllMarkerRegions';

/** Unfold All Regions */
export const ACTION_EDITOR_UNFOLD_ALL_MARKER_REGIONS =
  'editor.unfoldAllMarkerRegions';

/** Toggle Fold */
export const ACTION_EDITOR_TOGGLE_FOLD = 'editor.toggleFold';

/** Fold Level 1 */
export const ACTION_EDITOR_FOLD_LEVEL1 = 'editor.foldLevel1';

/** Fold Level 2 */
export const ACTION_EDITOR_FOLD_LEVEL2 = 'editor.foldLevel2';

/** Fold Level 3 */
export const ACTION_EDITOR_FOLD_LEVEL3 = 'editor.foldLevel3';

/** Fold Level 4 */
export const ACTION_EDITOR_FOLD_LEVEL4 = 'editor.foldLevel4';

/** Fold Level 5 */
export const ACTION_EDITOR_FOLD_LEVEL5 = 'editor.foldLevel5';

/** Fold Level 6 */
export const ACTION_EDITOR_FOLD_LEVEL6 = 'editor.foldLevel6';

/** Fold Level 7 */
export const ACTION_EDITOR_FOLD_LEVEL7 = 'editor.foldLevel7';

/** Open Link */
export const ACTION_OPEN_LINK = 'editor.action.openLink';

/** Trigger Symbol Highlight */
export const ACTION_WORD_HIGHLIGHT_TRIGGER =
  'editor.action.wordHighlight.trigger';

/** Show Accessibility Help */
export const ACTION_SHOW_ACCESSIBILITY_HELP =
  'editor.action.showAccessibilityHelp';

/** Developer: Inspect Tokens */
export const ACTION_INSPECT_TOKENS = 'editor.action.inspectTokens';

/** Go to Next Problem (Error, Warning, Info) */
export const ACTION_MARKER_NEXT = 'editor.action.marker.next';

/** Go to Previous Problem (Error, Warning, Info) */
export const ACTION_MARKER_PREV = 'editor.action.marker.prev';

/** Go to Next Problem in Files (Error, Warning, Info) */
export const ACTION_MARKER_NEXT_IN_FILES = 'editor.action.marker.nextInFiles';

/** Go to Previous Problem in Files (Error, Warning, Info) */
export const ACTION_MARKER_PREV_IN_FILES = 'editor.action.marker.prevInFiles';

/** Show Hover */
export const ACTION_SHOW_HOVER = 'editor.action.showHover';

/** Show Definition Preview Hover */
export const ACTION_SHOW_DEFINITION_PREVIEW_HOVER =
  'editor.action.showDefinitionPreviewHover';

/** Add Cursor Above */
export const ACTION_INSERT_CURSOR_ABOVE = 'editor.action.insertCursorAbove';

/** Add Cursor Below */
export const ACTION_INSERT_CURSOR_BELOW = 'editor.action.insertCursorBelow';

/** Add Cursors to Line Ends */
export const ACTION_INSERT_CURSOR_AT_END_OF_EACH_LINE_SELECTED =
  'editor.action.insertCursorAtEndOfEachLineSelected';

/** Add Selection To Next Find Match */
export const ACTION_ADD_SELECTION_TO_NEXT_FIND_MATCH =
  'editor.action.addSelectionToNextFindMatch';

/** Add Selection To Previous Find Match */
export const ACTION_ADD_SELECTION_TO_PREVIOUS_FIND_MATCH =
  'editor.action.addSelectionToPreviousFindMatch';

/** Move Last Selection To Next Find Match */
export const ACTION_MOVE_SELECTION_TO_NEXT_FIND_MATCH =
  'editor.action.moveSelectionToNextFindMatch';

/** Move Last Selection To Previous Find Match */
export const ACTION_MOVE_SELECTION_TO_PREVIOUS_FIND_MATCH =
  'editor.action.moveSelectionToPreviousFindMatch';

/** Select All Occurrences of Find Match */
export const ACTION_SELECT_HIGHLIGHTS = 'editor.action.selectHighlights';

/** Add Cursors To Bottom */
export const ACTION_ADD_CURSORS_TO_BOTTOM = 'editor.action.addCursorsToBottom';

/** Add Cursors To Top */
export const ACTION_ADD_CURSORS_TO_TOP = 'editor.action.addCursorsToTop';

/** Trigger Suggest */
export const ACTION_TRIGGER_SUGGEST = 'editor.action.triggerSuggest';

// https://github.com/microsoft/vscode/tree/master/src/vs/editor/contrib

export const COLOR_DETECTOR_CONTRIB = 'editor.contrib.colorDetector';
export const CONTEXT_MENU_CONTRIB = 'editor.contrib.contextmenu';
export const CURSOR_UNDO_REDO_CONTROLLER_CONTRIB =
  'editor.contrib.cursorUndoRedoController';
export const DRAG_AND_DROP_CONTRIB = 'editor.contrib.dragAndDrop';
export const AUTO_FORMAT_CONTRIB = 'editor.contrib.autoFormat';
export const FORMAT_ON_PAST_CONTRIB = 'editor.contrib.formatOnPaste';
export const SMART_SELECT_CONTRIB = 'editor.contrib.smartSelectController';
export const IPAD_SHOW_KEYBOARD_CONTRIB = 'editor.contrib.iPadShowKeyboard';
export const BRACKET_MATCHING_CONTROLLER_CONTRIB =
  'editor.contrib.bracketMatchingController';
export const CODE_LENS_CONTRIB = 'css.editor.codeLens';
export const FIND_CONTROLLE_CONTRIB = 'editor.contrib.findController';
export const FOLDING_CONTRIB = 'editor.contrib.folding';
export const IN_PLACE_REPLACE_CONTROLLER_CONTRIB =
  'editor.contrib.inPlaceReplaceController';
export const LINK_DETECTOR_CONTRIB = 'editor.linkDetector';
export const MESSAGE_CONTROLLER_CONTRIB = 'editor.contrib.messageController';
export const QUICK_FIX_CONTROLLER_CONTRIB = 'editor.contrib.quickFixController';
export const MULTI_CURSOR_CONTROLLER_CONTRIB =
  'editor.contrib.multiCursorController';
export const SELECTION_HIGHLIGHTER_CONTRIB =
  'editor.contrib.selectionHighlighter';
export const PARAMETER_HINTS_CONTRIB = 'editor.controller.parameterHints';
export const REFERENCE_CONTROLLER_CONTRIB =
  'editor.contrib.referenceController';
export const RENAME_CONTROLLER_CONTRIB = 'editor.contrib.renameController';
export const WORD_HIGHLIGHTER_CONTRIB = 'editor.contrib.wordHighlighter';
export const ACCESSIBILIY_HELP_CONTROLLER_CONTRIB =
  'editor.contrib.accessibilityHelpController';
export const INSPECT_TOKENS_CONTRIB = 'editor.contrib.inspectTokens';
export const QUICK_OPEN_CONTROLLER_CONTRIB =
  'editor.controller.quickOpenController';
export const GOTO_DEFINITION_CONTRIB =
  'editor.contrib.gotodefinitionatposition';
export const REFERENCES_CONTROLLER_CONTRIB =
  'editor.contrib.referencesController';
export const MARKER_CONTROLLER_CONTRIB = 'editor.contrib.markerController';
export const HOVER_CONTRIB = 'editor.contrib.hover';
export const SNIPPET_CONTROLLER_CONTRIB = 'snippetController2';
export const SUGGEST_CONTROLLER_CONTRIB = 'editor.contrib.suggestController';
