import { useNavigate } from 'react-router'

const BackButton = () => {
  const navigate = useNavigate()

  return (
    <button
      type="button"
      onClick={() => navigate(-1)}
      className="flex items-center bg-slate-50 dark:bg-slate-800 mb-16
      rounded-lg px-4 py-2 text-sm shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700"
      aria-label="Go back"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="size-4 stroke-current stroke-2"
        fill="none"
      >
        <path d="M15 19 8 12l7-7" />
      </svg>
      &nbsp;Back
    </button>
  )
}

export default BackButton
