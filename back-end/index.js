const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const { promisify } = require('util');
const ObjectId = require('mongodb').ObjectID;
const port = 9000;

const client = require('./db/mongoUtil');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const test = () => {
    console.log('Connecting to MongoDB...');
    client.connect();
    client.db('poppyFlowersDB').collection('customers').findOne({}, function (err, result) {
        if (err)
            console.log(err);

        console.log('Connection established and query test successful: ');
        console.log(result);
    })
}
test();

app.get('/customers', async function (req, res) {
    if (Object.keys(req.query).length === 0) { // return last 5 custmoers entered
        let results = await getLatestCustomers();
        res.json(results);
    } else { // return top 5 results from the search
        let results = await getClosestMatchingCustomers(req.query);
        res.json(results);
    }
})

app.post('/customers', async function (req, res) {
    let {_id, ...customerWithoutId} = req.body; // Take everything except _id from req.body and put it into customerWithoutId
    client.db('poppyFlowersDB').collection('customers').insertOne(customerWithoutId)
        .then(data => {
            console.log(`Inserted ${data.insertedCount} row(s) into customers collection`);
            res.send("Successfully inserted customer");
        })
        .catch(err => {
            console.log(err);
            res.send(err);
        });
})

app.put('/customers', async function (req, res) {
    // Update customer in DB
    let {_id, ...updatedCustomer} = req.body;
    client.db('poppyFlowersDB').collection('customers').updateOne(
    {_id: ObjectId(req.body._id)}, {$set: { ...updatedCustomer }})
        .then(data => {
            console.log("Updated row in customers collection");
            res.send("Successfully updated customer");
        })
        .catch(err => {
            console.log(err);
            res.send(err);
        });
})

app.delete('/customers', async function (req, res) {
    // Update customer in DB
    let {_id, ...updatedCustomer} = req.body;
    client.db('poppyFlowersDB').collection('customers').deleteOne(
    {_id: ObjectId(req.body._id)})
        .then(data => {
            console.log("Deleted customer from collection");
            res.send("Successfully deleted customer");
        })
        .catch(err => {
            console.log(err);
            res.send(err);
        });
})

const getLatestCustomers = async () => {
    let results = [];

    const cursor = client.db('poppyFlowersDB').collection('customers').find()
        .sort({_id:-1}).limit(5);

    await cursor.forEach(item => {
        results.push(item);
    });

    return results;
}

const getClosestMatchingCustomers = async (query) => {
    let results = [];
    const queryPattern = buildSearchQuery(query);

    const cursor = client.db('poppyFlowersDB').collection('customers').find({
        ...queryPattern
    }).limit(5);

    await cursor.forEach(item => {
        results.push(item);
    });

    return results;
}

const buildSearchQuery = (query) => {
    let queryPattern = {};

    try { 
        Object.keys(query).forEach(function(key) {
            if (query[key].length > 0) {
                switch (key) {
                    case "name":
                    case "address":
                    case "town":
                        queryPattern[key] = {
                            "$regex": query[key], 
                            "$options": "i" 
                        };
                        break;
                    case "eircode":
                        queryPattern[key] = {
                            "$regex": `^${query[key]}`, 
                            "$options": "i" 
                        };
                        break;
                    case "mobile":
                    case "landline":
                        queryPattern[key] = {
                            "$regex": `^${query[key]}`
                        };
                        break;
                    case "_id":
                        break;
                    default: 
                        console.log("Default case hit in queryBuilder switch statement");
                }
            }
        })
    } catch(err) {
        console.log(err);
    }

    return queryPattern;
}

const startServer = async () => {
    await promisify(app.listen).bind(app)(port);
    console.log(`Listening on port ${port}`)
}

startServer();