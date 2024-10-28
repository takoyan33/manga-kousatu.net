import { test } from '@playwright/test'

export const localhost = 'http://localhost:8080'
export const testUser = {
  email: 'samplee2e1@gmail.com',
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
  await page.fill('#name', testProfile.name)
  await page.fill('#profileText', testProfile.profileText)
  await page.locator('#registerProfile').click()
  await page.waitForTimeout(10000)
  await page.waitForURL(localhost + '/top/')
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
  await page.goto(localhost + '/profile/')
  await page.waitForTimeout(2000)
  await page.locator('#logout').click()
  await page.waitForURL(localhost + '/login/')
  await page.waitForTimeout(3000)
})

// 現時点だと失敗
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
  await page.fill('#name', editTestProfile.name)
  await page.fill('#profileText', editTestProfile.profileText)
  await page.locator('#updateProfile').click()
  await page.waitForTimeout(2000)
  await page.waitForURL(localhost + '/profile/')

  // ログアウト
  await page.waitForTimeout(4000)
  await page.locator('#logout').click()
  await page.waitForURL(localhost + '/login/')
  await page.waitForTimeout(3000)
})

test('Setting Test', async ({ page }) => {
  await test.setTimeout(120000)

  //ログイン
  await page.goto(localhost + '/login/')
  await page.fill('#email', testUser.email)
  await page.fill('#password', testUser.password)
  await page.locator('#login').click()
  await page.waitForTimeout(2000)
  await page.waitForURL(localhost)

  // メールアドレス変更

  // パスワード変更

  // 退会
})
