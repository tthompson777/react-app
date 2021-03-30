export const loadPosts = async ()=> {
    // Imagens
    const photosResponse = fetch('https://jsonplaceholder.typicode.com/photos');

    // Posts
    const postsResponse = fetch('https://jsonplaceholder.typicode.com/posts');
    const [posts, photos] = await Promise.all([postsResponse, photosResponse]);
    const postsJson = await posts.json();
    const photosJson = await photos.json();

    const postsAndPhotos = postsJson.map((posts, index) => {
      return {...posts, cover: photosJson[index].url}
    });

    return postsAndPhotos;
}