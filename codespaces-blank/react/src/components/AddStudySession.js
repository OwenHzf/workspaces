import { useState, useEffect } from "react";
const AddStudySession = props =>{
    const [sessionFormData, setSessionFormData]= useState({
        subject_id:"",
        duration_minutes:"",
        session_date:"",
        notes:""
    });
    const [loading, setLoading]= useState(false)
    const [error, setError]= useState(null)
    const fetchStudySessions=async()=>{
        try{
            const res=await fetch("/api/v1/studysessions");
            const data=await res.json();
            props.setStudySessions(data.data)
        }
        catch(err){
            console.error(err);
        }
    }
    const submit = async (event)=>{
        event.preventDefault();
        setLoading(true);
        setError(null);
        try{
            const convert={
                ...sessionFormData,
                subject_id: Number(sessionFormData.subject_id),
                duration_minutes: Number(sessionFormData.duration_minutes)
            };
            const res=await fetch("/api/v1/studysessions",{
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(convert)
            });
            const data= await res.json();
            if(!res.ok){
                throw new Error(data.error || "failed to create session");
            }
            fetchStudySessions();
            setSessionFormData({
                subject_id: "",
                duration_minutes: "",
                session_date: "",
                notes: ""
            });
        }
        catch(err){
                setError(err.message);
            }
        finally{
            setLoading(false);
        }
    };
    const deleteSession=async (id)=>{
        try{
            const res= await fetch(`/api/v1/studysessions/${id}`,
            {method: "DELETE"})
            if(!res.ok){
                throw new Error("failed to delete subject")
            }
            fetchStudySessions();
        }
        catch(err){
            console.error(err);
        }
    }
    useEffect(()=>{
        fetchStudySessions()
    }, [])
    return<>
        <form onSubmit={submit}>
            {error && <p style={{color:"red"}}>{error}</p>}
            <label>
                Subject Name:
                <select value={sessionFormData.subject_id} 
                onChange={(event=>setSessionFormData({...sessionFormData, subject_id: Number(event.target.value)}))} 
                required>
                    <option value="">Select a subject</option>
                    {props.subjects.map((subject)=>(
                        <option key={subject.id} value={subject.id}>{subject.name}</option>
                    ))}
                </select>
            </label>
            <label>
                Duration in minutes:
                <input type="number" value={sessionFormData.duration_minutes} 
                onChange={event=>setSessionFormData({...sessionFormData, duration_minutes: Number(event.target.value)})}
                required/>
            </label>
            <label>
                Session Date:
                <input type="date" value={sessionFormData.session_date} 
                onChange={event=>setSessionFormData({...sessionFormData, session_date: (event.target.value)})}
                required/>
            </label>
            <label>
                Notes:
                <input type="text" value={sessionFormData.notes} 
                onChange={event=>setSessionFormData({...sessionFormData, notes: event.target.value})}
                />
            </label>
            <button type="submit" disabled={loading}>
                {loading ? "Loading..." : "Add study session"}
            </button>
        </form>
        <ul>
                {props.studySessions.map((studySessionsList)=>(
                    <li key={studySessionsList.id}>
                        Subject Name: {studySessionsList.subject_name} 
                        Duration in Minutes: {studySessionsList.duration_minutes} 
                        Date of Session: {studySessionsList.session_date} 
                        Notes: {studySessionsList.notes || "no notes"}
                        <button onClick={()=>deleteSession(studySessionsList.id)}>Delete</button>
                    </li>
                ))}
               
            </ul>
    </>
}
export default AddStudySession;