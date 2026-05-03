// ── TASK TRACKER ──────────────────────────────────────────────────────────────
function PageTaskTracker({ user, roleData }) {
  const today = new Date().toLocaleDateString("en-IN",{ weekday:"long",day:"numeric",month:"long" });
  const defaultTasks = [
    ...(roleData.roadmap[0]?.items||[]).slice(0,4).map((item,i)=>({ id:`r${i}`,text:item,category:"📘 Learning",done:i<1 })),
    { id:"t1",text:"Review yesterday's notes for 15 mins",category:"🔁 Revision",done:false },
    { id:"t2",text:"Solve 1 practice problem / exercise",category:"💪 Practice",done:false },
    { id:"t3",text:"Watch 1 video / read 1 article",category:"📺 Resource",done:false },
    { id:"t4",text:"Update your progress log",category:"📝 Admin",done:false },
  ];

  const [tasks,setTasks] = useState(defaultTasks);
  const [newTask,setNewTask] = useState("");
  const [newCat,setNewCat] = useState("📘 Learning");
  const [streak] = useState(3);
  const [goal,setGoal] = useState("Complete 3 tasks today");
  const [editGoal,setEditGoal] = useState(false);
  const [goalInput,setGoalInput] = useState(goal);

  const done = tasks.filter(t=>t.done).length;
  const pct = tasks.length>0 ? Math.round((done/tasks.length)*100) : 0;
  const categories = ["📘 Learning","💪 Practice","🔁 Revision","📺 Resource","📝 Admin","🔗 Networking"];

  const catColors = {
    "📘 Learning":{ bg:"rgba(6,182,212,0.08)",border:"rgba(6,182,212,0.2)",text:"var(--cyan)" },
    "💪 Practice":{ bg:"rgba(245,158,11,0.08)",border:"rgba(245,158,11,0.2)",text:"var(--amber)" },
    "🔁 Revision":{ bg:"rgba(139,92,246,0.08)",border:"rgba(139,92,246,0.2)",text:"var(--purple)" },
    "📺 Resource":{ bg:"rgba(16,185,129,0.08)",border:"rgba(16,185,129,0.2)",text:"var(--green)" },
    "📝 Admin":{ bg:"rgba(148,163,184,0.08)",border:"rgba(148,163,184,0.2)",text:"var(--text2)" },
    "🔗 Networking":{ bg:"rgba(236,72,153,0.08)",border:"rgba(236,72,153,0.2)",text:"#EC4899" },
  };

  return (
    <div style={{ padding:"80px 24px 40px",maxWidth:900,margin:"0 auto",animation:"fadeUp 0.4s ease" }}>
      <div className="tag" style={{ background:"rgba(16,185,129,0.08)",color:"var(--green)",border:"1px solid rgba(16,185,129,0.2)",marginBottom:20 }}>✅ Daily Task Tracker</div>
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:12,marginBottom:28 }}>
        <div>
          <h1 style={{ fontFamily:"var(--font-display)",fontSize:32,fontWeight:900,marginBottom:4 }}>Today's Mission</h1>
          <p style={{ color:"var(--text3)",fontSize:13 }}>{today}</p>
        </div>
        <div style={{ display:"flex",gap:12 }}>
          <div style={{ padding:"12px 20px",borderRadius:14,background:"rgba(245,158,11,0.08)",border:"1px solid rgba(245,158,11,0.2)",textAlign:"center" }}>
            <div style={{ fontFamily:"var(--font-display)",fontSize:24,fontWeight:900,color:"var(--amber)" }}>🔥 {streak}</div>
            <div style={{ fontSize:11,color:"var(--text3)" }}>Day Streak</div>
          </div>
          <div style={{ padding:"12px 20px",borderRadius:14,background:"rgba(16,185,129,0.06)",border:"1px solid rgba(16,185,129,0.18)",textAlign:"center" }}>
            <div style={{ fontFamily:"var(--font-display)",fontSize:24,fontWeight:900,color:"var(--green)" }}>{done}/{tasks.length}</div>
            <div style={{ fontSize:11,color:"var(--text3)" }}>Completed</div>
          </div>
        </div>
      </div>

      {/* Daily Goal */}
      <div style={{ padding:"16px 20px",borderRadius:16,background:"rgba(139,92,246,0.07)",border:"1px solid rgba(139,92,246,0.2)",marginBottom:24,display:"flex",alignItems:"center",gap:14,flexWrap:"wrap" }}>
        <span style={{ fontSize:24 }}>🎯</span>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:11,fontWeight:700,color:"var(--purple)",letterSpacing:2,textTransform:"uppercase",marginBottom:4 }}>Daily Goal</div>
          {editGoal ? (
            <div style={{ display:"flex",gap:8 }}>
              <input value={goalInput} onChange={e=>setGoalInput(e.target.value)} style={{ flex:1,background:"var(--surface)",border:"1px solid var(--border2)",borderRadius:8,padding:"6px 12px",color:"var(--text)",fontFamily:"var(--font-body)",fontSize:14,outline:"none" }}/>
              <button className="btn-primary" style={{ padding:"6px 16px",fontSize:13 }} onClick={()=>{ setGoal(goalInput); setEditGoal(false); }}>Save</button>
            </div>
          ) : <div style={{ fontSize:15,fontWeight:600 }}>{goal}</div>}
        </div>
        {!editGoal && <button className="btn-ghost" style={{ padding:"7px 14px",fontSize:12,borderRadius:10 }} onClick={()=>{ setGoalInput(goal); setEditGoal(true); }}>Edit</button>}
      </div>

      {/* Progress */}
      <div style={{ marginBottom:28 }}>
        <div style={{ display:"flex",justifyContent:"space-between",fontSize:13,color:"var(--text2)",marginBottom:8 }}>
          <span>Daily Progress</span>
          <span style={{ fontWeight:700,color:pct===100?"var(--green)":"var(--amber)" }}>{pct}%{pct===100?" 🎉 All done!":""}</span>
        </div>
        <div style={{ height:10,borderRadius:10,background:"var(--surface2)",overflow:"hidden" }}>
          <div style={{ height:"100%",width:`${pct}%`,borderRadius:10,background:pct===100?"var(--green)":"linear-gradient(90deg,var(--amber),var(--amber2))",transition:"width 0.5s ease" }}/>
        </div>
      </div>

      {/* Tasks */}
      <div style={{ display:"grid",gap:10,marginBottom:28 }}>
        {tasks.map(task=>{
          const cc = catColors[task.category]||catColors["📝 Admin"];
          return (
            <div key={task.id} className="task-row" style={{ display:"flex",alignItems:"center",gap:14,padding:"14px 16px",borderRadius:14,background:"var(--surface)",border:`1px solid ${task.done?"rgba(16,185,129,0.2)":"var(--border)"}`,opacity:task.done?0.7:1 }}>
              <div className={`task-check${task.done?" done":""}`} onClick={()=>setTasks(ts=>ts.map(t=>t.id===task.id?{...t,done:!t.done}:t))}>
                {task.done && <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3.5"><polyline points="20 6 9 17 4 12"/></svg>}
              </div>
              <div style={{ flex:1,fontSize:14,fontWeight:500,color:task.done?"var(--text3)":"var(--text)",textDecoration:task.done?"line-through":"none",transition:"all 0.2s" }}>{task.text}</div>
              <span style={{ padding:"3px 10px",borderRadius:20,background:cc.bg,border:`1px solid ${cc.border}`,color:cc.text,fontSize:11,fontWeight:600,whiteSpace:"nowrap" }}>{task.category}</span>
              <button onClick={()=>setTasks(ts=>ts.filter(t=>t.id!==task.id))} style={{ background:"none",border:"none",color:"var(--text3)",cursor:"pointer",fontSize:18,lineHeight:1,opacity:0.5 }}>×</button>
            </div>
          );
        })}
      </div>

      {/* Add task */}
      <div style={{ padding:20,borderRadius:16,background:"var(--surface)",border:"1px solid var(--border2)" }}>
        <div style={{ fontSize:13,fontWeight:700,color:"var(--text2)",marginBottom:14 }}>+ Add a Custom Task</div>
        <div style={{ display:"flex",gap:10,flexWrap:"wrap" }}>
          <input value={newTask} onChange={e=>setNewTask(e.target.value)} onKeyDown={e=>e.key==="Enter"&&newTask.trim()&&(setTasks(ts=>[...ts,{id:Date.now().toString(),text:newTask.trim(),category:newCat,done:false}]),setNewTask(""))}
            placeholder="What do you want to accomplish today?"
            style={{ flex:2,minWidth:200,padding:"11px 14px",borderRadius:10,background:"var(--bg3)",border:"1px solid var(--border2)",color:"var(--text)",fontFamily:"var(--font-body)",fontSize:14,outline:"none" }}/>
          <select value={newCat} onChange={e=>setNewCat(e.target.value)} style={{ flex:1,minWidth:150,padding:"11px 14px",borderRadius:10,background:"var(--bg3)",border:"1px solid var(--border2)",color:"var(--text2)",fontFamily:"var(--font-body)",fontSize:13,outline:"none" }}>
            {categories.map(c=><option key={c} value={c}>{c}</option>)}
          </select>
          <button className="btn-primary" style={{ padding:"11px 22px",fontSize:14 }} onClick={()=>{ if(!newTask.trim())return; setTasks(ts=>[...ts,{id:Date.now().toString(),text:newTask.trim(),category:newCat,done:false}]); setNewTask(""); }}>Add</button>
        </div>
      </div>

      {/* Weekly glance */}
      <div style={{ marginTop:24,padding:20,borderRadius:16,background:"var(--surface)",border:"1px solid var(--border)" }}>
        <div style={{ fontSize:13,fontWeight:700,color:"var(--text2)",marginBottom:14 }}>📊 This Week at a Glance</div>
        <div style={{ display:"flex",gap:8,flexWrap:"wrap" }}>
          {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((d,i)=>{
            const isToday=i===new Date().getDay()-1;
            const pcts=[90,60,100,40,pct,70,0];
            return (
              <div key={d} style={{ flex:1,minWidth:40,textAlign:"center" }}>
                <div style={{ fontSize:11,color:"var(--text3)",marginBottom:6 }}>{d}</div>
                <div style={{ height:60,borderRadius:8,background:"var(--surface2)",overflow:"hidden",display:"flex",alignItems:"flex-end" }}>
                  <div style={{ width:"100%",height:`${pcts[i]}%`,background:pcts[i]===100?"var(--green)":isToday?"var(--amber)":"rgba(245,158,11,0.3)",borderRadius:8,transition:"height 0.5s" }}/>
                </div>
                <div style={{ fontSize:11,fontWeight:700,color:isToday?"var(--amber)":"var(--text3)",marginTop:4 }}>{pcts[i]}%</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}