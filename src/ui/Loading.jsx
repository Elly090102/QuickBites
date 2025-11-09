export function CardSkeleton(){
  return (
    <div className="card">
      <div style={{height:170, background:"#ffffff10"}} />
      <div className="body">
        <div className="skeleton" style={{"--h":"18px"}} />
        <div style={{height:10}} />
        <div className="skeleton" style={{width:"60%"}} />
      </div>
    </div>
  );
}
