import express from 'express';
import { addSleepRecord, getSleepRecords, findSpecificId } from './app.js';

const app = express();
app.use(express.json());
// remove register 

// app.delete('/dreamTracker/:id', async (req,res) => {
//     try {
//         res.status(200).json(findSpecificId(req.params.id));
//        } catch (error){
//         console.error(error);
//         res.status(500).json({error : 'Error trying to find'})
//        }
//     });
    

// find specific register
app.get('/dreamTracker/:id', async (req,res) => {
   try {
     const rightId = findSpecificId(req.params.id)
    res.status(200).json(rightId);
    
   } catch (error){
    console.error(error);
    res.status(500).json({error : 'Error trying to find'})
   }
});


// add register 
app.post('/dreamTracker', async (req, res) => {
    const { date, sleep_time, wake_time, notes } = req.body;
    try {
        await addSleepRecord(date, sleep_time, wake_time, notes);
        res.status(201).json({ message: 'Record added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error adding record' });
    }
});

// find register
app.get('/dreamTracker', async (req, res) => {
    try {
        const records = await getSleepRecords();
        res.status(200).json(records);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching records' });
    }
});

// delete any register 


// Inicializar o servidor
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


// function to find specific id 

