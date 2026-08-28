import React, { useEffect, useMemo, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const starterData = {
  basic: {
    name: '林思穎',
    role: '前端工程師',
    email: 'siying.lin@email.com',
    phone: '0912-345-678',
    location: '台北市，台灣',
    linkedin: 'linkedin.com/in/siyinglin',
    github: 'github.com/siyinglin',
    website: 'https://siyinglin.dev',
    intro: '具備 4 年前端開發經驗，專精於 React 與 TypeScript，熱衷於打造使用者體驗優異且可維護的產品。喜歡透過團隊合作與技術分享，持續優化開發流程與產品品質。',
    photo: '',
  },
  experiences: [
    { company: '綠野科技股份有限公司', role: '前端工程師', period: '2021.06 — 至今', summary: '使用 React、TypeScript 開發企業級 SaaS 產品，導入模組化元件，提升開發效率 30%。\n與設計與產品團隊合作，優化 API 串接與狀態管理，提升系統穩定性。\n導入 Storybook 與單元測試，建立可維護的前端開發基礎。' },
    { company: '拓真數位有限公司', role: '前端網頁工程師', period: '2019.03 — 2021.05', summary: '負責公司官網與活動頁面開發，使用 Vue.js 與 SCSS 建構響應式網站。\n優化網站效能與 SEO 結構，提升搜尋曝光與使用者停留時間。' },
    { company: '創新互動有限公司', role: '前端工程師（實習）', period: '2017.07 — 2019.02', summary: '協助開發互動式行銷活動與後台管理介面。\n學習並應用 JavaScript、jQuery 與 RWD 切版技術。' },
  ],
  education: [
    { school: '國立台灣大學', degree: '資訊工程學系｜學士', period: '2013.09 — 2017.06', detail: '專長：人機互動、資料結構、網頁程式設計' },
  ],
  skills: {
    frontend: 'React, TypeScript, Next.js, Vue.js, JavaScript (ES6+), HTML5, CSS3 / SCSS, Tailwind CSS',
    tools: 'Git, Storybook, Jest, Cypress, Vite, Webpack',
    other: 'RESTful API, Git Flow, Agile, CI/CD, SEO 基礎',
  },
  projects: [
    { name: '產品後台重構專案', stack: 'React / TypeScript / Zustand / Tailwind CSS', detail: '重構核心產品與共用元件，提升可讀性與開發效率，專案開發時程縮短 25%。', url: 'github.com/siyinglin/admin' },
    { name: '活動行銷網站優化專案', stack: 'Vue.js / SCSS / A11y', detail: '優化網站載入效能與無障礙體驗，PageSpeed 分數提升 35%，並完成響應式版本。', url: 'siyinglin.dev/campaign' },
  ],
  credentials: { certificates: 'TOEIC 860 分\nGoogle UX Design Certificate', languages: '中文（母語）\nEnglish（流利）' },
  extras: {
    target: '希望加入重視使用者體驗與工程文化的產品團隊，持續在前端架構、設計系統與跨團隊協作中創造影響力。',
    achievements: '曾主導設計系統落地，讓 3 個產品團隊共用元件，減少重複開發。',
    community: 'Front-End Taiwan 社群分享者｜女性工程師讀書會志工',
    availability: '一個月內可到職',
    recommendation: '可提供前主管或合作夥伴推薦人聯絡方式',
  },
}

const sections = [
  { id: 'basic', label: '基本資料', caption: '先讓人認識你', icon: 'user' },
  { id: 'experiences', label: '工作經歷', caption: '呈現你的成長', icon: 'briefcase' },
  { id: 'education', label: '教育背景', caption: '學習與專業根基', icon: 'graduation' },
  { id: 'skills', label: '技能專長', caption: '你能解決什麼', icon: 'spark' },
  { id: 'projects', label: '專案作品', caption: '讓成果自己說話', icon: 'folder' },
  { id: 'credentials', label: '證照與語言', caption: '補上可信度', icon: 'certificate' },
  { id: 'extras', label: '加分項目', caption: '選填，但值得寫', icon: 'star' },
]

function Icon({ name, size = 20 }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '1.7', strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }
  const paths = {
    user: <><circle cx="12" cy="7.5" r="3.4" /><path d="M5 20c.6-3.4 3.1-5.5 7-5.5s6.4 2.1 7 5.5" /></>,
    briefcase: <><rect x="3" y="6.5" width="18" height="13" rx="2" /><path d="M8 6.5V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1.5M3 11h18M10 11v2h4v-2" /></>,
    graduation: <><path d="m3 9 9-5 9 5-9 5-9-5Z" /><path d="M7 11.3V16c2.6 2 7.4 2 10 0v-4.7M21 9v7" /></>,
    spark: <><path d="m12 3 1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3Z" /><path d="m19 16 .6 2.4L22 19l-2.4.6L19 22l-.6-2.4L16 19l2.4-.6L19 16Z" /></>,
    folder: <><path d="M3 6.5a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-9Z" /></>,
    certificate: <><circle cx="12" cy="10" r="5.5" /><path d="m8.8 14.5-1 6 4.2-2.3 4.2 2.3-1-6M9.7 10.1l1.5 1.5 3.3-3.2" /></>,
    star: <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" />,
    camera: <><path d="M4 8.5h3l1.2-2h7.6l1.2 2h3a1.5 1.5 0 0 1 1.5 1.5v8A1.5 1.5 0 0 1 20 19.5H4A1.5 1.5 0 0 1 2.5 18v-8A1.5 1.5 0 0 1 4 8.5Z" /><circle cx="12" cy="14" r="3" /></>,
    eye: <><path d="M2.5 12s3.2-5 9.5-5 9.5 5 9.5 5-3.2 5-9.5 5-9.5-5-9.5-5Z" /><circle cx="12" cy="12" r="2" /></>,
    download: <><path d="M12 3v11M8 10l4 4 4-4M4 18v2h16v-2" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    trash: <><path d="M4 7h16M10 11v6M14 11v6M6.5 7l.7 13h9.6l.7-13M9 7V4h6v3" /></>,
    link: <><path d="M10 13.8 8.5 15.3a3.6 3.6 0 0 1-5.1-5.1l2.2-2.2a3.6 3.6 0 0 1 5.1 0" /><path d="m14 10.2 1.5-1.5a3.6 3.6 0 0 1 5.1 5.1l-2.2 2.2a3.6 3.6 0 0 1-5.1 0" /><path d="m8.8 15.2 6.4-6.4" /></>,
    check: <path d="m5 12 4.3 4.2L19 6.8" />,
    chevron: <path d="m9 18 6-6-6-6" />,
    info: <><circle cx="12" cy="12" r="9" /><path d="M12 10.5v5M12 7.5h.01" /></>,
    reset: <><path d="M4 5v5h5" /><path d="M5 10a7 7 0 1 0 2-4.9L4 10" /></>,
  }
  return <svg {...common}>{paths[name]}</svg>
}

