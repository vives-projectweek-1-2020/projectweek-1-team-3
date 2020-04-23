
//mysql toevoegen aan id





function Reviewstable() {


    var reviewbox = document.createElement("div");
    reviewbox.append(head)
    reviewbox.className("reviewbox")

    var head = document.createElement("div");
    head.className("head")
    head.append(identifacation)
    head.append(rating)
    head.style.display = flex
    head.style.backgroundColor = lightgrey
    var identifacation = document.createElement("h5")
    identifacation.innerHTML = "innerhtml"
    var rating = document.createElement("h5")
    rating.innerHTML = "innerhtml"

    var metaininfo = document.createElement("div");
    metaininfo.className("metaininfo")
    
    metaininfo.style.display = flex
    metaininfo.style.backgroundColor = lightgrey
    var name = document.createElement("h6")
    name.innerHTML = "innerhtml"
    var date = document.createElement("h6")
    date.innerHTML = "innerhtml"
    date.style.align = right
    metaininfo.append(name)
    metaininfo.append(date)

    var article = document.createElement("article");
    article.className("article")
    article.style.height = '200px'
    article.style.overflow = scroll
    var reviewBlock = document.createElement("p")
    reviewBlock.style.padding = '6px'
    reviewBlock.id = ("reviewBlock")
    reviewBlock.innerHTML = "review text uit db komt hiering"
    article.append(reviewBlock)


    



}

/* <div class="reviewbox">
                        <div class="head" style="display: flex; background-color: lightgrey;">
                            <h5 class="identifacation">De Warme Bakker  Westende</h5>
                            <h5 class="rating" style="text-align: right;">🟡🟡🟡🟡🟡</h5>
                        </div>
                        <div class="metainfo" style="display: flex; background-color: lightgrey;">
                            <h6 class="name">Thomas Luca</h6>
                            <h6 class="date" style="text-align: right">26/04/2020</h6>
                        </div>
                        <article class="article" style="height: 200px; overflow-y: scroll;">
                            <p class="block" style="padding: 6px;">
                                Pros: <br>
                                - Employees are standing behind plexiglass <br>
                                - Possibility to pay contactless <br>
                                - A limit on amount of people that can enter the bakery <br>
                                Cons: <br>
                                - /
                            </p>
                        </article>
                    </div> */
/* var text = "";
var i;
for (i = 0; i < id.length; i++) {
    text += codeblock[i];
}
document.getElementById("review").innerHTML = text; */