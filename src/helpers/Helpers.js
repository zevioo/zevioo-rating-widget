import React from 'react'
import Aux from '../hoc/Aux'

export const percentage = (star, total)  => {
    return (star * 100) / total 
}

export const reviewBar = (val) => {
    if (val === 1 || (val > 0 && val < 1) ) {
        return (
            <span className="zevioo-box-1"></span>
        );
    } else if (val === 2 || (val > 2 && val < 3)) {
        return (
            <Aux>
            <span className="zevioo-box-2"></span>
            <span className="zevioo-box-2"></span>
            </Aux>

        );
    } else if (val === 3 || (val > 3 && val < 4)) {
        return (
        <Aux>
        <span className="zevioo-box-3"></span>
        <span className="zevioo-box-3"></span>
        <span className="zevioo-box-3"></span>
        </Aux>
        );
    } else if (val === 4 || (val > 4 && val < 5)) {
        return (
        <Aux>
        <span className="zevioo-box-4"></span>
        <span className="zevioo-box-4"></span>
        <span className="zevioo-box-4"></span>
        <span className="zevioo-box-4"></span>
        </Aux>
        );
    
    } else if (val === 5) {
        return (
        <Aux>
        <span className="zevioo-box-5"></span>
        <span className="zevioo-box-5"></span>
        <span className="zevioo-box-5"></span>
        <span className="zevioo-box-5"></span>
        <span className="zevioo-box-5"></span>
        </Aux>
        );

    } else {
        return "";
    }

}

export const filterReview = (filter)  => {
       return (review) => review.RT === filter
}



export const hasClass = (el, className) => {
    if (el.classList)
        return el.classList.contains(className)
    else
        return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
}
export const addClass = (el, className) => {
    if (el.classList)
        el.classList.add(className)
    else if (!hasClass(el, className)) el.className += " " + className
}
export const removeClass = (el, className) => {
    if (el.classList)
        el.classList.remove(className)
    else if (hasClass(el, className)) {
        var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
        el.className=el.className.replace(reg, ' ')
    }
}