function deepClone(value) {
  return JSON.parse(JSON.stringify(value))
}

function updatePath(data, path, value) {
  const next = deepClone(data)
  let cursor = next
  path.slice(0, -1).forEach((key) => { cursor = cursor[key] })
  cursor[path[path.length - 1]] = value
  return next
}

function Field({ label, value, onChange, type = 'text', placeholder, multiline = false, hint }) {
  return <label className="field">
    <span className="field-label">{label}</span>
    {multiline ? <textarea value={value || ''} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} rows={4} /> : <input type={type} value={value || ''} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} />}
    {hint && <span className="field-hint">{hint}</span>}
  </label>
}

function SectionIntro({ section }) {
  return <div className="section-intro">
    <div>
      <span className="section-kicker">編輯區</span>
      <h1>{section.label}</h1>
      <p>{section.caption}。完成後右側會即時更新你的履歷。</p>
    </div>
  </div>
}

function BasicEditor({ data, setData }) {
  const fileRef = useRef(null)
  const set = (key, value) => setData(updatePath(data, ['basic', key], value))
  const handlePhoto = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => set('photo', reader.result)
    reader.readAsDataURL(file)
  }
  return <>
    <div className="photo-row">
      <button className="photo-uploader" onClick={() => fileRef.current?.click()} type="button" aria-label="上傳個人照片">
        {data.basic.photo ? <img src={data.basic.photo} alt="個人照片預覽" /> : <><Icon name="camera" size={24} /><span>上傳大頭照</span><small>建議 400 × 400px</small></>}
      </button>
      <div className="photo-copy"><strong>一張自然、清楚的照片</strong><p>讓履歷多一點溫度。支援 JPG、PNG，檔案只會儲存在你的瀏覽器。</p>{data.basic.photo && <button className="text-button" type="button" onClick={() => set('photo', '')}>移除照片</button>}</div>
      <input ref={fileRef} hidden type="file" accept="image/*" onChange={handlePhoto} />
    </div>
    <div className="field-grid two">
      <Field label="姓名" value={data.basic.name} onChange={(value) => set('name', value)} placeholder="你的名字" />
      <Field label="目前職稱" value={data.basic.role} onChange={(value) => set('role', value)} placeholder="例如：產品經理" />
    </div>
    <Field label="自我介紹" value={data.basic.intro} onChange={(value) => set('intro', value)} multiline hint={`${(data.basic.intro || '').length} / 200 字｜建議 60–120 字，說清楚你的專長與工作方式`} />
    <div className="field-grid two">
      <Field label="電子郵件" value={data.basic.email} onChange={(value) => set('email', value)} type="email" placeholder="name@email.com" />
      <Field label="聯絡電話" value={data.basic.phone} onChange={(value) => set('phone', value)} placeholder="09xx-xxx-xxx" />
      <Field label="所在地區" value={data.basic.location} onChange={(value) => set('location', value)} placeholder="台北市，台灣" />
      <Field label="LinkedIn" value={data.basic.linkedin} onChange={(value) => set('linkedin', value)} placeholder="linkedin.com/in/yourname" />
      <Field label="個人網站／作品集" value={data.basic.website} onChange={(value) => set('website', value)} placeholder="https://yourname.dev" />
      <Field label="GitHub" value={data.basic.github} onChange={(value) => set('github', value)} placeholder="github.com/yourname" />
    </div>
  </>
}

