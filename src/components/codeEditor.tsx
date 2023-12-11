import React from 'react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import './codeEditor.css';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';

interface codeEditorProps {
  initialValue: string;
  onChange(value: string): void;
  width: number;
  height: number;
}

const CodeEditor: React.FC<codeEditorProps> = ({
  initialValue,
  onChange,
  width,
  height,
}) => {
  const [codeValue, setCodeValue] = React.useState(initialValue);

  const onClickFormat = () => {
    // format that value
    const formatted = prettier
      .format(codeValue, {
        parser: 'babel',
        plugins: [parser],
        useTabs: true,
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, '');
    // set the formatted value back in the editor
    setCodeValue(formatted);
  };

  return (
    <div className='editor-wrapper'>
      <button
        className='button button-format is-primary is-small'
        onClick={onClickFormat}
      >
        Format
      </button>
      <CodeMirror
        value={codeValue}
        theme={vscodeDark}
        height={`${height}px`}
        extensions={[javascript({ jsx: true })]}
        onChange={(value, _viewUpdate) => {
          setCodeValue(value);
          onChange(value);
        }}
      />
    </div>
  );
};

export default CodeEditor;
