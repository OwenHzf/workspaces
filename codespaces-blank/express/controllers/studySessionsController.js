import { createStudySession, getAllStudySessions, deleteStudySessionById} from "../models/studySessionsModel.js";
const addStudySession= async (req, res)=>{
    try{
        const{subject_id, duration_minutes, session_date, notes}=req.body;
        const studySession=await createStudySession(subject_id, duration_minutes, session_date, notes);
        res.status(201).json({
            data: studySession,
            links:{
                same:`/api/v1/studysessions/${studySession.id}`
            }
        });
    }
    catch(error){
        res.status(500).json({error:"failed to create study session"});
    }
};
const getStudySessions= async (req, res)=>{
    try{
        const studySessions= await getAllStudySessions();
        res.status(200).json({
            data: studySessions,
            links:{
                same:"/api/v1/studysessions"
            }
        });
    }
    catch(error){
        console.log(error)
        res.status(500).json({error: "failed to get subjects"})
    }
};
const deleteStudySession=async (req, res)=>{
    try{
        const {id}=req.params;
        const session = await deleteStudySessionById(id);
        if(session === 0){
            return res.status(404).json({error: "study session not found"});
        }
        res.status(200).json({
            message:"study session succesfully deleted",
            links:{
                all:"/api/v1/studysessions"
            }
        });
    }
    catch(error){
         res.status(500).json({error:"failed to delete the study session chosen"});
    }
}
export { addStudySession, getStudySessions, deleteStudySession };