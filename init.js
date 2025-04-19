async function getJSON(path){
    let response = await fetch(path)
    let data = response.json()
    return data
}

function setInnerHTML(id, htmlContent){
    document.getElementById(id).innerHTML = htmlContent
}

async function setInnerHTMLFromFile(id, htmlFilePath){
    let res = await fetch(htmlFilePath)
    let htmlContent = await res.text()
    setInnerHTML(id, htmlContent)
}

async function navSetup() {
    let navContent = "<ul>";
    let navigation = await getJSON('navigation.json');
    
    navigation['top-nav'].forEach(element => {
        navContent += '<li><a href="' + element['href'] + '">' + element['name'] + '</a></li>';
    });

    navContent += "</ul>";
    setInnerHTML('top-nav-bar', navContent);
}


async function init() {
    let config = await getJSON('config.json')
    let layoutConfig = await getJSON('layout_config.json')
    document.title = config['meta-data']['title']

    // Set layout
    await setInnerHTMLFromFile('top-bar', layoutConfig['common']['top-bar']['html'])

    // Set values
    setInnerHTML('main-logo', config['meta-data']['logo'])
    await navSetup()
    // top-bar-config
    const button = document.getElementById('expand-menu-button');

    // When the button gains focus
    button.addEventListener('focus', () => {
        let navBar = document.getElementById('top-nav-bar');
        navBar.style.height = "300px"
    });

    // When the button loses focus
    button.addEventListener('blur', () => {
        document.getElementById('top-nav-bar').style.height = "0px"
    // Custom logic here too
    });


} 



init()