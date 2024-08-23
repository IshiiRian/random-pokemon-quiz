<script>
    export let data;
    let imageUrl = data.initialImageUrl;
  
    const fetchImage = async () => {
      const res = await fetch("https://api.thecatapi.com/v1/images/search");
      const images = await res.json();
      imageUrl = images[0].url;
    };
  </script>
  
  <div class="container">
    <button on:click={fetchImage} class="top-left-button">
      別の猫画像を表示
    </button>
  
    {#if imageUrl}
      <img src={imageUrl} alt="猫の画像" class="cat-image" />
    {/if}
  </div>
  
  <style>
    /* ボタンを常に画面の左上に固定 */
    .top-left-button {
      position: fixed;
      top: 10px;
      left: 10px;
      padding: 10px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
  
    /* 画像を中央に配置 */
    .container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }
  
    .cat-image {
      max-width: 80%;
      max-height: 80%;
      border-radius: 10px;
    }
  </style>
  