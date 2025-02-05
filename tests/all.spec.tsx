import { test, defineConfig, devices } from '@playwright/test'
import { login, testUser, localhost, otherUser, testProfile, editTestProfile } from './login'

test('SignUp Test', async ({ page }) => {
  await test.setTimeout(120000)

  //新規登録
  await page.goto(localhost + '/register/')
  await page.fill('#email', testUser.email)
  await page.fill('#password', testUser.password)
  await page.fill('#confirmPassword', testUser.password)
  await page.locator('#signUp').click()
  await page.waitForTimeout(2000)

  //プロフィール登録
  await page.locator('#file-input').setInputFiles(testProfile.image)
  await page.waitForTimeout(2000)
  await page.fill('#name', testProfile.name)
  await page.fill('#profileText', testProfile.profileText)
  await page.locator('#registerProfile').click()
  await page.waitForTimeout(10000)
  await page.waitForURL(localhost + '/top/')

  // ログアウト
  await page.waitForTimeout(2000)
  await page.locator('#humbuger-menu').click()
  await page.waitForTimeout(1000)
  await page.locator('#logout').click()
  await page.waitForURL(localhost + '/login/')
  await page.waitForTimeout(3000)
})

test('Login Test', async ({ page, browser }) => {
  await test.setTimeout(120000)

  const context = await browser.newContext({
    recordVideo: { dir: 'videos/' },
  })

  //ログイン
  await login(page)

  // ログアウト
  await page.waitForTimeout(2000)
  await page.locator('#humbuger-menu').click()
  await page.waitForTimeout(1000)
  await page.locator('#logout').click()
  await page.waitForURL(localhost + '/login/')
  await page.waitForTimeout(3000)

  await context.close()
})

// プロフィール編集
test('ProfileEdit Test', async ({ page }) => {
  await test.setTimeout(120000)

  //ログイン
  await login(page)

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

// 退会テスト
test('Account Delete Test', async ({ page }) => {
  await test.setTimeout(120000)

  //ログイン
  await login(page)

  // 退会
  await page.goto(localhost + '/profile')
  await page.waitForTimeout(2000)
  await page.locator('#account-delete').click()
  await page.waitForTimeout(2000)
  await page.waitForURL(localhost + '/top/')
})

// パスワード変更
// await page.goto(localhost + '/profile/edit/password')
// await page.waitForTimeout(2000)
// await page.fill('#password', testUser.password)
// await page.locator('#submit').click()
// await page.waitForTimeout(2000)
// await page.pause()

//投稿、編集
test('Add Post Test', async ({ page }) => {
  await test.setTimeout(120000)

  //ログイン
  await login(page)

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
  await page.check('input[name="netabare"][value="spoil"]')
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
test('EditDelete Post Test', async ({ page }) => {
  await test.setTimeout(120000)

  //ログイン
  await login(page)

  // 記事詳細へ
  await page.waitForTimeout(2000)
  //ここのidを動的に
  await page.goto(localhost + '/post/10')
  await page.waitForTimeout(2000)
  await page.locator('#edit-post').click()

  // 投稿編集
  await page.fill('#title', 'test title2')
  await page.locator('#file-input').setInputFiles(editTestProfile.image)
  await page.waitForTimeout(2000)
  // await page.check('input[name="category"][value="ONEPIECE"]')
  // await page.waitForTimeout(1000)
  await page.check('input[name="netabare"][value="spoil"]')
  await page.waitForTimeout(1000)
  await page.check('input[name="display"][value="true"]')
  await page.waitForTimeout(1000)
  await page.locator('#submit').click()
  await page.waitForTimeout(2000)

  // 投稿削除
  //ここのidを動的に
  await page.goto(localhost + '/post/10')
  await page.waitForTimeout(2000)
  await page.locator('#delete-post').click()
  await page.waitForTimeout(2000)
  await page.waitForURL(localhost)
})

//コメントのテスト
test('Comment Test', async ({ page }) => {
  await test.setTimeout(120000)

  //ログイン
  await login(page)

  // コメントの追加
  await page.waitForTimeout(2000)
  await page.goto(localhost + '/post/2')
  await page.fill('#input-comment', 'test comment')
  await page.waitForTimeout(2000)
  await page.locator('#add-comment').click()
  await page.waitForTimeout(2000)

  // コメントの編集
  await page.locator('#edit-comment').click()
  await page.waitForTimeout(2000)
  await page.fill('#input-update-comment', 'test comment222')
  await page.waitForTimeout(2000)
  await page.locator('#update-comment').click()
  await page.waitForTimeout(2000)

  // コメントの削除

  await page.locator('#delete-comment').click()
  await page.waitForTimeout(2000)
})

//いいねのテスト
test('Favorite Test', async ({ page }) => {
  await test.setTimeout(120000)

  //ログイン
  await login(page)

  // いいね
  await page.waitForTimeout(2000)
  await page.goto(localhost + '/post/2')
  await page.waitForTimeout(2000)
  await page.locator('#add-favorite').click()
  await page.waitForTimeout(2000)

  //いいね削除
  await page.locator('#delete-favorite').click()
  await page.waitForTimeout(2000)
})
