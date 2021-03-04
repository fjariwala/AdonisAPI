'use strict'

var PouchDB = require('pouchdb-node');
var db = new PouchDB('mydb');
const { v4: uuidv4 } = require('uuid');

class PouchDbController {

    async storeData({ request, view, response, auth }) {


        try {

            const postName = request.input('title');
            const postBody = request.input('body');

            let data = {
                _id: uuidv4(),
                postName,
                postBody
            }

            const res = await db.post(data)

            return response.status(200).send(res)

        } catch (error) {
            console.log(error.message)
            return response.status(400).send(error.message)

        }
    }

    async getData({ request, view, response, auth }) {
        return view.render('/pouch/dataform')
    }


    async showData({ request, view, response, auth }) {

        try {

            // const res = await db.get('06ad2ce5-f92f-4fcd-9546-364d83437310')
            const res = await db.allDocs()
            return response.status(200).send(res)

        } catch (error) {
            return response.status(400).send(error.message)
        }
    }

    async removeDoc({ request, view, response, auth, params }) {
        try {
            var doc = await db.get(params.id);
            var res = await db.remove(doc);
            return response.status(200).send(res)
        } catch (err) {
            return response.status(400).send(err.message)
        }
    }
}

module.exports = PouchDbController