const productTableList = document.querySelector('#categories-table-list');
const form = document.querySelector('#add-category-form');
var categories;
var stateSelect = document.getElementById("stateSelect");
var inventory = document.getElementById("inventory");
var price = document.getElementById("price");
var description = document.getElementById("description");


window.onload = async function(){
    categories = await getAllCategories();
    
    categories.forEach(item =>{
        var li = createCustomTextTag('option', 'divider', item.name);
        li.setAttribute('role', 'presentation');
    });
    categories.forEach(item =>{
        renderCategories(item);
    });
}
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    var category = {
        name: form.name.value,
        status: form.activ.value,
        description: description.value
    };
    showPleaseWait();
    await addCategory(category);
    cleanForm();
    hidePleaseWait();
});

//this function clean the inputs contents
function cleanForm(){
    form.name.value = form.description.value ='';
}

// create element & render cafe
function renderCategories(doc){
    let tr = document.createElement('tr');
    tr.setAttribute('id', doc.idCategory);
    tr.setAttribute('class', 'table-success');
    let blank = document.createElement('td');
    blank.setAttribute('class', 'table-success');
    let idCategory = createCustomTextTag('td', 'table-success', doc.idCategory);
    let name = createCustomTextTag('td', 'table-success', doc.name);
    let price = createCustomTextTag('td', 'table-success', doc.price);
    let state = createCustomTextTag('td', 'table-success', doc.status);

    let tdActions = createCustomNonTextTag('td', 'row');
    var btnDelete = createCustomTextTag('button', 'btn btn-danger', 'X');
    btnDelete.setAttribute('style', 'margin-right:5px');
    var btnUpdate = createCustomTextTag('button', 'btn btn-warning', '!');
    appendChildListTag([btnDelete, btnUpdate], tdActions);

    tr.setAttribute('data-id', doc.idProduct);

    appendChildListTag([blank, idCategory, name, state], tr);
    
    tr.appendChild(tdActions);

    productTableList.appendChild(tr);

    // deleting data
    btnDelete.addEventListener('click', async (e) => {
        e.stopPropagation();
        let id = doc.idCategory;
        showPleaseWait();
        await deleteCategory(id);
        hidePleaseWait();
        location.reload();
        /*let tr = productTableList.querySelector(id);
        productTableList.removeChild(tr);*/

    });
    // updating data
    btnUpdate.addEventListener('click', (e) => {
        window.location.href = window.rootFile+'pages/categories/update.html?id='+doc.idCategory;
    });
}