export const userStarRating = () => {
    let star1 = document.getElementById("star-input-1");
    let star2 = document.getElementById("star-input-2");
    let star3 = document.getElementById("star-input-3");
    let star4 = document.getElementById("star-input-4");
    let star5 = document.getElementById("star-input-5");
    
    star1.addEventListener('click', function() {
        addClass(star1, "star-choosen");
        removeClass(star2, "star-choosen");
        removeClass(star3, "star-choosen");
        removeClass(star4, "star-choosen");
        removeClass(star5, "star-choosen");

        star1.style.color = 'red';
        star2.style.color = '#ededed';
        star3.style.color = '#ededed';
        star4.style.color = '#ededed';
        star5.style.color = '#ededed';
    })
    star2.addEventListener('click', function() {
        addClass(star2, "star-choosen");
        removeClass(star1, "star-choosen");
        removeClass(star3, "star-choosen");
        removeClass(star4, "star-choosen");
        removeClass(star5, "star-choosen");

        star1.style.color = '#f26236';
        star2.style.color = '#f26236';
        star3.style.color = '#ededed';
        star4.style.color = '#ededed';
        star5.style.color = '#ededed';
    })
    star3.addEventListener('click', function() {
        addClass(star3, "star-choosen");
        removeClass(star2, "star-choosen");
        removeClass(star1, "star-choosen");
        removeClass(star4, "star-choosen");
        removeClass(star5, "star-choosen");

        star1.style.color = '#faa332';
        star2.style.color = '#faa332';
        star3.style.color = '#faa332';
        star4.style.color = '#ededed';
        star5.style.color = '#ededed';
    })
    star4.addEventListener('click', function() {
        addClass(star4, "star-choosen");
        removeClass(star2, "star-choosen");
        removeClass(star3, "star-choosen");
        removeClass(star1, "star-choosen");
        removeClass(star5, "star-choosen");

        star1.style.color = '#afd344';
        star2.style.color = '#afd344';
        star3.style.color = '#afd344';
        star4.style.color = '#afd344';
        star5.style.color = '#ededed';
    })
    star5.addEventListener('click', function() {
        addClass(star5, "star-choosen");
        removeClass(star2, "star-choosen");
        removeClass(star3, "star-choosen");
        removeClass(star4, "star-choosen");
        removeClass(star1, "star-choosen");

        star1.style.color = '#52b952';
        star2.style.color = '#52b952';
        star3.style.color = '#52b952';
        star4.style.color = '#52b952';
        star5.style.color = '#52b952';
    })
}
export const userQualityRating = () => {
    let box1 = document.getElementById("quality-input-1");
    let box2 = document.getElementById("quality-input-2");
    let box3 = document.getElementById("quality-input-3");
    let box4 = document.getElementById("quality-input-4");
    let box5 = document.getElementById("quality-input-5");

    // Givin Default Background Color
    box1.style.color = 'var(--zeviooColor)';
    box2.style.color = 'var(--zeviooColor)';
    box3.style.color = 'var(--zeviooColor)';
    box4.style.color = 'var(--zeviooColor)';
    box5.style.color = 'var(--zeviooColor)';
    
    box1.addEventListener('click', function() {
        addClass(box1, "quality-choosen");
        removeClass(box2, "quality-choosen");
        removeClass(box3, "quality-choosen");
        removeClass(box4, "quality-choosen");
        removeClass(box5, "quality-choosen");

        box1.style.color = 'var(--rating1)';
        box2.style.color = 'var(--gray)';
        box3.style.color = 'var(--gray)';
        box4.style.color = 'var(--gray)';
        box5.style.color = 'var(--gray)';
    })
    box2.addEventListener('click', function() {
        addClass(box2, "quality-choosen");
        removeClass(box1, "quality-choosen");
        removeClass(box3, "quality-choosen");
        removeClass(box4, "quality-choosen");
        removeClass(box5, "quality-choosen");

        box1.style.color = 'var(--rating2)';
        box2.style.color = 'var(--rating2)';
        box3.style.color = 'var(--gray)';
        box4.style.color = 'var(--gray)';
        box5.style.color = 'var(--gray)';
    })
    box3.addEventListener('click', function() {
        addClass(box3, "quality-choosen");
        removeClass(box2, "quality-choosen");
        removeClass(box1, "quality-choosen");
        removeClass(box4, "quality-choosen");
        removeClass(box5, "quality-choosen");

        box1.style.color = 'var(--rating3)';
        box2.style.color = 'var(--rating3)';
        box3.style.color = 'var(--rating3)';
        box4.style.color = 'var(--gray)';
        box5.style.color = 'var(--gray)';
    })
    box4.addEventListener('click', function() {
        addClass(box4, "quality-choosen");
        removeClass(box2, "quality-choosen");
        removeClass(box3, "quality-choosen");
        removeClass(box1, "quality-choosen");
        removeClass(box5, "quality-choosen");

        box1.style.color = 'var(--rating4)';
        box2.style.color = 'var(--rating4)';
        box3.style.color = 'var(--rating4)';
        box4.style.color = 'var(--rating4)';
        box5.style.color = 'var(--gray)';
    })
    box5.addEventListener('click', function() {
        addClass(box5, "quality-choosen");
        removeClass(box2, "quality-choosen");
        removeClass(box3, "quality-choosen");
        removeClass(box4, "quality-choosen");
        removeClass(box1, "quality-choosen");

        box1.style.color = 'var(--rating5)';
        box2.style.color = 'var(--rating5)';
        box3.style.color = 'var(--rating5)';
        box4.style.color = 'var(--rating5)';
        box5.style.color = 'var(--rating5)';
    })
}
export const userValueRating = () => {
    let box1 = document.getElementById("value-input-1");
    let box2 = document.getElementById("value-input-2");
    let box3 = document.getElementById("value-input-3");
    let box4 = document.getElementById("value-input-4");
    let box5 = document.getElementById("value-input-5");

    // Givin Default Background Color
    box1.style.color = 'var(--zeviooColor)';
    box2.style.color = 'var(--zeviooColor)';
    box3.style.color = 'var(--zeviooColor)';
    box4.style.color = 'var(--zeviooColor)';
    box5.style.color = 'var(--zeviooColor)';
    
    box1.addEventListener('click', function() {
        addClass(box1, "value-choosen");
        removeClass(box2, "value-choosen");
        removeClass(box3, "value-choosen");
        removeClass(box4, "value-choosen");
        removeClass(box5, "value-choosen");

        box1.style.color = 'var(--rating1)';
        box2.style.color = 'var(--gray)';
        box3.style.color = 'var(--gray)';
        box4.style.color = 'var(--gray)';
        box5.style.color = 'var(--gray)';
    })
    box2.addEventListener('click', function() {
        addClass(box2, "value-choosen");
        removeClass(box1, "value-choosen");
        removeClass(box3, "value-choosen");
        removeClass(box4, "value-choosen");
        removeClass(box5, "value-choosen");

        box1.style.color = 'var(--rating2)';
        box2.style.color = 'var(--rating2)';
        box3.style.color = 'var(--gray)';
        box4.style.color = 'var(--gray)';
        box5.style.color = 'var(--gray)';
    })
    box3.addEventListener('click', function() {
        addClass(box3, "value-choosen");
        removeClass(box2, "value-choosen");
        removeClass(box1, "value-choosen");
        removeClass(box4, "value-choosen");
        removeClass(box5, "value-choosen");

        box1.style.color = 'var(--rating3)';
        box2.style.color = 'var(--rating3)';
        box3.style.color = 'var(--rating3)';
        box4.style.color = 'var(--gray)';
        box5.style.color = 'var(--gray)';
    })
    box4.addEventListener('click', function() {
        addClass(box4, "value-choosen");
        removeClass(box2, "value-choosen");
        removeClass(box3, "value-choosen");
        removeClass(box1, "value-choosen");
        removeClass(box5, "value-choosen");

        box1.style.color = 'var(--rating4)';
        box2.style.color = 'var(--rating4)';
        box3.style.color = 'var(--rating4)';
        box4.style.color = 'var(--rating4)';
        box5.style.color = 'var(--gray)';
    })
    box5.addEventListener('click', function() {
        addClass(box5, "value-choosen");
        removeClass(box2, "value-choosen");
        removeClass(box3, "value-choosen");
        removeClass(box4, "value-choosen");
        removeClass(box1, "value-choosen");

        box1.style.color = 'var(--rating5)';
        box2.style.color = 'var(--rating5)';
        box3.style.color = 'var(--rating5)';
        box4.style.color = 'var(--rating5)';
        box5.style.color = 'var(--rating5)';
    })
}