const { test, expect, beforeEach, describe } = require('@playwright/test')
const { login, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    const user = {
      username: 'jerieltan',
      name: 'Jeriel Tan',
      password: 'jerieltan05'
    }

    const user2 = {
      username: 'mathnerd',
      name: 'Math Nerd',
      password: 'ilovemath'
    }

    await request.post('/api/testing/reset')
    await request.post('/api/users', { data: user })
    await request.post('/api/users', { data: user2 })
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'log in to application' })).toBeVisible()
    await expect(page.getByRole('textbox', { name: 'username' })).toBeVisible()
    await expect(page.getByRole('textbox', { name: 'password' })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page, request }) => {
      await login(page, 'jerieltan', 'jerieltan05')
      await expect(page.getByText('Jeriel Tan logged in')).toBeVisible()
    })

    test('fails with correct credentials', async ({ page, request }) => {
      await login(page, 'jerieltan', 'wrong')
      await expect(page.getByText('Wrong username or password')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({page}) => {
      await login(page, 'jerieltan', 'jerieltan05')
    })

    test('a new blog can be created', async ({page}) => {
      await createBlog(page, 'How to train your dragon', 'DragonSlayer', 'www.trainyourdragon.com')
      await expect(page.getByText('How to train your dragon DragonSlayer')).toBeVisible()
    })

    describe('When 1 blog created', () => {
      beforeEach(async ({page}) => {
        await createBlog(page, 'How to train your dragon', 'DragonSlayer', 'www.trainyourdragon.com')
      })

      test('blog can be liked', async ({ page }) => {
        const blogContainer = page.locator('div').filter({ hasText: 'How to train your dragon DragonSlayer' })
        await blogContainer.getByRole('button', { name: 'view' }).click()
        await blogContainer.getByRole('button', { name: 'like' }).click()
        await expect(blogContainer.getByText('likes 1')).toBeVisible()
      })

      test('blog can be deleted by creator', async ({page}) => {
        const blogContainer = page.locator('div').filter({ hasText: 'How to train your dragon DragonSlayer' })
        await blogContainer.getByRole('button', { name: 'view' }).click()
        //This must be placed before the button is clicked so that the dialog isn't missed
        page.on('dialog', async (dialog) => {
          console.log(dialog.message())
          await dialog.accept()
        })
        await blogContainer.getByRole('button', { name: 'remove' }).click()
        await expect(page.getByText('How to train your dragon DragonSlayer')).not.toBeVisible()
      })

      test('only user who added the blog can see delete button', async ({page}) => {
        await page.getByRole('button', { name: 'logout' }).click()
        await login(page, 'mathnerd', 'ilovemath')
        await expect(page.getByText('Math Nerd logged in')).toBeVisible()

        const blogContainer = page.locator('div').filter({ hasText: 'How to train your dragon DragonSlayer' })
        await blogContainer.getByRole('button', { name: 'view' }).click()
        await expect(blogContainer.getByRole('button', { name: 'remove' })).not.toBeVisible()
      })
    })

    describe('When many blogs created', async () => {
      beforeEach(async ({page}) => {
        await createBlog(page, 'blog1', 'creator1', 'www.blog1.com')
        await createBlog(page, 'blog2', 'creator2', 'www.blog2.com')
      })

      test('blogs are arranged in order according to likes', async ({page}) => {
        const blogContainer = page.getByText('blog2 creator2')
        await blogContainer.getByRole('button', { name: 'view' }).click()
        await blogContainer.locator('..').getByRole('button', { name: 'like' }).click()
        await expect(blogContainer.locator('..').getByText('likes 1')).toBeVisible()

        const newblog1 = await page.getByText('blog1 creator1').boundingBox()
        const newblog2 = await page.getByText('blog2 creator2').boundingBox()
        console.log(`new blog1 y-coordinate: ${newblog1.y}`)
        console.log(`new blog2 y-coordinate: ${newblog2.y}`)
        expect(newblog2.y < newblog1.y).toBeTruthy()
      })
    })
  })
})