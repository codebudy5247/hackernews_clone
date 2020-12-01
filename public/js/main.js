$("header").hide();
$("main").hide();
$(()=> {
    $("header").fadeIn(800, ()=> {
        $("main").fadeIn(800);
    })
})