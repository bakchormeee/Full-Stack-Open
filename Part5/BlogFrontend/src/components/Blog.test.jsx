import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'


describe('blog display functionality', () => {
  test('renders title and author only initially', async () => {
    const blog = {
      author: "CS Lewis",
      title: "Mere Christianity",
      url: "www.cslewis.com",
      user: {
        name: "Jeriel",
      }
    }

    const user = {
      name: "Jeriel",
      username: 'jerieltan'
    }

    const updateLikes = vi.fn()
    const deleteBlog = vi.fn()

    render(<Blog blog={blog} user={user} updateLikes={updateLikes} deleteBlog={deleteBlog} />)
    const titleAndAuthor = screen.getByText('Mere Christianity CS Lewis')
    expect(titleAndAuthor).toBeVisible()
    const url = screen.getByText('www.cslewis.com', { exact: false })
    expect(url).not.toBeVisible()
  })

  test('renders url and number of likes when button clicked', async ()=> {
    const blog = {
      author: "CS Lewis",
      title: "Mere Christianity",
      url: "www.cslewis.com",
      user: {
        name: "Jeriel",
      },
      likes: 0
    }

    const userInfo = {
      name: "Jeriel",
      username: 'jerieltan'
    }

    const updateLikes = vi.fn()
    const deleteBlog = vi.fn()
    const user = userEvent.setup()

    render(<Blog blog={blog} user={userInfo} updateLikes={updateLikes} deleteBlog={deleteBlog} />)

    const button = screen.getByText('view')
    await user.click(button)
    const url = screen.getByText('www.cslewis.com', { exact: false })
    const likes = screen.getByText('likes 0', { exact: false })
    expect(url).toBeVisible()
    expect(likes).toBeVisible()
  })

  test('if like button clicked twice, event handler called twice', async () => {
    const blog = {
      author: "CS Lewis",
      title: "Mere Christianity",
      url: "www.cslewis.com",
      user: {
        name: "Jeriel",
      },
      likes: 0,
      id: 'abcde'
    }

    const userInfo = {
      name: "Jeriel",
      username: 'jerieltan'
    }

    const updateLikes = vi.fn()
    const deleteBlog = vi.fn()
    const user = userEvent.setup()

    render(<Blog blog={blog} user={userInfo} updateLikes={updateLikes} deleteBlog={deleteBlog} />)
    const viewbutton = screen.getByText('view')
    await user.click(viewbutton)
    const likebutton = screen.getByText('like')
    await user.click(likebutton)
    await user.click(likebutton)
    expect(updateLikes.mock.calls).toHaveLength(2)
  })
})


