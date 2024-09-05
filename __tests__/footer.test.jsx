import { render, screen, fireEvent } from '@testing-library/react'
import { Footer } from '../layouts/components/ui/Footer'
import '@testing-library/jest-dom'

describe('A1_Component > Footer', () => {
  test('[A1_1]レンダリングされているか えらるけど無視', () => {
    render(<Footer />)
  })

  test('[A1_2]更新履歴の文字があるか', () => {
    render(<Footer />)
    expect(screen.getByText('更新履歴'))
  })

  test('[A1_3]aboutの文字があって、リンクが正しいか', () => {
    render(<Footer />)
    const aboutLink = screen.getByText('About')
    expect(aboutLink).toBeInTheDocument()
    expect(aboutLink.href).toBe('http://localhost/about')
  })

  test('[A1_4] Manga Studyとはの文字があって、リンクが正しいか', () => {
    render(<Footer />)
    const mangaStudyLink = screen.getByText('Manga Studyとは')
    expect(mangaStudyLink).toBeInTheDocument()
    expect(mangaStudyLink.href).toBe('http://localhost/top')
  })

  test('[A1_5] Manga Study ©︎があって、リンクが正しいか', () => {
    render(<Footer />)
    const copyrightText = screen.getByText(/Manga Study ©︎\d+/)
    expect(copyrightText).toBeInTheDocument()
  })
})
