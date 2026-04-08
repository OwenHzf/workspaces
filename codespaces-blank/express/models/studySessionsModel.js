import db from "../database/database.js"
const createStudySession=(subject_id, duration_minutes, session_date, notes)=>{
    return new Promise((resolve, reject) =>{
        const data=`INSERT INTO study_sessions(subject_id, duration_minutes, session_date, notes) 
        VALUES (?, ?, ?, ?)`
        db.run(data, [subject_id, duration_minutes, session_date, notes,], 
        function (err){
        if(err){
            reject(err);
        }
        else{
            resolve({
                id: this.lastID,
                subject: subject_id,
                duration: duration_minutes,
                date: session_date,
                notes: notes
            });
        }
    });
    })
};
const getAllStudySessions=(limit=5, offset=0)=>{
    return new Promise((resolve, reject) =>{
        const data = `SELECT study_sessions.id, study_sessions.duration_minutes, study_sessions.session_date, study_sessions.notes, 
        subjects.name AS subject_name FROM study_sessions JOIN subjects ON study_sessions.subject_id = subjects.id 
        ORDER BY study_sessions.session_date DESC LIMIT ? OFFSET ?`
        db.all(data, [limit,offset], (err, data)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(data);
            }
        });
    });
};
const deleteStudySessionById=async (id)=>{
    return new Promise((resolve, reject) =>{
        const data = `DELETE FROM study_sessions where id = ?`
        db.run(data, [id], function (err) {
            if (err){
                reject(err);
            }
            else{
                resolve(this.changes);
            }
        });
    });
};
export { createStudySession, getAllStudySessions, deleteStudySessionById };