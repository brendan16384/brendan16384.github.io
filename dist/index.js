function validate() {
    if(document.getElementById("username").value.toLowerCase()=="username" && document.getElementById("password").value.toLowerCase()=="password"){
        history.pushState({}, null, "dashboard.html");
        return true;
    }
    else {
        alert("Invalid username or password (hint: try using username and password)");
        return false;
    }
}

function search() {
    let container = document.getElementById("homeworks")
    let assignments = container.children;
    let hw = [], classes = [];
    let period = document.getElementById("due-date").value;
    let sort = document.getElementById("sort-by").value;
    let now = new Date();
    let filter = new Date(now);

    // get html elements for HWs and extract date and class data for each
    for(let i=0; i<assignments.length; i++){
        hw[i]={
            div     : assignments[i],
            class   : assignments[i].getElementsByClassName("hw-class")[0].innerHTML,
            time    : new Date(assignments[i].getElementsByClassName("time-due")[0].innerHTML)
        };

        // make a list of unique classes for sorting by class
        let found=false;
        for(let j=0; j<classes.length; j++){
            if(hw[i].class==classes[j]){
                found=true;
            }
        }
        if(!found){
            classes.push(hw[i].class);
        }
    }

    // restore hidden assignments then hide those that dont fit the time filter
    for(let i=0; i<assignments.length; i++){
        assignments[i].style.display = "flex"
    }

    // time based filtering for overdue
    if(period==1){
        for(let i=0; i<hw.length; i++){
            if(hw[i].time>now){
                hw[i].div.style.display="none";
            }
        }
    }
    
    // time based filtering for 7 days
    if(period==2){
        filter.setDate(now.getDate()+7);
        for(let i=0; i<hw.length; i++){
            if(hw[i].time<now || hw[i].time>filter){
                hw[i].div.style.display="none";
            }
        }
    }
    
    // time based filtering for 30 days
    if(period==3){
        filter.setDate(now.getDate()+30);
        for(let i=0; i<hw.length; i++){
            if(hw[i].time<now || hw[i].time>filter){
                hw[i].div.style.display="none";
            }
        }
    }

    // time based filtering for 3 months
    if(period==4){
        filter.setMonth(now.getMonth()+3);
        for(let i=0; i<hw.length; i++){
            if(hw[i].time<now || hw[i].time>filter){
                hw[i].div.style.display="none";
            }
        }
    }

    // time based filtering for 6 months
    if(period==5){
        filter.setMonth(now.getMonth()+6);
        for(let i=0; i<hw.length; i++){
            if(hw[i].time<now || hw[i].time>filter){
                hw[i].div.style.display="none";
            }
        }
    }

    //sorting by date
    if(sort==0){
        for(let i=0; i<hw.length; i++){
            early=i;
            for(let j=i+1; j<hw.length; j++){
                if(hw[j].time<hw[early].time){
                    early=j;
                }
            }
            container.appendChild(hw[early].div);
            let t = hw[i];
            hw[i] = hw[early];
            hw[early] = t;
        }
    }

    //sorting by class
    if(sort==1){
        classes.sort()
        classes.forEach((item) => {
            for(let i=0; i<hw.length; i++){
                if(hw[i].class==item){
                    container.appendChild(hw[i].div);
                }
            }
        })
    }
    return false;
}

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}