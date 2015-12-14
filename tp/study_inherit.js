var inherits = require("util").inherits;

function Base(){
    this._tab = "base_name";
}
Base.prototype.run = function(){
    console.log("base:run");
    this.call_it();
}
Base.prototype.call_it = function(){
    console.log("base:call_it");
}
Base.prototype.test = function(){
    console.log("base:test");
}


function Sub(){
    Base.call(this);
    this._tab = {
        "add" : this.add
    }
}
inherits(Sub, Base);

Sub.prototype.call_it  = function(){
    console.log("sub:call_it, tab ...." , this._tab);
    //this._tab["add"]();
    var f = this._tab["add"];
    f.call(this);
}
Sub.prototype.add = function(){
    console.log("Sub: add");
    this.test();
}


function SubSub(){
    Sub.call(this);
    this._tab["remove"] = this.remove;
}
inherits(SubSub, Sub);
SubSub.prototype.remove = function(){
    console.log("SubSub: remove");
}


function SubSubSub(){
    SubSub.call(this);
}
inherits(SubSubSub, SubSub);

SubSubSub.prototype.hello = function(){
    console.log("SubSubSub:hello");
    this.run(); 
}


s = new SubSubSub();
s.hello();
