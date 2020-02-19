const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

require("dotenv").config(); 

const { Client } = require("pg");

let client = new Client()
client.connect()


console.log(process.env.PGUSER);

//routes
app.get('/', (req, res) => res.sendFile(__dirname+'/index.html'));
app.post('/register', (req, res) => { 
    addContent(req.body.name,req.body.assistant,req.body.age,req.body.date,req.body.time,req.body.comment);
    res.sendFile(__dirname+'/index.html')
   });



app.listen(8080, () => (
console.log("listening on port 8080")
))

const addContent  = async(name, assistant, age,date,time, comment) =>{
	let text, query;
	let values = [name,assistant, age, date, time,  comment]
	text = `INSERT INTO 
				visitors(
                    visitorName,
                    nameOfAssistant,
                    visitorAge,
                    dateOfVisit,
                    timeOfVisit,
                    comments) 
					VALUES($1,$2,$3, $4, $5, $6) 
				RETURNING *`
	

	try {
		query = await client.query(text,values)
		return query.rows;
	
	} catch(e) {
		console.log("ERROR",e);
	}
	finally{

		
	}
}
