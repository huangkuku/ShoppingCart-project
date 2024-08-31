let basket = JSON.parse(localStorage.getItem("data")) || []
let label = document.getElementById("label")  // Total ClearCart and Checkout
let ShoppingCart = document.getElementById("shopping-cart")  // show each product

let calculation = ()=>{
    let cartId = document.getElementById("cartAmount") 
    let cartTotal = basket.map((x)=>x.item)
    cartId.innerHTML = cartTotal.reduce((x,y)=>x + y, 0)   
    // 0 is default number, means we want to calculate to start from 0
}
calculation()

// show all the products in this func
let generateCartItems = ()=>{
    // cart is not empty
    if(basket.length!==0){
        return  (ShoppingCart.innerHTML = basket.map((x)=>{ // x is basket
            let {id, item} = x  // id from basket
            // y 是 shopItemsData
            let search = shopItemsData.find((y)=>y.id === id) || [] // find() log first 符合條件的item 
            let {img, name, price} = search
            return `
            <div class="cart-item">
                <img width=100 src=${img} />
                <div class="details">
                    <div class="title-price-x">
                        <h4 class="title-price">
                            <p>${name}</p>
                            <p class="cart-item-price">$ ${price}</p>
                        </h4>
                        <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
                    </div>
                    <div class="buttons">
                        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                        <div id="${id}" class="quantity">${item}</div>
                        <i onclick="increment(${id})" class="bi bi-plus-lg"></i>                        
                    </div>
                    <h3>$ ${price*item}</h3>
                </div>
            </div>
            `
        }).join(""))
    }
    else{
        // cart is empty
        ShoppingCart.innerHTML = ``
        label.innerHTML = `
        <h2>Cart is Empty</h2>
        <a href="index.html">
            <button class="HomeBtn">Back to Home</button>
        </a>
        `
    }
}
generateCartItems()
let increment = (id)=>{
    let selectItem = id 
    let search = basket.find((x)=>x.id === selectItem.id) 
    if(search === undefined){          
        basket.push({  
            id: selectItem.id,
            item: 1  
        })
    }else{  
        search.item +=1
    }    
    update(selectItem.id)
    generateCartItems()  // 把generateCartItems() copy到這裡，重新被渲染!       
    localStorage.setItem("data", JSON.stringify(basket)) 
}
let decrement = (id)=>{
    let selectItem = id  
    let search = basket.find((x)=>x.id === selectItem.id)  
    if(search === undefined) return 
    else if(search.item === 0) return
    else{  
        search.item -=1
    }    
    update(selectItem.id)    
    basket = basket.filter((x)=> x.item !== 0) // item 不等於0的存到basket
    generateCartItems()  // 把generateCartItems() copy到這裡，重新被渲染! (是為了解決 item == 0 時 能在前端被消失)      
    localStorage.setItem("data", JSON.stringify(basket)) 
}


let update = (id)=>{  
    let search = basket.find((x)=> x.id === id) 
    let targetid = document.getElementById(id) // <div id="${id}" class="quantity">${item}</div>
    targetid.innerHTML = search.item
    calculation() 
    TotalAmout()
}
let removeItem = (id)=>{
    let selectItem = id
    // console.log(selectItem.id)
    basket = basket.filter((x)=>x.id !==selectItem.id)
    calculation()
    generateCartItems()  // 把generateCartItems() copy到這裡，重新被渲染! 
    TotalAmout() // 按了 x 之後 算總total
    localStorage.setItem("data", JSON.stringify(basket)) 
}

let clearCart =()=>{
    basket = []
    generateCartItems()  // 把generateCartItems() copy到這裡，重新被渲染!
    localStorage.setItem("data", JSON.stringify(basket)) 
    calculation()
}

let TotalAmout = ()=>{
    // have local storage data
    if(basket.length !==0){
        let amout = basket.map((x)=>{
            let{id, item} = x  // basket only id and item, but shopItemsData(Data.js) has price
            let search = shopItemsData.find((y)=>y.id === id) || [] // find() log first 符合條件的item 
            return item*search.price
        }).reduce((x,y)=> x+y, 0)
        // console.log(amout) // 確認出來的是正確的金額
        label.innerHTML = `
        <h2>Total Bill: $ ${amout}</h2>
        <button class="checkout">Checkout</button>
        <button onclick="clearCart()" class="removeAll">Clear Cart</button>
        `
    }else return // no local storage data    
}
TotalAmout()