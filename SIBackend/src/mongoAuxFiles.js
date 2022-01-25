const { MongoClient } = require('mongodb')
const URL = process.env.MONGO_URL ?? "mongodb://localhost:27017"

const DATABASE_NAME = "Projeto"
const COLLECTION_NAME = "Testes"
const COLLECTION_STATS = "Stats"
const COLLECTION_SESSIONS = "Sessions"

let client
async function connectToMongo() {
    try {
        if (!client) {
            client = await MongoClient.connect(URL)
        }
        return client;
    } catch (err) {
        console.log(err)
    }
}
async function getMongoCollection(dbName, collectionName) {
    const client = await connectToMongo()
    return client.db(dbName).collection(collectionName)
}
async function createAccByEmail(email) {
    const collection = await getMongoCollection(DATABASE_NAME, COLLECTION_NAME)
    const result = await collection.insertOne(email)
    return result.insertedId
}
async function readUsers() {
    const collection = await getMongoCollection(DATABASE_NAME, COLLECTION_NAME)
    const result = await collection.find().toArray()
    return result
}
async function createPlayerStats(userName) {
    const collection = await getMongoCollection(DATABASE_NAME, COLLECTION_STATS)
    const result = await collection.insertOne(userName)
    return result.insertedId
}
async function createSessions({ userName, token }) {
    const collection = await getMongoCollection(DATABASE_NAME, COLLECTION_SESSIONS)
    const result = await collection.insertOne({ userName, token })
    return result.insertedId
}
async function findDocumentByUser(username) {
    const collection = await getMongoCollection(DATABASE_NAME, COLLECTION_NAME)
    const doc = await collection.findOne({ UserName: { $eq: username } })
    return doc
}

module.exports = { createPlayerStats, createAccByEmail, readUsers, createSessions, findDocumentByUser }