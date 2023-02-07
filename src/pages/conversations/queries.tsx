import axios from 'axios'

const DEFAULT_PATH = '/conversations'
const DELETE_PATH = '/conversation'

export const fetchConversationsByUserId = async ({
  userId,
}: {
  userId: number
}) => {
  const { data } = await axios.get(`${DEFAULT_PATH}/${userId}`)
  return data
}

export const createConversation = async ({
  userId,
  senderId,
  recipientId,
}: {
  userId: number
  senderId: number
  recipientId: number
}) => {
  const { data } = await axios.post(DEFAULT_PATH, {
    userId,
    senderId,
    recipientId,
  })

  return data
}

export const deleteConversation = async ({
  conversationId,
}: {
  conversationId: number
}) => {
  const { data } = await axios.delete(`${DELETE_PATH}/${conversationId}`)

  return data
}
