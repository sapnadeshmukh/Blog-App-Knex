const env = require('dotenv').config()

var knex = require('knex')({
    client: "mysql",
    connection: {
        host : process.env.host,
        user : process.env.user,
        password : process.env.password,
        database : process.env.database
    }
})

// To create auth_details table
    knex.schema.createTable('users', function(table){
        table.increments('id').primary();
        table.string('username');
        table.string('email').unique().notNullable();
        table.string('password').notNullable();
     }).then(() => {
        console.log("users table  has created successfully....")
     }).catch(() => {
        console.log("users table is already exists!");
    })

// To create user_post Table;
    knex.schema.createTable('user_post', function(table){
        table.increments('id').primary();
        table.integer('user_id');
        table.string('text');
        table.string('description');
        table.date('Date');
     }).then(() => {
        console.log("user_post table  has created successfully....")
     }).catch(() => {
        console.log("user_post table is already exists!");
    })

// To create like/dislike Table; 
    knex.schema.createTable('like_dislike', function(table){
        table.increments('id').primary();
        table.integer('post_id');
        table.integer('user_id');
        table.string('like');
        table.string('dislike');
     }).then(() => {
        console.log("like_dislike table has  created successfully....")
     }).catch(() => {
        console.log("like_dislike table is already exists!");
    })

module.exports = knex;
