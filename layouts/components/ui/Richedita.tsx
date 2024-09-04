import { EditorState, ContentState } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import React, { useState, useEffect } from 'react'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { Editor } from 'react-draft-wysiwyg'

interface RicheditaProps {
  onChange: (plainText: string, html: string) => void
  value: string
}

const Richedita = ({ onChange, value }: RicheditaProps) => {
  const [editorState, setEditorState] = useState(value)

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

export default Richedita
