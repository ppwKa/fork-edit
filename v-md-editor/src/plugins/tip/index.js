import markdownItContainer from '@/utils/markdown-it-container';

export default function createTipPlugin({ name = 'tip', icon = 'v-md-icon-tip', text } = {}) {
  const commandHandler = function (editor, type = 'tip') {
    editor.insert((selected) => {
      const prefix = ':::';
      const suffix = ':::';
      const content = selected || editor.langConfig.tip[type].placeholder;

      return {
        text: `${prefix} ${type}\n  ${content}\n${suffix}`,
        selected: content,
      };
    });
  };

  const toolbar = {
    title: (editor) => editor.langConfig.tip.toolbar,
    icon,
    text,
    menus: [
      {
        name: 'tip',
        text: (editor) => editor.langConfig.tip.tip.toolbar,
        action(editor) {
          editor.execCommand(name);
        },
      },
      {
        name: 'warning',
        text: (editor) => editor.langConfig.tip.warning.toolbar,
        action(editor) {
          editor.execCommand(name, 'warning');
        },
      },
      {
        name: 'danger',
        text: (editor) => editor.langConfig.tip.danger.toolbar,
        action(editor) {
          editor.execCommand(name, 'danger');
        },
      },
      {
        name: 'details',
        text: (editor) => editor.langConfig.tip.details.toolbar,
        action(editor) {
          editor.execCommand(name, 'details');
        },
      },
    ],
  };

  const extendMarkdown = function (mdParser, getLangConfig) {
    const blockClass = 'v-md-plugin-tip';

    if (mdParser) {
      // extend markdown-it
      markdownItContainer(mdParser, {
        type: 'tip',
        defaultTitle: () => getLangConfig().tip.tip.defaultTitle,
        blockClass,
      });

      markdownItContainer(mdParser, {
        type: 'warning',
        defaultTitle: () => getLangConfig().tip.warning.defaultTitle,
        blockClass,
      });

      markdownItContainer(mdParser, {
        type: 'danger',
        defaultTitle: () => getLangConfig().tip.danger.defaultTitle,
        blockClass,
      });

      markdownItContainer(mdParser, {
        type: 'details',
        defaultTitle: () => getLangConfig().tip.details.defaultTitle,
        before: (info) =>
          `<details class="${blockClass} details">${info ? `<summary>${info}</summary>` : ''}\n`,
        after: () => '</details>\n',
      });
    }
  };

  return {
    install(VMdEditor) {
      if (VMdEditor.name === 'v-md-editor') {
        VMdEditor.command(name, commandHandler);
        VMdEditor.toolbar(name, toolbar);
      }

      VMdEditor.lang.add({
        'zh-CN': {
          tip: {
            toolbar: '????????????',
            tip: {
              toolbar: '??????',
              defaultTitle: '??????',
              placeholder: '??????????????????',
            },
            warning: {
              toolbar: '??????',
              defaultTitle: '??????',
              placeholder: '??????????????????',
            },
            danger: {
              toolbar: '??????',
              defaultTitle: '??????',
              placeholder: '??????????????????',
            },
            details: {
              toolbar: '????????????',
              defaultTitle: '????????????',
              placeholder: '??????',
            },
          },
        },
        'en-US': {
          tip: {
            toolbar: 'Insert tip',
            tip: {
              toolbar: 'Tip',
              defaultTitle: 'TIP',
              placeholder: 'Insert content',
            },
            warning: {
              toolbar: 'Warning',
              defaultTitle: 'WARNING',
              placeholder: 'Insert content',
            },
            danger: {
              toolbar: 'Danger',
              defaultTitle: 'DANGER',
              placeholder: 'Insert content',
            },
            details: {
              toolbar: 'Details',
              defaultTitle: 'DETAILS',
              placeholder: 'Content',
            },
          },
        },
      });

      VMdEditor.extendMarkdown(extendMarkdown);
    },
  };
}
