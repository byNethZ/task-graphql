import { NextApiRequest, NextApiResponse } from "next";
import { conn } from "../../../utils/database";

const task = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, body } = req;

    switch(method){
        case 'GET':
            try {
                const query = 'SELECT * FROM tasks';
                const response = await conn.query(query);                

                console.log(response);
                
    
                return res.status(200).json(response.rows);
            } catch (error: any) {
                return res.status(400).send({error: error.message})
                
            }
        case 'POST':
            try {
                const { title, description } = body
            
                const query = 'INSERT INTO tasks(title, description) VALUES ($1, $2) RETURNING *';
                const values = [title, description];
    
                const response = await conn.query(query, values);
    
                console.log(response);
                
                return res.status(200).json(response.rows[0]);
            } catch (error: any) {
                return res.status(400).send({error: error.message})
                
            }
        default:
            return res.status(400).json('Invalid method');
    }
};

export default task;