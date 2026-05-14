const fs = require('fs');

const myData = {
    project: "Практична робота",
    student: "Артем",
    tasksCompleted: 2,
    isSuccessful: true,
    technologies: ["JavaScript", "JSON", "Node.js"]
};

const jsonString = JSON.stringify(myData, null, 2);

fs.writeFile('generated_data.json', jsonString, (error) => {
    if (error) {
        console.error('Виникла помилка', error);
    } else {
        console.log('Файл generated_data.json було збережено.');
    }
});