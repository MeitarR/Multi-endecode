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
    ).replace(/{name}/g, name)
}

function generateDefaultDivBody(name) {
    return (
        "<button class='waves-effect waves-light btn myBtn' onclick='{name}Obj.doEncrypt()'>encrypt</button>\n" +
        "<button class='waves-effect waves-light btn myBtn' onclick='{name}Obj.doDecrypt()'>decrypt</button>\n"
    ).replace(/{name}/g, name)
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

    this.createHTML = function () {
        $("#main").append(generateDiv(this.name))
    };

    this.updateText = function (text) {
        var text_id = "#" + this.name + "Text";
        $(text_id).val(text)
    };

    this.encrypt = function (obj) {
        return obj.str;
    };

    this.doEncrypt = function () {
        var text_id = "#" + this.name + "Text";
        this.updateText(this.encrypt({"str": $(text_id).val()}))
    };

    this.decrypt = function (obj) {
        return obj.str
    };

    this.doDecrypt = function () {
        var text_id = "#" + this.name + "Text";
        this.updateText(this.decrypt({"str": $(text_id).val()}))
    };
}

function Base64() {
    PlainText.call(this, "Base64");

    this.encrypt = function (obj) {
        return btoa(obj.str);
    };

    this.decrypt = function (obj) {
        return atob(obj.str)
    };
}

var PlainTextObj = new PlainText("PlainText");
var Base64Obj = new Base64();

$(document).ready(function(){
    PlainTextObj.createHTML();
    Base64Obj.createHTML();
});