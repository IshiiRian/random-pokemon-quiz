<script>
	let imageUrl = "";
	let pokemonName = "";
	let userAnswer = "";
	let result = "";
	let isLoading = false;
	let userName = "";
	let isUserNameSet = false;
	let correctCount = 0;  // 正解数を管理
	let questionCount = 0;  // 問題数を管理
	const maxQuestions = 10;  // 最大問題数

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

	// ユーザー名を設定する関数
	const handleSetUserName = () => {
	  if (userName) {
		isUserNameSet = true;
		fetchPokemon();  // ユーザー名が設定された後にポケモンを取得
	  }
	};

	const checkAnswer = () => {
		if (userAnswer === pokemonName) {
			result = "正解!";
			correctCount += 1;  // 正解数を増加
		} else {
			result = `不正解。正しい名前は「${pokemonName}」です。`;
		}
		
	const showResultPage = () => {
    // 結果ページにスコアを渡して移動する処理
    sessionStorage.setItem('score', correctCount);
    window.location.href = '/result';  // 結果ページへの移動
	};
		
	questionCount += 1;

	if (questionCount >= maxQuestions) {
		// 結果ページへ移動
		showResultPage();
	}
	};

	const handleNextQuestion = () => {
	  fetchPokemon();
	};
</script>


<div class="container">
	{#if !isUserNameSet}
		<!-- ユーザー名を要求する画面 -->
		<p>ユーザー名を入力してください:</p>
		<input 
			type="text" 
			bind:value={userName} 
			placeholder="ユーザー名"
			class="input-box" 
		/>
		<button on:click={handleSetUserName} class="answer-button">
			スタート
		</button>
	{:else}
		<!-- クイズの画面 -->
		{#if isLoading}
			<div class="loading-container">
				<div class="spinner"></div>
				<p>Loading...</p>
			</div>
		{:else}
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
