;(function($) {

    $(document).ready( function() {
        $(document).on('click', '.header-area .show-menu', function() {
            $(this).toggleClass('active');
            $(".header-area .navbar").toggleClass('active');
        });
        // $(document).on('click', '.header-area .navbar .close-menu', function() {
        //     $(".header-area .navbar").removeClass('active');
        // });

        AOS.init({
            duration: 1500,
            once: true,
        })
    });

})(jQuery);


var div = document.createElement("div");
    div.id="preloader",
    div.className="preloader",
    div.innerHTML='<div class="black_wall"></div><div class="loader"></div>',
    document.body.insertBefore(div,document.body.firstChild),window.onload=function() {
    document.getElementById("preloader").classList.add("off")
};


document.getElementById("year").innerHTML = new Date().getFullYear();
document.getElementById("year2").innerHTML = new Date().getFullYear();


//Contact form

        var message = document.getElementById('success');
       
        

        function myFunctions() {
            // var message = document.getElementById('success');

            var email = document.getElementById("email").value;
            var subject = document.getElementById("subject").value;
            var messages = document.getElementById("message").value;
            var name = document.getElementById("full-name").value;

            if (name != "" && subject != "" && email != "" && messages != ""){
                document.getElementById('success').innerHTML = "Your message was sent successfully!";
                message.classList.add("alert-success");
                // message.style.color = "#013220";
                return true;
                 
            }

            
        }

