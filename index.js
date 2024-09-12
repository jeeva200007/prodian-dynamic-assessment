
const toggle = document.querySelector(".toggle")
const elements = document.querySelectorAll('.link-elements')
const heroContent = document.querySelector('.hero-content'); 


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



getData();