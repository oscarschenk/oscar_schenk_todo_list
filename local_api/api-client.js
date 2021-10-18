
    // Gets all records from the Database
    async function getCurrentTasks () {
        try {
        const res = await fetch('http://localhost:3000/', {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json'
            }})

        const data = await res.json()
        return data
        }
        catch (err) {
            console.log(err)
        }
    }

    // Posts something
    async function postTask (input) {
        const inputObject = {"Task": input, Done: "false"}
        try {
        // debugger
        const response = await fetch('http://localhost:3000/', {
            method: 'POST', 
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputObject) 
            })
            const data = await response.json();
            return data
        }
        catch (err) {
            console.log(err)
        }
    }

    // Deletes records from Database
    async function deleteTask (id) {
        try {
        const res = await fetch(('http://localhost:3000/'+id), {
            method: 'DELETE',
            headers: {
            'Content-Type': 'text/html'
            }})

        
        }
        catch (err) {
            console.log(err)
        }
    }

     // Edits records in Database
     async function editTask (entry) {
        const inputObject = {"Task": entry[0], Done: false}
        try {
        // debugger
        const response = await fetch('http://localhost:3000/'+entry[1], {
            method: 'PUT', 
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputObject) 
            })
            const data = await response.json();
            return data
        }
        catch (err) {
            console.log(err)
        }
    }

     // Strikes text in Database
     async function taskCompleted (entry) {
        
        const inputObject = {"Task": entry[0], Done: entry[1]}
        try {
        // debugger
        const response = await fetch('http://localhost:3000/'+entry[2], {
            method: 'PUT', 
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputObject) 
            })
            const data = await response.json();
            return data
        }
        catch (err) {
            console.log(err)
        }
    }
   
    
    

    


 