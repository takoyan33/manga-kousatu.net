import { render, screen, fireEvent } from '@testing-library/react'
import { ProfileId } from '../../layouts/components/ui/ProfileId'
import '@testing-library/jest-dom'

describe('A1_Component > ProfileId', () => {
  it('[A1_5_1]レンダリングされているか', () => {
    render(
      <ProfileId id={1} profileImage='image' userName='aaaa' bio='aaaa' favorite={['onepiece']} />,
    )
  })

  it('[A1_5_2]引数のテスト', () => {
    const profileImage = 'https://example.com/image.jpg'
    const userName = 'テストユーザー'
    const bio = '自己紹介'
    const favorite = ['#漫画1', '#漫画2']

    render(
      <ProfileId
        id={1}
        profileImage={profileImage}
        userName={userName}
        bio={bio}
        favorite={favorite}
      />,
    )

    // 画像がレンダリングされているか確認
    const imageElement = screen.getByAltText('プロフィール画像')
    expect(imageElement).toHaveAttribute('src', profileImage)

    // 名前がレンダリングされているか確認
    const nameElement = screen.getByLabelText('name-text')
    expect(nameElement).toHaveTextContent(`${userName}`)

    // プロフィールがレンダリングされているか確認
    const bioElement = screen.getByLabelText('profile-text')
    expect(bioElement).toBeInTheDocument()
    expect(bioElement).toHaveTextContent(bio)

    // 好きな漫画がレンダリングされているか確認
    const favoriteElement = screen.getByLabelText('liked-text')
    expect(favoriteElement).toBeInTheDocument()
  })
})
