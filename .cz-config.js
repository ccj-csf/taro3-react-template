module.exports = {
	// type 类型
	types: [
		{ value: 'feat', name: 'feat: 新增功能' },
		{ value: 'fix', name: 'fix: 修复 bug' },
		{ value: 'docs', name: 'docs: 文档的变更' },
		{
			value: 'style',
			name: 'style: 不改变代码功能的变动(如删除空格、格式化、去掉末尾分号等)',
		},
		{
			value: 'refactor',
			name: 'refactor: 重构代码。不包括 bug 修复、功能新增',
		},
		{
			value: 'perf',
			name: 'perf: 性能优化',
		},
		{ value: 'test', name: 'test: 添加、修改测试用例' },
		{
			value: 'build',
			name: 'build: 构建流程、外部依赖变更，比如升级 npm 包、修改 webpack 配置',
		},
		{ value: 'ci', name: 'ci: 修改了 CI 配置、脚本' },
		{
			value: 'chore',
			name: 'chore: 对构建过程或辅助工具和库的更改,不影响源文件、测试用例的其他操作',
		},
		{ value: 'revert', name: 'revert: 回滚 commit' },
	],
	// scope 类型
	scopes: [
		// 按当前分组实际情况定义的scopes
		['config', '配置文件'],
		['hooks', 'hook'],
		['components', '公共组件相关'],
		['utils', 'utils相关'],
		['styles', '样式相关'],
		['deps', '项目依赖'],
		['ui', '对ui库相关'],
		['auth', '权限相关'],
		['http', 'http相关'],
		['views', '视图逻辑相关'],
		['other', '其他修改'],
		// 如果选择 custom ,后面会让你再输入一个自定义的 scope , 也可以不设置此项， 把后面的 allowCustomScopes 设置为 true
		['custom', '以上都不是？我要自定义'],
	].map(([value, description]) => {
		return {
			value,
			name: `${value.padEnd(30)} (${description})`,
		}
	}),
	// 覆写提示的信息
	messages: {
		type: '请确保你的提交遵循了原子提交规范！\n选择你要提交的类型:',
		scope: '\n选择一个 scope (可选):',
		// 选择 scope: custom 时会出下面的提示
		customScope: '请输入自定义的 scope: ',
		subject: '填写一个简短精炼的描述语句:\n',
		body: '添加一个更加详细的描述，可以附上新增功能的描述或 bug 链接、截图链接 (可选)。使用 "|" 换    行:\n',
		breaking: '列举非兼容性重大的变更 (可选):\n',
		footer: '列举出所有变更的 ISSUES CLOSED  (可选)。 例如.: #31, #34:\n',
		confirmCommit: '确认提交?',
	},

	// 是否允许自定义填写 scope ，设置为 true ，会自动添加两个 scope 类型 [{ name: 'empty', value: false },{ name: 'custom', value: 'custom' }]
	// allowCustomScopes: true,
	allowBreakingChanges: ['feat', 'fix'],
	// skip any questions you want
	skipQuestions: ['body', 'breaking', 'footer'], // 跳过该三个部分的提交模板messages
	subjectLimit: 100,
}
