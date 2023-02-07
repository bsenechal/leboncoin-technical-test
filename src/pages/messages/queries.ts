import axios from 'axios'

const DEFAULT_PATH = '/messages'

export const fetchMessagesByConversationId = async ({
  conversationId,
}: {
  conversationId: number
}) => {
  const { data } = await axios.get(`${DEFAULT_PATH}/${conversationId}`)
  return data
}

export const createMessage = async (payload: {
  conversationId: number
  body: string
  authorId: number
}) => {
  const { data } = await axios.post(DEFAULT_PATH, payload)

  return data
}
