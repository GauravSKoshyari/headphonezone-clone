function elements_in_a_slide(viewport_width) {
    if (viewport_width < 640) {
        return 2;
    }
    else if (viewport_width < 768) {
        return 3;
    }
    else if (viewport_width < 1280) {
        return 4;
    }
    else {
        return 5;
    }
}

document.addEventListener("DOMContentLoaded", () => {


    // chart toppping headphones slider 

    const ELS = (sel, par) => (par || document).querySelectorAll(sel);
    const EL = (sel, par) => (par || document).querySelector(sel);
    const mod = (n, m) => (n % m + m) % m;
    // -1%4=-1  in js 
    // next : (1,4) ->1 ; (2,4) ->2 ; (3,4) ->3 ; (4,4) ->0  
    // prev :  (-1,4) ->3 ; (2,4) ->2 ; (1,4) ->1 ; (0,4) ->0  

    ELS(".chart-topping .products").forEach(products => {


        const prod_slider = EL(".trending-prods", products);
        const items = ELS(".prod", products);
        let c = 0;


        const anim = () => prod_slider.style.transform = `translateX(-${c * 100}%)`;
        const prev = () => {
            const total_slides = Math.ceil(items.length / elements_in_a_slide(window.innerWidth));

            c = mod(c - 1, total_slides);
            // (-1,4) ->3 ; when u r at first slide(c was 0 ) and click on prev , u will be slided by -300%

            anim();

        };
        const next = () => {
            const tot_slides = Math.ceil(items.length / elements_in_a_slide(window.innerWidth));
            c = mod(c + 1, tot_slides);
            // eg tot_slides = 4 


            anim();

        }

        EL(".prev", products).addEventListener("click", prev);
        EL(".next", products).addEventListener("click", next);
    });

    // ============================


    //IMAGE SLIDER

    let slides = document.querySelectorAll(".img-slider .images .image")
    let thumbs = document.querySelectorAll(".slider-tool > div")

    let thumb_fills = document.querySelectorAll(".fill")

    //for text animation in image 
    let headings = document.querySelectorAll(".img-slider .images .img-detail h1")
    let ps = document.querySelectorAll(".img-slider .images .img-detail .para")
    let slider_buttons = document.querySelectorAll(".img-slider .images button")
    let img_details = document.querySelectorAll(".img-slider .images .img-detail")


    headings[2].classList.add("animate-[moveup_.5s_ease-in_1]")
    ps[2].classList.add("animate-[moveup_.1s_ease-in_.5s_1,opacity0_.5s]")
    slider_buttons[2].classList.add("animate-[moveup_.2s_ease-in_.6s_1,opacity0_.6s]")


    document.querySelector(".fill").style.width = "100%";



    thumbs.forEach(thumb => {

        thumb.addEventListener("click", () => {

            // finding active slide 
            let active_slide = Array.from(slides).filter((slide) => {
                return slide.dataset.active == "true"
            })
            let active_slide_index = 3 - active_slide[0].id.slice(-1)

            slides.forEach(slide => {
                if (thumb.id.slice(-1) == slide.id.slice(-1)) {
                    // when u click on a thumb , if a  corresponding slide is not acitve 
                    if (slide.dataset.active !== "true") {

                        slide.classList.remove("anim-not-on-target")
                        slide.classList.add("anim-on-targt")
                        slide.dataset.active = "true"
                    }
                }
                else {
                    // not corresponding slide , but is active , means it was active earlier before clicking 

                    if (slide.dataset.active !== "false") {

                        slide.classList.remove("anim-on-targt")
                        slide.classList.add("anim-not-on-target")
                        slide.dataset.active = "false"
                    }

                }
            })
            // text animation in image slider

            let upcoming_slide_index = 3 - parseInt(thumb.id.slice(-1))
            for (let index = 0; index < 3; index++) {
                if (active_slide_index !== upcoming_slide_index) {
                    if (upcoming_slide_index == index) {

                        img_details[index].classList.add("animate-[opacity0_.8s]")
                        // it is taking .7s to complete sliding  , till then hide img_details

                        setTimeout(() => {
                            headings[upcoming_slide_index].classList.add("animate-[moveup_.5s_ease-in_1]")
                            ps[upcoming_slide_index].classList.add("animate-[moveup_.1s_ease-in_.5s_1,opacity0_.5s]")
                            slider_buttons[upcoming_slide_index].classList.add("animate-[moveup_.2s_ease-in_.6s_1,opacity0_.6s]")
                        }, 700)

                    }
                    else {


                        headings[index].classList.remove("animate-[moveup_.5s_ease-in_1]")
                        ps[index].classList.remove("animate-[moveup_.1s_ease-in_.5s_1,opacity0_.5s]")
                        slider_buttons[index].classList.remove("animate-[moveup_.2s_ease-in_.6s_1,opacity0_.6s]")

                        img_details[index].classList.remove("animate-[opacity0_.8s]")

                    }

                }
            }

            //increasing width of slider tool
            let exceptIndex = parseInt(thumb.id.slice(-1)) - 1
            const filteredfills = Array.from(thumb_fills).filter((value, index) => exceptIndex !== index);
            filteredfills.forEach(filteredthumb => {
                filteredthumb.classList.remove("transition-[width]", "duration-[18000ms]")
                filteredthumb.style.width = 0;
            })

            thumb.querySelector(".fill").classList.add("transition-[width]", "duration-[18000ms]")
            thumb.querySelector(".fill").style.width = "100%";






        })
    });

    let i = 1
    let intervalID = setInterval(function () {
        thumbs[i].click();
        i++;
        if (i == 3) {
            i = 0
        }
    }, 16000);



    //QUOTES SLIDER
    var slideIndex = 1;

    var dots = document.getElementsByClassName("dot");
    var prev_btn = document.getElementsByClassName("prev-button");
    var next_btn = document.getElementsByClassName("next-button");
    var quotes_slides = document.getElementsByClassName("text-area");

    function showSlides(n) {
        var i;
        if (n > quotes_slides.length) { slideIndex = 1 }
        if (n < 1) { slideIndex = quotes_slides.length }
        for (i = 0; i < quotes_slides.length; i++) {
            quotes_slides[i].style.display = "none";

        }
        for (i = 0; i < dots.length; i++) {
            dots[i].classList.remove("bg-black")
            dots[i].classList.add("bg-gray-500")

        }
        quotes_slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].classList.add("bg-black")
        dots[slideIndex - 1].classList.remove("bg-gray-500")

    }


    for (let j = 0; j < dots.length; j++) {
        dots[j].addEventListener("click", () => {
            showSlides(slideIndex = j + 1)
        })
    }

    prev_btn[0].addEventListener("click", () => {
        showSlides(slideIndex -= 1)
    })
    next_btn[0].addEventListener("click", () => {
        showSlides(slideIndex += 1)
    })








})





window.addEventListener("resize", (e) => {
    document.querySelector(".chart-topping .trending-prods").style.transform = `translateX(0)`;
})

