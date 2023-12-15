import { fetchImages } from "./API/image-api";
import { createMarkup } from "./createMarkup/create-markup";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const form = document.querySelector(".search__form")
const gallery = document.querySelector(".gallery")
const loadMoreBtn = document.querySelector(".load-more__btn")
loadMoreBtn.style.display = "none"
let currentPage 
let searchParams
let lightbox 


form.addEventListener("submit", async (ev) => {
    ev.preventDefault()
    gallery.innerHTML = ""
    currentPage = 1
    searchParams = form.searchQuery.value
    try {
        const response = await fetchImages(searchParams, currentPage)
        Notiflix.Notify.success(`Hooray! We found ${response.totalHits} images.`)
        const cards = response.hits
        if (cards.length === 0) {
            Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
        }
        const cardsMass = createMarkup(cards)
        cardsMass.map(photoCard => {
            gallery.append(photoCard)
        })
            
            lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250 });
        if (gallery.children.length === response.totalHits) {
            Notiflix.Notify.info("We're sorry, but you've reached the end of search results.")
        } else {
            loadMoreBtn.style.display = "block"
        }
        
    }
    catch (error) {
        console.log(error)
    }
    
})

loadMoreBtn.addEventListener("click", async () => {
    currentPage++
    loadMoreBtn.style.display = "none"
    try {
        const response = await fetchImages(searchParams, currentPage)
        const cards = response.hits
        const cardsMass = createMarkup(cards)
        cardsMass.map(photoCard => {
            gallery.append(photoCard)
        })
        if (gallery.children.length === response.totalHits) {
            Notiflix.Notify.info("We're sorry, but you've reached the end of search results.")
        } else {
            loadMoreBtn.style.display = "block"
        }
        lightbox.refresh()
    }
    catch (error) {
        console.log(error)
    }
    
})

