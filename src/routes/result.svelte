<script>
    let score = sessionStorage.getItem('score');
    let ranking = [];
  
    const fetchRanking = async () => {
      const res = await fetch('https://your-backend-url.com/api/scores');
      ranking = await res.json();
    };
  
    onMount(fetchRanking);
  </script>
  
  <div>
    <h1>{userName}さんのスコア: {score}</h1>
    <h2>ランキング:</h2>
    <ul>
      {#each ranking as rank}
        <li>{rank.userName}: {rank.score}点</li>
      {/each}
    </ul>
  </div>
  