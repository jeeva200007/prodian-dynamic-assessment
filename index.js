const toggle = document.querySelector(".toggle")
const elements = document.querySelectorAll('.link-elements')
const heroContent = document.querySelector('.hero-content'); 
const searchBtn = document.querySelector('.search-btn')

const dataArray = []

toggle.addEventListener('click', ()=> {
    elements.forEach(element => {
        if(element.classList.contains('active')){
            element.classList.remove('active')
        } else {
            element.classList.add('active')
        }
        
    });
    
})




async function getData() {
    try {
        const res = await fetch('data.json');
        if (!res.ok) {
            console.log('Response not found');
        }
        const someData = await res.json();
        if(someData){
            dataArray.push(someData.data)
        }

        someData.data.map((data, id) => {
            const card = document.createElement('div');
            card.classList.add('cards');
            card.setAttribute('data-aos', 'fade-up');
            card.innerHTML = `
                <div class="text-content" key = ${id}>
                    <h1>${data.title}</h1>
                    <h3>${data.subtitle}</h3>
                    <div class="btns">
                        <button>Download</button>
                        <button>Share</button>
                    </div>
                </div>
                <img src="${data.image}" alt="${data.title}">
            `;
            heroContent.appendChild(card);
        });
    } catch (error) {
        console.error(error);
    }
}
function getDisplayData(data){
    console.log(data)
    heroContent.innerHTML = ''
     data.map((item,id)=>{ 
        const card = document.createElement('div');
            card.classList.add('cards');
            card.setAttribute('data-aos', 'fade-up');
            card.innerHTML = `
                <div class="text-content" key = ${id}>
                    <h1>${item.title}</h1>
                    <h3>${item.subtitle}</h3>
                    <div class="btns">
                        <button>Download</button>
                        <button>Share</button>
                    </div>
                </div>
                <img src="${item.image}" alt="${data.title}">
            `;
            heroContent.appendChild(card);
    })
}
// console.log(dataArray)
function filterBlogs() {
    const input = document.querySelector('.input').value.toLowerCase()
    const filterValues = dataArray[0].filter(item => item.title.toLowerCase().includes(input) || item.subtitle.toLowerCase().includes(input) )
    getDisplayData(filterValues)
}

searchBtn.addEventListener('click', filterBlogs)



getData();