import { post } from '../utils/http/request'
export function getRoomList(buildingId: string) {
  return post('/roomList', { buildingId })
}
