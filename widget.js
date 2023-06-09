var widget_body = document.getElementById('widget_body');
var widget_wrapper = document.getElementById('widget_wrapper');
var minsize_text = document.getElementById('minsizetext');

function iniFrame() {

    if ( window.location !== window.parent.location )
    {
        console.log("обработка размера");
        if ( widget_body.offsetWidth < 399.99 || widget_body.offsetHeight < 479.99) {
            console.log("меньший размер");
            widget_wrapper.style = "display: none;"
            widget_body.style = "background-color: white;"
            minsize_text.style = "display: block; width: 100%; text-align: center;";
        }
        else {
            console.log("больший размер");
            widget_wrapper.style = "display: block;"
            widget_body.style = "background: #f0dcdc;";
            widget_body.style = "min-width: 400px; min-height: 480px;"
            widget_wrapper.style = "height: 100vh; width: 100vw; border-radius: 0px; flex-wrap: wrap;"
            minsize_text.style = "display: none";
        }
    } 

}

iniFrame();

widget_body.onresize = function(){
    iniFrame();
}