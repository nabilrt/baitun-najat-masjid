exports.id=190,exports.ids=[190],exports.modules={4890:(a,t,e)=>{Promise.resolve().then(e.bind(e,6948))},3101:(a,t,e)=>{Promise.resolve().then(e.t.bind(e,2994,23)),Promise.resolve().then(e.t.bind(e,6114,23)),Promise.resolve().then(e.t.bind(e,9727,23)),Promise.resolve().then(e.t.bind(e,9671,23)),Promise.resolve().then(e.t.bind(e,1868,23)),Promise.resolve().then(e.t.bind(e,4759,23))},6948:(a,t,e)=>{"use strict";e.d(t,{default:()=>r});var n=e(326),i=e(7577),s=e(5047);function r(){(0,s.usePathname)(),(0,s.useSearchParams)();let[a,t]=(0,i.useState)(!1),[e,r]=(0,i.useState)(0);return((0,i.useRef)(null),a)?n.jsx("div",{className:"fixed inset-x-0 top-0 z-[60] h-1 bg-transparent",children:n.jsx("div",{className:"h-full bg-gold-400 transition-all duration-200",style:{width:`${e}%`}})}):null}},986:(a,t,e)=>{"use strict";e.r(t),e.d(t,{default:()=>N,metadata:()=>m});var n=e(9510),i=e(8445),s=e.n(i),r=e(1267),o=e.n(r),E=e(1159);e(7272);var c=e(8570);let T=(0,c.createProxy)(String.raw`/Users/nabilrt/Desktop/baitun-najat/app/components/TopbarProgress.tsx`),{__esModule:u,$$typeof:d}=T;T.default;let l=(0,c.createProxy)(String.raw`/Users/nabilrt/Desktop/baitun-najat/app/components/TopbarProgress.tsx#default`),m={metadataBase:new URL(process.env.NEXT_PUBLIC_SITE_URL||"https://baitun-najat.vercel.app"),title:{default:"Baitun Najat Jame Mosjid",template:"%s | Baitun Najat Jame Mosjid"},description:"Prayer times, community updates, and donation info for Baitun Najat Jame Mosjid.",alternates:{canonical:"/"},openGraph:{type:"website",url:"/",title:"Baitun Najat Jame Mosjid",description:"Prayer times, community updates, and donation info for Baitun Najat Jame Mosjid."},twitter:{card:"summary",title:"Baitun Najat Jame Mosjid",description:"Prayer times, community updates, and donation info for Baitun Najat Jame Mosjid."}};function N({children:a}){return n.jsx("html",{lang:"en",className:`${s().variable} ${o().variable}`,children:(0,n.jsxs)("body",{className:"font-body",children:[n.jsx(E.Suspense,{fallback:null,children:n.jsx(l,{})}),a]})})}},9487:(a,t,e)=>{"use strict";e.d(t,{AA:()=>_,Ec:()=>h,Hf:()=>F,Ho:()=>H,LD:()=>g,N3:()=>L,NR:()=>D,OH:()=>m,Or:()=>I,PS:()=>P,QF:()=>y,Qs:()=>A,U0:()=>S,UQ:()=>f,Yl:()=>M,Zc:()=>B,Ze:()=>N,Zl:()=>U,_5:()=>k,_c:()=>C,_z:()=>v,cQ:()=>R,ct:()=>p,dB:()=>b,nH:()=>O,vj:()=>X,yq:()=>w});var n=e(7476),i=e(6113),s=e.n(i);let r=null,o=null;async function E(a,t=[]){return(function(){if(!r){let a=process.env.TURSO_URL||"file:./data/baitun-najat.db",t=process.env.TURSO_AUTH_TOKEN;r=(0,n.createClient)({url:a,authToken:t})}return r})().execute({sql:a,args:t})}function c(a){return a.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)+/g,"")}async function T(a){let t=c(a)||"campaign",e=t,n=1;for(;;){let a=await E("SELECT COUNT(*) as count FROM campaigns WHERE slug = ?",[e]);if(0===Number(a.rows[0]?.count??0))return e;e=`${t}-${n}`,n+=1}}async function u(){for(;;){let a=s().randomBytes(8).toString("base64url"),t=await E("SELECT COUNT(*) as count FROM campaigns WHERE share_token = ?",[a]);if(0===Number(t.rows[0]?.count??0))return a}}async function d(){return o||(o=(async()=>{for(let a of[`CREATE TABLE IF NOT EXISTS prayer_times (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        name_bn TEXT,
        azan_time TEXT NOT NULL,
        prayer_time TEXT NOT NULL
      )`,`CREATE TABLE IF NOT EXISTS hadiths (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        text TEXT NOT NULL,
        source TEXT NOT NULL,
        created_at TEXT NOT NULL
      )`,`CREATE TABLE IF NOT EXISTS donations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        amount INTEGER NOT NULL,
        bkash_number TEXT NOT NULL,
        transaction_id TEXT NOT NULL,
        note TEXT,
        campaign_id INTEGER,
        created_at TEXT NOT NULL,
        confirmed INTEGER NOT NULL DEFAULT 0,
        confirmed_at TEXT,
        FOREIGN KEY (campaign_id) REFERENCES campaigns(id)
      )`,`CREATE TABLE IF NOT EXISTS campaigns (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        goal_amount INTEGER,
        slug TEXT,
        share_token TEXT,
        is_active INTEGER NOT NULL DEFAULT 1,
        created_at TEXT NOT NULL,
        archived_at TEXT
      )`,`CREATE TABLE IF NOT EXISTS announcements (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        title_bn TEXT,
        message TEXT NOT NULL,
        message_bn TEXT,
        start_at TEXT NOT NULL,
        end_at TEXT NOT NULL,
        is_active INTEGER NOT NULL DEFAULT 1,
        created_at TEXT NOT NULL
      )`,`CREATE TABLE IF NOT EXISTS display_links (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        slug TEXT NOT NULL,
        token TEXT NOT NULL,
        created_at TEXT NOT NULL
      )`])await E(a);let a=await E("SELECT COUNT(*) as count FROM prayer_times");if(0===Number(a.rows[0]?.count??0))for(let a of[["Fajr","ফজর","04:20 AM","04:35 AM"],["Dhuhr","যোহর","12:40 PM","12:55 PM"],["Asr","আসর","04:30 PM","04:45 PM"],["Maghrib","মাগরিব","06:25 PM","06:30 PM"],["Isha","এশা","07:45 PM","08:00 PM"],["Jumu'ah","জুমুআ","01:05 PM","01:30 PM"]])await E("INSERT INTO prayer_times (name, name_bn, azan_time, prayer_time) VALUES (?, ?, ?, ?)",a);let t=await E("SELECT COUNT(*) as count FROM hadiths");if(0===Number(t.rows[0]?.count??0)){let a=new Date().toISOString();for(let t of[["The most beloved deeds to Allah are those that are consistent, even if small.","Sahih al-Bukhari 6464"],["The best among you are those who learn the Qur'an and teach it.","Sahih al-Bukhari 5027"],["Whoever builds a mosque for Allah, Allah will build for him a house in Paradise.","Sahih Muslim 533"]])await E("INSERT INTO hadiths (text, source, created_at) VALUES (?, ?, ?)",[t[0],t[1],a])}let e=await E("SELECT COUNT(*) as count FROM campaigns");if(0===Number(e.rows[0]?.count??0)){let a=new Date().toISOString();for(let t of[["Renovation & Prayer Hall Upgrade","Help us renovate the main prayer hall, improve lighting, and replace worn carpets.",15e4],["Qur'an Learning Support","Support our evening Qur'an classes with books, materials, and teacher honorariums.",6e4]]){let e=c(String(t[0])),n=await u();await E("INSERT INTO campaigns (title, description, goal_amount, slug, share_token, is_active, created_at) VALUES (?, ?, ?, ?, ?, 1, ?)",[t[0],t[1],t[2],e,n,a])}}for(let a of(await E("SELECT id, title FROM campaigns WHERE slug IS NULL OR slug = ''")).rows){let t=await T(String(a.title));await E("UPDATE campaigns SET slug = ? WHERE id = ?",[t,a.id])}for(let a of(await E("SELECT id FROM campaigns WHERE share_token IS NULL OR share_token = ''")).rows){let t=await u();await E("UPDATE campaigns SET share_token = ? WHERE id = ?",[t,a.id])}let n=await E("SELECT id, name FROM prayer_times WHERE name_bn IS NULL OR name_bn = ''"),i={Fajr:"ফজর",Dhuhr:"যোহর",Asr:"আসর",Maghrib:"মাগরিব",Isha:"এশা","Jumu'ah":"জুমুআ"};for(let a of n.rows){let t=String(a.name);await E("UPDATE prayer_times SET name_bn = ? WHERE id = ?",[i[t]??t,a.id])}let s=await E("SELECT COUNT(*) as count FROM display_links WHERE slug = 'prayer-display'");if(0===Number(s.rows[0]?.count??0)){let a=await l(),t=new Date().toISOString();await E("INSERT INTO display_links (slug, token, created_at) VALUES (?, ?, ?)",["prayer-display",a,t])}})())}async function l(){for(;;){let a=s().randomBytes(8).toString("base64url"),t=await E("SELECT COUNT(*) as count FROM display_links WHERE token = ?",[a]);if(0===Number(t.rows[0]?.count??0))return a}}async function m(){return await d(),(await E("SELECT * FROM prayer_times ORDER BY id")).rows}async function N(a,t,e,n){await d(),await E("UPDATE prayer_times SET name_bn = ?, azan_time = ?, prayer_time = ? WHERE id = ?",[t,e,n,a])}async function R(){return await d(),(await E("SELECT * FROM hadiths ORDER BY created_at DESC")).rows}async function w(a,t){await d();let e=new Date().toISOString();await E("INSERT INTO hadiths (text, source, created_at) VALUES (?, ?, ?)",[a,t,e])}async function S(a){await d(),await E("DELETE FROM hadiths WHERE id = ?",[a])}async function O(a){await d();let t=new Date().toISOString();await E("INSERT INTO donations (name, amount, bkash_number, transaction_id, note, campaign_id, created_at, confirmed) VALUES (?, ?, ?, ?, ?, ?, ?, 0)",[a.name,a.amount,a.bkashNumber,a.transactionId,a.note??null,a.campaignId??null,t])}async function L(a){await d();let t=new Date().toISOString();await E("INSERT INTO donations (name, amount, bkash_number, transaction_id, note, campaign_id, created_at, confirmed, confirmed_at) VALUES (?, ?, ?, ?, ?, ?, ?, 1, ?)",[a.name,a.amount,a.bkashNumber,a.transactionId,a.note??null,a.campaignId??null,t,t])}async function _(){return await d(),(await E("SELECT * FROM donations WHERE confirmed = 1 ORDER BY confirmed_at DESC, created_at DESC")).rows}async function f(){return await d(),(await E("SELECT * FROM donations WHERE confirmed = 0 ORDER BY created_at DESC")).rows}async function p(a){await d();let t=new Date().toISOString();await E("UPDATE donations SET confirmed = 1, confirmed_at = ? WHERE id = ?",[t,a])}async function g(){return await d(),(await E("SELECT * FROM campaigns WHERE is_active = 1 ORDER BY created_at DESC")).rows}async function h(a){await d();let t=new Date().toISOString(),e=await T(a.title),n=await u();await E("INSERT INTO campaigns (title, description, goal_amount, slug, share_token, is_active, created_at) VALUES (?, ?, ?, ?, ?, 1, ?)",[a.title,a.description,a.goalAmount??null,e,n,t])}async function U(a){await d();let t=new Date().toISOString();await E("UPDATE campaigns SET is_active = 0, archived_at = ? WHERE id = ?",[t,a])}async function I(a){await d(),await E("UPDATE campaigns SET is_active = 1, archived_at = NULL WHERE id = ?",[a])}async function y(a){return await d(),(await E("SELECT * FROM campaigns WHERE id = ?",[a])).rows[0]??null}async function A(a){return await d(),(await E("SELECT * FROM campaigns WHERE share_token = ?",[a])).rows[0]??null}async function M(a){return await d(),(await E("SELECT * FROM display_links WHERE slug = ?",[a])).rows[0]??null}async function C(a){return await d(),(await E("SELECT * FROM display_links WHERE token = ?",[a])).rows[0]??null}async function b(){return await d(),(await E(`SELECT c.*, COALESCE(SUM(d.amount), 0) as total_confirmed
     FROM campaigns c
     LEFT JOIN donations d ON d.campaign_id = c.id AND d.confirmed = 1
     WHERE c.is_active = 1
     GROUP BY c.id
     ORDER BY c.created_at DESC`)).rows}async function D(){return await d(),(await E(`SELECT c.*, COALESCE(SUM(d.amount), 0) as total_confirmed
     FROM campaigns c
     LEFT JOIN donations d ON d.campaign_id = c.id AND d.confirmed = 1
     GROUP BY c.id
     ORDER BY c.created_at DESC`)).rows}async function P(a){return await d(),(await E(`SELECT c.*, COALESCE(SUM(d.amount), 0) as total_confirmed
     FROM campaigns c
     LEFT JOIN donations d ON d.campaign_id = c.id AND d.confirmed = 1
     WHERE c.slug = ?
     GROUP BY c.id`,[a])).rows[0]??null}async function v(a){return await d(),(await E(`SELECT * FROM announcements
     WHERE is_active = 1 AND start_at <= ? AND end_at >= ?
     ORDER BY start_at DESC`,[a,a])).rows}async function F(){return await d(),(await E("SELECT * FROM announcements ORDER BY created_at DESC")).rows}async function X(a){await d();let t=new Date().toISOString();await E("INSERT INTO announcements (title, title_bn, message, message_bn, start_at, end_at, is_active, created_at) VALUES (?, ?, ?, ?, ?, ?, 1, ?)",[a.title,a.titleBn??null,a.message,a.messageBn??null,a.startAt,a.endAt,t])}async function H(a){await d(),await E("UPDATE announcements SET is_active = 0 WHERE id = ?",[a])}async function B(a){await d(),await E("UPDATE announcements SET is_active = 1 WHERE id = ?",[a])}async function k(a){await d(),await E("DELETE FROM announcements WHERE id = ?",[a])}},4697:(a,t,e)=>{"use strict";e.r(t),e.d(t,{default:()=>i});var n=e(6621);let i=a=>[{type:"image/svg+xml",sizes:"any",url:(0,n.fillMetadataSegment)(".",a.params,"icon.svg")+"?8862ae84acf1e603"}]},7272:()=>{}};