function RepeatableEditor({ items, setItems, type }) {
  const isExperience = type === 'experience'
  const addItem = () => setItems([...items, isExperience ? { company: '', role: '', period: '', summary: '' } : { school: '', degree: '', period: '', detail: '' }])
  const removeItem = (index) => setItems(items.filter((_, itemIndex) => itemIndex !== index))
  const updateItem = (index, key, value) => setItems(items.map((item, itemIndex) => itemIndex === index ? { ...item, [key]: value } : item))
  return <div className="repeatable-list">
    {items.map((item, index) => <div className="repeatable-item" key={`${type}-${index}`}>
      <div className="repeatable-heading"><span>{String(index + 1).padStart(2, '0')}</span><strong>{isExperience ? (item.company || '新工作經歷') : (item.school || '新學歷')}</strong>{items.length > 1 && <button className="icon-button danger" type="button" onClick={() => removeItem(index)} aria-label="刪除這筆資料"><Icon name="trash" size={17} /></button>}</div>
      <div className="field-grid two">
        <Field label={isExperience ? '公司／組織' : '學校名稱'} value={isExperience ? item.company : item.school} onChange={(value) => updateItem(index, isExperience ? 'company' : 'school', value)} placeholder={isExperience ? '公司名稱' : '畢業學校'} />
        <Field label={isExperience ? '職稱' : '學位／科系'} value={isExperience ? item.role : item.degree} onChange={(value) => updateItem(index, isExperience ? 'role' : 'degree', value)} placeholder={isExperience ? '擔任職稱' : '例如：資訊管理學系｜學士'} />
        <Field label="時間" value={item.period} onChange={(value) => updateItem(index, 'period', value)} placeholder="2021.06 — 至今" />
      </div>
      <Field label={isExperience ? '工作內容與成果' : '補充說明'} value={isExperience ? item.summary : item.detail} onChange={(value) => updateItem(index, isExperience ? 'summary' : 'detail', value)} multiline placeholder={isExperience ? '每行一個重點，盡量用數字說明成果' : '學習方向、社團、專題或其他值得一提的內容'} hint={isExperience ? '小提示：用「做了什麼 → 造成什麼影響」來寫，比只列工作內容更加分。' : undefined} />
    </div>)}
    <button className="add-button" type="button" onClick={addItem}><Icon name="plus" size={18} />新增一筆{isExperience ? '工作經歷' : '教育背景'}</button>
  </div>
}

