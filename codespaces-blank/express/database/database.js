import sqlite3 from "sqlite3";
const db = new sqlite3.Database("./database/studyplanner.db", (err) =>{
        if(err){
            console.error("error with database", err.message);
        }
        else{
            console.log("database created and connected")
        }
})
db.serialize(()=>{
    db.run(
            `CREATE TABLE IF NOT EXISTS subjects(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT
        )`
    );
    db.run(
        `CREATE TABLE IF NOT EXISTS study_sessions(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            subject_id INTEGER NOT NULL,
            duration_minutes INTEGER NOT NULL CHECK(duration_minutes>0),
            session_date TEXT NOT NULL,
            notes TEXT,
            FOREIGN KEY(subject_id) REFERENCES subjects(id)
        )`
    )
})
export default db