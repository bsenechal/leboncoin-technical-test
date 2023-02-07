import axios from 'axios'

const DEFAULT_PATH = '/users'

export async function fetchUsers() {
  const { data } = await axios.get(DEFAULT_PATH)
  return data
}

export const fetchUser = async ({ userId }: { userId: number }) => {
  const { data } = await axios.get(`${DEFAULT_PATH}/${userId}`)
  return data
}
