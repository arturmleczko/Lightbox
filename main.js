const gallery = document.querySelectorAll(".gallery-img");
const windowWidth = window.innerWidth;
let lateOpenedImg;

gallery.forEach((image, index) => {
    image.addEventListener("click", () => {
        const imgUrl = newImgUrl(image);

        lateOpenedImg = index + 1;

        // CREATING A MODAL
        const modal = document.createElement("div");
        modal.classList.add("modal");
        document.body.appendChild(modal);
        modal.addEventListener("click", closeModal);

        const modalImg = document.createElement("img");
        modalImg.src = "img/" + imgUrl;
        modalImg.id = "current-img";
        modal.appendChild(modalImg);

        // ADDING NEXT AND PREV BUTTONS
        modalImg.onload = () => {
            const imgWidth = modalImg.offsetWidth;
            const calcImgtoEdge = ((windowWidth - imgWidth) / 2) - 150;
            
            nextBtn(calcImgtoEdge);
            prevBtn(calcImgtoEdge);
        }
    })
})

const newImgUrl = (image) => {
    const cssImgProperties = window.getComputedStyle(image);
    const fullImgUrl = cssImgProperties.getPropertyValue("background-image");
    const imgUrlPos = fullImgUrl.split("/img/thumbnails/");
    const imgUrl = imgUrlPos[1].replace('")', '');
    return imgUrl;
}

const closeModal = () => {
    document.querySelector(".modal").remove();
    document.querySelector(".next-btn").remove();
    document.querySelector(".prev-btn").remove();
}

const nextBtn = (calcImgtoEdge) => {
    const nextBtn = document.createElement("a");
    nextBtn.innerHTML = `<i class="fas fa-chevron-right"></i>`;
    nextBtn.classList.add("next-btn");
    nextBtn.addEventListener("click", () => changeImg(1));
    nextBtn.style.right = calcImgtoEdge + "px";
    document.body.appendChild(nextBtn);
}

const prevBtn = (calcImgtoEdge) => {
    const prevBtn = document.createElement("a");
    prevBtn.innerHTML = `<i class="fas fa-chevron-left"></i>`;
    prevBtn.classList.add("prev-btn");
    prevBtn.addEventListener("click", () => changeImg(0));
    prevBtn.style.left = calcImgtoEdge + "px";
    document.body.appendChild(prevBtn);
}

const changeImg = (changeDir) => {
    document.querySelector("#current-img").remove();

    const modal = document.querySelector(".modal");
    const modalImg = document.createElement("img");
    modal.appendChild(modalImg);

    let calcModalImg;

    if (changeDir === 1) {
        calcModalImg = lateOpenedImg + 1;
        if (calcModalImg > gallery.length) {
            calcModalImg = 1;
        }
    } else if (changeDir === 0) {
        calcModalImg = lateOpenedImg - 1;
        if (calcModalImg < 1) {
            calcModalImg = gallery.length;
        }
    }

    modalImg.src = "img/img" + calcModalImg + ".jpg";
    modalImg.id = "current-img";

    lateOpenedImg = calcModalImg;

    modalImg.onload = () => {
        const imgWidth = modalImg.offsetWidth;
        const calcImgtoEdge = ((windowWidth - imgWidth) / 2) - 150;

        const nextBtn = document.querySelector(".next-btn");
        nextBtn.style.right = calcImgtoEdge + "px";

        const prevBtn = document.querySelector(".prev-btn");
        prevBtn.style.left = calcImgtoEdge + "px";
    }
}
