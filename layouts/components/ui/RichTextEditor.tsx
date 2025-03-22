import { EditorState, ContentState } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import React, { useState, useEffect } from 'react'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { Editor } from 'react-draft-wysiwyg'

interface RichTextEditorProps {
  onChange: (plainText: string, html: string) => void
  value: string
}

const RichTextEditor = ({ onChange, value }: RichTextEditorProps) => {
  // 初期値を EditorState に変換
  const [editorState, setEditorState] = useState<EditorState>(() =>
    value
      ? EditorState.createWithContent(ContentState.createFromText(value))
      : EditorState.createEmpty(),
  )

  useEffect(() => {
    setEditorState(EditorState.createWithContent(ContentState.createFromText(value || '')))
  }, [value])

  const handleEditorChange = (editorState: EditorState): void => {
    setEditorState(editorState)
    const contentState = editorState.getCurrentContent()
    const plainText = contentState.getPlainText()
    const html = stateToHTML(contentState)
    onChange(plainText, html)
  }

  return (
    <div className='center-input border pb-20'>
      {/*  @ts-ignore */}
      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        localization={{
          locale: 'ja',
        }}
        hashtag={{
          separator: ' ',
          trigger: '#',
        }}
        placeholder='文字を入力してください'
      />
    </div>
  )
}

export default RichTextEditor
