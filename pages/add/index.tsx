import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'

const AddPage = () => {
  const router = useRouter()

  const [formData, setFormData] = useState({
    href: '',
    title: '',
    image: '',
  })

  const handleInput = (e: FormEvent) => {
    const fieldName = (e.target as HTMLInputElement).name
    const fieldValue = (e.target as HTMLInputElement).value

    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }
    
    await fetch(`/api/links`, options)
    // const response = await fetch(`/api/links`, options)
    // const result = await response.json()

    router.push('/')
  }

  return (
    <div className="flex flex-col items-center text-white">
      <h2 className="font-semibold">Add New Link</h2>
      <div className="py-12">
        <form method="post" onSubmit={handleSubmit}>
          <div className="py-2">
            <label htmlFor="link">HREF: </label>
            <input
              type="text"
              name="href"
              id="link"
              placeholder="Link URL"
              className="mx-2 rounded-lg text-gray-600"
              onChange={handleInput}
            />
          </div>
          <div className="py-2">
            <label htmlFor="title">Title: </label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Link Title"
              className="mx-2 rounded-lg text-gray-600"
              onChange={handleInput}
            />
          </div>
          <div className="py-2">
            <label htmlFor="image">Image: </label>
            <input
              type="text"
              name="image"
              id="image"
              placeholder="Image URL"
              className="mx-2 rounded-lg text-gray-600"
              onChange={handleInput}
            />
          </div>
          <div>
            <button
              type="submit"
              className="py-2 px-6 my-12 bg-white text-purple-800 font-semibold rounded-lg"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddPage
