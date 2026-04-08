import db from "../database/database.js";
const getAllSubjects=(limit= 5, offset=0)=>{
    return new Promise((resolve,reject)=>{
        db.all(
            `SELECT * FROM subjects LIMIT ? OFFSET ?`,[limit, offset],
            (err, data)=>{
                if(err){
                    reject(err);
                }
                else{
                    resolve(data);
                }
            }
        );
    });
}
const createSubject=(name, description)=>{
    return new Promise((resolve, reject) =>{
        const create=`INSERT INTO subjects (name, description) 
        VALUES (?, ?)`;
        db.run(create, [name, description], function(err){
            if(err){
                reject(err)
            }
            else{
                resolve({
                    id:this.lastID,name,description
                });
            }
        });
    });
};
const getSubjectById = (id)=>{
    return new Promise((resolve, reject) =>{
        const data=`SELECT * FROM subjects where id = ?`
        db.get(data, [id], (err, data) =>{
            if(err){
                reject(err);
            }
            else{
                resolve(data);
            }
        });
    });
};
const deleteSubjectById = (id)=>{
    return new Promise((resolve, reject) =>{
        const data = `DELETE FROM subjects where id = ?`
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
const updateSubjectById=(id, name, description)=>{
    return new Promise((resolve, reject)=>{
        const data = `UPDATE subjects SET name=?, description=? WHERE id=?`
        db.run(data, [name, description, id], function(err){
            if(err){
                reject(err);
            }
            else{
                resolve(this.changes);
            }
        })
    })
}
export { getAllSubjects, createSubject, getSubjectById, deleteSubjectById, updateSubjectById };