import express from "express"
import fs from "fs"
import { exec } from "child_process"

const app = express();
app.use(express.json());

app.post('/Solver', (req, res) => {
    const data = req.body;
    const python_code = data.python_script;
    const input_data = JSON.stringify(data.input_data);
    const num_vehicles = data.num_vehicles;
    const depot = data.depot;
    const max_distance = data.max_distance;

    fs.writeFile('python_code.py', python_code, (err) => {
        if (err) {
            console.error("Error saving the python_code", err);
            return;
        }
        console.log("python_code saved successfully!");
    })

    fs.writeFile('input_data', input_data, (err) => {
        if (err) {
            console.error("Error saving the input_data", err);
            return;
        }
        console.log("input_file saved successfully!");
    })

    const command = `python3 python_code.py ./input_data ${num_vehicles} ${depot} ${max_distance}`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error('Error executing Python script:', error);
            return;
        }

        if (stderr) {
            console.error('Python script error:', stderr);
        };
        console.log(stdout);
        res.status(200).json({ result: stdout });
    });
})

app.listen(5000, () => {
    console.log("Solver up and running !")
})