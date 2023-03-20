
var bookmarks = [];
var inputs = document.querySelectorAll('input');
var alerts = document.querySelectorAll("p.alert");
var btnsdelete = [];
var drawn = [];

function load() {
    bookmarks = JSON.parse(localStorage.getItem("bookmarks")); 
    if (bookmarks != null)
        displayData();
    else bookmarks = [];
    updateDeleteButtons();
    addDeleteEvent();
    hideAlerts();
}
window.onload = load;


//to hide alerts in web site
function hideAlerts() {
    for (var i = 0; i < alerts.length; i++)
        alerts[i].style.display = "none";
}

//to clear inputs after writeing
function clearForm() {
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }
}

function isDrawn(bookmark) {
    for (var i = 0; i < drawn.length; i++)
        if (bookmark == drawn[i])
            return true;
    return false;
}

//to display data in web site
function displayData() {
    for (var i = 0; i < bookmarks.length; i++) {
        if (!isDrawn(bookmarks[i]))
            createWell(bookmarks[i]);
    }
}

function createWell(bookmark) {
    var div = document.getElementById('bookmarkList');     //selecting the holding div
    div.innerHTML += "<div class=\"webwell row\" id=\"" + bookmark.name + "\"></div> ";    //setting the well div
    var link = "<a class=\"btn btn-primary\" href=\"" + bookmark.url + "\" target=\"_blank\">visit</a>";   //setting the link
    var btndelete = "<button class=\"btn btn-danger btndelete\">Delete</button>";   //setting the delete button
    var h4 = "<h2>" + bookmark.name + "</h2>";     //setting the bookmark name
    var webwell = document.getElementById(bookmark.name);    //selecting the created well div
    webwell.innerHTML = h4 + link + btndelete;    //adding the set item
    drawn.push(bookmark);
}

//to delete any website
function deleteWell(bookmark) {
    drawn.splice(drawn.indexOf(bookmark), 1);
    var div = document.getElementById('bookmarkList');   //selecting the holding div	
    var webwell = document.getElementById(bookmark.name);   //selecting the well to delete
    var k = "<div class=\"webwell row\" id=\"" + bookmark.name + "\">" + webwell.innerHTML + "</div>";
    div.innerHTML = div.innerHTML.replace(k, "");
    updateDeleteButtons();
    addDeleteEvent();
}

function submit() {
    var siteName = document.querySelector("#siteName").value;
    var siteUrl = document.querySelector("#siteUrl").value;

    if (checkName(siteName) && checkUrl(siteUrl)) {  //condition
        hideAlerts();
        siteUrl = addHttp(siteUrl);
        var bookmark = {
            name: siteName,
            url: siteUrl
        };
        bookmarks.push(bookmark);
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
        displayData();
        updateDeleteButtons();
        addDeleteEvent();
        clearForm();
    } else {
        if (!checkName(siteName)) {
            showNameError("this name already exist");
        }
        if (!checkUrl(siteUrl)) {
            showNameError("this url already exist");
        }
        if (siteName == null || siteName == "") {
            showNameError("Name is required");
        }
        if (siteUrl == null || siteUrl == "") {
            showUrlError("Url Field is required");
        }
    }
}

function checkName(name) {
    if (name == null || name == "") {
        return false;
    }
    for (var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].name === name)
            return false;
    }
    return true;
}

function checkUrl(url) {
    if (url == null || url == "") {
        return false;
    }
    for (var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].url === url)
            return false;
    }
    return true;
}

function showNameError(msg) {
    var nameError = document.getElementById('nameError');
    nameError.innerHTML = msg;
    nameError.style.display = 'block';
}

function showUrlError(msg) {
    var urlError = document.getElementById('urlError');
    urlError.innerHTML = msg;
    urlError.style.display = 'block';

}

function updateDeleteButtons() {
    btnsdelete = document.querySelectorAll(".btndelete");
}

function addDeleteEvent() {
    for (var i = 0; i < btnsdelete.length; i++) {
        btnsdelete[i].addEventListener("click", function(e) {
            console.log(e);
            var item = e.target.parentElement;
            for (var i = 0; i < bookmarks.length; i++) {
                if (item.id == bookmarks[i].name) {
                    deleteWell(bookmarks[i]);
                    bookmarks.splice(i, 1);
                    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

                }
            }
        })
    }
}

function addHttp(url) {
    if (url.search("http://") == -1 && url.search("https://") == -1)
        return "http://" + url;
    return url;
}
