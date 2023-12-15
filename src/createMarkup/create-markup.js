export function createMarkup(cards) {
    let cardsMass = [];
    for (const card of cards) {
        const photoCard = document.createElement("div")
        photoCard.setAttribute("class", "photo-card")
        photoCard.innerHTML = `
        <a class="gallery__link" href=${card.largeImageURL}>
        <img class="photo-card__image" src=${card.webformatURL} alt="${card.tags}" loading="lazy" width="300" height="200"/>
        <div class="info">
            <p class="info-item">
            <b>Likes</b><br />
            ${card.likes}
            </p>
            <p class="info-item">
            <b>Views</b><br />
            ${card.views}
            </p>
            <p class="info-item">
            <b>Comments</b><br />
            ${card.comments}
            </p>
            <p class="info-item">
            <b>Downloads</b><br />
            ${card.views}
            </p>
            </div>
            </a>
        `
        cardsMass.push(photoCard)
    }
    return cardsMass
}