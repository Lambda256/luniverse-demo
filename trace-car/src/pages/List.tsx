import React from 'react'
import AsyncBoundary from '../components/AsyncBoundary/AsyncBoundary'
import Error from '../components/Error'
import Items from '../components/Items'

const List = () => {

  return (
    <>
      <AsyncBoundary
				ErrorFallback={(arg) => <Error error={arg.error} />}
				SuspenseFallback={<h1>Loading...</h1>}
			>
        <Items />
			</AsyncBoundary>
    </>
  )
}

export default List