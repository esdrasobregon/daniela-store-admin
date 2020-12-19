const productcategoryList = document.querySelector('#category-product-list');
const form = document.querySelector('#add-product-form');
var categories;
var productList;
var indexCategorySelected;
var creationDate = document.getElementById('creationDate');
creationDate.valueAsDate = new Date();
var modificationDate = document.getElementById('modificationDate');
modificationDate.valueAsDate = new Date();
var selectcategories = document.getElementById("categories");
var stateSelect = document.getElementById("stateSelect");
var inventory = document.getElementById("inventory");
var price = document.getElementById("price");
var description = document.getElementById("description");


window.onload = async function(){
    categories = await getAllCategories();
    
    categories.forEach(item =>{
        var li = createCustomTextTag('option', 'divider', item.name);
        li.setAttribute('role', 'presentation');
                    
        stateSelect.appendChild(li);
        renderCategoryList(item);
    });
    if(categories != null){
        indexCategorySelected = categories[0].idCategory;
    }
    productList = await getAllProducts();
    productList.forEach(item =>{
        renderProductList(item);
    });
}
function chageIndexSelected(sel) {
    indexCategorySelected = categories[sel.selectedIndex].idCategory;
}
inventory.addEventListener("keypress", (ev)=> noLetters(ev));
price.addEventListener("keypress", (ev)=> noLetters(ev));

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    var product = {
        name: form.name.value,
        price: form.price.value,
        inventory: form.inventory.value,
        category: indexCategorySelected,
        creationDate: form.creationDate.value,
        modificationDate: form.modificationDate.value,
        activ: form.activ.value,
        description: description.value
    };
    showPleaseWait();
    await addProduct(product);
    cleanForm();
    hidePleaseWait();
});

//this function clean the inputs contents
function cleanForm(){
    form.name.value = form.price.value = form.inventory.value ='';
}
// real-time listener
db.collection('product').orderBy('category').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        console.log(change.doc.data());
        if(change.type == 'added'){
            renderProduct(change.doc);
        } else if (change.type == 'removed'){
            let li = productTableList.querySelector('[data-id=' + change.doc.id + ']');
            productTableList.removeChild(li);
        }
    });
});

//create category list
function renderCategoryList(item){
    var divCat = createDivTagClassStyle('row', 'margin: 10px');
    var divHeadder = document.createElement('div');
    var headder = document.createElement('h5');
    var aHeader = createCustomTextTag('a', 'btn btn-primary', item.name);
    aHeader.setAttribute('role', 'button');
    headder.appendChild(aHeader);
    var catList = createCustomNonTextTag('ul', 'row');
    var divHide  = createDivTagClassStyle('container', 'display: none');
    divHide.setAttribute('id', 'catList'+item.idCategory);
    headder.setAttribute('onClick', 'hideAndShowDiv(catList'+item.idCategory+')');
    catList.setAttribute('style', 'list-style: none;');
    catList.setAttribute('id', item.idCategory);
    divHeadder.appendChild(headder);
    divHide.appendChild(catList);
    appendChildListTag([divHeadder, divHide], divCat);
    productcategoryList.appendChild(divCat);
};

//create a list for every category
function renderProductList(doc){
    
    var btnDelete = createCustomTextTag('button', 'btn btn-danger', 'X');
    btnDelete.setAttribute('style', 'margin-right:5px');
    var btnUpdate = createCustomTextTag('button', 'btn btn-warning', '!');
    
    var divProdDetails = createCustomNonTextTag('div', 'container-fluid');
    var pName = createCustomTextTag('h5', 'h5', 'Name: '+doc.name);
    var pidProduct = createCustomTextTag('p', 'text-info', 'Id: '+doc.idProduct);
    var pPrice = createCustomTextTag('p', 'text-info', 'Price: '+doc.price);
    var pInventory = createCustomTextTag('p', 'text-info', 'inventory: '+doc.inventory);
    var pState = createCustomTextTag('p', 'text-info', 'State: '+doc.activ);
    var pCreation = createCustomTextTag('p', 'text-info', 'Creation date: '+doc.creationDate);
    var pModification = createCustomTextTag('p', 'text-info', 'Last modification: '+doc.modificationDate);
    appendChildListTag([pName, pidProduct, pidProduct, pPrice, pInventory, pState, pCreation, pModification, btnDelete, btnUpdate], divProdDetails);

    var prodli = document.createElement('li');
    prodli.setAttribute('list-style-type', 'none');
    prodli.setAttribute('id', doc.idProduct);
    prodli.appendChild(divProdDetails);

    document.getElementById(doc.category).appendChild(prodli);
    // deleting data
    btnDelete.addEventListener('click', async (e) => {
        e.stopPropagation();
        let id = doc.idProduct;
        showPleaseWait();
        await deleteProduct(id);
        hidePleaseWait();
        //location.reload();
        //let tr = productTableList.querySelector(id);
        document.getElementById(doc.category).removeChild(prodli);

    });
    // updating data
    btnUpdate.addEventListener('click', (e) => {
        window.location.href = window.rootFile+'pages/products/update.html?id='+doc.idProduct+'?imageUrl='+'https://firebasestorage.googleapis.com/v0/b/daniela-store.appspot.com/o/'+doc.idProduct;
    });
}