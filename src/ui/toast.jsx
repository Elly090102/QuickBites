import { createContext, useContext, useState } from "react";

const ToastCtx = createContext({ show: ()=>{} });

export function ToastProvider({children}){
  const [msg, setMsg] = useState(null);
  const show = (text, ms=1600)=>{ setMsg(text); setTimeout(()=>setMsg(null), ms); };
  return (
    <ToastCtx.Provider value={{show}}>
      {children}
      {msg && (
        <div style={{
          position:"fixed", left:"50%", bottom:24, transform:"translateX(-50%)",
          background:"linear-gradient(180deg, var(--brand), #34d399)",
          color:"#062b23", padding:"10px 14px", borderRadius:12, boxShadow:"var(--shadow)", fontWeight:800
        }}>{msg}</div>
      )}
    </ToastCtx.Provider>
  );
}
export function useToast(){ return useContext(ToastCtx); }
