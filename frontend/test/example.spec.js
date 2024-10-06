/* eslint-disable functional/no-let */

import { test, expect } from '@playwright/test';

test.describe('Home Page Tests', () => {
  test('Кнопка появляется через определенное время и ведет на страницу Login', async ({
    page,
  }) => {
    // Переходим на страницу Home
    await page.goto('http://localhost:3000/home');

    // Ждем, пока кнопка станет видимой
    const buttonSelector = 'button#login-button';
    await page.waitForSelector(buttonSelector, {
      state: 'visible',
      timeout: 10000,
    });

    // Проверяем, что кнопка видима
    const button = await page.locator(buttonSelector);
    await expect(button).toBeVisible();

    // Кликаем на кнопку
    await button.click();

    // Проверяем, что мы перешли на страницу Login
    await expect(page).toHaveURL('http://localhost:3000/login');
  });
});
