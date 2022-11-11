class Ajax {
    constructor(){
        this.xhr = new XMLHttpRequest();
        
    }
    get(url,params,callback){
        let s = "";;
        let sep = "";
        for(let p in params){
          s+=sep+p+"="+params[p];
          sep = '&';
        }
        this.xhr.open('GET',url+s,true);
        this.xhr.onreadystatechange =  function(){
            if(this.xhr.readyState == XMLHttpRequest.DONE){
                if(this.xhr.status== 200){
                    callback({text : this.xhr.responseText,xml: this.xhr.responseXML});
                }
           
           }
        }.bind(this) ;
        this.xhr.send();
    }
    post(url,params,callback){
        let s = "";;
        let sep = "";
        for(let p in params){
          s+=sep+p+"="+params[p];
          sep = '&';
        }
        this.xhr.open('POST',url,true);
        this.xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        this.xhr.onreadystatechange =  function(){
            if(this.xhr.readyState == XMLHttpRequest.DONE){
                if(this.xhr.status== 200){
                    callback({text : this.xhr.responseText,xml: this.xhr.responseXML});
                }
           
           }
        }.bind(this);
        console.log(s);
        this.xhr.send(s);
    }
}