const express = require('express')
const fetch = require('node-fetch')
const withQuery = require('with-query').default
const morgan = require('morgan')


module.exports = (req, res) => {

    const app = express()
    app.use(morgan('combined'))

    app.get('/api/news', async (req,res)=> {
      
        const query = req.query['country']
        const header = req.headers['x-api-key']
        const url = withQuery('https://newsapi.org/v2/top-headlines', {
            country: query
        })
        const options = {
            headers: {
                'x-api-key': header
            }
        }
        console.log(url)
        try {
            const result = await fetch(url, options)
            const data = await result.json()
            res.status(200)
            res.type('application/json')
            return res.json(data)
        } catch(e) {
            console.log(e)
        }
      

    })

    app.use((req,res)=> {
        res.redirect('/')
    })

    app(req,res)
}