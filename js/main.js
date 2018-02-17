function generateDiv(name, body, color) {
    body = typeof body !== 'undefined' ? body : generateDefaultDivBody(name);
    color = typeof color !== 'undefined' ? color : generateRandomMaterialColor();
    return (
        "    <div class=\"card\" style=\"background-color: " + color +"\">\n" +
        "        <h3>{name}</h3>\n" +
        "        <textarea id='{name}Text' class='materialize-textarea'></textarea>\n" +
        "        <div class=\"bottom-content\">\n" +
            body +
        "        </div>\n" +
        "    </div>"
    ).replace(/{name}/g, name);
}

function generateDefaultDivBody(name) {
    return (
        "<button class='waves-effect waves-light btn myBtn' onclick='{name}Obj.doConvertAll()'>convert</button>\n"
    ).replace(/{name}/g, name);
}

function generateRandomMaterialColor() {
    var colors = [
        "#ef9a9a", "#e57373",
        "#f48fb1", "#f06292",
        "#ce93d8", "#ba68c8",
        "#b39ddb", "#9575cd",
        "#9fa8da", "#7986cb",
        "#90caf9", "#64b5f6",
        "#81d4fa", "#4fc3f7",
        "#80deea", "#4dd0e1",
        "#80cbc4", "#4db6ac",
        "#a5d6a7", "#81c784",
        "#c5e1a5", "#aed581",
        "#e6ee9c", "#dce775",
        "#fff59d", "#fff176",
        "#ffe082", "#ffd54f",
        "#ffcc80", "#ffb74d",
        "#ffab91", "#ff8a65",
        "#bcaaa4", "#a1887f"
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

function PlainText(name) {
    this.name = name;

    this.getText = function () {
        var text_id = "#" + this.name + "Text";
        return $(text_id).val();
    };

    this.createHTML = function () {
        $("#main").append(generateDiv(this.name));
    };

    this.updateText = function (text) {
        var text_id = "#" + this.name + "Text";
        $(text_id).val(text);
    };

    this.encrypt = function (obj) {
        return obj.str;
    };

    this.doEncryptVal = function (val) {
        this.updateText(this.encrypt({"str": val}));
    };

    this.decrypt = function (obj) {
        return obj.str;
    };

    this.doDecrypt = function () {
        var text_id = "#" + this.name + "Text";
        var ans = this.decrypt({"str": $(text_id).val()});
        this.updateText(ans);
        return ans;
    };

    this.doDecryptVal = function (val) {
        this.updateText(this.decrypt({"str": val}));
    };

    this.doConvertAll = function () {
        PlainTextObj.updateText(this.doDecrypt());
        convertAll();
    }
}

function Base64() {
    PlainText.call(this, "Base64");

    this.encrypt = function (obj) {
        return unicodeBase64Encode(obj.str);
    };

    this.decrypt = function (obj) {
        return unicodeBase64Decode(obj.str);
    };
}

function UrlEncoding() {
    PlainText.call(this, "UrlEncoding");

    this.encrypt = function (obj) {
        return encodeURI(obj.str);
    };

    this.decrypt = function (obj) {
        return decodeURI(obj.str);
    };
}

var PlainTextObj = new PlainText("PlainText");
var Base64Obj = new Base64();
var UrlEncodingObj = new UrlEncoding();

var algorithms = [PlainTextObj, Base64Obj, UrlEncodingObj];

function convertAll() {
    algorithms.forEach(function (value) { value.doEncryptVal(PlainTextObj.getText()) });
}


$(document).ready(function(){
    algorithms.forEach(function (value) { value.createHTML() });
});


function unicodeBase64Encode(text) {
    /* from https://www.base64decode.org/ */
    return window.btoa(encodeURIComponent(text).replace(/%([0-9A-F]{2})/g, function(match, p1) {
        return String.fromCharCode("0x" + p1)
    }))
}

function unicodeBase64Decode(text) {
    /* from https://www.base64decode.org/ */
    return decodeURIComponent(Array.prototype.map.call(window.atob(text), function(c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(""))
}
