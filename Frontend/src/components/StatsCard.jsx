function StatsCard({ title, value, emoji }) {

return(

<div className="stats-card">

<h3>

{emoji} {title}

</h3>

<h1>

{value}

</h1>

</div>

);

}

export default StatsCard;