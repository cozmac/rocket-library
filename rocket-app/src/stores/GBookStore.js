import axios from 'axios'
import {EventEmitter} from 'fbemitter'

const SERVER = 'https://rocket-library-cozmacristian97.c9users.io'

class GBookStore{
    constructor(){
        this.content = []
        this.emitter = new EventEmitter()
    }
    async getAll(){
      try {
        let response = await axios(`${SERVER}/gbooks`)
        this.content = response.data
        this.emitter.emit('GET_ALL_SUCCESS')
      } catch (e) {
        console.warn(e)
        this.emitter.emit('GET_ALL_ERROR')
      }
    }
    async addOne(gBook){
      try {
        await axios.post(`${SERVER}/gbooks`, gBook)
        this.emitter.emit('ADD_SUCCESS')
        this.getAll()
      } catch (e) {
        console.warn(e)
        this.emitter.emit('ADD_ERROR')
      }       
    }
    async deleteOne(id){
      try {
        await axios.delete(`${SERVER}/gbooks/${id}`)
        this.emitter.emit('DELETE_SUCCESS')
        this.getAll()
      } catch (e) {
        console.warn(e)
        this.emitter.emit('DELETE_ERROR')
      }
    }
    async saveOne(id, gBook){
      try {
        await axios.put(`${SERVER}/gbooks/${id}`, gBook)
        this.emitter.emit('SAVE_SUCCESS')
        this.getAll()
      } catch (e) {
        console.warn(e)
        this.emitter.emit('SAVE_ERROR')
      }
    }
}

export default GBookStore