function SkillsEditor({ data, setData }) {
  const set = (key, value) => setData(updatePath(data, ['skills', key], value))
  return <>
    <div className="tip-panel"><Icon name="info" size={18} /><div><strong>把技能分成 2–3 組</strong><p>比起一大串關鍵字，分組更容易讓招募者快速抓到你的能力範圍。</p></div></div>
    <Field label="前端技術" value={data.skills.frontend} onChange={(value) => set('frontend', value)} multiline placeholder="React, TypeScript, ..." />
    <Field label="工具與協作" value={data.skills.tools} onChange={(value) => set('tools', value)} multiline placeholder="Git, Figma, ..." />
    <Field label="其他能力" value={data.skills.other} onChange={(value) => set('other', value)} multiline placeholder="語言、方法論、產業知識..." />
  </>
}

function ProjectsEditor({ data, setData }) {
  const items = data.projects
  const setItems = (next) => setData({ ...data, projects: next })
  return <div className="repeatable-list">
    {items.map((item, index) => <div className="repeatable-item" key={`project-${index}`}>
      <div className="repeatable-heading"><span>{String(index + 1).padStart(2, '0')}</span><strong>{item.name || '新專案作品'}</strong>{items.length > 1 && <button className="icon-button danger" type="button" onClick={() => setItems(items.filter((_, itemIndex) => itemIndex !== index))} aria-label="刪除這筆專案"><Icon name="trash" size={17} /></button>}</div>
      <Field label="專案名稱" value={item.name} onChange={(value) => setItems(items.map((x, i) => i === index ? { ...x, name: value } : x))} placeholder="作品或專案名稱" />
      <Field label="使用技術" value={item.stack} onChange={(value) => setItems(items.map((x, i) => i === index ? { ...x, stack: value } : x))} placeholder="React / TypeScript / ..." />
      <Field label="成果描述" value={item.detail} onChange={(value) => setItems(items.map((x, i) => i === index ? { ...x, detail: value } : x))} multiline placeholder="你解決了什麼問題？成果是什麼？" />
      <Field label="連結（選填）" value={item.url} onChange={(value) => setItems(items.map((x, i) => i === index ? { ...x, url: value } : x))} placeholder="github.com/yourname/project" />
    </div>)}
    <button className="add-button" type="button" onClick={() => setItems([...items, { name: '', stack: '', detail: '', url: '' }])}><Icon name="plus" size={18} />新增一個專案</button>
  </div>
}

function CredentialsEditor({ data, setData }) {
  const set = (key, value) => setData(updatePath(data, ['credentials', key], value))
  return <>
    <div className="field-grid two">
      <Field label="證照／認證" value={data.credentials.certificates} onChange={(value) => set('certificates', value)} multiline placeholder="每行一項" />
      <Field label="語言能力" value={data.credentials.languages} onChange={(value) => set('languages', value)} multiline placeholder="中文（母語）\nEnglish（流利）" />
    </div>
    <div className="tip-panel muted"><Icon name="spark" size={18} /><div><strong>有數字就寫數字</strong><p>例如 TOEIC 分數、語言檢定級別、證照取得年份，會讓資訊更有份量。</p></div></div>
  </>
}

