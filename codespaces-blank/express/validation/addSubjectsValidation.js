const validateSubject = (req, res, next)=>{
    const{ name, description }=req.body;
    if(!name || typeof name !== "string"){
        return res.status(422).json({
            error: " a name is required and it must be a string"
        });
    }
    if(description && typeof description !== "string"){
        return res.status(422).json({
            error: "description must be a string"
        });
    }
    next();
};
export { validateSubject };
