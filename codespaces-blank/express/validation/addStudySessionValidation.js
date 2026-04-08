const validateStudySession= (req, res, next)=>{
    const {subject_id, duration_minutes, session_date}=req.body;
    if(!subject_id || typeof subject_id !== "number"){
        return res.status(422).json({error: "valid subject_id required"})
    }
    if(!duration_minutes || typeof duration_minutes !== "number"){
        return res.status(422).json({error: "valid duration required in minutes"})
    }
    if(!session_date || typeof session_date !== "string"){
        return res.status(422).json({error: "valid date required"})
    }
    next();
};
export { validateStudySession }