import { test } from '@playwright/test'

export const localhost = 'http://localhost:8080'

export const testUser = {
  email: 'harrier2070+2@gmail.com',
  password: 'password1234!',
}

export const otherUser = {
  email: 'harrier2070+3@gmail.com',
  password: 'password1234!',
}

export const testProfile = {
  name: 'test123',
  profileText: 'よろしくお願いします。',
  image:
    '/Users/abeshmupeii/Desktop/01_engineer💻/01_React系/02_Next/01_開発物/manga-kousatu.net/public/images/book-reading.png',
}

export const editTestProfile = {
  name: 'test123456',
  profileText: 'よろしくお願いします!!!!!',
  image:
    '/Users/abeshmupeii/Desktop/01_engineer💻/01_React系/02_Next/01_開発物/manga-kousatu.net/public/images/book-reading.png',
}

test('SignUp Test', async ({ page }) => {
  await test.setTimeout(120000)

  //新規登録
  await page.goto(localhost + '/register/')
  await page.fill('#email', testUser.email)
  await page.fill('#password', testUser.password)
  await page.fill('#confirmPassword', testUser.password)
  await page.locator('#signUp').click()
  await page.waitForTimeout(2000)

  await page.locator('#file-input').setInputFiles(testProfile.image)
  await page.waitForTimeout(2000)
  await page.fill('#name', testProfile.name)
  await page.fill('#profileText', testProfile.profileText)
  await page.locator('#registerProfile').click()
  await page.waitForTimeout(10000)
  await page.waitForURL(localhost + '/top/')

  // ログアウト
  // await page.goto(localhost + '/profile/')
  await page.waitForTimeout(2000)
  await page.locator('#humbuger-menu').click()
  await page.waitForTimeout(1000)
  await page.locator('#logout').click()
  await page.waitForURL(localhost + '/login/')
  await page.waitForTimeout(3000)
})

test('Login Test', async ({ page }) => {
  await test.setTimeout(120000)

  //ログイン
  await page.goto(localhost + '/login/')
  await page.fill('#email', testUser.email)
  await page.fill('#password', testUser.password)
  await page.locator('#login').click()
  await page.waitForTimeout(2000)
  await page.waitForURL(localhost)

  // ログアウト
  await page.waitForTimeout(2000)
  await page.locator('#humbuger-menu').click()
  await page.waitForTimeout(1000)
  await page.locator('#logout').click()
  await page.waitForURL(localhost + '/login/')
  await page.waitForTimeout(3000)
})

// プロフィール編集
test('ProfileEdit Test', async ({ page }) => {
  await test.setTimeout(120000)

  //ログイン
  await page.goto(localhost + '/login/')
  await page.fill('#email', testUser.email)
  await page.fill('#password', testUser.password)
  await page.locator('#login').click()
  await page.waitForTimeout(2000)
  await page.waitForURL(localhost)

  // プロフィールからプロフィール編集画面へ
  await page.goto(localhost + '/profile/')
  await page.waitForTimeout(2000)
  await page.locator('#profile-edit').click()
  await page.waitForURL(localhost + '/profile/edit/')

  // プロフィール編集
  await page.waitForTimeout(2000)
  await page.locator('#file-input').setInputFiles(editTestProfile.image)
  await page.waitForTimeout(2000)
  await page.fill('#name', editTestProfile.name)
  await page.fill('#profileText', editTestProfile.profileText)
  await page.locator('#updateProfile').click()
  await page.waitForTimeout(2000)
  await page.waitForURL(localhost + '/profile/')

  // ログアウト
  await page.waitForTimeout(2000)
  await page.locator('#humbuger-menu').click()
  await page.waitForTimeout(1000)
  await page.locator('#logout').click()
  await page.waitForURL(localhost + '/login/')
  await page.waitForTimeout(3000)
})

// 設定テスト
test('//Setting Test', async ({ page }) => {
  await test.setTimeout(120000)

  // パスワード変更
  await page.goto(localhost + '/profile/edit/password')
  await page.waitForTimeout(2000)
  await page.fill('#password', testUser.password)
  await page.locator('#submit').click()
  await page.waitForTimeout(2000)
  await page.pause()

  //ログイン
  await page.goto(localhost + '/login/')
  await page.fill('#email', testUser.email)
  await page.fill('#password', testUser.password)
  await page.locator('#login').click()
  await page.waitForTimeout(2000)
  await page.waitForURL(localhost)

  // 退会
  await page.goto(localhost + '/profile/edit/settings')
  await page.waitForTimeout(2000)
  await page.locator('#deleteUser').click()
  await page.waitForTimeout(2000)
  await page.waitForURL(localhost + '/top/')
})

//投稿、編集

