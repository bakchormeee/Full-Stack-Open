import axios from 'axios'

const baseurl = "http://localhost:3001/persons"

const getAll = () => {
    return axios.get(baseurl)
}

const update = ({id, newObject}) => {
    return axios.put(`${baseurl}/${id}`, newObject)
}

const addNew = ({newObject}) => {
    console.log(newObject)
    return axios.post(`${baseurl}`, newObject)
}

const del = (id => {
    return axios.delete(`${baseurl}/${id}`)
})

export default {getAll, update, addNew}