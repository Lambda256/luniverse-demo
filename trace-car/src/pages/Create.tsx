import React from 'react'
import AsyncBoundary from '../components/AsyncBoundary/AsyncBoundary'
import Error from '../components/Error'
import CreateForm from '../components/CreateForm'

const Create = () => {
  return (
    <>
      <AsyncBoundary
				ErrorFallback={(arg) => <Error error={arg.error} />}
				SuspenseFallback={<h1>Loading...</h1>}
			>
        <CreateForm />
			</AsyncBoundary>
    </>
  )
}

export default Create