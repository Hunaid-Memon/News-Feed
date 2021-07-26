const filter = document.getElementById('filter');
const newsFeed = document.getElementById('news-feed-container');
const loader = document.getElementById('loader');

let limit = 5;
let page = 1;

async function fetchPosts(){
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
    const data = await res.json();
    // console.log(data);

    return data;
}

async function renderPosts(){
    const posts = await fetchPosts();
    posts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');
        postDiv.innerHTML = `
                <div class="post-id">${post.id}</div>
                    <div class="post-content">
                        <h2 class="post-title">${post.title}</h2>
                        <p class="post-body">${post.body}</p>
                </div>
        `
        newsFeed.appendChild(postDiv)
    });
}

function showLoader(){
    loader.classList.add('show');
    page++;
    renderPosts();
    loader.classList.remove('show')
}

renderPosts()

window.addEventListener('scroll', () => {
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
    // console.log(scrollTop,scrollHeight, clientHeight);
    if(scrollTop + clientHeight >= scrollHeight -1 ){
        showLoader();
    }
})

filter.addEventListener('input', (e) =>{
    const searchValue = e.target.value.toLowerCase();
    // console.log(searchValue);
    const posts = document.querySelectorAll('.post');
    posts.forEach(post => {
        const title = document.querySelector('.post-title').innerText;
        const body = document.querySelector('.post-body').innerText;
        // console.log(searchValue.indexOf(searchValue));
        if(title.indexOf(searchValue) >= 0 || body.indexOf(searchValue) >= 0){
            post.style.display = 'flex'
        }else{
            post.style.display = 'none'
        }
    })

})