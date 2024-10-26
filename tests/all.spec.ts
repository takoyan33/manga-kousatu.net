import { test } from '@playwright/test'

test('All Test', async ({ page }) => {
  //新規登録
  await page.goto('http://localhost:8080/register/')
  await page.fill('#email', 'samplee2e1@gmail.com')
  await page.fill('#password', 'password1234!')
  await page.fill('#confirmPassword', 'password1234!')
  await page.locator('#signUp').click()

  //プロフィール登録
  await page
    .locator('#file-input')
    .setInputFiles(
      '/Users/abeshmupeii/Desktop/01_engineer💻/01_React系/02_Next/01_開発物/manga-kousatu.net/public/images/book-reading.png',
    )
  await page.fill('#name', 'test123')
  await page.fill('#profileText', 'よろしくお願いします。')
  await page.locator('#registerProfile').click()

  // ログインページにアクセス
  await page.goto('http://localhost:8080/login/')

  // ログインページ失敗

  // await page.waitForURL('http://localhost:8080/')

  // // ログインページにアクセス
  // await page.goto('http://localhost:8080/login/')
  // // ログイン
  // await page.fill('#email', 'user')
  // await page.fill('#password', 'password')
  // await page.click('button[type="submit"]')
  // // ログイン後のページに遷移
  // await page.waitForNavigation()
})
