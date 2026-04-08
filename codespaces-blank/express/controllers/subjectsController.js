import { getAllSubjects, createSubject, getSubjectById, deleteSubjectById, updateSubjectById} from "../models/subjectsModel.js";
const getSubjects = async(req, res)=>{
    try{
        const subjects = await getAllSubjects();
        res.status(200).json({
            data: subjects,
            links:{
                same: "api/v1/subjects"
            }
        });
    }
    catch(error){
        res.status(500).json({
            error:"failed to get subjects"
        });
    }
}
const addSubjects = async(req, res)=>{
    try{
        const{ name, description }=req.body;
        const newSubject=await createSubject(name, description);
        res.status(201).json({
            data: newSubject,
            links:{
                same:`api/v1/subjects/${newSubject.id}`
            }
        })
    }
    catch(error){
        res.status(500).json({
            error:"failed to create new subject"
        });
    }
}
const getOneSubject = async (req, res)=>{
    try{
        const { id } =req.params;
        const subject = await getSubjectById(id);
        if(!subject){
            return res.status(404).json({error: "subject does not exist"})
        }
        res.status(200).json({
            data: subject,
            links:{
                same:`api/v1/subjects/${id}`,
                all: "/api/v1/subjects"
            }
        })
    }
    catch(error){
        res.status(500).json({error:"failed to get subject"});
    }
};
const deleteSubject = async (req, res)=>{
    try{
        const { id }=req.params;
        const subject = await deleteSubjectById(id);
        if(subject===0){
            return res.status(404).json({error: "subject not found"});
        }
        res.status(200).json({
            message:"subject succesfully deleted",
            links:{
                all:"/api/v1/subjects"
            }
        });
    }
    catch(error){
        res.status(500).json({error:"failed to delete the subject chosen"});
    }
};
const updateSubject = async (req, res)=>{
    try{
        const { id } =req.params;
        const { name, description }=req.body;
        const update= await updateSubjectById(id, name, description);
        if(update === 0 ){
            return res.status(404).json({error: "subject not found"});
        }
        res.status(200).json({
            message: "subject updated",
            links: {
                same: `/api/v1/subjects/${id}`,
                all:"/api/v1/subjects"
            }
        })
    }
    catch(error){
        res.status(500).json({error:"failed to update subject"});
    }
}
export { getSubjects, addSubjects, getOneSubject, deleteSubject, updateSubject };