function ExtrasEditor({ data, setData }) {
  const extras = data.extras
  const set = (key, value) => setData(updatePath(data, ['extras', key], value))
  const toggles = [
    { key: 'target', title: '求職目標', description: '讓招募者知道你想往哪裡走', label: '目標職務／理想團隊' },
    { key: 'achievements', title: '量化成果', description: '把「做得好」轉成看得見的證據', label: '代表性成果' },
    { key: 'community', title: '社群／志工經驗', description: '展現工作以外的投入與合作方式', label: '社群參與' },
    { key: 'availability', title: '到職時間', description: '讓合作節奏更清楚', label: '可到職時間' },
    { key: 'recommendation', title: '推薦人', description: '面試後可提供的推薦資訊', label: '推薦人說明' },
  ]
  return <div className="optional-list">
    {toggles.map((item) => <div className="optional-item" key={item.key}>
      <div className="optional-top"><div><strong>{item.title}</strong><p>{item.description}</p></div><button className={`switch ${extras[item.key] ? 'on' : ''}`} type="button" role="switch" aria-checked={Boolean(extras[item.key])} onClick={() => set(item.key, extras[item.key] ? '' : '請填寫這項資訊。')}><span /></button></div>
      {extras[item.key] && <Field label={item.label} value={extras[item.key]} onChange={(value) => set(item.key, value)} multiline={item.key === 'target' || item.key === 'achievements' || item.key === 'community'} placeholder="請填寫內容" />}
    </div>)}
  </div>
}

function EditorContent({ active, data, setData }) {
  if (active === 'basic') return <BasicEditor data={data} setData={setData} />
  if (active === 'experiences') return <RepeatableEditor type="experience" items={data.experiences} setItems={(items) => setData({ ...data, experiences: items })} />
  if (active === 'education') return <RepeatableEditor type="education" items={data.education} setItems={(items) => setData({ ...data, education: items })} />
  if (active === 'skills') return <SkillsEditor data={data} setData={setData} />
  if (active === 'projects') return <ProjectsEditor data={data} setData={setData} />
  if (active === 'credentials') return <CredentialsEditor data={data} setData={setData} />
  return <ExtrasEditor data={data} setData={setData} />
}

function filledScore(data, id) {
  const checks = {
    basic: [data.basic.name, data.basic.role, data.basic.email, data.basic.intro].filter(Boolean).length / 4,
    experiences: data.experiences.filter((item) => item.company && item.role && item.summary).length > 0 ? 1 : 0,
    education: data.education.filter((item) => item.school && item.degree).length > 0 ? 1 : 0,
    skills: [data.skills.frontend, data.skills.tools, data.skills.other].filter(Boolean).length / 3,
    projects: data.projects.filter((item) => item.name && item.detail).length > 0 ? 1 : 0,
    credentials: [data.credentials.certificates, data.credentials.languages].filter(Boolean).length / 2,
    extras: Object.values(data.extras).filter(Boolean).length / Object.keys(data.extras).length,
  }
  return checks[id] || 0
}

