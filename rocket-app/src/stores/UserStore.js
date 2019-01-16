import axios from 'axios'
import {EventEmitter} from 'fbemitter'

const SERVER = 'https://rocket-library-cozmacristian97.c9users.io'

class UserStore{
    constructor(){
        this.content = []
        this.emitter = new EventEmitter()
    }
    async getAll(gBookId){
      try {
        let response = await axios(`${SERVER}/gbooks/${gBookId}/users`)
        this.content = response.data
        this.emitter.emit('GET_ALL_SUCCESS')
      } catch (e) {
        console.warn(e)
        this.emitter.emit('GET_ALL_ERROR')
      }
    }
    async addOne(gBookId, user){
      try {
        await axios.post(`${SERVER}/gbooks/${gBookId}/users`, user)
        this.emitter.emit('ADD_SUCCESS')
        this.getAll(gBookId)
      } catch (e) {
        console.warn(e)
        this.emitter.emit('ADD_ERROR')
      }       
    }
    async deleteOne(gBookId, userId){
      try {
        await axios.delete(`${SERVER}/gbooks/${gBookId}/users/${userId}`)
        this.emitter.emit('DELETE_SUCCESS')
        this.getAll(gBookId)
      } catch (e) {
        console.warn(e)
        this.emitter.emit('DELETE_ERROR')
      }
    }
    async saveOne(gBookId, userId, user){
      try {
        await axios.put(`${SERVER}/gbooks/${gBookId}/users/${userId}`, user)
        this.emitter.emit('SAVE_SUCCESS')
        this.getAll(gBookId)
      } catch (e) {
        console.warn(e)
        this.emitter.emit('SAVE_ERROR')
      }
    }
}

export default UserStore