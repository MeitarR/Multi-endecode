function PlainText(name) {
    this.name = name;

    this.createHTML = function () {
        $(document.body).append((
            "<div>" +
            "   <h1>{name}</h1>" +
            "   <textarea id='{name}Text'></textarea>" +
            "   <button onclick='{name}Obj.doEncrypt()'>encrypt</button>" +
            "   <button onclick='{name}Obj.doDecrypt()'>decrypt</button>" +
            "</div>").
            replace(/\{name\}/g, this.name));
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