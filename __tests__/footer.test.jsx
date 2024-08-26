import { render, screen } from '@testing-library/react'
import { Footer } from '../layouts/components/ui/Footer'
import '@testing-library/jest-dom'

describe('A1_Component > Footer', () => {
  it('[A1_1]Footerのテスト', () => {
    //[A1_1_1] レンダリングされているか
    render(<Footer />)

    //[A1_1_2] 更新履歴の文字があるか
    expect(screen.getByText('更新履歴'))

    //[A1_1_3] aboutの文字があって、リンクが正しいか
    const aboutLink = screen.getByText('About')
    expect(aboutLink).toBeInTheDocument()
    expect(aboutLink.href).toBe('http://localhost/about')

    //[A1_1_4] Manga Studyとはの文字があって、リンクが正しいか
    const mangaStudyLink = screen.getByText('Manga Studyとは')
    expect(mangaStudyLink).toBeInTheDocument()
    expect(mangaStudyLink.href).toBe('http://localhost/top')

    //[A1_1_5] Manga Study ©︎があって、リンクが正しいか
    const copyrightText = screen.getByText(/Manga Study ©︎\d+/)
    expect(copyrightText).toBeInTheDocument()
  })
})