test('Add Post Test', async ({ page }) => {
  await test.setTimeout(120000)

  //ログイン
  await page.goto(localhost + '/login/')
  await page.fill('#email', testUser.email)
  await page.fill('#password', testUser.password)
  await page.locator('#login').click()
  await page.waitForTimeout(2000)
  await page.waitForURL(localhost)

  // トップページへ
  await page.waitForTimeout(2000)
  await page.locator('#add-post').click()
  await page.waitForTimeout(2000)

  // 投稿
  await page.locator('#thumbnail-input').setInputFiles(editTestProfile.image)
  await page.waitForTimeout(3000)
  await page.fill('#title', 'test title')
  await page.check('input[name="categori"][value="ONEPIECE"]')
  await page.waitForTimeout(1000)
  await page.check('input[name="netabare"][value="ネタバレ有"]')
  await page.waitForTimeout(1000)
  await page.check('input[name="display"][value="true"]')
  await page.waitForTimeout(1000)
  await page.locator('#submit').click()
  await page.waitForTimeout(2000)
  await page.waitForURL(localhost)

  // ログアウト
  await page.waitForTimeout(1000)
  await page.locator('#humbuger-menu').click()
  await page.waitForTimeout(1000)
  await page.locator('#logout').click()
  await page.waitForURL(localhost + '/login/')
  await page.waitForTimeout(3000)
})

//編集と削除
test('Delete Post Test', async ({ page }) => {
  await test.setTimeout(120000)

  //ログイン
  await page.goto(localhost + '/login/')
  await page.fill('#email', testUser.email)
  await page.fill('#password', testUser.password)
  await page.locator('#login').click()
  await page.waitForTimeout(2000)
  await page.waitForURL(localhost)

  // トップページへ
  await page.waitForTimeout(2000)
  await page.locator('#add-post').click()
  await page.waitForTimeout(2000)

  // 投稿削除
  await page.fill('#title', 'test title')
  await page.locator('#file-input').setInputFiles(editTestProfile.image)
  await page.waitForTimeout(2000)
  await page.fill('#managa-name', 'test content')
  await page.fill('#tags', 'test title')
  await page.fill('#netabare', 'test title')
  await page.fill('#editor', 'test title')
  await page.locator('#submit').click()
  await page.waitForTimeout(2000)

  // ログアウト
  // await page.waitForTimeout(1000)
  // await page.locator('#logout').click()
  // await page.waitForURL(localhost + '/login/')
  // await page.waitForTimeout(3000)
})

//コメントのテスト
test('Comment Test', async ({ page }) => {
  await test.setTimeout(120000)

  //ログイン
  await page.goto(localhost + '/login/')
  await page.fill('#email', otherUser.email)
  await page.fill('#password', otherUser.password)
  await page.locator('#login').click()
  await page.waitForTimeout(2000)
  await page.waitForURL(localhost)

  // トップページへ
  await page.waitForTimeout(2000)
  await page.locator('#add-post').click()
  await page.waitForTimeout(2000)

  // コメントの追加
  await page.waitForTimeout(2000)
  await page.goto(localhost + '/post/2')
  await page.fill('#input-comment', 'test comment')
  await page.locator('#add-comment').click()
  await page.waitForTimeout(2000)

  // コメントの編集
  await page.locator('#edit-comment').click()
  await page.waitForTimeout(2000)
  await page.fill('#input-update-comment', 'test comment')
  await page.locator('#update-comment').click()
  await page.waitForTimeout(2000)

  // コメントの削除

  await page.locator('#delete-comment').click()
  await page.waitForTimeout(2000)

  // ログアウト
  await page.waitForTimeout(1000)
  await page.locator('#logout').click()
  await page.waitForURL(localhost + '/login/')
  await page.waitForTimeout(3000)
})

//いいねのテスト
test('Favorite Test', async ({ page }) => {
  await test.setTimeout(120000)

  //ログイン
  await page.goto(localhost + '/login/')
  await page.fill('#email', otherUser.email)
  await page.fill('#password', otherUser.password)
  await page.locator('#login').click()
  await page.waitForTimeout(2000)
  await page.waitForURL(localhost)

  // いいね
  await page.waitForTimeout(2000)
  await page.goto(localhost + '/post/2')
  await page.locator('#add-favorite').click()
  await page.waitForTimeout(2000)

  //いいね削除
  await page.locator('#delete-favorite').click()
  await page.waitForTimeout(2000)

  // ログアウト
  await page.waitForTimeout(2000)
  await page.locator('#humbuger-menu').click()
  await page.waitForTimeout(1000)
  await page.locator('#logout').click()
  await page.waitForURL(localhost + '/login/')
  await page.waitForTimeout(3000)
})
