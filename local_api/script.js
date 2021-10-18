
   // Haalt alle taken op en print ze on load
    const printAllCurrentTasks = async () => {
        data = await getCurrentTasks();
        printTasksToDom(data)
    }
    
    // Gooit de input van het text veld naar de database
    const postToDo = () => {
        let str = document.getElementById("to-do").value
        postTask(str)
    }

    // Dit is het text veld
    const inputField = document.getElementById("to-do")
    inputField.addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            submit.click()
        }
    });

    // Verwijdert alle taken die aangevinkt zijn (completed)
    const deleteFinishedTasks = async () => {
        const finishedTaskArray = await getCurrentTasks()
        finishedTaskArray.forEach(task => {
            if (task.Done === "true"){
            deleteTask(task._id)
            }
        })
    }
    
    // Dit is de delete completed button
    const deleteFinishedTasksButton = document.getElementById("delete")
    deleteFinishedTasksButton.addEventListener("click", deleteFinishedTasks)

    // Dit is de "Add Post" button
    const submit = document.getElementById("submit")
    submit.addEventListener("click", postToDo)

    // General variables die nodig zijn
    const itemGrid = document.getElementById("item-grid")

    const printTasksToDom = (data) => {
        
        data.map(entry => {
            // Variables declaren
            let task = entry.Task;
            let newLi = document.createElement("li");
            let newParagraph = document.createElement("p");
            newParagraph.innerHTML = task;
            
            // Buttons & Checkbox
            let deleteButton = document.createElement("img");
            deleteButton.src="delete.png"
            deleteButton.className="listButtons"
            let editButton = document.createElement("img");
            editButton.src="edit.png"
            editButton.className="listButtons"
            let checkBox = document.createElement("input");
            checkBox.type="checkbox";
            checkBox.className="checkbox";

            // Event Listener aan de icons toevoegen
            deleteButton.addEventListener("click", async () => await (deleteTask(entry._id)))
            checkBox.addEventListener("change", async (event) => {
                if (event.currentTarget.checked) {
                    await taskCompleted([entry.Task, "true", entry._id])
              } 
                else {
                    await taskCompleted([entry.Task, "false", entry._id])
              }
            })
            
            // Opmaak van het list item
            

            
            
            // List item toevoegen aan DOM
            itemGrid.appendChild(newLi)
            newLi.appendChild(newParagraph)
            newLi.appendChild(deleteButton);
            newLi.appendChild(editButton)
            newLi.prepend(checkBox)

            // Zorgt dat de checkbox "gecheckt" is en de tekst doorgestreept
            if (entry.Done === "true") {
                newLi.className="strike"
                checkBox.checked="checked"
            } 
         
            // Dit hele monster is het de functionaliteit van de "edit" icon
            editButton.addEventListener("click", () => {
                checkBox.classList.add("hide")
                const newInput = document.createElement("input");
                const doneButton = document.createElement("button");
                doneButton.innerHTML = "Done";
                newInput.placeholder= entry.Task
                newInput.type = "text";
                newInput.addEventListener("keyup", function(event) {
                    if (event.key === "Enter") {
                        doneButton.click()
                    }
                });
                newLi.prepend(newInput);
                newLi.removeChild(newParagraph);
                newLi.removeChild(editButton)
                newLi.removeChild(deleteButton)
                newLi.appendChild(doneButton)
                
                doneButton.addEventListener("click", async () => {
                    const dataArray = [newInput.value, entry._id]
                    checkBox.classList.remove("hide")
                    doneButton.innerHTML = "Edit";
                    editTask(dataArray);
                    newLi.removeChild(newInput)
                    newLi.prepend(newParagraph)
                })

            })
       
        })
    }

    // Doet wat het zegt (:
    printAllCurrentTasks()