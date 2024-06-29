import React, { useState } from 'react'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { EditorState, ContentState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import { stateToHTML } from 'draft-js-export-html'

interface RicheditaProps {
  onChange: (plainText: string, html: string) => void
  value: string
}

const Richedita = ({ onChange }: RicheditaProps) => {
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(ContentState.createFromText('デフォルトのテキスト')),
  )

  const handleEditorChange = (editorState: EditorState): void => {
    setEditorState(editorState)
    const contentState = editorState.getCurrentContent()
    const plainText = contentState.getPlainText()
    const html = stateToHTML(contentState)
    onChange(plainText, html)
  }

  return (
    <>
      <div className='center-input border pb-20'>
        <Editor
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
    </>
  )
}

export default Richedita
