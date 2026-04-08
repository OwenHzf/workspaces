const validateUpdateSubject = (req, res, next)=>{
    const { name, description }=req.body;
    if(!name || !description){
        return res.status(422).json({error:"need to change name and description"})
    }
    if (name && typeof name !== "string"){
        return res.status(422).json({error: "the name must be a string"})
    }
    if(description && typeof description !== "string"){
        return res.status(422).json({error: "description must be a string"})
    }
    next();
}
export { validateUpdateSubject }