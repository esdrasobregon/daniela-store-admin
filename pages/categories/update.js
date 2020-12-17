const updateForm = document.querySelector('#update-product-form');
var localUrl = document.URL;
var split = localUrl.split('?');
var idCategory = split[1].split('=')[1];
var category;
var indexCategorySelected;
var description = document.getElementById('description');

window.onload = async function(){
	category = await getCategory(idCategory);
    updateForm.name.value = category.name;
    updateForm.idProduct.value = category.idCategory;
    updateForm.activ.value = category.status;
    description.value = category.description;
    $('#imageFirebase')
        .attr('src', url+idCategory+urlPlus);
}
                
               
updateForm.addEventListener('submit', async (e) =>  {
    e.preventDefault();
    var pCategory = {
        idCategory: category.idCategory,
        name: updateForm.name.value,
        status: updateForm.activ.value,
        description: description.value
    };
    showPleaseWait();
    await updateCategory(pCategory);
    hidePleaseWait();
    window.history.back();
});
              
function redirectToUploadImage(){
     window.location.href = '../../shared/uploadImages.html?id='+idCategory+'?productName='+category.name;
}
function chageIndexSelected(sel) {
    indexCategorySelected = categories[sel.selectedIndex].idCategory;
}
updateForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    var pCategory = {
    	idCategory: category.idCategory,
        name: updateForm.name.value,
        status: updateForm.activ.value,
        description: description.value
    };
    showPleaseWait();
    await updateCategory(pCategory);
    hidePleaseWait();
    window.history.back();
});