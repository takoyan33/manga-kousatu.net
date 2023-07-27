import React, { useState } from 'react'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { EditorState, ContentState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import { stateToHTML } from 'draft-js-export-html'

type RicheditaProps = {
  onChange: (plainText: string, html: string) => void
  value: string
}

const Richedita: React.VFC<RicheditaProps> = ({ onChange, value }) => {
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(ContentState.createFromText('デフォルトのテキスト')),
  )

  const handleEditorChange = (editorState: EditorState) => {
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
      <>
        <p className='my-4 text-right'>
          現在の文字数：<span>{value && value.length}</span>
        </p>
      </>
    </>
  )
}

export default Richedita
