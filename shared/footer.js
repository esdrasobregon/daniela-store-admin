$(document).ready(function(){     
    
    var content = document.createElement('ul');
    content.innerHTML = "";
    var liststart = document.createElement('ul');
    liststart.setAttribute('class', 'list-unstyled list-inline text-center');
    var darkDiv = document.createElement('div');
    darkDiv.setAttribute('class', 'bg-dark p-4');
    var footerContainer = document.createElement('footer');
    footerContainer.setAttribute('class', 'page-footer font-small mdb-color darken-3 pt-4');
    darkDiv.appendChild(footerContainer);
    var centralDiv = document.createElement('div');

    centralDiv.setAttribute('class', 'overflow-auto bg-light');
    centralDiv.setAttribute('style', 'max-height: 75px;');
    //list
    //facebook item 
    var facebook = document.createElement('li');
    facebook.setAttribute('class', 'list-inline-item');
    var aFacebook = createCustomNewTabAnchor('Facebook', 'http://wwww.facebook.com', 'nav-item');
    facebook.appendChild(aFacebook);

    var categories = createCustomVarItem('nav-item');
    var home = createCustomVarItem('list-inline-item');
    var about = createCustomVarItem('list-inline-item');
    var contact = createCustomVarItem('list-inline-item');
    var store = createCustomVarItem('list-inline-item');
        //anchors
    var aHome = createCustomAnchor('Home', window.rootFile+'index.html', 'nav-link');
    var aCategory = createCustomAnchor('Categories', window.rootFile+'pages/categories/categories.html', 'nav-link');
    var aAbout = createCustomNewTabAnchor('about', 'https://daniela-store.web.app/pages/about.html', 'nav-link');
    var aContact = createCustomNewTabAnchor('Contact', 'https://daniela-store.web.app/pages/contact.html', 'btn-floating btn-fb mx-1');
    var aStore = createCustomNewTabAnchor('Store', 'https://daniela-store.web.app/pages/store.html', 'btn-floating btn-fb mx-1');
        //append the anchors to the list
    categories.appendChild(aCategory);
    home.appendChild(aHome);
    about.appendChild(aAbout);
    contact.appendChild(aContact);
    store.appendChild(aStore);
        //append the nav bar list items 
    appendChildListTag([home, categories, about, contact, facebook, aStore], liststart);    
    centralDiv.appendChild(liststart);
    darkDiv.appendChild(centralDiv);

    $("#footer").append(darkDiv);
});
