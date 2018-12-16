'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')

const sequelize = new Sequelize('rocketLibrary','root','',{
	dialect : 'mysql',
	define : {
		timestamps : false
	}
})

const gBook = sequelize.define('gBook', {
    title : {
		type : Sequelize.STRING(68),
		allowNull : false,
		validate : {
			len : [3, 68]
		}
	},	
	author : {
		type : Sequelize.STRING(60),
		allowNull : false,
		validate : {
			len : [3, 60]
		}
	},	
	ISBN : {
		type : Sequelize.STRING(13),
		allowNull : false,
		validate : {
			len : [9, 13]
		}
	},
	category : {
		type : Sequelize.STRING(20),
		allowNull : true,
		validate : {
			len : [3, 20]
		}
	}
})

const Author = sequelize.define('author', {
	name : {
		type : Sequelize.STRING(60),
		allowNull : false,
		validate : {
			len : [3, 60]
		}
	},
	language : {
		type : Sequelize.STRING(40),
		allowNull : false,
		validate : {
		    len : [3, 40]
		}
	}
})

const User = sequelize.define('user', {
	name : {
		type : Sequelize.STRING(100),
		allowNull : false,
		validate : {
			len : [3, 100]
		}
	},
	email : {
		type : Sequelize.STRING,
		allowNull : false,
		validate : {
			isEmail : true
		}
	}
})

const Rating = sequelize.define('rating', {
	description : {
		type : Sequelize.STRING(255),
		allowNull : true,
		validate : {
			len : [3, 255]
		}
	},
	grade : {
		type : Sequelize.INTEGER,
		allowNull : false,
		validate : {
			isNumeric : true,
			min : 0,
			max : 10
		}
	}
})

gBook.hasMany(Author)
gBook.hasMany(Rating)
gBook.hasMany(User)

const app = express()
app.use(bodyParser.json())
app.use(express.static('../simple-app/build'))

app.get('/create', async (req, res) => {
	try{
		await sequelize.sync({force : true})
		res.status(201).json({message : 'Has been created'})
	}
	catch(e){
		console.warn(e)
		res.status(500).json({message : 'Internal server error'})
	}
})

app.get('/gbooks', async (req, res) => {
	try{
	    let params = {
	    	where : {},
	    	order : [
	    		['title', 'ASC'],
	    		['author', 'ASC']
	    	]
	    }
	    let pageSize = 10
	    if (req.query){
	    	if (req.query.filter){
	    		params.where.title = {
                    [Sequelize.Op.like] : `%${req.query.filter}%`
                }
	    	}
	    	if (req.query.pageSize){
	    		pageSize = parseInt(req.query.pageSize)
	    	}
	    	if (req.query.pageNo){
	    		params.offset = pageSize * parseInt(req.query.pageNo)
	    		params.limit = pageSize
	    	}
	    }
	    let gbooks = await gBook.findAll(params)    
		res.status(200).json(gbooks)
	}
	catch(e){
		console.warn(e)
		res.status(500).json({message : 'Internal server error'})
	}
})

app.post('/gbooks', async (req, res) => {
	try{
		if (req.query.bulk && req.query.bulk == 'on'){
			await gBook.bulkCreate(req.body)
			res.status(201).json({message : 'Has been created'})
		}
		else{
			await gBook.create(req.body)
			res.status(201).json({message : 'Has been created'})
		}
	}
	catch(e){
		console.warn(e)
		res.status(500).json({message : 'Internal server error'})
	}
})

app.get('/gbooks/:id', async (req, res) => {
	try{
		let gbook = await gBook.findById(req.params.id)
		if (gbook){
			res.status(200).json(gbook)
		}
		else{
			res.status(404).json({message : '404: not found'})
		}
	}
	catch(e){
		console.warn(e)
		res.status(500).json({message : 'Internal server error'})
	}
})

app.put('/gbooks/:id', async (req, res) => {
	try{
		let gbook = await gBook.findById(req.params.id)
		if (gbook){
			await gbook.update(req.body)
			res.status(202).json({message : 'The change was accepted'})
		}
		else{
			res.status(404).json({message : '404: not found'})
		}
	}
	catch(e){
		console.warn(e)
		res.status(500).json({message : 'Internal server error'})
	}
})

app.delete('/gbooks/:id', async (req, res) => {
	try{
		let gbook = await gBook.findById(req.params.id)
		if (gbook){
			await gbook.destroy()
			res.status(202).json({message : 'The change was accepted'})
		}
		else{
			res.status(404).json({message : '404: not found'})
		}
	}
	catch(e){
		console.warn(e)
		res.status(500).json({message : 'Internal server error'})
	}
})

app.get('/gbooks/:id/authors', async (req, res) => {
	try {
		let gbook = await gBook.findById(req.params.id)
		if (gbook){
			let authors = await gbook.getAuthors()
			res.status(200).json(authors)
		}
		else{
			res.status(404).json({message : '404: not found'})
		}
	} catch (e) {
		console.warn(e.stack)
		res.status(500).json({message : 'Internal server error'})
	}
})

