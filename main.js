const menuIcon=document.querySelector('.menuIcon');
const backdrop=document.querySelector('.backdrop');
const navItems=document.querySelector('.navItems');
const closeIcon=document.querySelector('.closeIcon');


//NavBar Logic
menuIcon.addEventListener("click",() =>{
    navItems.classList.add("active");
    backdrop.classList.add("active");
});
closeIcon.addEventListener("click", () => {
    backdrop.classList.remove("active");
    navItems.classList.remove("active");
});
backdrop.addEventListener("click", () => {
   backdrop.classList.remove("active");
   navItems.classList.remove("active");
});

//Gallery Logic
const mainImgs=document.querySelectorAll('.default .mainImg img');
const thumbList=document.querySelectorAll('.default .thumbList div');

const changeImage = (index,mainImgs,thumbList)=>{
    mainImgs.forEach((img)=>{
        img.classList.remove('active')
    });
    thumbList.forEach((thumb)=>{
        thumb.classList.remove('active');
    });
    mainImgs[index].classList.add('active');
    thumbList[index].classList.add('active');
    currentIdx=index;
};
thumbList.forEach((thumb,index)=>{
    thumb.addEventListener('click',()=>{
        changeImage(index,mainImgs,thumbList);
    });
});

//LightBox
const lightBox=document.querySelector('.lightBox');
const lightBoxMainImgs=document.querySelectorAll('.lightBox .mainImg img');
const lightBoxThumbList=document.querySelectorAll('.lightBox .thumbList div');
const iconClose=document.querySelector('.iconClose');
const iconNext=document.querySelector('.iconNext');
const iconPrev=document.querySelector('.iconPrev');
let currentIdx=0;

lightBoxThumbList.forEach((thumb,index)=>{
    thumb.addEventListener('click',()=>{
        changeImage(index,lightBoxMainImgs,lightBoxThumbList);
    });
});

mainImgs.forEach((img,index)=>{
    img.addEventListener('click',()=>{
        lightBox.classList.add('active');
        changeImage(index,lightBoxMainImgs,lightBoxThumbList);
    });
});

iconPrev.addEventListener('click',()=>{
    if(currentIdx<=0){
        changeImage(mainImgs.length-1,lightBoxMainImgs,lightBoxThumbList);        
    }
    else{
        changeImage(currentIdx-1,lightBoxMainImgs,lightBoxThumbList);
    }
});
iconNext.addEventListener('click',()=>{
    if(currentIdx>=mainImgs.length-1){
        changeImage(0,lightBoxMainImgs,lightBoxThumbList);
    }
    else{
        changeImage(currentIdx+1,lightBoxMainImgs,lightBoxThumbList);
    }
});
iconClose.addEventListener('click',()=>{
    lightBox.classList.remove('active');
});

//Cart logic
const countEl=document.querySelector('.count');
const minus=document.querySelector('.minus');
const plus=document.querySelector('.plus');
const cartIcon=document.querySelector('.cartIcon');
const cartContainer=document.querySelector('.cartContainer')
const cartCount=document.querySelector('.cartCount');
const addToCartBtn=document.querySelector('.addToCartBtn');
const cartItems = document.querySelector('.cartItems')
const checkout=document.querySelector('.checkout')
let count=0;
let totalQuantity=0;
const updateCount=(newCount)=>{
    count=newCount;
    countEl.textContent=count;
};
minus.addEventListener('click',()=>{
    if(count>0){
        updateCount(count-1);
    }
});
plus.addEventListener('click',()=>{
    updateCount(count+1);
});
cartIcon.addEventListener('click',()=>{
    cartContainer.classList.toggle('active');
});
// cartCount.addEventListener('click',()=>{
//     cartContainer.classList.toggle('active');
// });

const updateTotalQuantity=()=>{
    const cartItemList=document.querySelectorAll('.cartItem');
    totalQuantity=0;
    cartItemList.forEach((item)=>{
        totalQuantity+=parseInt(item.dataset.quantity);
    });
    cartCount.innerHTML=`<span class="qty">${totalQuantity}</span>`;
};

const addItemtoCart=(name,price,imgSrc)=>{
    const totalPrice=price*count;
    const cartItem=document.createElement('div');
    cartItem.classList.add('cartItem');
    cartItem.dataset.quantity = count;
    cartItem.innerHTML=`
    <img src="${imgSrc}" alt="${name}"/>
    <div class='itemDetails'>
        <div>${name}</div>
        <div>
            <p>
                $${price.toFixed(2)}*${count}
                <span class="totalPrice">$${totalPrice.toFixed(2)}</span>
            </p>
        </div>
    </div>
    <button class='deleteItem'>
        <svg width="14" height="16" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z" id="a"/></defs><use fill="#C3CAD9" fill-rule="nonzero" xlink:href="#a"/></svg>
    </button>
    `;
    cartItems.appendChild(cartItem);
    updateTotalQuantity();
    if (cartItems.classList.contains('empty')){
        cartItems.classList.remove('empty');
        checkout.classList.remove('empty');
    }
    const deleteButton=cartItem.querySelector('.deleteItem');
    deleteButton.addEventListener('click',(event)=>{
        const cartIte=event.target.closest('.cartItem');
        removeItemFromCart(cartIte);
    });
};


addToCartBtn.addEventListener('click',()=>{
    if(count===0)
        return;
    const productName=document.querySelector('.main .productName').textContent;
    const productPriceEl=document.querySelector('.main .price');
    const productPrice=parseFloat(productPriceEl.textContent.replace('$',''));
    const productImg=document.querySelector('.default.gallery .mainImg img').getAttribute('src');
    addItemtoCart(productName,productPrice,productImg);
    cartContainer.classList.add('active');
    updateCount(0);
});

const removeItemFromCart=(cartItem)=>{
    cartItem.remove();
    updateTotalQuantity();
    if(cartItems.children.length===1){
        cartItems.classList.add('empty');
        checkout.classList.add('empty');
    }
};

