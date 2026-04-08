import { useState, useEffect } from "react";
const Subjects= props=>{
    const[newSubject, setNewSubject]=useState({name:"", description:""});
    const[loading, setLoading]=useState(false);
    const[error, setError]=useState(null);
    const[currentId, setCurrentId]=useState(null);
    const[editData, setEditData]=useState({ name:"", description:""});
    const fetchSubjects=async()=>{
        try{
            const res=await fetch("/api/v1/subjects");
            const data=await res.json();
            props.setSubjects(data.data)
        }
        catch(err){
            console.error(err);
        }
    }
    const addSubject=async(event)=>{
        event.preventDefault();
        setLoading(true);
        setError(null)
        try{
            const res=await fetch("/api/v1/subjects",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(newSubject)
            });
            const data=await res.json();
            if(!res.ok){
                throw new Error(data.error || "failed to add subject")
            }
            setNewSubject({name:"", description:""})
            fetchSubjects()
        }
        catch(err){
            setError(err.message);
        }
        finally{
            setLoading(false)
        }
    };
    const deleteSubject=async(id)=>{
        try{
            const res=await fetch(`/api/v1/subjects/${id}`,{method:"DELETE"})
            if(!res.ok){
                throw new Error("failed to delete subject")
            }
            fetchSubjects();
        }
        catch(err){
            console.error(err);
        }
    };
    const updateHandler=async(id)=>{
        try{
            const res=await fetch(`/api/v1/subjects/${id}`,{
                method:"PATCH",
                headers:{"Content-Type": "application/json"},
                body: JSON.stringify(editData)
            });
            const data=await res.json();
            if(!res.ok) throw new Error(data.error);
            fetchSubjects()
            setCurrentId(null)
        }
        catch(err){
            console.error(err);
        }
    };
    useEffect(()=>{
        fetchSubjects();
    },[])
    return<>
        <div>
            <h2>Subjects</h2>
            {error && <p style={{color: "red"}}>{error}</p>}
            <form onSubmit={addSubject}>
                <input type="text" placeholder="subject name" 
                value={newSubject.name} 
                onChange={(event)=>setNewSubject({...newSubject, name: event.target.value})}
                required />
                <input type="text" placeholder="description" 
                value={newSubject.description} 
                onChange={(event)=>setNewSubject({...newSubject, description: event.target.value})}
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Loading..." : "Add Subject"}
                </button>
            </form>
            <ul>
                {props.subjects.map((subjectsList)=>(
                    
                    <li key={subjectsList.id}>
                        {currentId === subjectsList.id ? (
                            <>
                                <input
                                    value={editData.name}
                                    onChange={(event) => setEditData({...editData, name: event.target.value})}
                                />
                                <input
                                    value={editData.description}
                                    onChange={(event) => setEditData({...editData,description: event.target.value})}
                                />
                                <button onClick={() => updateHandler(subjectsList.id)}>
                                    Save
                                </button>

                                <button onClick={() => setCurrentId(null)}>
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                {subjectsList.name} - {subjectsList.description || "no description"}

                                <button onClick={() => deleteSubject(subjectsList.id)}>
                                    delete subject
                                </button>

                                <button
                                    onClick={() => {
                                        setCurrentId(subjectsList.id);
                                        setEditData({
                                            name: subjectsList.name,
                                            description: subjectsList.description
                                        });
                                    }}
                                >
                                    Edit Subject
                                </button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    </>
}
export default Subjects;