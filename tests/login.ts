import { Page } from '@playwright/test'

export const testUser = {
  email: 'harrier2070+3@gmail.com',
  password: 'password1234!',
}

export const localhost = 'http://localhost:8080'

export async function login(page: Page) {
  await page.goto(localhost + '/login/')
  await page.fill('#email', testUser.email)
  await page.fill('#password', testUser.password)
  await page.locator('#login').click()
  await page.waitForURL(localhost)
  await page.waitForTimeout(2000) // 必要なら
}

export const otherUser = {
  email: 'harrier2070+4@gmail.com',
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
