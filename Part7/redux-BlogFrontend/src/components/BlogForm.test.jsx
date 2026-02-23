import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('blog form functionality', () => {
  test('form calls event handler with right details when form created', async () => {
    const user = userEvent.setup()
    const addBlog = vi.fn()
    render(<BlogForm addBlog={addBlog}/>)

    const titleinput = screen.getByLabelText('title:')
    await user.type(titleinput, 'book title')

    const authorinput = screen.getByLabelText('author:')
    await user.type(authorinput, 'book author')

    const urlinput = screen.getByLabelText('url:')
    await user.type(urlinput, 'book url')

    const createbutton = screen.getByText('create')
    await user.click(createbutton)

    expect(addBlog.mock.calls).toHaveLength(1)
    expect(addBlog.mock.calls[0][0].title).toBe('book title')
    expect(addBlog.mock.calls[0][0].author).toBe('book author')
    expect(addBlog.mock.calls[0][0].url).toBe('book url')

  })
})