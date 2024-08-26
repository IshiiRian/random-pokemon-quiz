<script>
	let imageUrl = "";
	let pokemonName = "";
	let userAnswer = "";
	let result = "";
	let isLoading = false;
  
	const fetchPokemon = async () => {
	  isLoading = true;
	  const randomId = Math.floor(Math.random() * 898) + 1;
	  
	  // ポケモンの基本データを取得
	  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
	  const data = await res.json();
	  imageUrl = data.sprites.front_default;
	  
	  // ポケモンの日本語名を取得
	  const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${randomId}`);
	  const speciesData = await speciesRes.json();
	  const japaneseName = speciesData.names.find(name => name.language.name === "ja");
	  pokemonName = japaneseName.name;
	  
	  userAnswer = "";
	  result = "";
	  isLoading = false;
	};
  
	const checkAnswer = () => {
	  if (userAnswer === pokemonName) {
		result = "正解!";
	  } else {
		result = `不正解。正しい名前は「${pokemonName}」です。`;
	  }
	};
  
	const handleFetchPokemon = () => {
	  fetchPokemon();
	};
	
	const handleNextQuestion = () => {
	  fetchPokemon();
	};
  
	// 初期ポケモンの取得
	fetchPokemon();
</script>

<div class="container">
	{#if isLoading}
		<div class="loading-container">
			<div class="spinner"></div>
			<p>Loading...</p>
		</div>
	{/if}
	
	{#if !isLoading}
		{#if imageUrl}
			<img src={imageUrl} alt="ポケモンの画像" class="pokemon-image" />
		{/if}

		{#if !result}
			<input 
				type="text" 
				bind:value={userAnswer} 
				placeholder="ポケモンの名前を入力" 
				class="input-box" 
			/>
			<button on:click={checkAnswer} class="answer-button">
				回答
			</button>
		{/if}
	  
		{#if result}
			<p class="result">{result}</p>
			<button on:click={handleNextQuestion} class="next-button">
				次の問題
			</button>
		{/if}
	{/if}
</div>

<style>
	/* 画像を中央に配置 */
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
		background-color: #333;
		color: white;
		text-align: center;
	}
	
	.pokemon-image {
		max-width: 80%;
		min-width: 20%;
		max-height:80%;
		min-height:20%;
		border-radius: 30px;
	}
	
	.input-box {
		margin: 10px;
		padding: 5px;
		border-radius: 5px;
		border: 1px solid #ccc;
	}
  
	.loading-container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
  
	.spinner {
		border: 8px solid #f3f3f3;
		border-radius: 50%;
		border-top: 8px solid #007bff;
		width: 40px;
		height: 40px;
		animation: spin 1s linear infinite;
	}
  
	@keyframes spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}
	
	.result {
		font-size: 1.2em;
		margin: 10px;
	}
</style>
