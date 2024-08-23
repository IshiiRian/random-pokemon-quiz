export async function load() {
    const res = await fetch("https://api.thecatapi.com/v1/images/search");
    const images = await res.json();
    
    return {
      initialImageUrl: images[0].url,
    };
  }