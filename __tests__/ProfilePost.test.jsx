import { render, screen, fireEvent } from '@testing-library/react'
import { ProfilePost } from '../layouts/components/ui/ProfilePost'
import '@testing-library/jest-dom'

describe('A1_Component > ProfilePost', () => {
  it('[A1_4_1]レンダリングされているか', () => {
    render(
      <ProfilePost
        id={1}
        profileImage='image'
        username='aaaa'
        bio='aaaa'
        favorite={['onepiece']}
      />,
    )
  })

  it('[A1_4_2]引数のテスト', () => {
    const profileImage = 'https://example.com/image.jpg'
    const username = 'テストユーザー'
    const bio = '自己紹介'
    const favorite = ['漫画1', '漫画2']

    render(
      <ProfilePost
        id={1}
        profileImage={profileImage}
        username={username}
        bio={bio}
        favorite={favorite}
      />,
    )

    // 画像がレンダリングされているか確認
    const imageElement = screen.getByAltText('プロフィール画像')
    expect(imageElement).toHaveAttribute('src', profileImage)

    // 名前がレンダリングされているか確認
    const nameElement = screen.getByLabelText('name-text')
    expect(nameElement).toHaveTextContent(`名前：${username}`)

    // プロフィールがレンダリングされているか確認
    const bioElement = screen.getByLabelText('profile-text')
    expect(bioElement).toBeInTheDocument()
    expect(bioElement).toHaveTextContent(bio)

    // 好きな漫画がレンダリングされているか確認
    const favoriteElement = screen.getByLabelText('liked-text')
    expect(favoriteElement).toBeInTheDocument()
  })
})
