import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Navigate,
  Link,
  useNavigate,
  useLocation,
  Outlet,
  useParams,
} from "react-router-dom";
import api from "./api";
import "./styles.css";

const initialProfile = {
  name: "",
  age: "",
  height: "",
  weight: "",
  activity_level: "moderate",
  dietary_preference: "vegetarian",
  goal: "balanced",
  allergies: "",
  preferences: "",
};

const getError = (error, fallback = "Something went wrong.") =>
  error?.response?.data?.detail || error?.message || fallback;

const Icon = ({ name, size = 19 }) => {
  const paths = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 21c.7-4 3.3-6 8-6s7.3 2 8 6"/></>,
    spark: <><path d="m12 2 1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Z"/><path d="m19 16 .7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z"/></>,
    plan: <><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 7h6M9 11h6M9 15h4"/></>,
    file: <><path d="M6 3h8l4 4v14H6z"/><path d="M14 3v5h5M9 13h6M9 17h6"/></>,
    logout: <><path d="M10 5H5v14h5M14 8l4 4-4 4M18 12H9"/></>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6"/></>,
    upload: <><path d="M12 16V4M7 9l5-5 5 5M5 20h14"/></>,
    download: <><path d="M12 4v12M7 11l5 5 5-5M5 20h14"/></>,
    trash: <><path d="M4 7h16M10 11v6M14 11v6M6 7l1 14h10l1-14M9 7V4h6v3"/></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>,
    close: <><path d="m6 6 12 12M18 6 6 18"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
};

function Protected({ children }) {
  return localStorage.getItem("access_token") ? children : <Navigate to="/login" replace />;
}

