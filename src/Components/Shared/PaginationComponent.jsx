import React, { useMemo, useCallback } from 'react'

const PaginationComponent = React.memo(({ page, totalPages, onPageChange }) => {
  const handlePreviousClick = useCallback(() => {
    if (page > 1) {
      onPageChange(page - 1)
    }
  }, [page, onPageChange])

  const handleNextClick = useCallback(() => {
    if (page < totalPages) {
      onPageChange(page + 1)
    }
  }, [page, totalPages, onPageChange])

  return (
    <div className='flex justify-between mt-4'>
      {page > 1 && (
        <button
          onClick={handlePreviousClick}
          className='px-4 py-2 bg-button text-input rounded-md'
        >
          Previous
        </button>
      )}

      <span>
        Page {page} of {totalPages}
      </span>

      {page < totalPages && (
        <button
          onClick={handleNextClick}
          className='px-4 py-2 bg-button text-input rounded-md'
        >
          Next
        </button>
      )}
    </div>
  )
})

export default PaginationComponent
