let shop = document.getElementById('shop')

// shopItemsData 輸入shop裡的item 在Data.js

let basket = JSON.parse(localStorage.getItem("data")) || [] 
// 在increment()中 array.push()方法 add a item to the array [裡面只放 id 跟 item] and storage Local storage in client
// 如果local storage 有data 就可以放 OR 沒有就是 []

// 把shop裡的item重複利用 因為標籤算字串型態 字串型態+js的變數 且重複利用要在外面加上一對`` 這個function return `重複利用的html`
// 操作shop.innerHTML return `重複利用的html`放到innerHTML >> 變成return (shop.innerHTML = `重複利用的html`)
// finally, call the function
let generateShop = ()=>{
    // map() retun a array, items data逐一列出, x is object{}, shopItemsData.price = x.price
    return (shop.innerHTML = shopItemsData
        .map((x)=>{ 
            let {id, name, price, desc, img} = x  // x 解構
            let search = basket.find((x)=> x.id === id) || [] // if 沒有此item數量data就回傳 [] 
            // search {id: 'fjjiso', item: 1} 、{id: 'mvdsaz', item: 2}、undefined 
            return ` 
        <div id="product-id-${id}" class="item">
            <img width = 220 src=${img} alt=""/> <!--不用在 200 後面加上 px,不會報錯-->
            <div class="details">
                <h3>${name}</h3> 
                <p>${desc}</p>
                <div class="price-quantity">
                    <h2>$ ${price}</h2>
                    <div class="buttons">
                        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                        <div id="${id}" class="quantity">
                            ${search.item === undefined? 0: search.item}
                        </div>
                        <i onclick="increment(${id})" class="bi bi-plus-lg"></i>                        
                    </div>
                </div>
            </div>
        </div>
        `
        }).join("")
    ) // 去除item後面的逗號"," 所以.map()加上.join("") 
} // ${search.item === undefined? 0: search.item}  if true false變形 1 ==1? true: false

generateShop()

let increment = (id)=>{
    let selectItem = id  // selectItem本身是一個HTML DOM: <div id="fjjiso" class="quantity"></div>
    // .find() 找到第一個符合的就印出，如果沒有就是 undefined
    let search = basket.find((x)=>x.id === selectItem.id) // x is {id: 'fjjiso', item: 1} 
    if(search === undefined){  // 如果印出undefined代表找不到，就表示按 + 的是第一個item 所以search會印出undefined        
        basket.push({  // push a new Item object to this array
            id: selectItem.id,
            item: 1  
        })
    }else{  // 如果不是第一個item, .find()找到第一個符合的就(印出)讓search item+1
        search.item +=1
    }    
    update(selectItem.id)  // update 該商品數量
// ========= necessary edits and changes on the data of the basket, and it's DONE =========
    localStorage.setItem("data", JSON.stringify(basket)) // save all the edit update data back to the local storage
}
let decrement = (id)=>{
    let selectItem = id  
    let search = basket.find((x)=>x.id === selectItem.id)  

    if(search === undefined) return // every time 畫面刷新 search is undefined no do something
    else if(search.item === 0) return // return 後面沒有code 就是不做任何事情 stop the process
    else{  
        search.item -=1
    }    
    update(selectItem.id)    
    basket = basket.filter((x)=> x.item !== 0) // 把數量不為0的挑出       
// ========= necessary edits and changes on the data of the basket, and it's DONE =========
    localStorage.setItem("data", JSON.stringify(basket)) 
}
let update = (id)=>{  
    let search = basket.find((x)=> x.id === id) 
    let targetid = document.getElementById(id)
    targetid.innerHTML = search.item
    calculation() // 最後面 call calculation()
}

let calculation = ()=>{
    let cartId = document.getElementById("cartAmount") 
    let cartTotal = basket.map((x)=>x.item)
    cartId.innerHTML = cartTotal.reduce((x,y)=>x + y, 0)   
    // 0 is default number, means we want to calculate to start from 0
}
calculation()