import { spawn } from 'node:child_process';
import { mkdtemp, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
const baseURL=process.env.BASE_URL || "http://localhost:3100";
const profile=await mkdtemp('/tmp/eshana-security-');
const chrome=spawn(process.env.CHROME_BIN || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',['--headless=new','--disable-gpu','--no-first-run','--no-default-browser-check','--remote-debugging-port=0',`--user-data-dir=${profile}`,'about:blank'],{stdio:['ignore','ignore','pipe']});
let ws;
try {
  const endpoint=await new Promise((resolve,reject)=>{let output='';const timer=setTimeout(()=>reject(new Error('Chrome timeout')),20000);chrome.stderr.on('data',chunk=>{output+=chunk;const m=output.match(/DevTools listening on (ws:\/\/[^\s]+)/);if(m){clearTimeout(timer);resolve(m[1]);}});});
  ws=new WebSocket(endpoint);await new Promise((resolve,reject)=>{ws.onopen=resolve;ws.onerror=reject;});
  let id=0;const pending=new Map();
  ws.onmessage=event=>{const m=JSON.parse(event.data);if(pending.has(m.id)){const p=pending.get(m.id);pending.delete(m.id);if(m.error){p.reject(m.error);}else{p.resolve(m.result);}}};
  const send=(method,params={},sessionId)=>new Promise((resolve,reject)=>{const n=++id;pending.set(n,{resolve,reject});ws.send(JSON.stringify({id:n,method,params,sessionId}));});
  const {targetId}=await send('Target.createTarget',{url:'about:blank'});
  const {sessionId}=await send('Target.attachToTarget',{targetId,flatten:true});
  const cdp=(method,params)=>send(method,params,sessionId);
  await cdp('Page.enable');await cdp('Runtime.enable');
  const evaluate=async expression=>{const r=await cdp('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw new Error(JSON.stringify(r.exceptionDetails));return r.result.value;};
  const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
  const navigate=async path=>{await cdp('Page.navigate',{url:baseURL+path});let ready=false;for(let n=0;n<100;n++){ready=await evaluate(`location.pathname+location.search===${JSON.stringify(path)} && document.readyState==='complete' && !!document.querySelector('main h1')`);if(ready)break;await sleep(100);}assert(ready);await sleep(400);};
  const shot=async name=>{const s=await cdp('Page.captureScreenshot',{format:'png'});await writeFile(`/tmp/eshana-security-${name}.png`,Buffer.from(s.data,'base64'));};

  await cdp('Page.addScriptToEvaluateOnNewDocument',{source:`window.__violations=[];window.addEventListener('securitypolicyviolation',e=>window.__violations.push({directive:e.effectiveDirective,blocked:e.blockedURI}));`});
  const paths=['/','/services','/services/ai-initiative-gate','/work','/work/triagezero','/work/aec-quality-workflow','/about','/insights','/quality-audit','/contact?service=ai-initiative-gate'];
  for(const width of [1440,390]) {
    await cdp('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:false});
    for(const path of paths) {
      await navigate(path);
      assert.equal(await evaluate(`document.documentElement.scrollWidth>innerWidth`),false,path);
      assert.deepEqual(await evaluate(`window.__violations`),[],path);
      assert.equal(await evaluate(`Array.from(document.scripts).filter(s=>!s.src).every(s=>!!s.nonce)`),true,path);
      if(path.startsWith('/contact')) {
        assert.equal(await evaluate(`document.querySelector('[name="service"]:checked')?.value`),'AI Initiative Gate');
        await evaluate(`document.querySelector('form').noValidate=true;document.querySelector('button[type="submit"]').click()`);
        let done=false;
        for(let n=0;n<100;n++){done=await evaluate(`!!document.querySelector('#name-error') && document.querySelector('form').getAttribute('aria-busy')==='false'`);if(done)break;await sleep(100);}
        assert(done,'server action validation works under CSP');
        assert.deepEqual(await evaluate(`window.__violations`),[]);
      }
    }
    await navigate('/');
    if(width===390) {
      await evaluate(`document.querySelector('header summary').click()`);
      assert.equal(await evaluate(`document.querySelector('header details').open`),true);
    }
    await evaluate(`document.querySelector('a[href="/services"]').click()`);
    for(let n=0;n<100;n++){if(await evaluate(`location.pathname==='/services'`))break;await sleep(100);}
    await sleep(250);
    assert.equal(await evaluate(`location.pathname`),'/services');
    assert.deepEqual(await evaluate(`window.__violations`),[]);
    await shot('services-'+width);
    console.log(JSON.stringify({width,routes:paths.length,cspViolations:0,hydration:true,serverValidation:true,overflow:false}));
  }
  const first=await fetch(baseURL+'/contact');
  const csp=first.headers.get('content-security-policy');
  assert(csp && !csp.includes('unsafe-eval') && !/script-src[^;]*unsafe-inline/.test(csp));
  for(const key of ['x-content-type-options','x-frame-options','referrer-policy','permissions-policy'])assert(first.headers.has(key),key);
  assert.equal(first.headers.has('x-powered-by'),false);
  const nonce=csp.match(/'nonce-([^']+)'/)[1];
  const second=await fetch(baseURL+'/contact',{headers:{'x-nonce':'attacker-nonce','Content-Security-Policy':"script-src 'unsafe-inline'"}});
  const secondCsp=second.headers.get('content-security-policy');
  assert(!secondCsp.includes(nonce));assert(!secondCsp.includes('attacker-nonce'));
  for(const method of ['PUT','PATCH','DELETE']) {
    assert.equal((await fetch(baseURL+'/contact',{method})).status,405);
  }
  for(const path of ['/admin','/api/inquiries'])assert.equal((await fetch(baseURL+path)).status,404);
  const { readFile } = await import('node:fs/promises');
  const manifest=JSON.parse(await readFile('.next/server/server-reference-manifest.json','utf8'));
  const action=Object.entries(manifest.node).find(([,entry])=>entry.exportedName==='submitContactForm')[0];
  const origin=new URL(baseURL).origin;
  const crossOrigin=await fetch(baseURL+'/contact',{method:'POST',headers:{'Next-Action':action,Origin:'https://untrusted.example','Content-Type':'text/plain'},body:'[null,null]'});
  assert(crossOrigin.status>=400,'cross-origin action denied');
  const oversized=await fetch(baseURL+'/contact',{method:'POST',headers:{'Next-Action':action,Origin:origin,'Content-Type':'text/plain'},body:JSON.stringify([null,'x'.repeat(70000)])});
  assert(oversized.status>=400,'oversized action denied');
  for(const response of [crossOrigin,oversized]) {
    const body=await response.text();
    assert(!body.includes('SUPABASE_SERVICE_ROLE_KEY') && !body.includes('node_modules/') && !body.includes('at submitContactForm'));
  }
  console.log('PASS: production headers, fresh server nonces, unsupported methods, and absent admin/API routes.');
}catch(e){console.error(e);process.exitCode=1;}finally{ws?.close();chrome.kill('SIGTERM');setTimeout(()=>process.exit(process.exitCode || 0),1000);}