function ResumePreview({ data }) {
  const links = [data.basic.email, data.basic.phone, data.basic.location, data.basic.linkedin, data.basic.github, data.basic.website].filter(Boolean)
  const splitLines = (text) => (text || '').split('\n').map((line) => line.trim()).filter(Boolean)
  return <div className="resume-page" id="resume-print">
    <header className="resume-header">
      <div><h2>{data.basic.name || '你的名字'}</h2><p className="resume-role">{data.basic.role || '你的職稱'}</p></div>
      {data.basic.photo && <img className="resume-photo" src={data.basic.photo} alt={`${data.basic.name || '個人'}的大頭照`} />}
    </header>
    <div className="resume-contact">{links.map((item, index) => <span key={`${item}-${index}`}>{item}</span>)}</div>
    {data.basic.intro && <ResumeBlock title="自我介紹"><p className="resume-intro">{data.basic.intro}</p></ResumeBlock>}
    {data.experiences.some((item) => item.company || item.role) && <ResumeBlock title="工作經歷"><div className="timeline">{data.experiences.filter((item) => item.company || item.role).map((item, index) => <div className="timeline-item" key={`${item.company}-${index}`}><div className="timeline-date">{item.period}</div><div className="timeline-marker" /><div className="timeline-copy"><strong>{item.role || '職稱'}</strong><span>{item.company || '公司／組織'}</span><ul>{splitLines(item.summary).map((line) => <li key={line}>{line}</li>)}</ul></div></div>)}</div></ResumeBlock>}
    <div className="resume-columns">
      {(data.skills.frontend || data.skills.tools || data.skills.other) && <ResumeBlock title="技能"><div className="skill-list">{[['前端技術', data.skills.frontend], ['工具與協作', data.skills.tools], ['其他能力', data.skills.other]].filter(([, value]) => value).map(([label, value]) => <div key={label}><strong>{label}</strong><p>{value}</p></div>)}</div></ResumeBlock>}
      {data.projects.some((item) => item.name || item.detail) && <ResumeBlock title="專案精選"><div className="project-list">{data.projects.filter((item) => item.name || item.detail).map((item, index) => <div className="resume-project" key={`${item.name}-${index}`}><strong>{item.name || '專案作品'}</strong><span>{item.stack}</span><p>{item.detail}</p></div>)}</div></ResumeBlock>}
    </div>
    <div className="resume-columns lower">
      {data.education.some((item) => item.school || item.degree) && <ResumeBlock title="教育"><div className="education-list">{data.education.filter((item) => item.school || item.degree).map((item, index) => <div key={`${item.school}-${index}`}><strong>{item.school || '學校名稱'}</strong><span>{item.degree}</span><small>{item.period}</small></div>)}</div></ResumeBlock>}
      {(data.credentials.certificates || data.credentials.languages) && <ResumeBlock title="證照與語言"><div className="credential-list">{splitLines(data.credentials.certificates).map((line) => <span key={line}>{line}</span>)}{splitLines(data.credentials.languages).map((line) => <span key={line}>{line}</span>)}</div></ResumeBlock>}
    </div>
    {Object.values(data.extras).some(Boolean) && <ResumeBlock title="職涯亮點"><div className="highlight-list">{Object.entries(data.extras).filter(([, value]) => value).map(([key, value]) => <div key={key}><strong>{{ target: '求職目標', achievements: '量化成果', community: '社群參與', availability: '到職時間', recommendation: '推薦人' }[key]}</strong><p>{value}</p></div>)}</div></ResumeBlock>}
  </div>
}

function ResumeBlock({ title, children }) { return <section className="resume-block"><h3>{title}</h3>{children}</section> }