function AppShell({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const nav = useNavigate();
  const location = useLocation();
  const logged = !!localStorage.getItem("access_token");

  useEffect(() => setMobileOpen(false), [location.pathname]);

  if (!logged) return <>{children}</>;

  const links = [
    ["/dashboard", "Dashboard", "grid"],
    ["/profile", "My Profile", "user"],
    ["/generate", "AI Planner", "spark"],
    ["/plans", "Saved Plans", "plan"],
    ["/files", "Cloud Files", "file"],
  ];

  const logout = () => {
    localStorage.removeItem("access_token");
    nav("/login", { replace: true });
  };

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileOpen ? "open" : ""}`}>
        <div className="sidebar-brand">
          <div className="brand-mark">D</div>
          <div><strong>DietWise</strong><span>Cloud Planner</span></div>
        </div>
        <div className="nav-section-label">WORKSPACE</div>
        <nav className="side-nav">
          {links.map(([to, label, icon]) => (
            <NavLink key={to} to={to} className={({ isActive }) => `side-link ${isActive ? "active" : ""}`}>
              <Icon name={icon} /> <span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="cloud-card">
            <div className="cloud-icon"><Icon name="file" size={17}/></div>
            <div><strong>Cloud storage</strong><span>Your files stay organized</span></div>
          </div>
          <button className="side-logout" onClick={logout}><Icon name="logout"/> Sign out</button>
        </div>
      </aside>
      <div className="main-shell">
        <header className="topbar">
          <button className="mobile-menu" onClick={() => setMobileOpen(v => !v)} aria-label="Toggle menu"><Icon name={mobileOpen ? "close" : "menu"}/></button>
          <div className="topbar-title"><span>Personal nutrition workspace</span><strong>{pageTitle(location.pathname)}</strong></div>
          <Link className="topbar-action" to="/generate"><Icon name="spark" size={17}/> Create plan</Link>
        </header>
        <main className="content">{children}</main>
      </div>
      {mobileOpen && <button className="mobile-overlay" onClick={() => setMobileOpen(false)} aria-label="Close menu"/>}
    </div>
  );
}

function pageTitle(path) {
  if (path.startsWith("/profile")) return "My Profile";
  if (path.startsWith("/generate")) return "AI Diet Planner";
  if (path.startsWith("/plans")) return "Saved Plans";
  if (path.startsWith("/files")) return "Cloud Files";
  return "Dashboard";
}

function Landing() {
  return <div className="landing">
    <section className="landing-hero">
      <div className="hero-copy">
        <div className="pill"><span className="status-dot"/> Cloud-powered wellness workspace</div>
        <h1>Plan smarter.<br/><em>Eat better.</em></h1>
        <p>Build personalized meal plans with AI-assisted recommendations, keep your profile organized, and store your wellness files in one secure cloud-ready workspace.</p>
        <div className="hero-actions"><Link className="primary-btn" to="/register">Start planning <Icon name="arrow" size={18}/></Link><Link className="text-btn" to="/login">I already have an account</Link></div>
        <div className="hero-proof"><div><strong>AI-assisted</strong><span>personal plans</span></div><div><strong>Cloud-ready</strong><span>file storage</span></div><div><strong>Secure</strong><span>JWT access</span></div></div>
      </div>
      <div className="hero-visual">
        <div className="orb orb-one"/><div className="orb orb-two"/>
        <div className="nutrition-card floating-main"><div className="mini-head"><span>Today’s nutrition</span><b>● Live</b></div><div className="nutrition-ring"><div><strong>78%</strong><span>balanced</span></div></div><div className="macro-row"><span><i/> Protein<strong>82g</strong></span><span><i/> Carbs<strong>214g</strong></span><span><i/> Fiber<strong>31g</strong></span></div></div>
        <div className="mini-plan floating-left"><span className="meal-icon">☼</span><div><small>Breakfast</small><strong>Oats & berries</strong></div><b>420 kcal</b></div>
        <div className="mini-plan floating-right"><span className="meal-icon">◒</span><div><small>Hydration</small><strong>2.4 L target</strong></div><b>Good</b></div>
      </div>
    </section>
    <section className="feature-strip"><div><span>01</span><strong>Personalized profile</strong><p>Goals, activity, dietary preferences and allergies.</p></div><div><span>02</span><strong>AI diet generation</strong><p>Generate practical meal plans with a local fallback.</p></div><div><span>03</span><strong>Cloud file hub</strong><p>Upload, download and manage supporting files.</p></div></section>
  </div>;
}

function Auth({ register = false }) {
  const nav = useNavigate();
  const [f, setF] = useState({ name: "", email: "", password: "" });
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(e) {
    e.preventDefault(); setErr(""); setBusy(true);
    try {
      const r = await api.post(register ? "/api/auth/register" : "/api/auth/login", f);
      localStorage.setItem("access_token", r.data.access_token);
      nav(register ? "/profile" : "/dashboard", { replace: true });
    } catch (x) { setErr(getError(x, "Unable to complete the request.")); }
    finally { setBusy(false); }
  }
  return <div className="auth-page"><div className="auth-decoration"><div className="auth-brand"><div className="brand-mark">D</div><strong>DietWise</strong></div><div><span className="eyebrow">AI + CLOUD</span><h1>Your nutrition workspace, beautifully organized.</h1><p>Personal profile, generated plans and cloud-ready files in one place.</p></div></div><form className="auth-card" onSubmit={submit}><div className="auth-title"><span className="eyebrow">WELCOME</span><h2>{register ? "Create your account" : "Welcome back"}</h2><p>{register ? "Start building your personalized nutrition workspace." : "Sign in to continue your nutrition journey."}</p></div>{register && <Field label="Full name"><input required value={f.name} onChange={e => setF({...f, name:e.target.value})} placeholder="Akshay Suryawanshi"/></Field>}<Field label="Email"><input required type="email" value={f.email} onChange={e => setF({...f, email:e.target.value})} placeholder="you@example.com"/></Field><Field label="Password"><input required minLength="8" type="password" value={f.password} onChange={e => setF({...f, password:e.target.value})} placeholder="Minimum 8 characters"/></Field>{err && <div className="alert error"><strong>Couldn’t continue</strong><span>{err}</span></div>}<button className="primary-btn full" disabled={busy}>{busy ? "Please wait…" : register ? "Create account" : "Sign in"} <Icon name="arrow" size={17}/></button><p className="auth-switch">{register ? "Already have an account?" : "New to DietWise?"} <Link to={register ? "/login" : "/register"}>{register ? "Sign in" : "Create an account"}</Link></p></form></div>;
}

function Field({ label, children }) { return <label className="field"><span>{label}</span>{children}</label>; }
function Loading({ label = "Loading your workspace…" }) { return <div className="loading-state"><div className="spinner"/><span>{label}</span></div>; }
function PageHeader({ eyebrow, title, description, action }) { return <div className="page-header"><div><span className="eyebrow">{eyebrow}</span><h1>{title}</h1>{description && <p>{description}</p>}</div>{action}</div>; }
function ErrorState({ message, onRetry }) { return <div className="alert error page-alert"><div><strong>We couldn’t load this section.</strong><span>{message}</span></div>{onRetry && <button className="outline-btn" onClick={onRetry}>Retry</button>}</div>; }

function Dashboard() {
  const [data, setData] = useState({ p:null, plans:[], files:[] }); const [loading,setLoading]=useState(true); const [err,setErr]=useState("");
  const load=()=>{setLoading(true);setErr("");Promise.all([api.get("/api/profile"),api.get("/api/plans"),api.get("/api/files")]).then(([a,b,c])=>setData({p:a.data,plans:b.data,files:c.data})).catch(x=>setErr(getError(x,"Please check that the backend is running."))).finally(()=>setLoading(false));};
  useEffect(load,[]);
  if(loading)return <Loading/>;
  if(err)return <><PageHeader eyebrow="OVERVIEW" title="Dashboard"/><ErrorState message={err} onRetry={load}/></>;
  const p=data.p||{};
  return <div><PageHeader eyebrow="OVERVIEW" title={`Good to see you, ${p.name||"there"}.`} description="Your personalized nutrition workspace at a glance." action={<Link className="primary-btn" to="/generate"><Icon name="spark"/> Generate plan</Link>}/><div className="stat-grid"><Stat label="Current goal" value={p.goal||"Not set"} tone="green"/><Stat label="Diet preference" value={p.dietary_preference||"Not set"} tone="blue"/><Stat label="Saved plans" value={data.plans.length} tone="violet"/><Stat label="Cloud files" value={data.files.length} tone="amber"/></div><div className="dashboard-grid"><section className="panel welcome-panel"><div className="panel-top"><div><span className="eyebrow">QUICK START</span><h2>Build your next plan</h2><p>Use your saved profile preferences to generate a fresh meal plan in seconds.</p></div><div className="big-icon"><Icon name="spark" size={25}/></div></div><Link className="outline-btn" to="/generate">Open AI planner <Icon name="arrow" size={16}/></Link></section><section className="panel recent-panel"><div className="panel-heading"><div><span className="eyebrow">RECENT</span><h2>Latest plan</h2></div><Link to="/plans">View all</Link></div>{data.plans[0]?<PlanPreview p={data.plans[0]}/>:<Empty title="No plans yet" text="Generate your first personalized plan." action="Generate plan" to="/generate"/>}</section></div></div>;
}
function Stat({label,value,tone}) { return <div className={`stat-card ${tone}`}><span>{label}</span><strong>{value}</strong><small>Updated from your workspace</small></div>; }
function PlanPreview({p}) { return <div className="plan-preview"><div><span className="meal-label">BREAKFAST</span><strong>{p.breakfast}</strong></div><div><span className="meal-label">LUNCH</span><strong>{p.lunch}</strong></div><div><span className="meal-label">DINNER</span><strong>{p.dinner}</strong></div><Link className="circle-btn" to={`/plans/${p.plan_id}`}><Icon name="arrow" size={16}/></Link></div>; }

function Profile() {
  const [f,setF]=useState(initialProfile),[loading,setLoading]=useState(true),[saving,setSaving]=useState(false),[msg,setMsg]=useState(""),[err,setErr]=useState("");
  const load=()=>{setLoading(true);api.get("/api/profile").then(r=>setF({...initialProfile,...r.data,age:r.data.age??"",height:r.data.height??"",weight:r.data.weight??""})).catch(x=>setErr(getError(x))).finally(()=>setLoading(false));}; useEffect(load,[]);
  async function save(e){e.preventDefault();setSaving(true);setMsg("");setErr("");try{const r=await api.put("/api/profile",{...f,age:f.age?+f.age:null,height:f.height?+f.height:null,weight:f.weight?+f.weight:null});setF({...initialProfile,...r.data,age:r.data.age??"",height:r.data.height??"",weight:r.data.weight??""});setMsg("Profile saved successfully.");}catch(x){setErr(getError(x))}finally{setSaving(false)}}
  if(loading)return <Loading label="Loading your profile…"/>;
  return <div><PageHeader eyebrow="PERSONALIZATION" title="My Profile" description="Keep your goals and preferences ready for every AI-generated plan."/><form className="panel profile-form" onSubmit={save}><div className="form-section"><div className="section-title"><span className="section-number">01</span><div><h2>Basic information</h2><p>Used to personalize your recommendations.</p></div></div><div className="field-grid"><Field label="Full name"><input required value={f.name} onChange={e=>setF({...f,name:e.target.value})}/></Field><Field label="Age"><input type="number" min="13" max="120" value={f.age} onChange={e=>setF({...f,age:e.target.value})} placeholder="23"/></Field><Field label="Height (cm)"><input type="number" min="50" max="250" value={f.height} onChange={e=>setF({...f,height:e.target.value})} placeholder="170"/></Field><Field label="Weight (kg)"><input type="number" min="20" max="400" value={f.weight} onChange={e=>setF({...f,weight:e.target.value})} placeholder="65"/></Field></div></div><div className="form-section"><div className="section-title"><span className="section-number">02</span><div><h2>Nutrition preferences</h2><p>These values guide your generated meal plan.</p></div></div><div className="field-grid"><Field label="Activity level"><select value={f.activity_level} onChange={e=>setF({...f,activity_level:e.target.value})}><option value="low">Low</option><option value="moderate">Moderate</option><option value="high">High</option></select></Field><Field label="Diet preference"><select value={f.dietary_preference} onChange={e=>setF({...f,dietary_preference:e.target.value})}><option value="vegetarian">Vegetarian</option><option value="vegan">Vegan</option><option value="non-vegetarian">Non-vegetarian</option><option value="general">General</option></select></Field><Field label="Primary goal"><select value={f.goal} onChange={e=>setF({...f,goal:e.target.value})}><option value="balanced">Balanced nutrition</option><option value="weight-management">Weight management</option><option value="fitness">Fitness</option></select></Field><Field label="Allergies"><input value={f.allergies} onChange={e=>setF({...f,allergies:e.target.value})} placeholder="e.g. peanuts, lactose"/></Field><Field label="Food preferences" ><input value={f.preferences} onChange={e=>setF({...f,preferences:e.target.value})} placeholder="e.g. Indian meals, high protein"/></Field></div></div>{err&&<div className="alert error">{err}</div>}{msg&&<div className="alert success"><Icon name="check"/><span>{msg}</span></div>}<div className="form-actions"><button className="primary-btn" disabled={saving}>{saving?"Saving…":"Save profile"}<Icon name="check" size={17}/></button></div></form></div>;
}

function Generate() {
  const [f,setF]=useState({dietary_preference:"vegetarian",activity_level:"moderate",goal:"balanced",allergies:"",preferences:""}); const [p,setP]=useState(null),[busy,setBusy]=useState(false),[err,setErr]=useState("");
  async function go(e){e.preventDefault();setBusy(true);setErr("");try{setP((await api.post("/api/plans/generate",f)).data)}catch(x){setErr(getError(x,"Plan generation failed."))}finally{setBusy(false)}}
  return <div><PageHeader eyebrow="AI PLANNER" title="Create a meal plan" description="Tune the inputs below, then generate a personalized daily plan."/><div className="planner-layout"><form className="panel planner-form" onSubmit={go}><div className="form-section"><div className="section-title"><span className="section-number">01</span><div><h2>Plan preferences</h2><p>Your selections shape the generated meals.</p></div></div><div className="field-grid"><Field label="Diet preference"><select value={f.dietary_preference} onChange={e=>setF({...f,dietary_preference:e.target.value})}><option value="vegetarian">Vegetarian</option><option value="vegan">Vegan</option><option value="non-vegetarian">Non-vegetarian</option><option value="general">General</option></select></Field><Field label="Activity level"><select value={f.activity_level} onChange={e=>setF({...f,activity_level:e.target.value})}><option value="low">Low</option><option value="moderate">Moderate</option><option value="high">High</option></select></Field><Field label="Goal"><select value={f.goal} onChange={e=>setF({...f,goal:e.target.value})}><option value="balanced">Balanced</option><option value="weight-management">Weight management</option><option value="fitness">Fitness</option></select></Field><Field label="Allergies"><input value={f.allergies} onChange={e=>setF({...f,allergies:e.target.value})} placeholder="None or list allergies"/></Field><Field label="Additional preferences"><input value={f.preferences} onChange={e=>setF({...f,preferences:e.target.value})} placeholder="e.g. Indian food, high protein"/></Field></div></div>{err&&<div className="alert error">{err}</div>}<button className="primary-btn full" disabled={busy}><Icon name="spark"/>{busy?"Generating your plan…":"Generate personalized plan"}</button></form><div className="tip-card"><div className="tip-icon"><Icon name="spark" size={23}/></div><h3>How it works</h3><p>Your preferences are sent to the FastAPI service. The project can use an AI provider when configured and includes a local rule-based fallback for offline demonstrations.</p><div className="tip-line"><Icon name="check" size={16}/><span>Saved automatically to your Plans</span></div><div className="tip-line"><Icon name="check" size={16}/><span>Works without a paid AI API</span></div></div></div>{p&&<section className="generated-section"><div className="generated-heading"><div><span className="eyebrow">GENERATED JUST NOW</span><h2>Your personalized plan</h2></div><span className="source-badge">{p.source}</span></div><Plan p={p}/></section>}</div>;
}

function Plan({p}) { const meals=[["Breakfast",p.breakfast,"☀"],["Lunch",p.lunch,"◒"],["Snack",p.snack,"◇"],["Dinner",p.dinner,"◐"]]; return <div className="plan-detail panel"><div className="meal-grid">{meals.map(([label,text,icon])=><article className="meal-card" key={label}><div className="meal-top"><span className="meal-icon">{icon}</span><span className="meal-label">{label}</span></div><h3>{text}</h3></article>)}</div><div className="plan-notes"><div><span className="eyebrow">NUTRITION SUMMARY</span><p>{p.nutrition_summary}</p></div><div><span className="eyebrow">HYDRATION</span><p>{p.hydration_reminder}</p></div></div><div className="plan-foot"><span>Source: {p.source}</span><span>Educational/general-wellness example — not medical advice.</span></div></div>; }

function Plans() {
  const [ps,setPs]=useState([]),[loading,setLoading]=useState(true),[err,setErr]=useState(""),[deleting,setDeleting]=useState(null);
  const load=()=>{setLoading(true);setErr("");api.get("/api/plans").then(r=>setPs(r.data||[])).catch(x=>setErr(getError(x,"Unable to load saved plans."))).finally(()=>setLoading(false));}; useEffect(load,[]);
  async function remove(id){setDeleting(id);try{await api.delete(`/api/plans/${id}`);setPs(v=>v.filter(p=>p.plan_id!==id))}catch(x){setErr(getError(x,"Could not delete this plan."))}finally{setDeleting(null)}}
  if(loading)return <Loading label="Loading your saved plans…"/>;
  return <div><PageHeader eyebrow="YOUR LIBRARY" title="Saved Plans" description="Every generated plan is saved here so you can revisit it anytime." action={<Link className="primary-btn" to="/generate"><Icon name="spark"/> New plan</Link>}/>{err&&<ErrorState message={err} onRetry={load}/>} {!err&&!ps.length&&<Empty title="Your plan library is empty" text="Generate your first personalized meal plan and it will appear here automatically." action="Create first plan" to="/generate"/>}<div className="plans-list">{ps.map(p=><article className="saved-plan panel" key={p.plan_id}><div className="saved-plan-head"><div><span className="eyebrow">PLAN #{p.plan_id}</span><h2>Personalized daily plan</h2></div><div className="saved-meta"><span><Icon name="clock" size={15}/>{new Date(p.created_at).toLocaleString()}</span><button className="icon-danger" onClick={()=>remove(p.plan_id)} disabled={deleting===p.plan_id} title="Delete plan"><Icon name="trash" size={17}/></button></div></div><PlanPreview p={p}/><div className="saved-plan-bottom"><span className="source-badge">{p.source}</span><button className="text-action" onClick={()=>{const el=document.getElementById(`detail-${p.plan_id}`);el?.classList.toggle("expanded")}}>View full plan <Icon name="arrow" size={15}/></button></div><div id={`detail-${p.plan_id}`} className="expand-detail"><Plan p={p}/></div></article>)}</div></div>;
}

function Files() {
  const [fs,setFs]=useState([]),[loading,setLoading]=useState(true),[err,setErr]=useState(""),[uploading,setUploading]=useState(false),[deleting,setDeleting]=useState(null);
  const load=()=>{setLoading(true);setErr("");api.get("/api/files").then(r=>setFs(r.data||[])).catch(x=>setErr(getError(x,"Unable to load your cloud files."))).finally(()=>setLoading(false));}; useEffect(()=>{load(); const handler=(e)=>uploadFile(e.detail); window.addEventListener("dietwise-empty-upload",handler); return()=>window.removeEventListener("dietwise-empty-upload",handler)},[]); async function uploadFile(file){if(!file)return;setUploading(true);setErr("");try{const d=new FormData();d.append("file",file);const r=await api.post("/api/files/upload",d,{headers:{"Content-Type":"multipart/form-data"}});setFs(v=>[r.data,...v])}catch(x){setErr(getError(x,"Upload failed."))}finally{setUploading(false)}}
  async function upload(e){const file=e.target.files?.[0];e.target.value="";if(file) await uploadFile(file)}
  async function download(id,name){try{const r=await api.get(`/api/files/${id}/download`,{responseType:"blob"});const u=URL.createObjectURL(r.data);const a=document.createElement("a");a.href=u;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),500)}catch(x){setErr(getError(x,"Download failed."))}}
  async function remove(id){setDeleting(id);try{await api.delete(`/api/files/${id}`);setFs(v=>v.filter(f=>f.file_id!==id))}catch(x){setErr(getError(x,"Could not delete this file."))}finally{setDeleting(null)}}
  if(loading)return <Loading label="Loading your cloud files…"/>;
  return <div><PageHeader eyebrow="CLOUD STORAGE" title="Cloud Files" description="Store supporting documents and files alongside your nutrition workspace." action={<label className={`primary-btn upload-btn ${uploading?"disabled":""}`}><Icon name="upload"/>{uploading?"Uploading…":"Upload file"}<input type="file" hidden onChange={upload} disabled={uploading}/></label>}/>{err&&<ErrorState message={err} onRetry={load}/>}<div className="storage-banner"><div className="storage-symbol"><Icon name="file" size={25}/></div><div><strong>Local storage is active</strong><span>Files are stored through the project’s configured storage adapter. The same interface can use S3-compatible cloud storage when deployed.</span></div><span className="storage-status"><i/> Ready</span></div>{!fs.length&&!err?<Empty title="No files uploaded" text="Upload a PDF, image, text or JSON file to test the cloud storage workflow." action="Upload your first file" uploadAction/>:<div className="file-list panel">{fs.map(f=><article className="file-row" key={f.file_id}><div className="file-type"><Icon name="file"/></div><div className="file-info"><strong>{f.filename}</strong><span>{formatBytes(f.size_bytes)} · {f.content_type || "File"}</span></div><span className="file-date">{new Date(f.uploaded_at).toLocaleDateString()}</span><div className="file-actions"><button className="icon-btn" onClick={()=>download(f.file_id,f.filename)} title="Download"><Icon name="download"/></button><button className="icon-danger" onClick={()=>remove(f.file_id)} disabled={deleting===f.file_id} title="Delete"><Icon name="trash"/></button></div></article>)}</div>}</div>;
}
function formatBytes(bytes=0){if(bytes<1024)return `${bytes} B`;if(bytes<1024*1024)return `${(bytes/1024).toFixed(1)} KB`;return `${(bytes/1024/1024).toFixed(1)} MB`;}
function Empty({title,text,action,to,uploadAction}) { return <div className="empty-state panel"><div className="empty-icon"><Icon name={uploadAction?"upload":"plan"} size={27}/></div><h2>{title}</h2><p>{text}</p>{uploadAction?<label className="primary-btn upload-btn">{action}<input type="file" hidden onChange={(e)=>{const file=e.target.files?.[0]; if(file) window.dispatchEvent(new CustomEvent("dietwise-empty-upload",{detail:file})); e.target.value=""}}/></label>:<Link className="primary-btn" to={to}>{action}<Icon name="arrow" size={16}/></Link>}</div>; }

function PlanDetail() {
  const { planId } = useParams();
  const [p,setP]=useState(null),[loading,setLoading]=useState(true),[err,setErr]=useState("");
  useEffect(()=>{api.get(`/api/plans/${planId}`).then(r=>setP(r.data)).catch(x=>setErr(getError(x,"Plan not found."))).finally(()=>setLoading(false))},[planId]);
  if(loading)return <Loading/>; if(err)return <ErrorState message={err}/>; return <div><PageHeader eyebrow={`PLAN #${planId}`} title="Saved plan" description="Your complete personalized meal plan." action={<Link className="outline-btn" to="/plans">Back to plans</Link>}/><Plan p={p}/></div>;
}
function ProtectedLayout(){ return <Protected><AppShell><Outlet/></AppShell></Protected>; }

function App(){return <BrowserRouter><Routes><Route path="/" element={<Landing/>}/><Route path="/login" element={<Auth/>}/><Route path="/register" element={<Auth register/>}/><Route element={<ProtectedLayout/>}><Route path="/dashboard" element={<Dashboard/>}/><Route path="/profile" element={<Profile/>}/><Route path="/generate" element={<Generate/>}/><Route path="/plans" element={<Plans/>}/><Route path="/plans/:planId" element={<PlanDetail/>}/><Route path="/files" element={<Files/>}/></Route><Route path="*" element={<Navigate to={localStorage.getItem("access_token") ? "/dashboard" : "/"} replace/>}/></Routes></BrowserRouter>}

createRoot(document.getElementById("root")).render(<React.StrictMode><App/></React.StrictMode>);
