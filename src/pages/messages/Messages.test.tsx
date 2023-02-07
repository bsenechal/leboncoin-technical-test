import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { noop } from 'lodash'
import { QueryClient, QueryClientProvider } from 'react-query'

import { MessagesList } from './_components/MessagesList'

it('displays "no message"', async () => {
  // Given
  const { getByText } = render(<MessagesList messages={[]} />)

  // Then
  getByText('No message for the moment. Feel free to start a conversation')
})