function App() {
  const [data, setData] = useState(() => {
    try { return JSON.parse(localStorage.getItem('resume-studio-data')) || deepClone(starterData) } catch { return deepClone(starterData) }
  })
  const [active, setActive] = useState('basic')
  const [mobileView, setMobileView] = useState('editor')
  const [saved, setSaved] = useState(true)
  const completion = useMemo(() => Math.round(sections.reduce((sum, section) => sum + filledScore(data, section.id), 0) / sections.length * 100), [data])

  useEffect(() => {
    setSaved(false)
    const timer = window.setTimeout(() => { localStorage.setItem('resume-studio-data', JSON.stringify(data)); setSaved(true) }, 350)
    return () => window.clearTimeout(timer)
  }, [data])

  const resetData = () => { if (window.confirm('要載入一份空白履歷嗎？目前資料會被清除，但之後仍可重新填寫。')) setData(deepClone({ ...starterData, basic: { ...starterData.basic, name: '', role: '', email: '', phone: '', location: '', linkedin: '', github: '', website: '', intro: '', photo: '' }, experiences: [{ company: '', role: '', period: '', summary: '' }], education: [{ school: '', degree: '', period: '', detail: '' }], skills: { frontend: '', tools: '', other: '' }, projects: [{ name: '', stack: '', detail: '', url: '' }], credentials: { certificates: '', languages: '' }, extras: { target: '', achievements: '', community: '', availability: '', recommendation: '' } })) }
  const section = sections.find((item) => item.id === active)

  return <div className="app-shell">
    <a className="skip-link" href="#editor">跳到編輯內容</a>
    <header className="topbar">
      <div className="brand"><span className="brand-mark"><span /><span /><span /></span><span>履歷工坊</span></div>
      <div className="progress-wrap"><span>資料完整度</span><strong>{completion}%</strong><div className="progress-track"><i style={{ width: `${completion}%` }} /></div></div>
      <div className="top-actions"><span className={`save-status ${saved ? 'saved' : ''}`}><span className="save-dot" />{saved ? '已自動儲存' : '儲存中…'}</span><button className="outline-button desktop-preview" type="button" onClick={() => setMobileView('preview')}><Icon name="eye" size={18} />預覽</button><button className="primary-button" type="button" onClick={() => window.print()}><Icon name="download" size={18} />匯出 PDF</button></div>
    </header>
    <div className="mobile-tabs"><button className={mobileView === 'editor' ? 'active' : ''} onClick={() => setMobileView('editor')}>編輯資料</button><button className={mobileView === 'preview' ? 'active' : ''} onClick={() => setMobileView('preview')}>預覽履歷</button></div>
    <main className="workspace">
      <aside className={`sidebar ${mobileView === 'preview' ? 'mobile-hide' : ''}`} aria-label="履歷章節導覽">
        <div className="sidebar-label">你的履歷</div>
        <nav>{sections.map((item) => { const score = filledScore(data, item.id); return <button key={item.id} className={`nav-item ${active === item.id ? 'active' : ''}`} onClick={() => setActive(item.id)}><span className="nav-icon"><Icon name={item.icon} size={21} /></span><span className="nav-copy"><strong>{item.label}</strong><small>{item.caption}</small></span>{score >= 1 && <span className="nav-check"><Icon name="check" size={14} /></span>}<Icon name="chevron" size={16} /></button> })}</nav>
        <div className="sidebar-bottom"><button className="reset-button" type="button" onClick={resetData}><Icon name="reset" size={17} />載入空白履歷</button><p><Icon name="info" size={15} />資料只會保存在此瀏覽器</p></div>
      </aside>
      <section className={`editor-pane ${mobileView === 'preview' ? 'mobile-hide' : ''}`} id="editor">
        <SectionIntro section={section} />
        <div className="editor-form"><EditorContent active={active} data={data} setData={setData} /></div>
        <div className="editor-footer"><span><Icon name="check" size={15} />{saved ? '這份履歷已安全儲存' : '正在儲存變更…'}</span><span>建議完成度 80% 以上</span></div>
      </section>
      <section className={`preview-pane ${mobileView === 'editor' ? 'mobile-hide' : ''}`} aria-label="履歷即時預覽">
        <div className="preview-toolbar"><span><strong>即時預覽</strong><small>A4 · 210 × 297 mm</small></span><div className="zoom-controls"><button type="button" aria-label="縮小預覽">−</button><span>78%</span><button type="button" aria-label="放大預覽">＋</button></div></div>
        <div className="resume-canvas"><ResumePreview data={data} /></div>
        <div className="preview-hint"><Icon name="eye" size={16} />右側預覽會隨你的輸入即時更新</div>
      </section>
    </main>
  </div>
}

createRoot(document.getElementById('root')).render(<App />)
