const loadPhones = async(searchText, limit) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url)
    const data = await res.json()
    displayPhones(data.data, limit)
}

const displayPhones = (phones, limit) => {
    const phonesContainer = document.getElementById('phone-container')
    phonesContainer.textContent = ''
  
    const noPhones = document.getElementById('no-phone-message')
    if (phones.length === 0) {
      noPhones.classList.remove('d-none')
    } else {
      noPhones.classList.add('d-none')
    }
  
    const showAllBtn = document.getElementById('show-all')
    if (phones.length > limit) {
      phones = phones.slice(0, limit)
      showAllBtn.classList.remove('d-none')
    } else {
      showAllBtn.classList.add('d-none')
    }
  
    phones.forEach((phone) => {
      const phoneDiv = document.createElement('div')
      phoneDiv.classList.add('col')
      phoneDiv.innerHTML = `
        <div class="card h-100 p-4">
          <img src="${phone.image}" class="card-img-top img-fluid" alt="...">
          <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneModal-${phone.slug}">
              See Phone Details
            </button>
          </div>
        </div>
      `
      phonesContainer.appendChild(phoneDiv)
  
      // Add modal markup for phone details
      const modalDiv = document.createElement('div')
      modalDiv.classList.add('modal', 'fade')
      modalDiv.id = `phoneModal-${phone.slug}`
      modalDiv.setAttribute('tabindex', '-1')
      modalDiv.setAttribute('aria-labelledby', `phoneModal-${phone.slug}-label`)
      modalDiv.setAttribute('aria-hidden', 'true')
      modalDiv.innerHTML = `
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="phoneModal-${phone.slug}-label">${phone.phone_name}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <img src="${phone.image}" class="img-fluid mb-3" alt="">
              <p>${phone.description}</p>
              <ul>
                <li>Brand: ${phone.brand_name}</li>
                <li>Color: ${phone.color}</li>
                <li>Price: ${phone.price}</li>
              </ul>
            </div>
          </div>
        </div>
      `
      document.body.appendChild(modalDiv)
    })
  
    spinnerVisibility(false)
}
  

document.getElementById('btn-search').addEventListener('click', function(){
    renderSearch(6)
})

const spinnerVisibility = dataLoading => {
    const loaderSection = document.getElementById('loader')
    if(dataLoading === false){
        loaderSection.classList.add('d-none')
    }
    else{
        loaderSection.classList.remove('d-none')
    }
}

document.getElementById('show-all').addEventListener('click', function(){
    renderSearch()
})

function renderSearch(limit){
    spinnerVisibility(true)

    const searchField = document.getElementById('search-field')
    const searchValue = searchField.value

    loadPhones(searchValue, limit)
}



document.getElementById('search-field').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      renderSearch(6)
    }
})
  


const loadPhoneDetails = async id =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url)
    const data = await res.json()
    console.log(data.data)
}
