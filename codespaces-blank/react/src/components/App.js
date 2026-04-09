import { useState, useEffect } from "react";
import AddStudySession from "./AddStudySession.js";
import Subjects from "./Subjects.js";
const App = props =>{
    const [studySessions, setStudySessions]=useState([]);
    const[subjects, setSubjects]=useState([]);
    const [loadingSessions, setLoadingSessions]= useState(true);
    const[ loadingSubjects, setLoadingSubjects]= useState(true);
    useEffect(()=>{
    fetch("/api/v1/studysessions")
    .then(res => res.json())
    .then(data => {
        setStudySessions(data.data);
        setLoadingSessions(false);
    })
    .catch(err => {
        console.error(err);
        setLoadingSessions(false);
    });
    }, []);
    useEffect(()=>{
        fetch("/api/v1/subjects")
        .then(res=>res.json())
        .then(data=>{
            setSubjects(data.data)
            setLoadingSubjects(false);
        })
        .catch(err=>{
            console.error(err);
            setLoadingSubjects(false);
        });

    },[]);
    return<>
        <div>
            <h1>Study Planner</h1>
            {loadingSubjects ? (<p>loading subjects... </p>) : (<Subjects subjects={subjects} setSubjects={setSubjects} />) }
            <h2>Add Study Sessions</h2>
            {loadingSessions ? (<p>loading study sessions...</p>) : (<AddStudySession subjects={subjects} studySessions={studySessions} setStudySessions={setStudySessions} />)}
        </div>
    </>;
}
export default App;