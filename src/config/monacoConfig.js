export const loadAngularConfig = (monaco) => {
	monaco.languages.register({ id: 'angular' });
	monaco.languages.registerCompletionItemProvider('angular', {
		provideCompletionItems: () => {
			var suggestions = [
				{
					label: 'simpleText',
					kind: monaco.languages.CompletionItemKind.Text,
					insertText: 'simpleText'
				},
				{
					label: 'testing',
					kind: monaco.languages.CompletionItemKind.Keyword,
					insertText: 'testing(${1:condition})',
					insertTextRules:
						monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
				},
				{
					label: 'ifelse',
					kind: monaco.languages.CompletionItemKind.Snippet,
					insertText: [
						'if (${1:condition}) {',
						'\t$0',
						'} else {',
						'\t',
						'}'
					].join('\n'),
					insertTextRules:
						monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
					documentation: 'If-Else Statement'
				}
			];
			return { suggestions: suggestions };
		}
	});
};
