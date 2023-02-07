import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { noop } from 'lodash'

import { ConversationsList } from './_components/ConversationList'

it('opens a conversation', async () => {
  // Given
  const { getByText, getByTestId } = render(
    <ConversationsList
      conversations={[
        {
          id: 1,
          recipientId: 2,
          recipientNickname: 'Jeremie',
          senderId: 1,
          senderNickname: 'Thibaut',
          lastMessageTimestamp: 1625637849,
        },
      ]}
      onConversationClick={noop}
      onDeleteConversation={noop}
    />,
  )

  // When
  await userEvent.click(getByTestId('conversation-1'))

  // Then

  expect(getByText('Jeremie')).toBeInTheDocument()
})