app.post('/gbooks/:id/authors', async (req, res) => {
	try {
		let gbook = await gBook.findById(req.params.id)
		if (gbook){
			let author = req.body
			author.authorId = gbook.id
			await Author.create(author)
			res.status(201).json({message : 'The author has been created'})
		}
		else{
			res.status(404).json({message : '404: not found'})
		}
	} catch (e) {
		console.warn(e.stack)
		res.status(500).json({message : 'Internal server error'})
	}
})

app.put('/gbooks/:id/authors/:idA', async (req, res) => {
	try{
		let author = await Author.findById(req.params.idA)
		if (author){
			await author.update(req.body)
			res.status(202).json({message : 'The change for author was accepted'})
		}
		else{
			res.status(404).json({message : '404: not found'})
		}
	}
	catch(e){
		console.warn(e)
		res.status(500).json({message : 'Internal server error'})
	}
})

app.delete('/gbooks/:id/authors/:idA', async (req, res) => {
	try{
		let author = await Author.findById(req.params.idA)
		if (author){
			await author.destroy()
			res.status(202).json({message : 'The author was deleted'})
		}
		else{
			res.status(404).json({message : '404: not found'})
		}
	}
	catch(e){
		console.warn(e)
		res.status(500).json({message : 'Internal server error'})
	}
})

app.get('/gbooks/:id/ratings', async (req, res) => {
	try {
		let gbook = await gBook.findById(req.params.id,{
			include : ['ratings']
		})
		if (gbook){
			res.status(200).json(gbook.ratings)
		}
		else{
			res.status(404).json({message : '404: not found'})
		}
	} catch (e) {
		console.warn(e.stack)
		res.status(500).json({message : 'Internal server error'})
	}	
})

app.post('/gbooks/:id/ratings', async (req, res) => {
	try {
		let gbook = await gBook.findById(req.params.id)
		if (gbook){
			let ratings = req.body
			ratings.bookId = gbook.id
			await Rating.create(ratings)
			res.status(201).json({message : 'The rating has been created'})
		}
		else{
			res.status(404).json({message : '404: not found'})
		}
	} catch (e) {
		console.warn(e.stack)
		res.status(500).json({message : 'Internal server error'})
	}
})


app.put('/gbooks/:id/ratings/:idR', async (req, res) => {
	try{
		let rating = await Rating.findById(req.params.idR)
		if (rating){
			await rating.update(req.body)
			res.status(202).json({message : 'The change for rating was accepted'})
		}
		else{
			res.status(404).json({message : '404: not found'})
		}
	}
	catch(e){
		console.warn(e)
		res.status(500).json({message : 'Internal server error'})
	}
})

app.delete('/gbooks/:id/ratings/:idR', async (req, res) => {
	try{
		let rating = await Rating.findById(req.params.idR)
		if (rating){
			await rating.destroy()
			res.status(202).json({message : 'The rating was deleted'})
		}
		else{
			res.status(404).json({message : '404: not found'})
		}
	}
	catch(e){
		console.warn(e)
		res.status(500).json({message : 'Internal server error'})
	}
})


app.get('/gbooks/:id/users', async (req, res) => {
	try {
		let gbook = await gBook.findById(req.params.id,{
			include : ['users']
		})
		if (gbook){
			res.status(200).json(gbook.users)
		}
		else{
			res.status(404).json({message : '404: not found'})
		}
	} catch (e) {
		console.warn(e.stack)
		res.status(500).json({message : 'Internal server error'})
	}	
})

app.post('/gbooks/:id/users', async (req, res) => {
	try {
		let gbook = await gBook.findById(req.params.id)
		if (gbook){
			let users= req.body
			users.bookId = gbook.id
			await User.create(users)
			res.status(201).json({message : 'The user has been created'})
		}
		else{
			res.status(404).json({message : '404: not found'})
		}
	} catch (e) {
		console.warn(e.stack)
		res.status(500).json({message : 'Internal server error'})
	}
})

app.put('/gbooks/:id/users/:idU', async (req, res) => {
	try{
		let user = await User.findById(req.params.idU)
		if (user){
			await user.update(req.body)
			res.status(202).json({message : 'The change for user was accepted'})
		}
		else{
			res.status(404).json({message : '404: not found'})
		}
	}
	catch(e){
		console.warn(e)
		res.status(500).json({message : 'Internal server error'})
	}
})

app.delete('/gbooks/:id/users/:idU', async (req, res) => {
	try{
		let user = await User.findById(req.params.idU)
		if (user){
			await user.destroy()
			res.status(202).json({message : 'The user was deleted'})
		}
		else{
			res.status(404).json({message : '404: not found'})
		}
	}
	catch(e){
		console.warn(e)
		res.status(500).json({message : 'Internal server error'})
	}
})

app.listen(8080)