/* eslint-disable functional/no-let */
import { test, expect } from '@playwright/test';

const registeredUser = {
  login: 'admin',
  password: 'admin',
};

const newUser = {
  login: 'user250',
  password: 'user250',
};

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(300);

  await page.locator('text=Hexlet Chat').first().click();
});

test.describe('auth', () => {
  test('login page on enter as guest', async ({ page }) => {
    await expect(await page.locator('text=Ваш ник')).toHaveCount(1);
    await expect(await page.locator('text=Пароль')).toHaveCount(1);
  });

  test('successful login', async ({ page }) => {
    await page.locator('text=Ваш ник').first().type(registeredUser.login);
    await page.locator('text=Пароль').first().type(registeredUser.password);
    await page.locator('button[type="submit"]').first().click();

    await expect(
      await page.locator('text=Неверные имя пользователя или пароль'),
    ).toHaveCount(0);
  });
});

test.describe('two users chatting', () => {
  let page2;

  test.beforeEach(async ({ page, browser }) => {
    await page.locator('text=Ваш ник').first().type(registeredUser.login);
    await page.locator('text=Пароль').first().type(registeredUser.password);
    await page.locator('button[type="submit"]').first().click();

    const context2 = await browser.newContext();
    page2 = await context2.newPage();
    await page2.goto('http://localhost:3000');

    await page2.locator('text=Hexlet Chat').first().click();
    await page2.locator('text=Ваш ник').first().type(newUser.login);
    await page2.locator('text=Пароль').first().type(newUser.password);
    await page2.locator('button[type="submit"]').first().click();
  });

  test('login second user', async () => {
    await expect(
      await page2.locator('text=Неверные имя пользователя или пароль'),
    ).toHaveCount(0);
  });
});
