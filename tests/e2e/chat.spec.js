import { expect, test } from '@playwright/test'

test('seller can send a mock chat message and receive agent guidance', async ({ page }) => {
  await page.goto('/')

  await page.getByRole('button', { name: /I'm selling/i }).click()
  await expect(page.getByText('Negotiation chat')).toBeVisible()

  await page.getByLabel('Message Haggly').fill(
    "I'm selling a gaming chair for $200. They offered $100. I would take $160. Make it firm but polite.",
  )
  await page.getByRole('button', { name: /^Send$/i }).click()

  await expect(page.getByText('Current read:')).toBeVisible()
  await expect(page.getByText('Missing context:')).toBeVisible()
  await expect(page.getByText('Haggly check:')).toBeVisible()
})

test('buyer can send a mock chat message and receive buying guidance', async ({ page }) => {
  await page.goto('/')

  await page.getByRole('button', { name: /I'm buying/i }).click()
  await expect(page.getByText('Negotiation chat')).toBeVisible()

  await page.getByLabel('Message Haggly').fill(
    "I'm buying a used car listed for $9000 and want to offer $8000.",
  )
  await page.getByRole('button', { name: /^Send$/i }).click()

  await expect(page.getByText('Current read:')).toBeVisible()
  await expect(page.getByText('seller urgency')).toBeVisible()
})
