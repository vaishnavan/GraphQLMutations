const express = require('express');
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./Shcema/schema');
const app = express();

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql:true,
}));

app.listen((5000), () => {
    console.log('server connected');
});

mongoose.connect('mongodb://localhost:27017/GraphDB2', { useNewUrlParser: true, useUnifiedTopology:true }, (err) => {
    if(!err){
        console.log('database connected');
    }else{
        console.log(err);
    }
});