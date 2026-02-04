const { beforeEach, test, describe, expect } = require('@playwright/test')
const { loginWith, createNote } = require('./helper')

describe('Note app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Jeriel Tan',
        username: 'jerieltan',
        password: 'jerieltan05'
      }
    })
  await page.goto('/')
  })
  
  test('front page can be opened', async ({ page }) => {
    const locator = page.getByText('Notes')
    await expect(locator).toBeVisible()
    await expect(page.getByText('Note app, Department of Computer Science, University of Helsinki 2025')).toBeVisible()
  })

  test('user can log in', async ({page}) => {
    await loginWith(page, 'jerieltan', 'jerieltan05')
    await expect(page.getByText('Jeriel Tan logged in')).toBeVisible()
  })

  test('login fails with wrong password', async ({ page }) => {
    await loginWith(page, 'jerieltan', 'wrong')
    await expect(page.getByText('wrong credentials')).toBeVisible()
  })


  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'jerieltan', 'jerieltan05')
    })

    test('a new note can be created', async ({ page }) => {
      await createNote(page, 'another note created by playwright')
      await expect(page.getByText('another note created by playwright')).toBeVisible()
    })

    describe('and a note exists', () => {
      beforeEach(async ({ page }) => {
        await createNote(page, 'another note created by playwright')
      })
  
      test('importance can be changed', async ({ page }) => {
        await page.getByRole('button', { name: 'make not important' }).click()
        await expect(page.getByText('make important')).toBeVisible()
      })

    })

    describe('and several notes exists', () => {
      beforeEach(async ({ page }) => {
        await createNote(page, 'first note')
        await createNote(page, 'second note')
        await createNote(page, 'third note')
      })
  
      test('one of those can be made nonimportant', async ({page}) => {
        const otherNoteText = page.getByText('second note')
        const otherNoteElement = otherNoteText.locator('..') //retrieves element's parent arguemnt
        await otherNoteElement
          .getByRole('button', { name: 'make not important' }).click()
        await expect(otherNoteElement.getByText('make important')).toBeVisible()
      })

    })
  })  
})
